'use client'

import { ReactNode, useState } from "react"
import 'bootstrap-icons/font/bootstrap-icons.css'
import { Pagination, PaginationContent, PaginationItem, PaginationLink, PaginationNext, PaginationPrevious } from "@/app/components/ui/pagination"
import { SearchButton } from "@/app/components/search/page"
import { SelectDemo } from "@/app/components/select/page"
import { SelectItem, SelectLabel } from "@/app/components/ui/select"

type dataLeaveType = {
    nik: number,
    fullName: string,
    gender: string,
    lastYearLeave: number,
    thisYearLeave: number,
    leaveTotal: number,
    role: string,
    status: ReactNode
}

const DashboardPage = () => {
    const [currentPage, setCurrentPage] = useState(1)
    const [isLoading, setIsLoading] = useState(false)
    const ITEMS_PER_PAGE = 7

    const dataLeave: dataLeaveType[] = [{
        nik: 1234567890123456,
        fullName: "Admin WGS",
        gender: "M",
        lastYearLeave: 1,
        thisYearLeave: 11,
        leaveTotal: 12,
        role: "Tetap",
        status: <span className="text-[#00c41d] bg-[#82ff9544] p-2 px-3 rounded-full text-xs">ACTIVE</span>
    },{
        nik: 1234567890123456,
        fullName: "Admin WGS",
        gender: "M",
        lastYearLeave: 1,
        thisYearLeave: 11,
        leaveTotal: 12,
        role: "Tetap",
        status: <span className="text-[#00c41d] bg-[#82ff9544] p-2 px-3 rounded-full text-xs">ACTIVE</span>
    },{
        nik: 1234567890123456,
        fullName: "Admin WGS",
        gender: "M",
        lastYearLeave: 1,
        thisYearLeave: 11,
        leaveTotal: 12,
        role: "Tetap",
        status: <span className="text-[#00c41d] bg-[#82ff9544] p-2 px-3 rounded-full text-xs">ACTIVE</span>
    },{
        nik: 1234567890123456,
        fullName: "Admin WGS",
        gender: "M",
        lastYearLeave: 1,
        thisYearLeave: 11,
        leaveTotal: 12,
        role: "Tetap",
        status: <span className="text-[#00c41d] bg-[#82ff9544] p-2 px-3 rounded-full text-xs">ACTIVE</span>
    },{
        nik: 1234567890123456,
        fullName: "Admin WGS",
        gender: "M",
        lastYearLeave: 1,
        thisYearLeave: 11,
        leaveTotal: 12,
        role: "Tetap",
        status: <span className="text-[#00c41d] bg-[#82ff9544] p-2 px-3 rounded-full text-xs">ACTIVE</span>
    },{
        nik: 1234567890123456,
        fullName: "Admin WGS",
        gender: "M",
        lastYearLeave: 1,
        thisYearLeave: 11,
        leaveTotal: 12,
        role: "Tetap",
        status: <span className="text-[#00c41d] bg-[#82ff9544] p-2 px-3 rounded-full text-xs">ACTIVE</span>
    },{
        nik: 1234567890123456,
        fullName: "Admin WGS",
        gender: "M",
        lastYearLeave: 1,
        thisYearLeave: 11,
        leaveTotal: 12,
        role: "Tetap",
        status: <span className="text-[#00c41d] bg-[#82ff9544] p-2 px-3 rounded-full text-xs">ACTIVE</span>
    },{
        nik: 1234567890123456,
        fullName: "Admin WGS",
        gender: "M",
        lastYearLeave: 1,
        thisYearLeave: 11,
        leaveTotal: 12,
        role: "Tetap",
        status: <span className="text-[#00c41d] bg-[#82ff9544] p-2 px-3 rounded-full text-xs">ACTIVE</span>
    },
    ]

    const totalPages = Math.ceil(dataLeave.length / ITEMS_PER_PAGE)
    const startIndex = (currentPage - 1) * ITEMS_PER_PAGE
    const currentData = dataLeave.slice(startIndex, startIndex + ITEMS_PER_PAGE)

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
                <SearchButton placeholder="Search Employee" />
                <div className="flex gap-3">
                    <SelectDemo placeholder="Gender">
                        <SelectLabel>Gender</SelectLabel>
                        <SelectItem value="M">Male</SelectItem>
                        <SelectItem value="F">Female</SelectItem>
                    </SelectDemo>
                    <SelectDemo placeholder="Status">
                        <SelectLabel>Status</SelectLabel>
                        <SelectItem value="active">Active</SelectItem>
                        <SelectItem value="resign">Resign</SelectItem>
                    </SelectDemo>
                    <SelectDemo placeholder="Role">
                        <SelectLabel>Role</SelectLabel>
                        <SelectItem value="Permanent">Permanent</SelectItem>
                        <SelectItem value="contract">Contract</SelectItem>
                        <SelectItem value="interns">Interns</SelectItem>
                    </SelectDemo>
                </div>
            </section>

            <section className="relative p-3 min-h-[calc(100dvh-137px)]">
                <table className="w-full table-auto rounded-t-2xl">
                    <thead className="border-b-[1.5px] border-[#0000001f] bg-[#f0f4f9] rounded-2xl shadow-2xl">
                        <tr>
                            <th className="p-3 text-[18px] font-semibold tracking-wide">NIK</th>
                            <th className="p-3 text-[18px] font-semibold tracking-wide">Name</th>
                            <th className="p-3 text-[18px] font-semibold tracking-wide">Gender</th>
                            <th className="p-3 text-[18px] font-semibold tracking-wide">Last Year Leave</th>
                            <th className="p-3 text-[18px] font-semibold tracking-wide">This Year Leave</th>
                            <th className="p-3 text-[18px] font-semibold tracking-wide">Leave Total</th>
                            <th className="p-3 text-[18px] font-semibold tracking-wide">Role</th>
                            <th className="p-3 text-[18px] font-semibold tracking-wide">Status</th>
                        </tr>
                    </thead>

                    <tbody className="cursor-pointer">
                        {isLoading ? (
                            Array.from({ length: ITEMS_PER_PAGE }).map((_, rowIdx) => (
                                <tr key={rowIdx} className="animate-pulse odd:bg-[#e8efff] even:bg-[#f8faff]">
                                    {Array.from({ length: 8 }).map((_, colIdx) => (
                                        <th key={colIdx} className="p-3">
                                            <div className="h-4 bg-gray-300 rounded w-3/4 mx-auto" />
                                        </th>
                                    ))}
                                </tr>
                            ))
                        ) : (
                            currentData.map((data, idx) => (
                                <tr key={idx} className="odd:bg-[#e8efff] even:bg-[#f8faff] hover:bg-[#e3e7f0] transition-colors duration-300">
                                    <th className="p-2 text-[14px] font-medium border-b-[1.5px] border-[#0000001f]">{data.nik}</th>
                                    <th className="p-2 text-[14px] font-medium border-b-[1.5px] border-[#0000001f]">{data.fullName}</th>
                                    <th className="p-2 text-[14px] font-medium border-b-[1.5px] border-[#0000001f]">{data.gender}</th>
                                    <th className="p-2 text-[14px] font-medium border-b-[1.5px] border-[#0000001f]">{data.lastYearLeave}</th>
                                    <th className="p-2 text-[14px] font-medium border-b-[1.5px] border-[#0000001f]">{data.thisYearLeave}</th>
                                    <th className="p-2 text-[14px] font-medium border-b-[1.5px] border-[#0000001f]">{data.leaveTotal}</th>
                                    <th className="p-2 text-[14px] font-medium border-b-[1.5px] border-[#0000001f]">{data.role}</th>
                                    <th className="p-2 text-[14px] font-medium border-b-[1.5px] border-[#0000001f]">{data.status}</th>
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

export default DashboardPage