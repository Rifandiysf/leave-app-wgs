'use client'

import { useState, useEffect } from 'react';
import 'bootstrap-icons/font/bootstrap-icons.css';
import { Pagination, PaginationContent, PaginationItem, PaginationLink, PaginationNext, PaginationPrevious } from "@/app/components/ui/pagination";
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from "@/app/components/ui/select";
import Modal from '@/app/components/Modal/Modal';
import axiosInstance from '@/lib/api/axiosInstance';
import { LeaveChoiceModal } from '@/app/components/LeaveChoiceModal/page';
import { Notification } from '@/app/components/notification/Notification';
import { Label } from '@/app/components/ui/label';
import { formatUppercase } from '@/lib/format';

type ApiLeaveType = {
    NIK: string
    fullname: string;
    id_leave: string;
    title: string;
    leave_type: string;
    start_date: string;
    end_date: string;
    total_days: number;
    reason: string;
    status: string;
    tb_leave_log: {
        reason: string
        balances_used: [string, number, number][];
        tb_users: {
            fullname: string
        }
    }
    name: string;
};

type PaginationInfo = {
    current_page: number,
    last_visible_page: number,
    has_next_page: boolean,
    item: {
        count: number,
        total: number,
        per_page: number
    }
}

const itemPerPage = 7

type PageItem = number | 'ellipsis'

const getVisiblePages = (current: number, total: number, maxVisible: number = 5): PageItem[] => {
    const pages: PageItem[] = []

    if (total <= maxVisible + 2) {
        for (let i = 1; i <= total; i++) pages.push(i)
        return pages
    }

    const half = Math.floor(maxVisible / 2)
    let start = Math.max(current - half, 2)
    let end = Math.min(current + half, total - 1)

    if (current <= half + 2) {
        start = 2
        end = maxVisible
    }

    if (current >= total - half - 1) {
        start = total - maxVisible + 1
        end = total - 1
    }

    pages.push(1)

    if (start > 2) pages.push('ellipsis')

    for (let i = start; i <= end; i++) {
        pages.push(i)
    }

    if (end < total - 1) pages.push('ellipsis')

    pages.push(total)

    return pages
}

const ListOfLeavePage = () => {
    const [leaveData, setLeaveData] = useState<ApiLeaveType[]>([]);
    const [paginationInfo, setPaginationInfo] = useState<PaginationInfo>({
        current_page: 1,
        last_visible_page: 1,
        has_next_page: false,
        item: {
            count: 0,
            total: 0,
            per_page: 10
        }
    })

    const [currentPage, setCurrentPage] = useState(1);
    const [search, setSearch] = useState("")
    const [leaveType, setLeaveType] = useState<string | null>(null);
    const [status, setStatus] = useState<string | null>(null);
    const [debouncedSearch, setDebouncedSearch] = useState("")

    const [actionMessage, setActionMessage] = useState("")
    const [showErrorNotification, setShowErrorNotification] = useState(false)
    const [showSuccessNotification, setShowSuccessNotification] = useState(false)
    const [notifMessage, setNotifMessage] = useState("")

    const [isLoading, setIsLoading] = useState(false);
    const [viewMode, setViewMode] = useState<'requests' | 'history' | null>(null);
    const [isChoiceModalOpen, setChoiceModalOpen] = useState(true);

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

    const fetchData = async (
        mode: 'requests' | 'history',
        searchTerm: string,
        selectedType?: string | null,
        selectedStatus?: string | null
    ) => {
        setIsLoading(true);
        setLeaveData([]);

        try {
            const params = new URLSearchParams();
            params.set("value", searchTerm !== undefined ? searchTerm : "");
            params.set('page', currentPage.toString());
            params.set('limit', itemPerPage.toString());
            if (selectedType) params.append("type", selectedType);
            if (selectedStatus) params.append("status", selectedStatus);

            const endpoint =
                mode === "requests"
                    ? `/leaves/search?${params.toString()}`
                    : `/leaves/logs/search?${params.toString()}`;

            const response = await axiosInstance.get(endpoint);
            let data = response.data?.data?.data || response.data?.data || [];

            if (mode === 'history') {
                data = data.filter((leave: ApiLeaveType) => leave.status.toLowerCase() !== 'pending');
            }

            if (Array.isArray(data)) {
                setLeaveData(data);
                setPaginationInfo(response.data.pagination)
            }

            if (response.data.message) {
                setNotifMessage(response.data.message);
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
            fetchData(viewMode, debouncedSearch, leaveType, status);
        }
    }, [viewMode, currentPage, debouncedSearch, leaveType, status]);

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
            const response = await axiosInstance.patch(`/leaves/${id}`, {
                status: newStatus,
                reason: reason || "Processed by Admin"
            });
            if (viewMode) fetchData(viewMode, search);
            setActionMessage(response.data.message)
            setShowSuccessNotification(true)
        } catch (error: any) {
            console.error(`Failed to ${newStatus} request:`, error);

            let apiErrorMessage = `Failed to ${newStatus} leave request`;
            if (error.response?.data?.message) {
                apiErrorMessage = error.response.data.message;
            } else if (error.message) {
                apiErrorMessage = error.message;
            }

            setActionMessage(apiErrorMessage);
            setShowErrorNotification(true);
        }
    };

    const handlePageChange = (page: number) => {
        if (page >= 1 && page <= paginationInfo.last_visible_page) {
            setCurrentPage(page);
        }
    };

    const paginationPages = getVisiblePages(
        currentPage,
        paginationInfo.last_visible_page
    );

    return (
        <>
            <LeaveChoiceModal isOpen={isChoiceModalOpen} onSelectMode={handleModeSelect} />

            {!isChoiceModalOpen && viewMode && (
                <>
                    <section className="flex flex-col sm:flex-row sm:justify-between sm:items-center p-5 border-b-[1.5px] border-border gap-4">
                        <h1 className="text-2xl font-bold text-foreground text-center sm:text-left">
                            {viewMode === 'requests' ? 'Leave Requests' : 'Leave History'}
                        </h1>
                        
                        <div className="flex flex-col sm:flex-row items-center gap-3 w-full sm:w-auto">
                            <input
                                type="text"
                                value={search}
                                onChange={(e) => setSearch(e.target.value)}
                                placeholder="Search by name..."
                                className="w-full px-4 py-2 border rounded-lg bg-gray-50 text-foreground dark:bg-card text-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
                            />
                            
                            <div className="flex gap-2 w-full sm:w-auto">
                                {viewMode === 'requests' ? (
                                    <Select onValueChange={(value) => setLeaveType(value === 'all' ? null : value)}>
                                        <SelectTrigger className="w-full sm:w-[180px]">
                                            <SelectValue placeholder="Type leave" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectGroup>
                                                <SelectLabel>Type Leave</SelectLabel>
                                                <SelectItem value="all">All</SelectItem>
                                                <SelectItem value="personal_leave">Personal</SelectItem>
                                                <SelectItem value="special_leave">Special</SelectItem>
                                            </SelectGroup>
                                        </SelectContent>
                                    </Select>
                                ) : (
                                    <>
                                        <Select onValueChange={(value) => setStatus(value === 'all' ? null : value)}>
                                            <SelectTrigger className="flex-1 sm:w-[180px]">
                                                <SelectValue placeholder="Status" />
                                            </SelectTrigger>
                                            <SelectContent>
                                                <SelectGroup>
                                                    <SelectLabel>Status</SelectLabel>
                                                    <SelectItem value="all">All</SelectItem>
                                                    <SelectItem value="approved">Approved</SelectItem>
                                                    <SelectItem value="rejected">Rejected</SelectItem>
                                                </SelectGroup>
                                            </SelectContent>
                                        </Select>
                                        <Select onValueChange={(value) => setLeaveType(value === 'all' ? null : value)}>
                                            <SelectTrigger className="flex-1 sm:w-[180px]">
                                                <SelectValue placeholder="Type leave" />
                                            </SelectTrigger>
                                            <SelectContent>
                                                <SelectGroup>
                                                    <SelectLabel>Type Leave</SelectLabel>
                                                    <SelectItem value="all">All</SelectItem>
                                                    <SelectItem value="personal_leave">Personal</SelectItem>
                                                    <SelectItem value="special_leave">Special</SelectItem>
                                                </SelectGroup>
                                            </SelectContent>
                                        </Select>
                                    </>
                                )}
                            </div>
                        </div>
                    </section>
                    
                    <section className="relative p-3 min-h-[calc(100dvh-137px)] max-sm:mb-14">
                        <div className='rounded-md overflow-hidden'>
                            <div className='overflow-x-auto'>
                                <table className="w-full text-base text-center">
                                    <thead className="text-foreground bg-[#F0f4f9] dark:bg-card backdrop-blur-sm">
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
                                            Array.from({ length: itemPerPage }).map((_, rowIdx) => (
                                                <tr key={`loading-${rowIdx}`} className="animate-pulse bg-gray-200 dark:bg-gray-600">
                                                    {Array.from({ length: 7 }).map((_, colIdx) => (
                                                        <td key={`loading-cell-${colIdx}`} className="p-3 text-center"><div className="h-4 bg-gray-300 dark:bg-gray-700 rounded w-3/4 mx-auto" /></td>
                                                    ))}
                                                </tr>
                                            ))
                                        ) :
                                            leaveData.length === 0 ? (
                                                <tr>
                                                    <td colSpan={7} className="p-4 text-center text-gray-500">
                                                        No leave request found.
                                                    </td>
                                                </tr>
                                            ) : (
                                                leaveData.map((data, index) => (
                                                    <tr key={`${data.id_leave}-${index}`} className="odd:bg-[#e8efff] even:bg-[#f8faff] hover:bg-[#e3e7f0] odd:dark:bg-card/30 even:dark:bg-card/70 transition-colors duration-300">
                                                        <td className="p-3 align-middle">{data.name || data.fullname}</td>
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
                                                                            description={`Accept leave from ${data.tb_leave_log?.tb_users?.fullname}? Reason: ${data.reason}`}
                                                                            triggerLabel={<i className="bi bi-check2-circle text-xl text-green-500 hover:text-green-700"></i>}
                                                                            onConfirm={() => handleAction(data.id_leave, 'approved')}
                                                                        />
                                                                        <Modal
                                                                            mode='reject' size='icon' variant='ghost' title='Reject Request'
                                                                            description={`Reject leave from ${data.tb_leave_log?.tb_users?.fullname}?`}
                                                                            triggerLabel={<i className="bi bi-x-circle text-xl text-red-500 hover:text-red-700"></i>}
                                                                            onConfirm={(rejectionReason) => handleAction(data.id_leave, 'rejected', rejectionReason)}
                                                                        />
                                                                        <Modal
                                                                            mode='info'
                                                                            size='icon'
                                                                            variant='ghost'
                                                                            title='Detail Information'
                                                                            description={"Detailed Information about the Employee's Leave Request"}
                                                                            triggerLabel={<i className="bi bi-info-circle text-xl text-blue-500 hover:text-blue-700"></i>}
                                                                            triggerClassName='hover:bg-blue-50'
                                                                            showFooter={false}
                                                                        >
                                                                            <div className="grid grid-cols-2 grid-rows-1 gap-3">
                                                                                <div className="flex flex-col gap-5">
                                                                                    <div className="flex flex-col gap-0.5">
                                                                                        <Label className="font-bold text-gray-500">NIK</Label>
                                                                                        <h1>{data.NIK}</h1>
                                                                                    </div>
                                                                                    <div className="flex flex-col gap-0.5">
                                                                                        <Label className="font-bold text-gray-500">Name</Label>
                                                                                        <h1>{data.name}</h1>
                                                                                    </div>
                                                                                    <div className="flex flex-col gap-0.5">
                                                                                        <Label className="font-bold text-gray-500">Title</Label>
                                                                                        <h1>{data.title}</h1>
                                                                                    </div>
                                                                                    <div className="flex flex-col gap-0.5">
                                                                                        <Label className="font-bold text-gray-500">Type</Label>
                                                                                        <h1>{formatUppercase(data.leave_type)}</h1>
                                                                                    </div>
                                                                                    <div className="flex flex-col gap-0.5">
                                                                                        <Label className="font-bold text-gray-500">Start Leave</Label>
                                                                                        <h1>{formatDate(data.start_date)}</h1>
                                                                                    </div>
                                                                                </div>
                                                                                <div className="flex flex-col gap-5">
                                                                                    <div className="flex flex-col gap-0.5">
                                                                                        <Label className="font-bold text-gray-500">End Leave</Label>
                                                                                        <h1>{formatDate(data.end_date)}</h1>
                                                                                    </div>
                                                                                    <div className="flex flex-col gap-0.5">
                                                                                        <Label className="font-bold text-gray-500">Leave Used</Label>
                                                                                        <h1>{data.total_days} Days</h1>
                                                                                    </div>
                                                                                    {data.leave_type === 'mandatory_leave' ? '' : (
                                                                                        <div className="flex flex-col gap-0.5">
                                                                                            <Label className="font-bold text-gray-500">Reason Leave</Label>
                                                                                            <h1>{data.reason}</h1>
                                                                                        </div>
                                                                                    )}
                                                                                    <div className="flex flex-col gap-0.5">
                                                                                        <Label className="font-bold text-gray-500">Status</Label>
                                                                                        <div className="flex items-center gap-1">
                                                                                            <i className={`bi bi-circle-fill text-xs ${data.status === 'pending' ? 'text-yellow-500' : 'text-gray-500'}`}></i>
                                                                                            <div className="flex gap-1">
                                                                                                <h1>{formatUppercase(data.status)}</h1>
                                                                                            </div>
                                                                                        </div>
                                                                                    </div>
                                                                                </div>
                                                                            </div>
                                                                        </Modal>
                                                                    </>
                                                                ) : (
                                                                    <>
                                                                        {data.status === 'approved' && (
                                                                            <Modal
                                                                                mode='reject' size='icon' variant='ghost' title='Reject Leave Request'
                                                                                description={
                                                                                    <div>
                                                                                        <p className="mb-4 text-left text-base text-gray-700">
                                                                                            <span className="font-semibold">Employee Name :</span> {data.tb_leave_log?.tb_users?.fullname}
                                                                                        </p>
                                                                                        <div className="flex items-start gap-3   rounded-r-lg p-3 mb-4">
                                                                                            <i className="bi bi-exclamation-triangle-fill text-yellow-500 text-center"></i>
                                                                                            <p className="text-sm font-medium text-red-500 text-center">
                                                                                                You are about to reject a leave request that has already been approved.
                                                                                            </p>
                                                                                        </div>
                                                                                    </div>
                                                                                }
                                                                                triggerLabel={<i className="bi bi-x-circle text-xl "></i>}
                                                                                triggerClassName='hover:text-red-600 hover:bg-red-50'
                                                                                onConfirm={(rejectionReason) => handleAction(data.id_leave, 'rejected', rejectionReason)}
                                                                            />
                                                                        )}
                                                                        {data.status === 'rejected' && (
                                                                            <Modal
                                                                                mode='confirm' size='icon' variant='ghost' title='Change to Approved'
                                                                                description={`Employee Name : ${data.tb_leave_log?.tb_users?.fullname} from Rejected to Approved?`}
                                                                                triggerLabel={<i className="bi bi-check-circle text-xl "></i>}
                                                                                triggerClassName='hover:text-green-600 hover:bg-green-50'
                                                                                onConfirm={() => handleAction(data.id_leave, 'approved')}
                                                                            />
                                                                        )}
                                                                        <Modal
                                                                            mode='info' size='icon' variant='ghost' title='Leave Information'
                                                                            description={`More Information Leave`}
                                                                            triggerLabel={<i className="bi bi-exclamation-circle text-xl "></i>}
                                                                            showFooter={false}
                                                                        >
                                                                            <div className="grid grid-cols-2 grid-rows-1 gap-3">
                                                                                <div className="flex flex-col gap-5">
                                                                                    <div className="flex flex-col gap-0.5">
                                                                                        <Label className="font-bold text-gray-500">Title</Label>
                                                                                        <h1>{data.title}</h1>
                                                                                    </div>
                                                                                    <div className="flex flex-col gap-0.5">
                                                                                        <Label className="font-bold text-gray-500">Type</Label>
                                                                                        <h1>{formatUppercase(data.leave_type)}</h1>
                                                                                    </div>
                                                                                    <div className="flex flex-col gap-0.5">
                                                                                        <Label className="font-bold text-gray-500">Start Leave</Label>
                                                                                        <h1>{formatDate(data.start_date)}</h1>
                                                                                    </div>
                                                                                    <div className="flex flex-col gap-0.5">
                                                                                        <Label className="font-bold text-gray-500">End Leave</Label>
                                                                                        <h1>{formatDate(data.end_date)}</h1>
                                                                                    </div>
                                                                                    {data.leave_type === 'mandatory_leave' ? '' : (
                                                                                        <div className="flex flex-col gap-0.5">
                                                                                            <Label className="font-bold text-gray-500">Reason Leave</Label>
                                                                                            <h1>{data.reason}</h1>
                                                                                        </div>
                                                                                    )}
                                                                                </div>
                                                                                <div className="flex flex-col gap-5">
                                                                                    {data.status === 'rejected' ? (
                                                                                        <div className="flex flex-col gap-0.5">
                                                                                            <Label className="font-bold text-gray-500">Leave Used</Label>
                                                                                            <h1>{data.total_days} Days</h1>
                                                                                        </div>
                                                                                    ) : (
                                                                                        <>
                                                                                            {data.tb_leave_log?.balances_used?.[0]?.[1] && data.tb_leave_log?.balances_used?.[0]?.[2] && (
                                                                                                <div className="flex flex-col gap-0.5">
                                                                                                    <Label className="font-bold text-gray-500">This Year</Label>
                                                                                                    <h1>{data.tb_leave_log?.balances_used[0]?.[1]} - {data.tb_leave_log?.balances_used[0]?.[2]} Day Used</h1>
                                                                                                </div>
                                                                                            )}
                                                                                            {data.tb_leave_log?.balances_used?.[1]?.[1] && data.tb_leave_log?.balances_used?.[1]?.[2] && (
                                                                                                <div className="flex flex-col gap-0.5">
                                                                                                    <Label className="font-bold text-gray-500">Last Year</Label>
                                                                                                    <h1>{data.tb_leave_log?.balances_used[1]?.[1]} - {data.tb_leave_log?.balances_used[1]?.[2]} Day Used</h1>
                                                                                                </div>
                                                                                            )}
                                                                                        </>
                                                                                    )}
                                                                                    <div className="flex flex-col gap-0.5">
                                                                                        <Label className="font-bold text-gray-500">Status</Label>
                                                                                        <div className="flex items-center gap-1">
                                                                                            <i className={`bi bi-circle-fill text-xs ${data.status === 'rejected' ? 'text-red-500' : data.status === 'approved' ? 'text-green-500' : 'text-gray-500'}`}></i>
                                                                                            <div className="flex gap-1">
                                                                                                <h1>{formatUppercase(data.status)}</h1>
                                                                                                <h1>by {data.tb_leave_log?.tb_users?.fullname}</h1>
                                                                                            </div>
                                                                                        </div>
                                                                                    </div>
                                                                                    {data.leave_type === 'mandatory_leave' ? '' : (
                                                                                        <div className="flex flex-col gap-0.5">
                                                                                            <Label className="font-bold text-gray-500">Reason {data.status === 'rejected' ? 'Rejected' : data.status === 'approved' ? 'Approved' : ''}</Label>
                                                                                            <h1>{data.tb_leave_log?.reason}</h1>
                                                                                        </div>
                                                                                    )}
                                                                                </div>
                                                                            </div>
                                                                        </Modal>
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
                        </div>
                        <div className="flex justify-center items-center bg-background py-5">
                            <Pagination>
                                <PaginationContent>
                                    <PaginationItem>
                                        <PaginationPrevious
                                            onClick={() => handlePageChange(currentPage - 1)}
                                            className={`${currentPage === 1 ? "pointer-events-none opacity-50 cursor-default" : "cursor-pointer"}`}
                                        />
                                    </PaginationItem>

                                    {paginationPages.map((page, idx) => (
                                        <PaginationItem key={idx}>
                                            {page === "ellipsis" ? (
                                                <span className="px-2 text-gray-500 select-none">…</span>
                                            ) : (
                                                <PaginationLink
                                                    isActive={currentPage === page}
                                                    onClick={() => handlePageChange(page)}
                                                    className="cursor-pointer"
                                                >
                                                    {page}
                                                </PaginationLink>
                                            )}
                                        </PaginationItem>
                                    ))}

                                    <PaginationItem>
                                        <PaginationNext
                                            onClick={() => handlePageChange(currentPage + 1)}
                                            className={`${currentPage === paginationInfo.last_visible_page || paginationInfo.last_visible_page === 0 ? "pointer-events-none opacity-50 cursor-default" : "cursor-pointer"}`}
                                        />
                                    </PaginationItem>
                                </PaginationContent>
                            </Pagination>
                        </div>
                    </section>
                </>
            )
            }
            <Notification
                mode='failed'
                show={showErrorNotification}
                message={() => actionMessage}
                onClose={() => setShowErrorNotification(false)}
                duration={5000}
            />
            <Notification
                mode='success'
                show={showSuccessNotification}
                message={() => actionMessage}
                onClose={() => setShowSuccessNotification(false)}
                duration={5000}
            />
        </>
    );
}

export default ListOfLeavePage;