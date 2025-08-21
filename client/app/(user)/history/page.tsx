'use client'

import { useCallback, useEffect, useState } from "react"
import 'bootstrap-icons/font/bootstrap-icons.css'
import {
    Pagination,
    PaginationContent,
    PaginationItem,
    PaginationLink,
    PaginationNext,
    PaginationPrevious
} from "../../components/ui/pagination"
import Modal from "@/app/components/Modal/Modal"
import { formatDate, formatUppercase } from "@/lib/format"
import { Label } from "@/app/components/ui/label"   
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from "@/app/components/ui/select"

type LeaveHistoryType = {
    id_leave: string
    leave_type: string
    start_date: string
    end_date: string
    title: string
    reason: string
    status: string
    total_days: number
    tb_leave_log: {
        reason: string
        tb_users: {
            fullname: string
        }
    }
}

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


const HistoryPage = () => {
    const [currentPage, setCurrentPage] = useState(1)
    const [isLoading, setIsLoading] = useState(false)
    const [dataHistoryLeave, setDataHitoryLeave] = useState<LeaveHistoryType[]>([])
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
    const [status, setStatus] = useState<string | null>(null)
    const [leaveType, setLeaveType] = useState<string | null>(null)
    const [search, setSearch] = useState("")
    const [debouncedSearch, setDebouncedSearch] = useState("")

    // Debounce search
    useEffect(() => {
        const handler = setTimeout(() => {
            setDebouncedSearch(search)
        }, 500)

        return () => {
            clearTimeout(handler)
        }
    }, [search])

    const fetchHistoryLeaves = useCallback(async (
        page: number,
        searchTerm: string,
        selectedType?: string | null,
        selectedStatus?: string | null
    ) => {
        setIsLoading(true)
        try {
            const params = new URLSearchParams();
            if (selectedType) params.append("type", selectedType);
            if (selectedStatus) params.append("status", selectedStatus);

            let url = `${process.env.NEXT_PUBLIC_API_BASE_URL}/users/leave/search?value=&${params.toString()}&`

            if (searchTerm) {
                url = `${process.env.NEXT_PUBLIC_API_BASE_URL}/users/leave/search?value=${searchTerm}`
            }

            url += `${searchTerm && '&'}page=${page}&limit=${itemPerPage}`

            const res = await fetch(url, {
                credentials: 'include',
            })

            if (!res.ok) {
                const errorData = await res.json()
                throw new Error(errorData.message || 'Failed to fetch mandatory leaves')
            }

            const result = await res.json()

            setDataHitoryLeave(result.data)
            setPaginationInfo(result.pagination)

            if (page > result.pagination.last_visible_page && result.pagination.last_visible_page > 0) {
                setCurrentPage(result.pagination.last_visible_page)
            } else if (result.pagination.last_visible_page === 0 && page !== 1) {
                setCurrentPage(1)
            }

        } catch (err: any) {
            console.error('Error fetching mandatory leaves:', err)
        } finally {
            setIsLoading(false)
        }
    }, [])

    useEffect(() => {
        setCurrentPage(1)
    }, [debouncedSearch])

    useEffect(() => {
        fetchHistoryLeaves(currentPage, debouncedSearch, leaveType, status)
    }, [currentPage, fetchHistoryLeaves, debouncedSearch, leaveType, status])

    const handlePageChange = (page: number) => {
        if (page >= 1 && page <= paginationInfo.last_visible_page) {
            setCurrentPage(page)
        }
    }

    const statusTag = (status: string) => {
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
    }

  return (
        <section className="flex flex-col relative p-3 min-h-[calc(100dvh-137px)] max-sm:mb-14">
            {/* Desktop Layout */}
            <div className='hidden sm:flex justify-between items-center gap-3 mb-4'>
                <div className="flex items-center">
                    <h1 className="text-2xl sm:text-3xl md:text-3xl  font-bold text-foreground  truncate">History</h1>
                </div>

                <div className="flex items-center gap-3">
                    <div className="flex">
                        <input
                            type="text"
                            placeholder="Search By Title..."
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                            className="w-full px-4 py-2 border rounded-lg bg-gray-50 text-foreground dark:bg-card text-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
                        />
                    </div>
                    <Select onValueChange={(value) => setStatus(value === 'all' ? null : value)}>
                        <SelectTrigger>
                            <SelectValue placeholder="Status" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectGroup>
                                <SelectLabel>Status Leave</SelectLabel>
                                <SelectItem value="all">All</SelectItem>
                                <SelectItem value="pending">Pending</SelectItem>
                                <SelectItem value="approved">Approved</SelectItem>
                                <SelectItem value="rejected">Rejected</SelectItem>
                            </SelectGroup>
                        </SelectContent>
                    </Select>
                    <Select onValueChange={(value) => setLeaveType(value === 'all' ? null : value)}>
                        <SelectTrigger>
                            <SelectValue placeholder="Type leave" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectGroup>
                                <SelectLabel>Type Leave</SelectLabel>
                                <SelectItem value="all">All</SelectItem>
                                <SelectItem value="personal">Personal</SelectItem>
                                <SelectItem value="mandatory">Mandatory</SelectItem>
                                <SelectItem value="special">Special</SelectItem>
                            </SelectGroup>
                        </SelectContent>
                    </Select>
                </div>
            </div>

            {/* Mobile Layout */}
            <div className='flex flex-col gap-3 mb-4 sm:hidden'>
                <div className="flex items-center justify-center">
                    <h1 className="text-xl font-semibold text-foreground">History</h1>
                </div>
                <div className="flex gap-2">
                    <div className="flex flex-1">
                        <input
                            type="text"
                            placeholder="Search By Title..."
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                            className="w-full px-4 py-2 border rounded-lg bg-gray-50 text-foreground dark:bg-card text-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
                        />
                    </div>
                    <Select onValueChange={(value) => setStatus(value === 'all' ? null : value)}>
                        <SelectTrigger className="min-w-[100px]">
                            <SelectValue placeholder="Status" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectGroup>
                                <SelectLabel>Status Leave</SelectLabel>
                                <SelectItem value="all">All</SelectItem>
                                <SelectItem value="pending">Pending</SelectItem>
                                <SelectItem value="approved">Approved</SelectItem>
                                <SelectItem value="rejected">Rejected</SelectItem>
                            </SelectGroup>
                        </SelectContent>
                    </Select>
                    <Select onValueChange={(value) => setLeaveType(value === 'all' ? null : value)}>
                        <SelectTrigger className="min-w-[100px]">
                            <SelectValue placeholder="Type leave" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectGroup>
                                <SelectLabel>Type Leave</SelectLabel>
                                <SelectItem value="all">All</SelectItem>
                                <SelectItem value="personal">Personal</SelectItem>
                                <SelectItem value="mandatory">Mandatory</SelectItem>
                                <SelectItem value="special">Special</SelectItem>
                            </SelectGroup>
                        </SelectContent>
                    </Select>
                </div>
            </div>

            <div className="w-full border-border rounded-md overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full min-w-max">
                        <thead className="border-b-[1.5px] border-border bg-[#f0f4f9] dark:bg-card rounded-2xl shadow-2xl">
                            <tr>
                                <th className="p-3 text-[16px] sm:text-[18px] font-semibold">Status</th>
                                <th className="p-3 text-[16px] sm:text-[18px] font-semibold">Type</th>
                                <th className="p-3 text-[16px] sm:text-[18px] font-semibold">Start Leave</th>
                                <th className="p-3 text-[16px] sm:text-[18px] font-semibold">End Leave</th>
                                <th className="p-3 text-[16px] sm:text-[18px] font-semibold">Leave Usage</th>
                                <th className="p-3 text-[16px] sm:text-[18px] font-semibold">Title</th>
                                <th className="p-3 text-[16px] sm:text-[18px] font-semibold">Detail</th>
                            </tr>
                        </thead>
                        <tbody className="cursor-pointer">
                            {isLoading ? (
                                Array.from({ length: paginationInfo.item.per_page }).map((_, rowIdx) => (
                                    <tr key={rowIdx} className="animate-pulse bg-gray-200 dark:bg-gray-600">
                                        {Array.from({ length: 7 }).map((_, colIdx) => (
                                            <th key={colIdx} className="p-3">
                                                <div className="h-4 bg-gray-300 dark:bg-gray-700 rounded w-3/4 mx-auto" />
                                            </th>
                                        ))}
                                    </tr>
                                ))
                            ) : dataHistoryLeave.length === 0 ? (
                                <tr>
                                    <td colSpan={7} className="p-4 text-center text-gray-500">
                                        No mandatory leaves found.
                                    </td>
                                </tr>
                            ) : (
                                dataHistoryLeave.map((data, idx) => (
                                    <tr key={idx} className="odd:bg-[#e8efff] even:bg-[#f8faff] hover:bg-[#e3e7f0] odd:dark:bg-card/30 even:dark:bg-card/70 transition-colors duration-300">
                                        <th className="p-2 text-[14px] font-medium border-b-[1.5px] border-[#0000001f]">{statusTag(data.status)}</th>
                                        <th className="p-2 text-[14px] font-medium border-b-[1.5px] border-[#0000001f]">{formatUppercase(data.leave_type)}</th>
                                        <th className="p-2 text-[14px] font-medium border-b-[1.5px] border-[#0000001f]">{formatDate(data.start_date)}</th>
                                        <th className="p-2 text-[14px] font-medium border-b-[1.5px] border-[#0000001f]">{formatDate(data.end_date)}</th>
                                        <th className="p-2 text-[14px] font-medium border-b-[1.5px] border-[#0000001f]">{data.total_days} Days</th>
                                        <th className="p-2 text-[14px] font-medium border-b-[1.5px] border-[#0000001f]">{data.title}</th>
                                        <th className="p-2 text-[14px] font-medium border-b-[1.5px] border-[#0000001f]">
                                            <Modal
                                                mode="info"
                                                size="icon"
                                                variant="ghost"
                                                title="Information"
                                                triggerLabel={<i className="bi bi-exclamation-circle text-2xl cursor-pointer"></i>}
                                                description=""
                                                showFooter={false}
                                            >
                                                <div className={`grid grid-cols-2 grid-rows-1 gap-3 ${data.leave_type === 'mandatory_leave' && 'grid-cols-1'}`}>
                                                    <div className="flex flex-col gap-5">
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
                                                        <div className="flex flex-col gap-0.5">
                                                            <Label className="font-bold text-gray-500">Leave Used</Label>
                                                            <h1>{data.total_days} Days</h1>
                                                        </div>
                                                    </div>
                                                    {data.leave_type === 'mandatory_leave' ? '' : (
                                                        <div className="flex flex-col gap-5">
                                                            <div className="flex flex-col gap-0.5">
                                                                <Label className="font-bold text-gray-500">Reason Leave</Label>
                                                                <h1>{data.reason}</h1>
                                                            </div>
                                                            <div className="flex flex-col gap-0.5">
                                                                <Label className="font-bold text-gray-500">Status</Label>
                                                                <div className="flex items-center gap-1">
                                                                    <i className={`bi bi-circle-fill text-xs ${data.status === 'rejected' ? 'text-red-500' : data.status === 'approved' ? 'text-green-500' : data.status === 'pending' ? 'text-yellow-500' : 'text-gray-500'}`}></i>
                                                                    <div className="flex gap-1">
                                                                        <h1>{formatUppercase(data.status)}</h1>
                                                                        {data.status === 'pending' ? '' : (<h1>by {data.tb_leave_log?.tb_users?.fullname}</h1>)}
                                                                    </div>
                                                                </div>
                                                            </div>
                                                            {data.status === 'rejected' ? (
                                                                <div className="flex flex-col gap-0.5">
                                                                    <Label className="font-bold text-gray-500">Reason Rejected</Label>
                                                                    <h1>{data.tb_leave_log?.reason}</h1>
                                                                </div>
                                                            ) : ""}
                                                        </div>
                                                    )}
                                                </div>
                                            </Modal>
                                        </th>
                                    </tr>
                                ))
                            )}
                        </tbody>
                    </table>
                </div>

                <div className="flex justify-between items-center bg-background py-5">
                    <Pagination>
                        <PaginationContent>
                            <PaginationItem>
                                <PaginationPrevious
                                    onClick={() => handlePageChange(currentPage - 1)}
                                    className={`${currentPage === 1 || paginationInfo.last_visible_page <= 1 ? "pointer-events-none opacity-50 cursor-default" : "cursor-pointer"}`}
                                />
                            </PaginationItem>

                            {paginationInfo.last_visible_page > 1 &&
                                getVisiblePages(currentPage, paginationInfo.last_visible_page).map((page, idx) => (
                                    <PaginationItem key={idx}>
                                        {page === 'ellipsis' ? (
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
                                ))
                            }

                            <PaginationItem>
                                <PaginationNext
                                    onClick={() => handlePageChange(currentPage + 1)}
                                    className={`${currentPage === paginationInfo.last_visible_page || paginationInfo.last_visible_page <= 1 ? "pointer-events-none opacity-50 cursor-default" : "cursor-pointer"}`}
                                />
                            </PaginationItem>
                        </PaginationContent>
                    </Pagination>
                </div>
            </div>
        </section>
    )
}

export default HistoryPage
