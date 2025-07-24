'use client'

import { useState, useEffect } from 'react';
import 'bootstrap-icons/font/bootstrap-icons.css';
import { Pagination, PaginationContent, PaginationItem, PaginationLink, PaginationNext, PaginationPrevious } from "@/app/components/ui/pagination";
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from "@/app/components/ui/select";
import Modal from '@/app/components/Modal/Modal';
import axiosInstance from '@/lib/api/axiosInstance';
import { LeaveChoiceModal } from '@/app/components/LeaveChoiceModal/page';
import withAuth from '@/lib/auth/withAuth';
import { Notification } from '@/app/components/notification/Notification';

type ApiLeaveType = {
    id_leave: string;
    name: string;
    leave_type: string;
    start_date: string;
    end_date: string;
    total_days: number;
    reason: string;
    status: string;
};

const ListOfLeavePage = () => {
    const [leaveData, setLeaveData] = useState<ApiLeaveType[]>([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [isLoading, setIsLoading] = useState(false);
    const [search, setSearch] = useState("")
    const [debouncedSearch, setDebouncedSearch] = useState("")
    const [viewMode, setViewMode] = useState<'requests' | 'history' | null>(null);
    const [isChoiceModalOpen, setChoiceModalOpen] = useState(true);
    const [showErrorNotification, setShowErrorNotification] = useState(false)
    const [errorMessage, setErrorMessage] = useState("")
    const ITEMS_PER_PAGE = 7;

    useEffect(() => {
        const handler = setTimeout(() => {
            setDebouncedSearch(search)
        }, 500)

        return () => {
            clearTimeout(handler)
        }
    }, [search])

    useEffect(() => {
        const handleReset = () => {
            setViewMode(null);
            setChoiceModalOpen(true);
        };
        window.addEventListener('resetLeaveView', handleReset);

        return () => {
            window.removeEventListener('resetLeaveView', handleReset);
        };
    }, []);

    const fetchData = async (mode: 'requests' | 'history', searchTerm: string) => {
        setIsLoading(true);
        setLeaveData([]);
        try {
            const endpoint = mode === 'requests' 
                ? `/leaves/search?value=${searchTerm}&status=pending` 
                : `/leaves/logs/search?value=${searchTerm}`;
            
            const response = await axiosInstance.get(endpoint);
            
            let data = response.data?.data?.data || response.data?.data || [];
            
            // PERUBAHAN DI SINI: Jika mode adalah 'history', saring semua data yang statusnya 'pending'
            if (mode === 'history') {
                data = data.filter((leave: ApiLeaveType) => leave.status.toLowerCase() !== 'pending');
            }

            if (Array.isArray(data)) {
                setLeaveData(data);
            }
            if (response.data.message) {
                setErrorMessage(response.data.message)
            }
        } catch (error) {
            console.error("Failed to fetch data:", error);
            setLeaveData([]);
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        const handler = setTimeout(() => {
            setDebouncedSearch(search);
        }, 500);
        return () => clearTimeout(handler);
    }, [search]);

    useEffect(() => {
        if (viewMode) {
            fetchData(viewMode, debouncedSearch);
        }
    }, [viewMode, currentPage, debouncedSearch]);

    const handleModeSelect = (mode: 'requests' | 'history') => {
        setViewMode(mode);
        setChoiceModalOpen(false);
    };

    const formatDate = (dateString: string) => {
        if (!dateString) return '-';
        const options: Intl.DateTimeFormatOptions = { day: 'numeric', month: 'long', year: 'numeric' };
        return new Date(dateString).toLocaleDateString('id-ID', options);
    };

    const formatLeaveType = (type: string) => {
        if (!type) return '-';
        return type.replace(/_/g, ' ').replace(/\b\w/g, l => l.toUpperCase());
    };

    const getStatusChip = (status: string) => {
        switch (status?.toLowerCase()) {
            case 'pending':
                return <span className="text-yellow-600 bg-yellow-100 p-2 px-3 rounded-full text-xs font-semibold">PENDING</span>;
            case 'approved':
                return <span className="text-green-600 bg-green-100 p-2 px-3 rounded-full text-xs font-semibold">APPROVED</span>;
            case 'rejected':
                return <span className="text-red-600 bg-red-100 p-2 px-3 rounded-full text-xs font-semibold">REJECTED</span>;
            case 'taken':
                 return <span className="text-blue-600 bg-blue-100 p-2 px-3 rounded-full text-xs font-semibold">TAKEN</span>;
            default:
                return <span className="text-gray-600 bg-gray-100 p-2 px-3 rounded-full text-xs font-semibold">{status?.toUpperCase() || 'N/A'}</span>;
        }
    };

    const handleAction = async (id: string, newStatus: 'approved' | 'rejected', reason?: string) => {
        try {
            await axiosInstance.patch(`/leaves/${id}`, {
                status: newStatus,
                reason: reason || "Processed by Admin"
            });
            if (viewMode) fetchData(viewMode, search);
        } catch (error: any) {
            console.error(`Failed to ${newStatus} request:`, error);
            
            // Extract error message from API response
            let apiErrorMessage = `Failed to ${newStatus} leave request`;
            if (error.response?.data?.message) {
                apiErrorMessage = error.response.data.message;
            } else if (error.message) {
                apiErrorMessage = error.message;
            }
            
            setErrorMessage(apiErrorMessage);
            setShowErrorNotification(true);
        }
    };

    const totalPages = Math.ceil(leaveData.length / ITEMS_PER_PAGE);
    const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
    const currentData = leaveData.slice(startIndex, startIndex + ITEMS_PER_PAGE);

    const handlePageChange = (page: number) => {
        if (page >= 1 && page <= totalPages) {
            setCurrentPage(page);
        }
    };

    return (
        <>
            <LeaveChoiceModal isOpen={isChoiceModalOpen} onSelectMode={handleModeSelect} />

            {!isChoiceModalOpen && viewMode && (
                <>
                    <section className="flex justify-between items-center p-5 border-b-[1.5px] border-[#0000001f]">
                        <h1 className="text-2xl font-bold text-gray-800">
                            {viewMode === 'requests' ? 'Leave Requests' : 'Leave History'}
                        </h1>
                        <div className="flex justify-end items-center gap-3">
                            <div className="flex max-sm:w-full">
                                <input
                                    type="text"
                                    value={search}
                                    onChange={(e) => setSearch(e.target.value)}
                                    placeholder="Search by name..."
                                    className="w-full px-4 py-2 border rounded-lg bg-gray-50 text-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
                                />
                            </div>
                            <Select>
                                <SelectTrigger>
                                    <SelectValue placeholder="Type leave" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectGroup>
                                        <SelectLabel>Type Leave</SelectLabel>
                                        <SelectItem value="personal_leave">Personal</SelectItem>
                                        <SelectItem value="mandatory_leave">Mandatory</SelectItem>
                                        <SelectItem value="special_leave">Special</SelectItem>
                                    </SelectGroup>
                                </SelectContent>
                            </Select>
                        </div>
                    </section>
                    <section className="relative p-3 min-h-[calc(100dvh-137px)]">
                        <div className='max-sm:overflow-x-scroll'>
                            <table className="w-full text-base text-center">
                                <thead className="text-black bg-[#F0f4f9] backdrop-blur-sm">
                                    <tr>
                                        <th className="p-3 align-middle font-semibold ">Name</th>
                                        <th className="p-3 align-middle font-semibold ">Type</th>
                                        <th className="p-3 align-middle font-semibold ">Start Leave</th>
                                        <th className="p-3 align-middle font-semibold ">End Leave</th>
                                        <th className="p-3 align-middle font-semibold ">Leave Used</th>
                                        <th className="p-3 align-middle font-semibold ">Status</th>
                                        <th className="p-3 text-[18px] font-semibold tracking-wide text-center">Action</th>
                                    </tr>
                                </thead>
                                <tbody className="cursor-pointer">
                                    {isLoading ? (
                                        Array.from({ length: ITEMS_PER_PAGE }).map((_, rowIdx) => (
                                            <tr key={`loading-${rowIdx}`} className="animate-pulse odd:bg-[#e8efff] even:bg-[#f8faff]">
                                                {Array.from({ length: 7 }).map((_, colIdx) => (
                                                    <td key={`loading-cell-${colIdx}`} className="p-3 text-center"><div className="h-4 bg-gray-300 rounded w-3/4 mx-auto" /></td>
                                                ))}
                                            </tr>
                                        ))
                                    ) : (
                                        currentData.map((data, index) => (
                                            <tr key={`${data.id_leave}-${index}`} className="odd:bg-[#e8efff] even:bg-[#f8faff] hover:bg-[#e3e7f0] transition-colors duration-300">
                                                <td className="p-3 align-middle">{data.name}</td>
                                                <td className="p-3 align-middle">{formatLeaveType(data.leave_type)}</td>
                                                <td className="p-3 align-middle">{formatDate(data.start_date)}</td>
                                                <td className="p-3 align-middle">{formatDate(data.end_date)}</td>
                                                <td className="p-3 align-middle">{data.total_days}</td>
                                                <td className="p-3 align-middle">{getStatusChip(data.status)}</td>
                                                <td className="p-2 text-[14px] text-center font-medium">
                                                    <div className="flex justify-center items-center gap-2">
                                                        {viewMode === 'requests' ? (
                                                            <>
                                                                <Modal
                                                                    mode='confirm' size='icon' variant='ghost' title='Accept Request'
                                                                    description={`Accept leave from ${data.name}? Reason: ${data.reason}`}
                                                                    triggerLabel={<i className="bi bi-check2-circle text-xl text-green-500 hover:text-green-700"></i>}
                                                                    onConfirm={() => handleAction(data.id_leave, 'approved')}
                                                                />
                                                                <Modal
                                                                    mode='reject' size='icon' variant='ghost' title='Reject Request'
                                                                    description={`Reject leave from ${data.name}?`}
                                                                    triggerLabel={<i className="bi bi-x-circle text-xl text-red-500 hover:text-red-700"></i>}
                                                                    onConfirm={(rejectionReason) => handleAction(data.id_leave, 'rejected', rejectionReason)}
                                                                />
                                                            </>
                                                        ) : ( 
                                                            <>
                        
                                                                
                                                                {data.status === 'approved' && (
                                                                    <Modal
                                                                        mode='reject' size='icon' variant='ghost' title='Reject Leave Request'
                                                                        description={
                                                                            <div>
                                                                                <p className="mb-4 text-left text-base text-gray-700">
                                                                                    <span className="font-semibold">Employee Name :</span> {data.name}
                                                                                </p>
                                                                                <div className="flex items-start gap-3   rounded-r-lg p-3 mb-4">
                                                                                    <i className="bi bi-exclamation-triangle-fill text-yellow-500 text-center"></i>
                                                                                    <p className="text-sm font-medium text-red-500 text-center">
                                                                                        You are about to reject a leave request that has already been approved.
                                                                                    </p>
                                                                                </div>
                                                                            </div>
                                                                        }
                                                                        triggerLabel={<i className="bi bi-file-check text-xl "></i>}
                                                                        onConfirm={(rejectionReason) => handleAction(data.id_leave, 'rejected', rejectionReason)}
                                                                    />
                                                                )}
                                                                {data.status === 'rejected' && (
                                                                    <Modal
                                                                        mode='confirm' size='icon' variant='ghost' title='Change to Approved'
                                                                        description={`Employee Name : ${data.name} from Rejected to Approved?`}
                                                                        triggerLabel={<i className="bi bi-file-check text-xl "></i>}
                                                                        onConfirm={() => handleAction(data.id_leave, 'approved')}
                                                                    />
                                                                )}
                                                                 <Modal
                                                                    mode='info' size='icon' variant='ghost' title='Leave Information'
                                                                    description={`Status for ${data.name} is ${data.status}. Reason: ${data.reason || "No reason provided."}`}
                                                                    triggerLabel={<i className="bi bi-exclamation-circle text-xl "></i>}
                                                                />
                                                            </>
                                                        )}
                                                    </div>
                                                </td>
                                            </tr>
                                        ))
                                    )}
                                </tbody>
                            </table>
                        </div>
                        <div className="flex justify-center items-center bg-white py-5">
                            <Pagination>
                                <PaginationContent>
                                    <PaginationItem>
                                        <PaginationPrevious
                                            onClick={() => handlePageChange(currentPage - 1)}
                                            className={`${currentPage === 1 ? "pointer-events-none opacity-50 cursor-default" : "cursor-pointer"}`}
                                        />
                                    </PaginationItem>
                                    {Array.from({ length: totalPages }, (_, i) => (
                                        <PaginationItem key={`page-${i}`}>
                                            <PaginationLink
                                                isActive={currentPage === i + 1}
                                                onClick={() => handlePageChange(i + 1)}
                                                className='cursor-pointer'
                                            >
                                                {i + 1}
                                            </PaginationLink>
                                        </PaginationItem>
                                    ))}
                                    <PaginationItem>
                                        <PaginationNext
                                            onClick={() => handlePageChange(currentPage + 1)}
                                            className={`${currentPage === totalPages ? "pointer-events-none opacity-50 cursor-default" : "cursor-pointer"}`}
                                        />
                                    </PaginationItem>
                                </PaginationContent>
                            </Pagination>
                        </div>
                    </section>
                </>
            )}
            <Notification
                mode='failed'
                show={showErrorNotification}
                message={() => errorMessage}
                onClose={() => setShowErrorNotification(false)}
                duration={4000}
            />
        </>
    );
}

export default withAuth(ListOfLeavePage, { requireAdmin: true });