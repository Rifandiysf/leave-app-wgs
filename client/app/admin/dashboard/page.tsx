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
    }, {
        nik: 1234567890123456,
        fullName: "Admin WGS",
        gender: "M",
        lastYearLeave: 1,
        thisYearLeave: 11,
        leaveTotal: 12,
        role: "Tetap",
        status: <span className="text-[#00c41d] bg-[#82ff9544] p-2 px-3 rounded-full text-xs">ACTIVE</span>
    }, {
        nik: 1234567890123456,
        fullName: "Admin WGS",
        gender: "M",
        lastYearLeave: 1,
        thisYearLeave: 11,
        leaveTotal: 12,
        role: "Tetap",
        status: <span className="text-[#00c41d] bg-[#82ff9544] p-2 px-3 rounded-full text-xs">ACTIVE</span>
    }, {
        nik: 1234567890123456,
        fullName: "Admin WGS",
        gender: "M",
        lastYearLeave: 1,
        thisYearLeave: 11,
        leaveTotal: 12,
        role: "Tetap",
        status: <span className="text-[#00c41d] bg-[#82ff9544] p-2 px-3 rounded-full text-xs">ACTIVE</span>
    }, {
        nik: 1234567890123456,
        fullName: "Admin WGS",
        gender: "M",
        lastYearLeave: 1,
        thisYearLeave: 11,
        leaveTotal: 12,
        role: "Tetap",
        status: <span className="text-[#00c41d] bg-[#82ff9544] p-2 px-3 rounded-full text-xs">ACTIVE</span>
    }, {
        nik: 1234567890123456,
        fullName: "Admin WGS",
        gender: "M",
        lastYearLeave: 1,
        thisYearLeave: 11,
        leaveTotal: 12,
        role: "Tetap",
        status: <span className="text-[#00c41d] bg-[#82ff9544] p-2 px-3 rounded-full text-xs">ACTIVE</span>
    }, {
        nik: 1234567890123456,
        fullName: "Admin WGS",
        gender: "M",
        lastYearLeave: 1,
        thisYearLeave: 11,
        leaveTotal: 12,
        role: "Tetap",
        status: <span className="text-[#00c41d] bg-[#82ff9544] p-2 px-3 rounded-full text-xs">ACTIVE</span>
    }, {
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
                <div className="max-sm:o overflow-x-scroll">
                    <table className="w-full text-base text-center">
                        <thead className="text-black bg-[#F0f4f9] backdrop-blur-sm">
                            <tr className="text-base">
                                <th className="p-3 align-middle font-semibold">NIK</th>
                                <th className="p-3 align-middle font-semibold">Name</th>
                                <th className="p-3 align-middle font-semibold">Gender</th>
                                <th className="p-3 align-middle font-semibold">Last Year Leave</th>
                                <th className="p-3 align-middle font-semibold">This Year Leave</th>
                                <th className="p-3 align-middle font-semibold">Leave Total</th>
                                <th className="p-3 align-middle font-semibold">Role</th>
                                <th className="p-3 align-middle font-semibold">Status</th>
                            </tr>
                        </thead>
                        <tbody className=" ">
                            {isLoading ? (
                                Array.from({ length: ITEMS_PER_PAGE }).map((_, rowIdx) => (
                                    <tr key={rowIdx} className={rowIdx % 2 === 0 ? 'bg-white' : 'bg-gray-100 animate-pulse'}>
                                        {Array.from({ length: 8 }).map((_, colIdx) => (
                                            <td key={colIdx} className="p-3 align-middle">
                                                <div className="h-4 bg-gray-300 rounded w-3/4 mx-auto" />
                                            </td>
                                        ))}
                                    </tr>
                                ))
                            ) : (
                                currentData.map((data, idx) => (
                                    <tr key={idx} className="odd:bg-[#e8efff] even:bg-[#f8faff]">
                                        <td className="p-3 align-middle">{data.nik}</td>
                                        <td className="p-3 align-middle">{data.fullName}</td>
                                        <td className="p-3 align-middle">{data.gender}</td>
                                        <td className="p-3 align-middle">{data.lastYearLeave}</td>
                                        <td className="p-3 align-middle">{data.thisYearLeave}</td>
                                        <td className="p-3 align-middle">{data.leaveTotal}</td>
                                        <td className="p-3 align-middle">{data.role}</td>
                                        <td className="p-3 align-middle">{data.status}</td>
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

export default DashboardPage