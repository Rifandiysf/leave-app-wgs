'use client'

import 'bootstrap-icons/font/bootstrap-icons.css'
import { Pagination, PaginationContent, PaginationItem, PaginationLink, PaginationNext, PaginationPrevious } from "@/app/components/ui/pagination"
import { SearchButton } from "@/app/components/search/page"
import { SelectDemo } from "@/app/components/select/page"
import { SelectItem, SelectLabel } from "@/app/components/ui/select"
import { ReactNode, useState } from 'react'
import Modal from '@/app/components/Modal/Modal'

type dataListOfLeaveType = {
    name: string,
    type: string,
    startLeave: string,
    endLeave: string,
    leaveUsed: number,
    status: ReactNode,
    action: ReactNode
}

const ListOfLeavePage = () => {
    const [currentPage, setCurrentPage] = useState(1)
    const [isLoading, setIsLoading] = useState(false)
    const ITEMS_PER_PAGE = 7

    const dataListOfLeave: dataListOfLeaveType[] = [{
        name: "Admin WGS",
        type: "Mandatory",
        startLeave: "2 July 2025",
        endLeave: "3 July 2025",
        leaveUsed: 2,
        status: <span className="text-[#00c41d] bg-[#82ff9544] p-2 px-3 rounded-full text-xs">ACTIVE</span>,
        action: <div className="flex justify-center items-center">
            <button className='p-1 px-1.5 cursor-pointer rounded-xl hover:bg-gray-300 transition'>
                <i className="bi bi-check2-circle text-xl"></i>
            </button>
            <button className='py-1 px-1.5 cursor-pointer rounded-xl hover:bg-gray-300 transition'>
                <i className="bi bi-x-circle text-xl"></i>
            </button>
        </div>
    },
    ]

    const totalPages = Math.ceil(dataListOfLeave.length / ITEMS_PER_PAGE)
    const startIndex = (currentPage - 1) * ITEMS_PER_PAGE
    const currentData = dataListOfLeave.slice(startIndex, startIndex + ITEMS_PER_PAGE)

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
            <section className="flex justify-end items-center p-5 border-b-[1.5px] border-[#0000001f]">
                <SearchButton placeholder='Search Leave' />
                <div className="flex gap-3">
                    <SelectDemo placeholder="Type">
                        <SelectLabel>Type</SelectLabel>
                        <SelectItem value="personal">Personal</SelectItem>
                        <SelectItem value="mandatory">Mandatory</SelectItem>
                        <SelectItem value="spesial">Spesial</SelectItem>
                        <SelectItem value="optional">Optional</SelectItem>
                    </SelectDemo>
                    <SelectDemo placeholder="Status">
                        <SelectLabel>Status</SelectLabel>
                        <SelectItem value="active">Active</SelectItem>
                        <SelectItem value="resign">Resign</SelectItem>
                    </SelectDemo>
                </div>
            </section>

            <section className="relative p-3 min-h-[calc(100dvh-137px)]">
                <table className="w-full table-auto rounded-t-2xl">
                    <thead className="border-b-[1.5px] border-[#0000001f] bg-[#f0f4f9] rounded-2xl shadow-2xl">
                        <tr>
                            <th className="p-3 text-[18px] font-semibold tracking-wide">Name</th>
                            <th className="p-3 text-[18px] font-semibold tracking-wide">Type</th>
                            <th className="p-3 text-[18px] font-semibold tracking-wide">Start Leave</th>
                            <th className="p-3 text-[18px] font-semibold tracking-wide">End Leave</th>
                            <th className="p-3 text-[18px] font-semibold tracking-wide">Leave Used</th>
                            <th className="p-3 text-[18px] font-semibold tracking-wide">Status</th>
                            <th className="p-3 text-[18px] font-semibold tracking-wide">Action</th>
                        </tr>
                    </thead>

                    <tbody className="cursor-pointer">
                        {isLoading ? (
                            Array.from({ length: ITEMS_PER_PAGE }).map((_, rowIdx) => (
                                <tr key={rowIdx} className="animate-pulse odd:bg-[#e8efff] even:bg-[#f8faff]">
                                    {Array.from({ length: 7 }).map((_, colIdx) => (
                                        <th key={colIdx} className="p-3">
                                            <div className="h-4 bg-gray-300 rounded w-3/4 mx-auto" />
                                        </th>
                                    ))}
                                </tr>
                            ))
                        ) : (
                            currentData.map((data, idx) => (
                                <tr key={idx} className="odd:bg-[#e8efff] even:bg-[#f8faff] hover:bg-[#e3e7f0] transition-colors duration-300">
                                    <th className="p-2 text-[14px] font-medium border-b-[1.5px] border-[#0000001f]">{data.name}</th>
                                    <th className="p-2 text-[14px] font-medium border-b-[1.5px] border-[#0000001f]">{data.type}</th>
                                    <th className="p-2 text-[14px] font-medium border-b-[1.5px] border-[#0000001f]">{data.startLeave}</th>
                                    <th className="p-2 text-[14px] font-medium border-b-[1.5px] border-[#0000001f]">{data.endLeave}</th>
                                    <th className="p-2 text-[14px] font-medium border-b-[1.5px] border-[#0000001f]">{data.leaveUsed}</th>
                                    <th className="p-2 text-[14px] font-medium border-b-[1.5px] border-[#0000001f]">{data.status}</th>
                                    <th className="p-2 text-[14px] font-medium border-b-[1.5px] border-[#0000001f]">
                                        <Modal
                                            mode='confirm'
                                            size='icon'
                                            variant='ghost'
                                            title='Accept Request'
                                            description="Are you sure want to accept this request leave?"
                                            triggerLabel={<i className="bi bi-check2-circle text-xl"></i>}
                                        />
                                        <Modal
                                            mode='reject'
                                            size='icon'
                                            variant='ghost'
                                            title='Reject Request'
                                            description='Are you sure want to reject this request leave?'
                                            triggerLabel={<i className="bi bi-x-circle text-xl"></i>}
                                        />
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

export default ListOfLeavePage