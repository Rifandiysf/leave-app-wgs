'use client'

import { useState, useEffect } from 'react';
import 'bootstrap-icons/font/bootstrap-icons.css';
import { Pagination, PaginationContent, PaginationItem, PaginationLink, PaginationNext, PaginationPrevious } from "@/app/components/ui/pagination";
import { SelectDemo } from "@/app/components/select/page";
import { SelectItem, SelectLabel } from "@/app/components/ui/select";
import Modal from '@/app/components/Modal/Modal';
import axiosInstance from '@/app/api/axiosInstance';
import { LeaveChoiceModal } from '@/app/components/LeaveChoiceModal/page';
import withAuth from '@/lib/auth/withAuth';

type ApiLeaveType = {
    id_leave: string;
    name: string;
    leave_type: string;
    start_date: string;
    end_date: string;
    leave_used: number;
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
    const ITEMS_PER_PAGE = 7;

    // Debounce search
    useEffect(() => {
        const handler = setTimeout(() => {
            setDebouncedSearch(search)
            setCurrentPage(1)
        }, 500)

        return () => {
            clearTimeout(handler)
        }
    }, [search])

    const fetchData = async (mode: 'requests' | 'history', seaechTerm: string) => {
        setIsLoading(true);
        setLeaveData([]);
        try {
            let endpoint = mode === 'requests' ? '/leaves' : '/leaves/logs';
            if (seaechTerm) {
                endpoint += `/search?value=${seaechTerm}`;
            }

            const response = await axiosInstance.get(endpoint);
            if (response.data && Array.isArray(response.data.data)) {
                setLeaveData(response.data.data);
            }
        } catch (error) {
            console.error("Failed to fetch data:", error);
            setLeaveData([]);
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        setCurrentPage(1)
    }, [debouncedSearch])

    useEffect(() => {
        if (viewMode) {
            fetchData(viewMode, search);
        }
    }, [viewMode, currentPage, search]);

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
                return <span className="text-yellow-600 bg-yellow-100 p-2 px-3 rounded-full text-xs">PENDING</span>;
            case 'approved':
                return <span className="text-green-600 bg-green-100 p-2 px-3 rounded-full text-xs">APPROVED</span>;
            case 'rejected':
                return <span className="text-red-600 bg-red-100 p-2 px-3 rounded-full text-xs">REJECTED</span>;
            default:
                return <span className="text-gray-600 bg-gray-100 p-2 px-3 rounded-full text-xs">{status?.toUpperCase() || 'N/A'}</span>;
        }
    };

    const handleAction = async (id: string, newStatus: 'approved' | 'rejected', reason?: string) => {
        try {
            await axiosInstance.patch(`/leaves/${id}`, {
                status: newStatus,
                reason: reason || "Processed by Admin"
            });
            if (viewMode) fetchData(viewMode, search);
        } catch (error) {
            console.error(`Failed to ${newStatus} request:`, error);
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
                        <div className="flex justify-end items-center gap-3 mb-4">
                            <div className="flex max-sm:w-full">
                                <input
                                    type="text"
                                    value={search}
                                    onChange={(e) => setSearch(e.target.value)}
                                    placeholder="Search..."
                                    className="w-full px-4 py-2 border rounded-lg bg-gray-50 text-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
                                />
                            </div>
                            <SelectDemo placeholder="Type">
                                <SelectLabel>Type</SelectLabel>
                                <SelectItem value="personal">Personal</SelectItem>
                                <SelectItem value="mandatory">Mandatory</SelectItem>
                                <SelectItem value="spesial">Special</SelectItem>
                            </SelectDemo>
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
                                        {viewMode === 'requests' && <th className="p-3 text-[18px] font-semibold tracking-wide text-center">Action</th>}
                                    </tr>
                                </thead>
                                <tbody className="cursor-pointer">
                                    {isLoading ? (
                                        Array.from({ length: ITEMS_PER_PAGE }).map((_, rowIdx) => (
                                            <tr key={`loading-${rowIdx}`} className="animate-pulse odd:bg-[#e8efff] even:bg-[#f8faff]">
                                                {Array.from({ length: viewMode === 'requests' ? 7 : 6 }).map((_, colIdx) => (
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
                                                <td className="p-3 align-middle">{data.leave_used}</td>
                                                <td className="p-3 align-middle">{getStatusChip(data.status)}</td>
                                                {viewMode === 'requests' && (
                                                    <td className="p-2 text-[14px] text-center font-medium border-b-[1.5px] border-[#0000001f]">
                                                        <Modal
                                                            mode='confirm'
                                                            size='icon'
                                                            variant='ghost'
                                                            title='Accept Request'
                                                            description={`Accept leave from ${data.name}? Reason: ${data.reason}`}
                                                            triggerLabel={<i className="bi bi-check2-circle text-xl"></i>}
                                                            onConfirm={() => handleAction(data.id_leave, 'approved')}
                                                        />
                                                        <Modal
                                                            mode='reject'
                                                            size='icon'
                                                            variant='ghost'
                                                            title='Reject Request'
                                                            description={`Reject leave from ${data.name}?`}
                                                            triggerLabel={<i className="bi bi-x-circle text-xl"></i>}
                                                            onConfirm={(rejectionReason) => handleAction(data.id_leave, 'rejected', rejectionReason)}
                                                        />
                                                    </td>
                                                )}
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
        </>
    );
}

export default withAuth(ListOfLeavePage, { requireAdmin: true });
