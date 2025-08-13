'use client'

import React, { useState, useEffect, useCallback, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
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
import { SelectDemo } from "@/app/components/select/page";
import { SelectItem, SelectLabel } from "@/app/components/ui/select";
import SuccessAlert from "@/app/components/SuccesAlert/SuccesAlert";
import Statistics from "@/app/components/Modal/Statistics";

type dataLeaveType = {
    nik: string,
    name: string,
    gender: string,
    join_date: string,
    role: string,
    status: string,
    last_year_leave?: number,
    this_year_leave?: number,
    leave_total?: number
};

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

const EmployeeListContent = () => {
    const router = useRouter();
    const searchParams = useSearchParams();

    const [dataLeave, setDataLeave] = useState<dataLeaveType[]>([]);
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
    const [currentPage, setCurrentPage] = useState(1);
    const [isLoading, setIsLoading] = useState(true);

    const [searchTerm, setSearchTerm] = useState<string>("");
    const [genderFilter, setGenderFilter] = useState<string | null>(null);
    const [statusFilter, setStatusFilter] = useState<string | null>(null);
    const [roleFilter, setRoleFilter] = useState<string | null>(null);

    const [showSuccess, setShowSuccess] = useState(false);

    useEffect(() => {
        if (searchParams.get('success') === 'true') {
            setShowSuccess(true);
        }
    }, [searchParams]);

    const fetchData = useCallback(async () => {
        setIsLoading(true);
        try {
            const params = new URLSearchParams();
            params.append('page', currentPage.toString());
            params.append('limit', itemPerPage.toString());

            if (searchTerm) params.append('search', searchTerm);
            if (genderFilter) params.append('gender', genderFilter);
            if (statusFilter) params.append('status', statusFilter);
            if (roleFilter) params.append('role', roleFilter);

            const response = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/users?${params.toString()}`, {
                method: 'GET',
                credentials: 'include',
            });

            const resJson = await response.json();
            const fetchedData = resJson?.data?.data || resJson?.data || resJson || [];
            const paginationData = resJson?.pagination || {
                current_page: 1,
                last_visible_page: 1,
                has_next_page: false,
                item: { count: 0, total: 0, per_page: itemPerPage },
            };

            if (Array.isArray(fetchedData)) {
                setDataLeave(fetchedData);
                setPaginationInfo(paginationData);
            }
        } catch (error) {
            console.error("Failed to fetch data:", error);
            setDataLeave([]);
        } finally {
            setIsLoading(false);
        }
    }, [searchTerm, genderFilter, statusFilter, roleFilter, currentPage]);

    const debouncedFetchData = useCallback(debounce(() => {
        fetchData();
    }, 500), [fetchData]);

    useEffect(() => {
        debouncedFetchData();
        return () => {
            debouncedFetchData.cancel();
        };
    }, [searchTerm, genderFilter, statusFilter, roleFilter, currentPage, debouncedFetchData]);

    const handleCloseSuccessAlert = () => {
        setShowSuccess(false);
        const currentPath = window.location.pathname;
        router.replace(currentPath, { scroll: false });
    };

    const renderStatus = (status: string) => {
        const safeStatus = status || '';
        const isActive = safeStatus.toLowerCase() === 'active';
        const className = isActive
            ? "text-[#00c41d] bg-[#82ff9544] p-2 px-3 rounded-full text-xs"
            : "text-red-500 bg-red-100 p-2 px-3 rounded-full text-xs";
        return <span className={className}>{(safeStatus || '-').toUpperCase()}</span>;
    };

    const handlePageChange = (page: number) => {
        if (page >= 1 && page <= paginationInfo.last_visible_page) {
            setCurrentPage(page);
        }
    };

    const paginationPages = getVisiblePages(
        currentPage,
        paginationInfo.last_visible_page
    );

    return (
        <>
        
            <SuccessAlert
                isOpen={showSuccess}
                onClose={handleCloseSuccessAlert}
                title="Leave data added successfully"
            />
            

            <section className="flex justify-end items-center p-5 border-b-[1.5px] border-border">
                <div className="flex justify-end items-center gap-3 mb-4 max-sm:flex-col">

                    <div className="flex max-sm:w-full">
                        <input
                            type="text"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            placeholder="Search..."
                            className="w-full px-4 py-2 border rounded-lg bg-gray-50 dark:bg-card text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
                        />
                    </div>
                    <div className="flex gap-3">
                        <SelectDemo placeholder="Gender" onValueChange={(value) => setGenderFilter(value === 'all' ? null : value)}>
                            <SelectLabel>Gender</SelectLabel>
                            <SelectItem value="all">All</SelectItem>
                            <SelectItem value="male">Male</SelectItem>
                            <SelectItem value="female">Female</SelectItem>
                        </SelectDemo>
                        <SelectDemo placeholder="Status" onValueChange={(value) => setStatusFilter(value === 'all' ? null : value)}>
                            <SelectLabel>Status</SelectLabel>
                            <SelectItem value="all">All</SelectItem>
                            <SelectItem value="active">Active</SelectItem>
                            <SelectItem value="resign">Resign</SelectItem>
                        </SelectDemo>
                        <SelectDemo placeholder="Role" onValueChange={(value) => setRoleFilter(value === 'all' ? null : value)}>
                            <SelectLabel>Role</SelectLabel>
                            <SelectItem value="all">All</SelectItem>
                            <SelectItem value="karyawan_kontrak">Karyawan Kontrak</SelectItem>
                            <SelectItem value="karyawan_tetap">Karyawan Tetap</SelectItem>
                            <SelectItem value="magang">Magang</SelectItem>
                        </SelectDemo>
                    </div>
                </div>
            </section>

            <section className="relative p-3 min-h-[calc(100dvh-137px)] max-sm:mb-14">
                <div className="rounded-md overflow-hidden">
                    <div className="overflow-x-auto">
                        <table className="w-full text-base text-center">
                            <thead className="text-foreground bg-[#F0f4f9] dark:bg-card backdrop-blur-sm">
                                <tr className="text-base">
                                    <th className="p-3 font-semibold">NIK</th>
                                    <th className="p-3 font-semibold">Name</th>
                                    <th className="p-3 font-semibold">Gender</th>
                                    <th className="p-3 font-semibold">This Year Leave</th>
                                    <th className="p-3 font-semibold">Last Year Leave</th>
                                    <th className="p-3 font-semibold">Leave Total</th>
                                    <th className="p-3 font-semibold">Role</th>
                                    <th className="p-3 font-semibold">Status</th>
                                    <th className="p-3 font-semibold">Action</th>
                                </tr>
                            </thead>
                            <tbody className="cursor-pointer">
                                {isLoading ? (
                                    Array.from({ length: itemPerPage }).map((_, rowIdx) => (
                                        <tr key={rowIdx} className='animate-pulse odd:bg-[#e8efff] even:bg-[#f8faff]'>
                                            {Array.from({ length: 9 }).map((_, colIdx) => (
                                                <td key={colIdx} className="p-3">
                                                    <div className="h-4 bg-gray-300 rounded w-3/4 mx-auto" />
                                                </td>
                                            ))}
                                        </tr>
                                    ))
                                ) :
                                    dataLeave.length === 0 ? (
                                        <tr>
                                            <td colSpan={9} className="p-4 text-center text-gray-500">
                                                No Data User Found.
                                            </td>
                                        </tr>
                                    ) : (
                                        dataLeave.map((data) => (
                                            <tr key={data.nik} className="odd:bg-[#e8efff] even:bg-[#f8faff] hover:bg-[#e3e7f0] odd:dark:bg-card/30 even:dark:bg-card/70 transition-colors duration-300">
                                                <td className="p-3">{data.nik}</td>
                                                <td className="p-3">{data.name}</td>
                                                <td className="p-3 capitalize">{data.gender}</td>
                                                <td className="p-3">{data.this_year_leave || 0}</td>
                                                <td className="p-3">{data.last_year_leave || 0}</td>
                                                <td className="p-3">{data.leave_total || 0}</td>
                                                <td className="p-3">{(data.role || '').replace(/_/g, ' ')}</td>
                                                <td className="p-3">{renderStatus(data.status)}</td>
                                                <td className="p-3">
                                                    <Statistics user={data}/>
                                                </td>
                                            </tr>
                                        ))
                                    )}
                            </tbody>
                        </table>
                    </div>
                </div>

                <div className="flex justify-center items-center bg-background py-5">
                    <Pagination>
                        <PaginationContent>
                            <PaginationItem>
                                <PaginationPrevious
                                    onClick={() => handlePageChange(currentPage - 1)}
                                    className={`${currentPage === 1
                                        ? "pointer-events-none opacity-50 cursor-default"
                                        : "cursor-pointer"}`}
                                />
                            </PaginationItem>

                            {paginationPages.map((page, idx) => (
                                <PaginationItem key={idx}>
                                    {page === "ellipsis" ? (
                                        <span className="px-2 text-gray-500 select-none">…</span>
                                    ) : (
                                        <PaginationLink
                                            isActive={currentPage === page}
                                            onClick={() => handlePageChange(page)}
                                            className="cursor-pointer"
                                        >
                                            {page}
                                        </PaginationLink>
                                    )}
                                </PaginationItem>
                            ))}

                            <PaginationItem>
                                <PaginationNext
                                    onClick={() => handlePageChange(currentPage + 1)}
                                    className={`${currentPage === paginationInfo.last_visible_page
                                        ? "pointer-events-none opacity-50 cursor-default"
                                        : "cursor-pointer"}`}
                                />
                            </PaginationItem>
                        </PaginationContent>
                    </Pagination>
                </div>
            </section>
        </>
    );
}

const EmployeeListPage = () => (
    <Suspense fallback={<div>Loading page...</div>}>
        <EmployeeListContent />
    </Suspense>
);

export default EmployeeListPage
