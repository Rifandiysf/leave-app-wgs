'use client'

import { ReactNode, useState } from "react"
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
import withAuth from "@/lib/auth/withAuth"

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
        // Tambahkan item lainnya sesuai kebutuhan
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
        <section className="flex flex-col relative p-3 min-h-[calc(100dvh-137px)]">
            <div>
                <div className="text-center">
                    <h1 className="text-3xl font-bold text-gray-800">History Leave</h1>
                </div>
                <div className="my-6 h-px bg-gray-200" />
            </div>

            <div className="flex justify-end items-center mb-4 w-72 max-sm:w-full">
                <input
                    type="text"
                    placeholder="Search..."
                    className="w-full px-4 py-2 border rounded-lg bg-gray-50 text-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
                />
            </div>

            <div className="">
                <div className="max-sm:overflow-x-scroll">
                    <table className="w-full min-w-max">
                        <thead className="border-b-[1.5px] border-[#0000001f] bg-[#f0f4f9] rounded-2xl shadow-2xl">
                            <tr>
                                <th className="p-3 text-[16px] sm:text-[18px] font-semibold">Status</th>
                                <th className="p-3 text-[16px] sm:text-[18px] font-semibold">Type</th>
                                <th className="p-3 text-[16px] sm:text-[18px] font-semibold">Start Leave</th>
                                <th className="p-3 text-[16px] sm:text-[18px] font-semibold">End Leave</th>
                                <th className="p-3 text-[16px] sm:text-[18px] font-semibold">Leave Usage</th>
                                <th className="p-3 text-[16px] sm:text-[18px] font-semibold">Reason</th>
                                <th className="p-3 text-[16px] sm:text-[18px] font-semibold">Note</th>
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
                                        <th className="p-2 text-sm sm:text-[14px] font-medium border-b">{data.status}</th>
                                        <th className="p-2 text-sm sm:text-[14px] font-medium border-b">{data.type}</th>
                                        <th className="p-2 text-sm sm:text-[14px] font-medium border-b">{data.startLeave}</th>
                                        <th className="p-2 text-sm sm:text-[14px] font-medium border-b">{data.endLeave}</th>
                                        <th className="p-2 text-sm sm:text-[14px] font-medium border-b">{data.leaveUsage}</th>
                                        <th className="p-2 text-sm sm:text-[14px] font-medium border-b">{data.reason}</th>
                                        <th className="p-2 text-sm sm:text-[14px] font-medium border-b">
                                            <Modal
                                                mode="info"
                                                size="icon"
                                                variant="ghost"
                                                title="Information"
                                                triggerLabel={data.note}
                                                description=""
                                                showFooter
                                            >
                                                <h2>Approve By Dia</h2>
                                            </Modal>
                                        </th>
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
            </div>
        </section>
    )
}

export default withAuth(HistoryPage)
