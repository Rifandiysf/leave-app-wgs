'use client'

import React, { useState, useEffect, useCallback } from "react";
import 'bootstrap-icons/font/bootstrap-icons.css';
import { debounce } from 'lodash';

import {
    Pagination,
    PaginationContent,
    PaginationItem,
    PaginationLink,
    PaginationNext,
    PaginationPrevious
} from "@/app/components/ui/pagination"; 
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from "@/app/components/ui/select"; // Pastikan path ini benar
import Modal from "@/app/components/ui/Modal/Modal"; 
import { Label } from "@/app/components/ui/label"; 


type HistoryLog = {
    NIK: string;
    name: string;
    adjustment_value: number;
    balance_year: string;
    date: string;
    time: string;
    actor: string;
    notes: string;
    id?: string; 
};

type PaginationInfo = {
    current_page: number;
    last_visible_page: number;
    has_next_page: boolean;
    item: {
        count: number;
        total: number;
        per_page: number;
    }
};

const itemPerPage = 10;
type PageItem = number | 'ellipsis';

const getVisiblePages = (current: number, total: number, maxVisible: number = 5): PageItem[] => {
    const pages: PageItem[] = [];
    if (total <= maxVisible + 2) {
        for (let i = 1; i <= total; i++) pages.push(i);
        return pages;
    }
    const half = Math.floor(maxVisible / 2);
    let start = Math.max(current - half, 2);
    let end = Math.min(current + half, total - 1);
    if (current <= half + 2) {
        start = 2;
        end = maxVisible;
    }
    if (current >= total - half - 1) {
        start = total - maxVisible + 1;
        end = total - 1;
    }
    pages.push(1);
    if (start > 2) pages.push('ellipsis');
    for (let i = start; i <= end; i++) {
        pages.push(i);
    }
    if (end < total - 1) pages.push('ellipsis');
    pages.push(total);
    return pages;
};


const AdjustHistoryPage = () => {
    const [history, setHistory] = useState<HistoryLog[]>([]);
    const [paginationInfo, setPaginationInfo] = useState<PaginationInfo>({
        current_page: 1,
        last_visible_page: 1,
        has_next_page: false,
        item: { count: 0, total: 0, per_page: itemPerPage }
    });
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    
    const [currentPage, setCurrentPage] = useState(1);
    const [searchTerm, setSearchTerm] = useState("");
    const [startDate, setStartDate] = useState("");
    const [endDate, setEndDate] = useState("");
    const [yearFilter, setYearFilter] = useState<string | null>(null);

    const fetchData = useCallback(async () => {
        setIsLoading(true);
        setError(null);
        try {
            const params = new URLSearchParams();
            params.append('page', currentPage.toString());
            params.append('limit', itemPerPage.toString());

            if (searchTerm) params.append('value', searchTerm);
            if (startDate) params.append('start', startDate);
            if (endDate) params.append('end', endDate);
            if (yearFilter) params.append('year', yearFilter);
            
            const url = `${process.env.NEXT_PUBLIC_API_BASE_URL}/balances/logs?${params.toString()}`;
            
            const response = await fetch(url, {
                method: 'GET',
                credentials: 'include',
            });


            if (!response.ok) {
                const errorData = await response.json().catch(() => ({ message: 'Failed to fetch adjustment history' }));
                throw new Error(errorData.message);
            }

            const result = await response.json();

            if (result.success) {
                setHistory(result.data || []);
                setPaginationInfo(result.pagination);
            } else {
                throw new Error(result.message || 'An unknown error occurred');
            }

        } catch (err: any) {
            console.error('Error fetching adjustment history:', err);
            setError(err.message);
            setHistory([]);
        } finally {
            setIsLoading(false);
        }
    }, [currentPage, searchTerm, startDate, endDate, yearFilter]);

    const debouncedFetchData = useCallback(debounce(fetchData, 500), [fetchData]);

    useEffect(() => {
        debouncedFetchData();
        return () => debouncedFetchData.cancel();
    }, [debouncedFetchData]);

    useEffect(() => {
        setCurrentPage(1);
    }, [searchTerm, startDate, endDate, yearFilter]);

    const handlePageChange = (page: number) => {
        if (page >= 1 && page <= paginationInfo.last_visible_page) {
            setCurrentPage(page);
        }
    };

    const paginationPages = getVisiblePages(currentPage, paginationInfo.last_visible_page);

    return (
        <section className="flex flex-col relative p-3 min-h-[calc(100dvh-137px)] max-sm:mb-14">
            {/* --- Header and Filters --- */}
           <div className='hidden md:flex justify-between items-center gap-3 mb-4'>
                <h1 className="text-2xl font-bold text-foreground">Adjust Hisory</h1>
                <div className="flex items-center gap-3">
                    <input
                        type="text"
                        placeholder="Search..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="w-full px-4 py-2 border rounded-lg bg-gray-50 text-foreground dark:bg-card text-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
                    />
                   
                    {/* Year Filter */}
                    <Select onValueChange={(value) => setYearFilter(value === 'all' ? null : value)}>
                        <SelectTrigger className="min-w-[120px]"><SelectValue placeholder="Year" /></SelectTrigger>
                        <SelectContent>
                            <SelectGroup>
                                <SelectLabel>Balance Year</SelectLabel>
                                <SelectItem value="all">All</SelectItem>
                                <SelectItem value="2026">2026</SelectItem>
                                <SelectItem value="2025">2025</SelectItem>
                                <SelectItem value="2024">2024</SelectItem>
                            </SelectGroup>
                        </SelectContent>
                    </Select>
                </div>
            </div>


          <div className='md:hidden flex flex-col gap-4 mb-4'>
                <h1 className="text-2xl font-bold text-foreground text-center">Adjust History </h1>
                <div className="flex items-center gap-3">
                    <input
                        type="text"
                        placeholder="Search..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="w-full px-4 py-2 border rounded-lg bg-gray-50 text-foreground dark:bg-card text-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
                    />
                   
                    {/* Year Filter */}
                    <Select onValueChange={(value) => setYearFilter(value === 'all' ? null : value)}>
                        <SelectTrigger className="min-w-[120px]"><SelectValue placeholder="Year" /></SelectTrigger>
                        <SelectContent>
                            <SelectGroup>
                                <SelectLabel>Balance Year</SelectLabel>
                                <SelectItem value="all">All</SelectItem>
                                <SelectItem value="2026">2026</SelectItem>
                                <SelectItem value="2025">2025</SelectItem>
                                <SelectItem value="2024">2024</SelectItem>
                            </SelectGroup>
                        </SelectContent>
                    </Select>
                </div>
            </div>

            {/* --- Table --- */}
            <div className="w-full border-border rounded-md overflow-hidden">
                <div className="overflow-x-auto">
                     <table className="w-full min-w-max text-sm">
                        <thead className="border-b-[1.5px] border-border bg-[#f0f4f9] dark:bg-card">
                            <tr>
                                <th className="p-3 font-semibold text-center">NIK</th>
                                <th className="p-3 font-semibold text-center">Name</th>
                                <th className="p-3 font-semibold text-center">Adjustment</th>
                                <th className="p-3 font-semibold text-center">Balance Year</th>
                                <th className="p-3 font-semibold text-center">Date</th>
                                <th className="p-3 font-semibold text-center">Time</th>
                                <th className="p-3 font-semibold text-center">Actor</th>
                                <th className="p-3 font-semibold text-center">Detail</th>
                            </tr>
                        </thead>
                        <tbody className="cursor-pointer">
                            {isLoading ? (
                                Array.from({ length: itemPerPage }).map((_, rowIdx) => (
                                    <tr key={rowIdx} className="animate-pulse">
                                        {Array.from({ length: 8 }).map((_, colIdx) => (
                                            <td key={colIdx} className="p-4"><div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-3/4 mx-auto" /></td>
                                        ))}
                                    </tr>
                                ))
                            ) : error ? (
                                <tr><td colSpan={8} className="p-4 text-center text-red-500">{error}</td></tr>
                            ) : history.length === 0 ? (
                                <tr><td colSpan={8} className="p-4 text-center text-gray-500">No adjustment history found.</td></tr>
                            ) : (
                                history.map((log, index) => (
                                    <tr key={log.id || `${log.NIK}-${index}`} className="odd:bg-[#e8efff] even:bg-[#f8faff] hover:bg-[#e3e7f0] odd:dark:bg-card/30 even:dark:bg-card/70 transition-colors duration-300">
                                        <td className="p-2 text-center border-b-[1.5px] border-[#0000001f]">{log.NIK}</td>
                                        <td className="p-2 text-center border-b-[1.5px] border-[#0000001f]">{log.name}</td>
                                        <td className="p-2 text-center border-b-[1.5px] border-[#0000001f]">{log.adjustment_value}</td>
                                        <td className="p-2 text-center border-b-[1.5px] border-[#0000001f]">{log.balance_year}</td>
                                        <td className="p-2 text-center border-b-[1.5px] border-[#0000001f]">{log.date}</td>
                                        <td className="p-2 text-center border-b-[1.5px] border-[#0000001f]">{log.time}</td>
                                        <td className="p-2 text-center border-b-[1.5px] border-[#0000001f]">{log.actor}</td>
                                        <td className="p-2 text-center border-b-[1.5px] border-[#0000001f]">
                                        <Modal
                                            mode='info'
                                            size='icon'
                                            variant='ghost'
                                            title='Adjusment Detail'
                                            description={"Detailed Information about Adjusment Detail"}
                                            triggerLabel={<i className="bi bi-info-circle text-xl text-blue-500 hover:text-blue-700"></i>}
                                            triggerClassName='hover:bg-blue-50'
                                            showFooter={false}
                                        >
                                            <div className="grid grid-cols-2 grid-rows-1 gap-3">
                                                <div className="flex flex-col gap-5">
                                                    <div className="flex flex-col gap-0.5">
                                                        <Label className="font-bold text-gray-500">NIK</Label>
                                                        <h1>{log.NIK}</h1>
                                                    </div>
                                                    <div className="flex flex-col gap-0.5">
                                                        <Label className="font-bold text-gray-500">Name</Label>
                                                        <h1>{log.name}</h1>
                                                    </div>
                                                    <div className="flex flex-col gap-0.5">
                                                        <Label className="font-bold text-gray-500">Adjusment</Label>
                                                        <h1>{log.adjustment_value} Days (s)</h1>
                                                    </div>
                                                        <div className="flex flex-col gap-0.5">
                                                        <Label className="font-bold text-gray-500">Notes</Label>
                                                        <h1>{log.notes || '-'}</h1>
                                                    </div>
                                                </div>  
                                                <div className="flex flex-col gap-5">
                                                    <div className="flex flex-col gap-0.5">
                                                        <Label className="font-bold text-gray-500">Balance Year</Label>
                                                        <h1>{log.balance_year}</h1>
                                                    </div>
                                                    <div className="flex flex-col gap-0.5">
                                                        <Label className="font-bold text-gray-500">Time</Label>
                                                        <h1>{log.date} at {log.time}</h1>
                                                    </div>
                                                    <div className="flex flex-col gap-0.5">
                                                        <Label className="font-bold text-gray-500">Actor</Label>
                                                        <h1>{log.actor}</h1>
                                                    </div>
                                                </div>
                                            </div>
                                        </Modal>
                                        </td>
                                    </tr>
                                ))
                            )}
                        </tbody>
                    </table>
                </div>
            </div>

            {/* --- Pagination --- */}
            <div className="flex justify-center items-center bg-background py-5">
                <Pagination>
                    <PaginationContent>
                        <PaginationItem>
                            <PaginationPrevious onClick={() => handlePageChange(currentPage - 1)} className={`${currentPage === 1 ? "pointer-events-none opacity-50" : "cursor-pointer"}`}/>
                        </PaginationItem>
                        {paginationPages.map((page, idx) => (
                            <PaginationItem key={idx}>
                                {page === 'ellipsis' ? ( <span className="px-2 text-gray-500 select-none">…</span> ) : (
                                    <PaginationLink isActive={currentPage === page} onClick={() => handlePageChange(page as number)} className="cursor-pointer">{page}</PaginationLink>
                                )}
                            </PaginationItem>
                        ))}
                        <PaginationItem>
                            <PaginationNext onClick={() => handlePageChange(currentPage + 1)} className={`${!paginationInfo.has_next_page ? "pointer-events-none opacity-50" : "cursor-pointer"}`}/>
                        </PaginationItem>
                    </PaginationContent>
                </Pagination>
            </div>
        </section>
    );
};

export default AdjustHistoryPage;