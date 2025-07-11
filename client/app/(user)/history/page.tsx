'use client'

import { ReactNode, useState } from "react"
import 'bootstrap-icons/font/bootstrap-icons.css'
import { SearchButton } from "../../components/search/page"
import { SelectDemo } from "../../components/select/page"
import { SelectItem, SelectLabel } from "../../components/ui/select"
import {
    Pagination,
    PaginationContent,
    PaginationItem,
    PaginationLink,
    PaginationNext,
    PaginationPrevious
} from "../../components/ui/pagination"
import Modal from "@/app/components/Modal/Modal"

type LeaveHistoryType = {
    status: ReactNode
    type: string
    startLeave: string
    endLeave: string
    leaveUsage: string
    reason: string
    note: ReactNode
}

const HistoryPage = () => {
    const [currentPage, setCurrentPage] = useState(1)
    const [isLoading, setIsLoading] = useState(false)
    const ITEMS_PER_PAGE = 7

    const HistoryLeave: LeaveHistoryType[] = [
        {
            status: <span className="text-[#d39b02] bg-[#ffcf494b] p-2 px-3 rounded-full text-xs">WAITING</span>,
            type: "Personal",
            startLeave: "15 January 2025",
            endLeave: "16 January 2025",
            leaveUsage: "2 day(s)",
            reason: "Family",
            note: <i className="bi bi-exclamation-circle-fill text-2xl cursor-pointer"></i>
        },
        {
            status: <span className="text-[#ca0000] bg-[#ff5f5f77] p-2 px-3 rounded-full text-xs">REJECT</span>,
            type: "Mandatory",
            startLeave: "15 January 2025",
            endLeave: "16 January 2025",
            leaveUsage: "2 day(s)",
            reason: "Family",
            note: <i className="bi bi-exclamation-circle-fill text-2xl cursor-pointer"></i>
        },
        {
            status: <span className="text-[#00c41d] bg-[#82ff9544] p-2 px-3 rounded-full text-xs">APPROVE</span>,
            type: "Personal",
            startLeave: "15 January 2025",
            endLeave: "16 January 2025",
            leaveUsage: "2 day(s)",
            reason: "Family",
            note: <i className="bi bi-exclamation-circle-fill text-2xl cursor-pointer"></i>
        },
        {
            status: <span className="text-[#d39b02] bg-[#ffcf494b] p-2 px-3 rounded-full text-xs">WAITING</span>,
            type: "Personal",
            startLeave: "15 January 2025",
            endLeave: "16 January 2025",
            leaveUsage: "2 day(s)",
            reason: "Family",
            note: <i className="bi bi-exclamation-circle-fill text-2xl cursor-pointer"></i>
        },
        {
            status: <span className="text-[#d39b02] bg-[#ffcf494b] p-2 px-3 rounded-full text-xs">WAITING</span>,
            type: "Spesial",
            startLeave: "15 January 2025",
            endLeave: "16 January 2025",
            leaveUsage: "2 day(s)",
            reason: "Family",
            note: <i className="bi bi-exclamation-circle-fill text-2xl cursor-pointer"></i>
        },
        {
            status: <span className="text-[#ca0000] bg-[#ff5f5f77] p-2 px-3 rounded-full text-xs">REJECT</span>,
            type: "Mandatory",
            startLeave: "15 January 2025",
            endLeave: "16 January 2025",
            leaveUsage: "2 day(s)",
            reason: "Family",
            note: <i className="bi bi-exclamation-circle-fill text-2xl cursor-pointer"></i>
        },
        {
            status: <span className="text-[#00c41d] bg-[#82ff9544] p-2 px-3 rounded-full text-xs">APPROVE</span>,
            type: "Personal",
            startLeave: "15 January 2025",
            endLeave: "16 January 2025",
            leaveUsage: "2 day(s)",
            reason: "Family",
            note: <i className="bi bi-exclamation-circle-fill text-2xl cursor-pointer"></i>
        },
        {
            status: <span className="text-[#d39b02] bg-[#ffcf494b] p-2 px-3 rounded-full text-xs">WAITING</span>,
            type: "Personal",
            startLeave: "15 January 2025",
            endLeave: "16 January 2025",
            leaveUsage: "2 day(s)",
            reason: "Family",
            note: <i className="bi bi-exclamation-circle-fill text-2xl cursor-pointer"></i>
        },
        {
            status: <span className="text-[#d39b02] bg-[#ffcf494b] p-2 px-3 rounded-full text-xs">WAITING</span>,
            type: "Spesial",
            startLeave: "15 January 2025",
            endLeave: "16 January 2025",
            leaveUsage: "2 day(s)",
            reason: "Family",
            note: <i className="bi bi-exclamation-circle-fill text-2xl cursor-pointer"></i>
        },
        {
            status: <span className="text-[#ca0000] bg-[#ff5f5f77] p-2 px-3 rounded-full text-xs">REJECT</span>,
            type: "Mandatory",
            startLeave: "15 January 2025",
            endLeave: "16 January 2025",
            leaveUsage: "2 day(s)",
            reason: "Family",
            note: <i className="bi bi-exclamation-circle-fill text-2xl cursor-pointer"></i>
        },
        {
            status: <span className="text-[#00c41d] bg-[#82ff9544] p-2 px-3 rounded-full text-xs">APPROVE</span>,
            type: "Personal",
            startLeave: "15 January 2025",
            endLeave: "16 January 2025",
            leaveUsage: "2 day(s)",
            reason: "Family",
            note: <i className="bi bi-exclamation-circle-fill text-2xl cursor-pointer"></i>
        },
    ]

    const totalPages = Math.ceil(HistoryLeave.length / ITEMS_PER_PAGE)
    const startIndex = (currentPage - 1) * ITEMS_PER_PAGE
    const currentData = HistoryLeave.slice(startIndex, startIndex + ITEMS_PER_PAGE)

    const handlePageChange = (page: number) => {
        if (page >= 1 && page <= totalPages) {
            setIsLoading(true)
            setTimeout(() => {
                setCurrentPage(page)
                setIsLoading(false)
            }, 600)
        }
    }

    return (
        <>
            <section className="flex max-sm:flex-col justify-end max-sm:justify-center items-center gap-3 max-sm: p-5 border-b-[1.5px] border-[#0000001f]">
                <SearchButton placeholder="Search Leave" />
                <SelectDemo placeholder="Status" className="">
                    <SelectLabel>Status</SelectLabel>
                    <SelectItem value="approve">Approve</SelectItem>
                    <SelectItem value="waiting">Waiting</SelectItem>
                    <SelectItem value="reject">Reject</SelectItem>
                </SelectDemo>
            </section>

            <section className="relative p-3 min-h-[calc(100dvh-137px)]">
                <table className="w-full min-w-max rounded-t-2xl">
                    <thead className="border-b-[1.5px] border-[#0000001f] bg-[#f0f4f9] rounded-2xl shadow-2xl">
                        <tr>
                            <th className="p-3 text-[16px] sm:text-[18px] font-semibold tracking-wide whitespace-nowrap">Status</th>
                            <th className="p-3 text-[16px] sm:text-[18px] font-semibold tracking-wide whitespace-nowrap">Type</th>
                            <th className="p-3 text-[16px] sm:text-[18px] font-semibold tracking-wide whitespace-nowrap">Start Leave</th>
                            <th className="p-3 text-[16px] sm:text-[18px] font-semibold tracking-wide whitespace-nowrap">End Leave</th>
                            <th className="p-3 text-[16px] sm:text-[18px] font-semibold tracking-wide whitespace-nowrap">Leave Usage</th>
                            <th className="p-3 text-[16px] sm:text-[18px] font-semibold tracking-wide whitespace-nowrap">Reason</th>
                            <th className="p-3 text-[16px] sm:text-[18px] font-semibold tracking-wide whitespace-nowrap">Note</th>
                        </tr>
                    </thead>
                    <tbody className="cursor-pointer">
                        {isLoading ? (
                            Array.from({ length: ITEMS_PER_PAGE }).map((_, rowIdx) => (
                                <tr key={rowIdx} className="animate-pulse odd:bg-[#e8efff] even:bg-[#f8faff]">
                                    {Array.from({ length: 7 }).map((_, colIdx) => (
                                        <th key={colIdx} className="p-2 sm:p-3">
                                            <div className="h-4 bg-gray-300 rounded w-3/4 mx-auto" />
                                        </th>
                                    ))}
                                </tr>
                            ))
                        ) : (
                            currentData.map((data, idx) => (
                                <tr key={idx} className="odd:bg-[#e8efff] even:bg-[#f8faff] hover:bg-[#e3e7f0] transition-colors duration-300">
                                    <th className="p-2 text-sm sm:text-[14px] font-medium border-b-[1.5px] border-[#0000001f]">{data.status}</th>
                                    <th className="p-2 text-sm sm:text-[14px] font-medium border-b-[1.5px] border-[#0000001f]">{data.type}</th>
                                    <th className="p-2 text-sm sm:text-[14px] font-medium border-b-[1.5px] border-[#0000001f]">{data.startLeave}</th>
                                    <th className="p-2 text-sm sm:text-[14px] font-medium border-b-[1.5px] border-[#0000001f]">{data.endLeave}</th>
                                    <th className="p-2 text-sm sm:text-[14px] font-medium border-b-[1.5px] border-[#0000001f]">{data.leaveUsage}</th>
                                    <th className="p-2 text-sm sm:text-[14px] font-medium border-b-[1.5px] border-[#0000001f]">{data.reason}</th>
                                    <th className="p-2 text-sm sm:text-[14px] font-medium border-b-[1.5px] border-[#0000001f]">
                                        <Modal 
                                            mode="info" 
                                            size="icon" 
                                            variant="ghost" 
                                            title="Information" 
                                            triggerLabel={data.note} 
                                            description="" 
                                            showFooter>
                                                <h2>Approve By Dia</h2>
                                        </Modal>
                                    </th>
                                </tr>
                            ))
                        )}
                    </tbody>
                </table>

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
                                <PaginationItem key={i}>
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
    )
}

export default HistoryPage
