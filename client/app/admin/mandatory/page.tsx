'use client'

import 'bootstrap-icons/font/bootstrap-icons.css'
import { useEffect, useState, useCallback } from "react"
import { Pagination, PaginationContent, PaginationItem, PaginationLink, PaginationNext, PaginationPrevious } from '@/app/components/ui/pagination'
import { Switch } from "@/app/components/ui/switch"
import { AddMandatory } from '@/app/components/form/addMandatory'
import { EditMandatory } from '@/app/components/form/editMandatory'

type dataMandatoryLeaveType = {
    id_mandatory: string,
    title: string,
    duration: number,
    is_active: boolean,
    description: string,
}

const ITEMS_PER_PAGE = 7

const MandatoryLeavePage = () => {
    const [currentPage, setCurrentPage] = useState(1)
    const [isLoading, setIsLoading] = useState(false)
    const [dataMandatoryLeave, setDataMandatoryLeave] = useState<dataMandatoryLeaveType[]>([])
    const [totalPages, setTotalPages] = useState(1)
    const [search, setSearch] = useState("")
    const [debouncedSearch, setDebouncedSearch] = useState("")

    useEffect(() => {
        const handler = setTimeout(() => {
            setDebouncedSearch(search)
        }, 500)

        return () => {
            clearTimeout(handler)
        }
    }, [search])

    const fetchMandatoryLeaves = useCallback(async (page: number, searchTerm: string) => {
        setIsLoading(true)
        try {

            let url = `${process.env.NEXT_PUBLIC_API_BASE_URL}/leaves/mandatory`

            if (searchTerm) {
                url = `${process.env.NEXT_PUBLIC_API_BASE_URL}/leaves/mandatory/search?value=${searchTerm}`
            }

            url += `${searchTerm ? '&' : '?'}page=${page}&limit=${ITEMS_PER_PAGE}`

            const res = await fetch(url, {
                credentials: 'include',
            })

            if (!res.ok) {
                const errorData = await res.json()
                throw new Error(errorData.message || 'Failed to fetch special leaves')
            }

            const result = await res.json()

            setDataMandatoryLeave(result.data)
            setTotalPages(Math.ceil(result.total / ITEMS_PER_PAGE))

            if (page > Math.ceil(result.total / ITEMS_PER_PAGE) && Math.ceil(result.total / ITEMS_PER_PAGE) > 0) {
                setCurrentPage(Math.ceil(result.total / ITEMS_PER_PAGE))
            } else if (Math.ceil(result.total / ITEMS_PER_PAGE) === 0 && page !== 1) {
                setCurrentPage(1)
            }
        } catch (err: any) {
            console.error('Error fetching mandatory leaves:', err);
            console.log(err.message || 'An unknown error occurred while fetching data.')
        } finally {
            setIsLoading(false);
        }
    }, [ITEMS_PER_PAGE]);

    useEffect(() => {
        if (currentPage === 1) {
            fetchMandatoryLeaves(1, debouncedSearch)
        } else {
            setCurrentPage(1)
        }
    }, [debouncedSearch, fetchMandatoryLeaves])

    useEffect(() => {
        fetchMandatoryLeaves(currentPage, debouncedSearch);
    }, [currentPage, fetchMandatoryLeaves, debouncedSearch]);


    const handleFormSubmitSuccess = () => {
        fetchMandatoryLeaves(currentPage, debouncedSearch)
    }

    const handlePageChange = (page: number) => {
        if (page >= 1 && page <= totalPages) {
            setCurrentPage(page)
        }
    }

    return (
        <>
            <section className="relative p-3 min-h-[calc(100dvh-137px)]">
                <div className='flex justify-end items-center gap-3 mb-4'>
                    <div className="flex max-sm:w-full">
                        <input
                            type="text"
                            value={search}
                            onChange={(e) => {setSearch(e.target.value)}}
                            placeholder="Search..."
                            className="w-full px-4 py-2 border rounded-lg bg-gray-50 text-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
                        />
                    </div>
                    <div className="flex gap-3">
                        <AddMandatory onFormSubmit={handleFormSubmitSuccess} />
                    </div>
                </div>

                <div className="max-sm:overflow-x-scroll">
                    <table className="w-full table-auto rounded-t-2xl">
                        <thead className="border-b-[1.5px] border-[#0000001f] bg-[#f0f4f9] rounded-2xl shadow-lg">
                            <tr>
                                <th className="p-3 text-[18px] font-semibold tracking-wide">No</th>
                                <th className="p-3 text-[18px] font-semibold tracking-wide">Leave Title</th>
                                <th className="p-3 text-[18px] font-semibold tracking-wide">Amount</th>
                                <th className="p-3 text-[18px] font-semibold tracking-wide">Information</th>
                                <th className="p-3 text-[18px] font-semibold tracking-wide">Action</th>
                            </tr>
                        </thead>
                        <tbody className="cursor-pointer">
                            {isLoading ? (
                                Array.from({ length: ITEMS_PER_PAGE }).map((_, rowIdx) => (
                                    <tr key={rowIdx} className="animate-pulse odd:bg-[#e8efff] even:bg-[#f8faff]">
                                        {Array.from({ length: 5 }).map((_, colIdx) => (
                                            <th key={colIdx} className="p-3">
                                                <div className="h-4 bg-gray-300 rounded w-3/4 mx-auto" />
                                            </th>
                                        ))}
                                    </tr>
                                ))
                            ) : dataMandatoryLeave.length === 0 ? (
                                <tr>
                                    <td colSpan={5} className="p-4 text-center text-gray-500">
                                        No mandatory leaves found.
                                    </td>
                                </tr>
                            ) : (
                                dataMandatoryLeave.map((data, idx) => (
                                    <tr key={data.id_mandatory} className="odd:bg-[#e8efff] even:bg-[#f8faff] hover:bg-[#e3e7f0] transition-colors duration-300">
                                        <th className="p-2 text-[14px] font-medium border-b-[1.5px] border-[#0000001f]">{(currentPage - 1) * ITEMS_PER_PAGE + idx + 1}</th>
                                        <th className="p-2 text-[14px] font-medium border-b-[1.5px] border-[#0000001f]">{data.title}</th>
                                        <th className="p-2 text-[14px] font-medium border-b-[1.5px] border-[#0000001f]">{data.duration} Days</th>
                                        <th className="p-2 text-[14px] font-medium border-b-[1.5px] border-[#0000001f]">{data.description}</th>
                                        <th className="p-2 text-[14px] font-medium border-b-[1.5px] border-[#0000001f]">
                                            <div className="flex justify-center items-center gap-2">
                                                <EditMandatory initialData={data} onFormSubmit={handleFormSubmitSuccess} />
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
                                    className={`${currentPage === 1 || totalPages <= 1 ? "pointer-events-none opacity-50 cursor-default" : "cursor-pointer"}`}
                                />
                            </PaginationItem>

                            {totalPages > 1 && Array.from({ length: totalPages }, (_, i) => (
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
                                    className={`${currentPage === totalPages || totalPages <= 1 ? "pointer-events-none opacity-50 cursor-default" : "cursor-pointer"}`}
                                />
                            </PaginationItem>
                        </PaginationContent>
                    </Pagination>
                </div>
            </section>
        </>
    )
}

export default MandatoryLeavePage