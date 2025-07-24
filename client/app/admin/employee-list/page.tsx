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
import withAuth from "@/lib/auth/withAuth";
// Impor komponen notifikasi sukses
import SuccessAlert from "@/app/components/SuccesAlert/SuccesAlert";

type dataLeaveType = {
    nik: string,
    name: string,
    gender: string,
    role: string,
    status: string,
    last_year_leave?: number,
    this_year_leave?: number,
    leave_total?: number
};


// Komponen ini berisi semua logika dan tampilan halaman.
// Dibuat terpisah agar bisa menggunakan hook useSearchParams.
const EmployeeListContent = () => {
    const router = useRouter();
    const searchParams = useSearchParams();

    const [dataLeave, setDataLeave] = useState<dataLeaveType[]>([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [isLoading, setIsLoading] = useState(true);
    const ITEMS_PER_PAGE = 7;

    const [searchTerm, setSearchTerm] = useState('');
    const [genderFilter, setGenderFilter] = useState('');
    const [statusFilter, setStatusFilter] = useState('');
    const [roleFilter, setRoleFilter] = useState('');

    // State untuk mengontrol notifikasi sukses
    const [showSuccess, setShowSuccess] = useState(false);

    // useEffect ini akan memeriksa parameter URL saat komponen dimuat.
    // Jika ada `?success=true`, maka notifikasi akan ditampilkan.
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
            params.append('limit', ITEMS_PER_PAGE.toString());

            if (searchTerm) params.append('search', searchTerm);
            if (genderFilter) params.append('gender', genderFilter);
            if (statusFilter) params.append('status', statusFilter);
            if (roleFilter) params.append('role', roleFilter);

            const token = localStorage.getItem('token');
            const deviceId = localStorage.getItem('device-id');

            const response = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/users?${params.toString()}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    ...(token && { Authorization: `${token}` }),
                    ...(deviceId && { 'device-id': deviceId }),
                },
            });

            const resJson = await response.json();
            const fetchedData = resJson?.data?.data || resJson?.data || resJson || [];
            const lastPage = resJson?.pagination?.last_visible_page || 1;

            if (Array.isArray(fetchedData)) {
                setDataLeave(fetchedData);
                setTotalPages(lastPage);
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

    // Fungsi untuk menutup notifikasi dan membersihkan URL
    const handleCloseSuccessAlert = () => {
        setShowSuccess(false);
        // Ganti URL untuk menghapus `?success=true` agar notifikasi tidak muncul lagi saat refresh
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
        if (page >= 1 && page <= totalPages) {
            setCurrentPage(page);
        }
    };

    return (
        <>
            {/* Notifikasi sukses akan dirender di sini */}
            <SuccessAlert
                isOpen={showSuccess}
                onClose={handleCloseSuccessAlert}
                title="Leave data added successfully"
            />
            
            <section className="flex justify-end items-center p-5 border-b-[1.5px] border-[#0000001f]">
                <div className="flex justify-end items-center gap-3 mb-4 max-sm:flex-col">
                    
                    <div className="flex max-sm:w-full">
                        <input
                            type="text"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            placeholder="Search..."
                            className="w-full px-4 py-2 border rounded-lg bg-gray-50 text-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
                        />
                    </div>
                    <div className="flex gap-3">
                        <SelectDemo placeholder="Gender" value={genderFilter} onValueChange={setGenderFilter}>
                            <SelectLabel>Gender</SelectLabel>
                            <SelectItem value="male">Male</SelectItem>
                            <SelectItem value="female">Female</SelectItem>
                        </SelectDemo>
                        <SelectDemo placeholder="Status" value={statusFilter} onValueChange={setStatusFilter}>
                            <SelectLabel>Status</SelectLabel>
                            <SelectItem value="active">Active</SelectItem>
                            <SelectItem value="resign">Resign</SelectItem>
                        </SelectDemo>
                        <SelectDemo placeholder="Role" value={roleFilter} onValueChange={setRoleFilter}>
                            <SelectLabel>Role</SelectLabel>
                            <SelectItem value="karyawan_kontrak">Karyawan Kontrak</SelectItem>
                            <SelectItem value="karyawan_tetap">Karyawan Tetap</SelectItem>
                            <SelectItem value="magang">Magang</SelectItem>
                            <SelectItem value="admin">Admin</SelectItem>
                            <SelectItem value="super_admin">Super Admin</SelectItem>
                        </SelectDemo>
                    </div>
                </div>
            </section>

            <section className="relative p-3 min-h-[calc(100dvh-137px)]">
                <div className="max-sm:overflow-x-scroll">
                    <table className="w-full text-base text-center">
                        <thead className="text-black bg-[#F0f4f9] backdrop-blur-sm">
                            <tr className="text-base">
                                <th className="p-3 font-semibold">NIK</th>
                                <th className="p-3 font-semibold">Name</th>
                                <th className="p-3 font-semibold">Gender</th>
                                <th className="p-3 font-semibold">This Year Leave</th>
                                <th className="p-3 font-semibold">Last Year Leave</th>
                                <th className="p-3 font-semibold">Leave Total</th>
                                <th className="p-3 font-semibold">Role</th>
                                <th className="p-3 font-semibold">Status</th>
                            </tr>
                        </thead>
                        <tbody>
                            {isLoading ? (
                                Array.from({ length: ITEMS_PER_PAGE }).map((_, rowIdx) => (
                                    <tr key={rowIdx} className={rowIdx % 2 === 0 ? 'bg-white' : 'bg-gray-100 animate-pulse'}>
                                        {Array.from({ length: 8 }).map((_, colIdx) => (
                                            <td key={colIdx} className="p-3">
                                                <div className="h-4 bg-gray-300 rounded w-3/4 mx-auto" />
                                            </td>
                                        ))}
                                    </tr>
                                ))
                            ) : (
                                dataLeave.map((data) => (
                                    <tr key={data.nik} className="odd:bg-[#e8efff] even:bg-[#f8faff]">
                                        <td className="p-3">{data.nik}</td>
                                        <td className="p-3">{data.name}</td>
                                        <td className="p-3 capitalize">{data.gender}</td>
                                        <td className="p-3">{data.this_year_leave || 0}</td>
                                        <td className="p-3">{data.last_year_leave || 0}</td>
                                        <td className="p-3">{data.leave_total || 0}</td>
                                        <td className="p-3">{(data.role || '').replace(/_/g, ' ')}</td>
                                        <td className="p-3">{renderStatus(data.status)}</td>
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
                                        className='cursor-pointer'
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
    );
}

// Ini adalah komponen wrapper yang diperlukan oleh Next.js
// agar `useSearchParams` dapat bekerja dengan benar.
const EmployeeListPage = () => (
    <Suspense fallback={<div>Loading page...</div>}>
        <EmployeeListContent />
    </Suspense>
);

export default withAuth(EmployeeListPage, { requireAdmin: true });
