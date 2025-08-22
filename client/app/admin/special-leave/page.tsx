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
import { formatUpperCase } from '@/lib/format'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "@/app/components/ui/dialog"
import { Button } from "@/app/components/ui/button"
import { updateSpecialLeaveStatus } from '@/lib/api/service/leave'

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
    const [selectedSwitch, setSelectedSwitch] = useState<{ id: string, currentStatus: boolean } | null>(null)
    const [isModalOpen, setIsModalOpen] = useState(false)
    const [isUpdating, setIsUpdating] = useState(false)

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

            const res = await fetch(url, { credentials: 'include' })

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

    const handleSwitchClick = (id: string, currentStatus: boolean) => {
        setSelectedSwitch({ id, currentStatus })
        setIsModalOpen(true)
    }

    const handleConfirmToggle = async () => {
        if (!selectedSwitch) return

        setIsUpdating(true)
        try {
            await updateSpecialLeaveStatus(selectedSwitch.id, !selectedSwitch.currentStatus)
            setIsModalOpen(false)
            setSelectedSwitch(null)
            fetchSpecialLeaves(currentPage, debouncedSearch)
        } catch (error) {
            console.error(error)
        } finally {
            setIsUpdating(false)
        }
    }

    return (
        <section className="relative p-3 min-h-[calc(100dvh-137px)] max-sm:mb-14">
            <div className='flex justify-between items-center gap-3 mb-4'>
                <h1 className="text-2xl font-bold text-foreground">Special Leave</h1>
                <div className="flex items-center gap-3">
                    <div className="flex">
                        <input
                            type="text"
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                            placeholder="Search..."
                            className="w-full px-4 py-2 border rounded-lg bg-gray-50 text-foreground dark:bg-card text-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
                        />
                    </div>
                    <div className="flex">
                        <AddSpecial onFormSubmit={handleFormSubmitSuccess} />
                    </div>
                </div>
            </div>
            <div className='w-full border-border rounded-md overflow-hidden'>
                <div className="overflow-x-auto">
                    <table className="w-full min-w-max text-sm">
                        <thead className="border-b-[1.5px] border-border bg-[#f0f4f9] dark:bg-card">
                            <tr>
                                <th className="p-3 font-semibold text-center">No</th>
                                <th className="p-3 font-semibold text-center">Leave Title</th>
                                <th className="p-3 font-semibold text-center">Gender</th>
                                <th className="p-3 font-semibold text-center">Amount</th>
                                <th className="p-3 font-semibold text-center">Information</th>
                                <th className="p-3 font-semibold text-center">Action</th>
                            </tr>
                        </thead>
                        <tbody className="cursor-pointer">
                            {isLoading ? (
                                Array.from({ length: itemPerPage }).map((_, rowIdx) => (
                                    <tr key={rowIdx} className="animate-pulse">
                                        {Array.from({ length: 6 }).map((_, colIdx) => (
                                            <td key={colIdx} className="p-4">
                                                <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-3/4 mx-auto" />
                                            </td>
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
                                    <tr key={data.id_special} className="odd:bg-[#e8efff] even:bg-[#f8faff] hover:bg-[#e3e7f0] odd:dark:bg-card/30 even:dark:bg-card/70 transition-colors duration-300">
                                        <td className="p-2 text-center border-b-[1.5px] border-black/10">
                                            {(paginationInfo.current_page - 1) * itemPerPage + idx + 1}
                                        </td>
                                        <td className="p-2 text-center border-b-[1.5px] border-black/10">{data.title}</td>
                                        <td className="p-2 text-center border-b-[1.5px] border-black/10">{formatUpperCase(data.applicable_gender)}</td>
                                        <td className="p-2 text-center border-b-[1.5px] border-black/10">{data.duration} Days</td>
                                        <td className="p-2 text-center border-b-[1.5px] border-black/10">{data.description}</td>
                                        <td className="p-2 text-center border-b-[1.5px] border-black/10">
                                            <div className="flex justify-center items-center gap-2">
                                                <EditSpecial initialData={data} onFormSubmit={handleFormSubmitSuccess} />
                                                <Switch checked={data.is_active} onClick={() => handleSwitchClick(data.id_special, data.is_active)} />
                                            </div>
                                        </td>
                                    </tr>
                                ))
                            )}
                        </tbody>
                    </table>
                </div>
            </div>

            <div className="flex justify-center items-center py-5">
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
                                            onClick={() => handlePageChange(page as number)}
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

            <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>Confirm Update Action</DialogTitle>
                        <DialogDescription>
                            Are you sure you want to {selectedSwitch?.currentStatus ? 'disable' : 'enable'} this leave?
                        </DialogDescription>
                    </DialogHeader>
                    <DialogFooter className="flex justify-end gap-2">
                        <Button variant="outline" onClick={() => setIsModalOpen(false)} disabled={isUpdating}>
                            Cancel
                        </Button>
                        <Button onClick={handleConfirmToggle} disabled={isUpdating} className='text-black'>
                            {isUpdating ? 'Updating...' : 'Confirm'}
                        </Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </section>
    )
}

export default SpecialLeavePage