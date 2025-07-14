'use client'

import 'bootstrap-icons/font/bootstrap-icons.css'
import { SearchButton } from "@/app/components/search/page"
import { SelectDemo } from "@/app/components/select/page"
import { Pagination, PaginationContent, PaginationItem, PaginationLink, PaginationNext, PaginationPrevious } from "@/app/components/ui/pagination"
import { SelectItem, SelectLabel } from "@/app/components/ui/select"
import { ReactNode, useState } from "react"
import { Button } from '@/app/components/ui/button'

type dataSpecialLeaveType = {
    id: number,
    leaveTitle: string,
    gender: string,
    amount: number,
    leaveInformation: string,
    action: ReactNode
}

const SpecialLeavePage = () => {
    const [currentPage, setCurrentPage] = useState(1)
    const [isLoading, setIsLoading] = useState(false)
    const ITEMS_PER_PAGE = 7

    const dataSpecialLeave: dataSpecialLeaveType[] = [{
        id: 1,
        leaveTitle: "Marriage Leave",
        gender: "MF",
        amount: 3,
        leaveInformation: "Leave for employees after marriage.",
        action: <div className="flex justify-center items-center">
            <button className='p-1 px-1.5 cursor-pointer rounded-lg hover:bg-gray-300 transition'><i className="bi bi-pencil-square text-xl"></i></button>
            <button className='p-1 px-1.5 cursor-pointer rounded-lg hover:bg-gray-300 transition'><i className="bi bi-trash3-fill text-xl"></i></button>
        </div>
    },
    ]

    const totalPages = Math.ceil(dataSpecialLeave.length / ITEMS_PER_PAGE)
    const startIndex = (currentPage - 1) * ITEMS_PER_PAGE
    const currentData = dataSpecialLeave.slice(startIndex, startIndex + ITEMS_PER_PAGE)

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
                <SearchButton placeholder="Search Leave" />
                <div className="flex gap-3">
                    <SelectDemo placeholder="Gender">
                        <SelectLabel>Gender</SelectLabel>
                        <SelectItem value="M">Male</SelectItem>
                        <SelectItem value="F">Female</SelectItem>
                    </SelectDemo>
                    <Button><i className="bi bi-plus-circle-fill text-lg"></i>Add Special Leave</Button>
                </div>
            </section>

            <section className="relative p-3 min-h-[calc(100dvh-137px)]">
                <div className='max-sm:overflow-x-scroll'>
                    <table className="w-full table-auto rounded-t-2xl">
                        <thead className="border-b-[1.5px] border-[#0000001f] bg-[#f0f4f9] rounded-2xl shadow-2xl">
                            <tr>
                                <th className="p-3 text-[18px] font-semibold tracking-wide">No</th>
                                <th className="p-3 text-[18px] font-semibold tracking-wide">Leave Title</th>
                                <th className="p-3 text-[18px] font-semibold tracking-wide">Gender</th>
                                <th className="p-3 text-[18px] font-semibold tracking-wide">Amount</th>
                                <th className="p-3 text-[18px] font-semibold tracking-wide">Information</th>
                                <th className="p-3 text-[18px] font-semibold tracking-wide">Action</th>
                            </tr>
                        </thead>

                        <tbody className="cursor-pointer">
                            {isLoading ? (
                                Array.from({ length: ITEMS_PER_PAGE }).map((_, rowIdx) => (
                                    <tr key={rowIdx} className="animate-pulse odd:bg-[#e8efff] even:bg-[#f8faff]">
                                        {Array.from({ length: 6 }).map((_, colIdx) => (
                                            <th key={colIdx} className="p-3">
                                                <div className="h-4 bg-gray-300 rounded w-3/4 mx-auto" />
                                            </th>
                                        ))}
                                    </tr>
                                ))
                            ) : (
                                currentData.map((data, idx) => (
                                    <tr key={idx} className="odd:bg-[#e8efff] even:bg-[#f8faff] hover:bg-[#e3e7f0] transition-colors duration-300">
                                        <th className="p-2 text-[14px] font-medium border-b-[1.5px] border-[#0000001f]">{data.id}</th>
                                        <th className="p-2 text-[14px] font-medium border-b-[1.5px] border-[#0000001f]">{data.leaveTitle}</th>
                                        <th className="p-2 text-[14px] font-medium border-b-[1.5px] border-[#0000001f]">{data.gender}</th>
                                        <th className="p-2 text-[14px] font-medium border-b-[1.5px] border-[#0000001f]">{data.amount} Days</th>
                                        <th className="p-2 text-[14px] font-medium border-b-[1.5px] border-[#0000001f]">{data.leaveInformation}</th>
                                        <th className="p-2 text-[14px] font-medium border-b-[1.5px] border-[#0000001f]">{data.action}</th>
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
            </section>
        </>
    )
}

export default SpecialLeavePage