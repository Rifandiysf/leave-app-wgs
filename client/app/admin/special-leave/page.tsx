'use client'

import 'bootstrap-icons/font/bootstrap-icons.css'
import { useEffect, useState, useCallback } from "react"
import {
    Pagination,
    PaginationContent,
    PaginationItem,
    PaginationLink,
    PaginationNext,
    PaginationPrevious
} from '@/app/components/ui/pagination'
import { Switch } from "@/app/components/ui/switch"
import { AddSpecial } from '@/app/components/form/addSpecial'
import { EditSpecial } from '@/app/components/form/editSpecial'

type dataSpecialLeaveType = {
    id_special: string,
    title: string,
    applicable_gender: string,
    duration: number,
    is_active: boolean,
    description: string,
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

const SpecialLeavePage = () => {
    const [currentPage, setCurrentPage] = useState(1)
    const [isLoading, setIsLoading] = useState(false)
    const [dataSpecialLeave, setDataSpecialLeave] = useState<dataSpecialLeaveType[]>([])
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

    const fetchSpecialLeaves = useCallback(async (page: number, searchTerm: string) => {
        setIsLoading(true)
        try {
            let url = `${process.env.NEXT_PUBLIC_API_BASE_URL}/leaves/special`

            if (searchTerm) {
                url = `${process.env.NEXT_PUBLIC_API_BASE_URL}/leaves/special/search?value=${searchTerm}`
            }

            url += `${searchTerm ? '&' : '?'}page=${page}&limit=${itemPerPage}`

            const res = await fetch(url, {
                credentials: 'include',
            })

            if (!res.ok) {
                const errorData = await res.json()
                throw new Error(errorData.message || 'Failed to fetch Special leaves')
            }

            const result = await res.json()

            setDataSpecialLeave(result.data)
            setPaginationInfo(result.pagination)

            if (page > result.pagination.last_visible_page && result.pagination.last_visible_page > 0) {
                setCurrentPage(result.pagination.last_visible_page)
            } else if (result.pagination.last_visible_page === 0 && page !== 1) {
                setCurrentPage(1)
            }

        } catch (err: any) {
            console.error('Error fetching Special leaves:', err)
        } finally {
            setIsLoading(false)
        }
    }, [])

    useEffect(() => {
        setCurrentPage(1)
    }, [debouncedSearch])

    useEffect(() => {
        fetchSpecialLeaves(currentPage, debouncedSearch)
    }, [currentPage, fetchSpecialLeaves, debouncedSearch])

    const handleFormSubmitSuccess = () => {
        fetchSpecialLeaves(currentPage, debouncedSearch)
    }

    const handlePageChange = (page: number) => {
        if (page >= 1 && page <= paginationInfo.last_visible_page) {
            setCurrentPage(page)
        }
    }

    return (
        <section className="relative p-3 min-h-[calc(100dvh-137px)] max-sm:mb-14">
            <div className='flex justify-end items-center gap-3 mb-4'>
                <div className="flex max-sm:w-full">
                    <input
                        type="text"
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        placeholder="Search..."
                        className="w-full px-4 py-2 border rounded-lg bg-gray-50 text-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
                    />
                </div>
                <div className="flex gap-3">
                    <AddSpecial onFormSubmit={handleFormSubmitSuccess} />
                </div>
            </div>

            <div className="max-sm:overflow-x-scroll">
                <table className="w-full table-auto rounded-t-2xl">
                    <thead className="border-b-[1.5px] border-[#0000001f] bg-[#f0f4f9] rounded-2xl shadow-lg">
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
                            Array.from({ length: paginationInfo.item.per_page }).map((_, rowIdx) => (
                                <tr key={rowIdx} className="animate-pulse odd:bg-[#e8efff] even:bg-[#f8faff]">
                                    {Array.from({ length: itemPerPage }).map((_, colIdx) => (
                                        <th key={colIdx} className="p-3">
                                            <div className="h-4 bg-gray-300 rounded w-3/4 mx-auto" />
                                        </th>
                                    ))}
                                </tr>
                            ))
                        ) : dataSpecialLeave.length === 0 ? (
                            <tr>
                                <td colSpan={6} className="p-4 text-center text-gray-500">
                                    No Special leaves found.
                                </td>
                            </tr>
                        ) : (
                            dataSpecialLeave.map((data, idx) => (
                                <tr key={data.id_special} className="odd:bg-[#e8efff] even:bg-[#f8faff] hover:bg-[#e3e7f0] transition-colors duration-300">
                                    <th className="p-2 text-[14px] font-medium border-b-[1.5px] border-[#0000001f]">
                                        {(paginationInfo.current_page - 1) * itemPerPage + idx + 1}
                                    </th>
                                    <th className="p-2 text-[14px] font-medium border-b-[1.5px] border-[#0000001f]">{data.title}</th>
                                    <th className="p-2 text-[14px] font-medium border-b-[1.5px] border-[#0000001f]">{data.applicable_gender}</th>
                                    <th className="p-2 text-[14px] font-medium border-b-[1.5px] border-[#0000001f]">{data.duration} Days</th>
                                    <th className="p-2 text-[14px] font-medium border-b-[1.5px] border-[#0000001f]">{data.description}</th>
                                    <th className="p-2 text-[14px] font-medium border-b-[1.5px] border-[#0000001f]">
                                        <div className="flex justify-center items-center gap-2">
                                            <EditSpecial initialData={data} onFormSubmit={handleFormSubmitSuccess} />
                                            <Switch checked={data.is_active} />
                                        </div>
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
                                className={`${currentPage === 1 || paginationInfo.last_visible_page <= 1 ? "pointer-events-none opacity-50 cursor-default" : "cursor-pointer"}`}
                            />
                        </PaginationItem>

                        {paginationInfo.last_visible_page > 1 &&
                            Array.from({ length: paginationInfo.last_visible_page }, (_, i) => (
                                <PaginationItem key={i}>
                                    <PaginationLink
                                        isActive={currentPage === i + 1}
                                        onClick={() => handlePageChange(i + 1)}
                                        className='cursor-pointer'
                                    >
                                        {i + 1}
                                    </PaginationLink>
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
        </section>
    )
}

export default SpecialLeavePage
