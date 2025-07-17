'use client'

import { useState, useEffect, useCallback } from "react";
import 'bootstrap-icons/font/bootstrap-icons.css';
import { debounce } from 'lodash';

import { Pagination, PaginationContent, PaginationItem, PaginationLink, PaginationNext, PaginationPrevious } from "@/app/components/ui/pagination";
import { SearchButton } from "@/app/components/search/page";
import { SelectDemo } from "@/app/components/select/page";
import { SelectItem, SelectLabel } from "@/app/components/ui/select";
import axiosInstance from "@/app/api/axiosInstance";

type dataLeaveType = {
    NIK: string,
    fullname: string,
    gender: string,
    role: string,
    status_active: string,
    last_year_leave?: number,
    this_year_leave?: number,
    leave_total?: number
};

const DashboardPage = () => {
    const [dataLeave, setDataLeave] = useState<dataLeaveType[]>([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [isLoading, setIsLoading] = useState(true);
    const ITEMS_PER_PAGE = 7;

    const [searchTerm, setSearchTerm] = useState('');
    const [genderFilter, setGenderFilter] = useState('');
    const [statusFilter, setStatusFilter] = useState('');
    const [roleFilter, setRoleFilter] = useState('');

    const fetchData = useCallback(async () => {
        setIsLoading(true);
        try {
            const params = new URLSearchParams();
            if (searchTerm) params.append('search', searchTerm);
            if (genderFilter) params.append('gender', genderFilter);
            if (statusFilter) params.append('status', statusFilter);
            if (roleFilter) params.append('role', roleFilter);
            
            const response = await axiosInstance.get(`/users/filter?${params.toString()}`);

            const FecthDataUser = response.data?.data || response.data || [];
            if(Array.isArray(FecthDataUser)){
                setDataLeave(FecthDataUser);
            }
        } catch (error) {
            console.error("Failed to fetch data:", error);
            setDataLeave([]); 
        } finally {
            setIsLoading(false);
        }
    }, [searchTerm, genderFilter, statusFilter, roleFilter]); 

    const debouncedFetchData = useCallback(debounce(() => {
        fetchData();
    }, 500), [fetchData]); 

    useEffect(() => {
        debouncedFetchData();
        return () => {
            debouncedFetchData.cancel();
        };
    }, [searchTerm, genderFilter, statusFilter, roleFilter, debouncedFetchData]);

    const renderStatus = (status: string) => {
        const safeStatus = status || ''; 
        const isActive = safeStatus.toLowerCase() === 'active';
        const className = isActive
            ? "text-[#00c41d] bg-[#82ff9544] p-2 px-3 rounded-full text-xs"
            : "text-red-500 bg-red-100 p-2 px-3 rounded-full text-xs";
        return <span className={className}>{(safeStatus || '-').toUpperCase()}</span>;
    };

    const totalPages = Math.ceil(dataLeave.length / ITEMS_PER_PAGE);
    const currentData = dataLeave.slice((currentPage - 1) * ITEMS_PER_PAGE, currentPage * ITEMS_PER_PAGE);

    const handlePageChange = (page: number) => {
        if (page >= 1 && page <= totalPages) {
            setCurrentPage(page);
        }
    };

    return (
        <>
            <section className="flex justify-end items-center p-5 border-b-[1.5px] border-[#0000001f]">
                <SearchButton 
                    placeholder="Search Employee" 
                    onChange={(e) => setSearchTerm(e.target.value)} 
                />
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
            </section>

            <section className="relative p-3 min-h-[calc(100dvh-137px)]">
                <div className="max-sm:overflow-x-scroll">
                    <table className="w-full text-base text-center">
                        <thead className="text-black bg-[#F0f4f9] backdrop-blur-sm">
                            <tr className="text-base">
                                <th className="p-3 align-middle font-semibold">NIK</th>
                                <th className="p-3 align-middle font-semibold">Name</th>
                                <th className="p-3 align-middle font-semibold">Gender</th>
                                <th className="p-3 align-middle font-semibold">This Year Leave</th>
                                <th className="p-3 align-middle font-semibold">Last Year Leave</th>
                                <th className="p-3 align-middle font-semibold">Leave Total</th>
                                <th className="p-3 align-middle font-semibold">Role</th>
                                <th className="p-3 align-middle font-semibold">Status</th>
                            </tr>
                        </thead>
                        <tbody>
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
                                currentData.map((data) => (
                                    <tr key={data.NIK} className="odd:bg-[#e8efff] even:bg-[#f8faff]">
                                        <td className="p-3 align-middle">{data.NIK}</td>
                                        <td className="p-3 align-middle">{data.fullname}</td>
                                        <td className="p-3 align-middle capitalize">{data.gender}</td>
                                        <td className="p-3 align-middle capitalize">{data.this_year_leave || 0}</td>
                                        <td className="p-3 align-middle capitalize">{data.last_year_leave || 0}</td>
                                        <td className="p-3 align-middle">{data.leave_total || 0}</td>
                                        <td className="p-3 align-middle">{(data.role || '').replace(/_/g, ' ')}</td>
                                        <td className="p-3 align-middle">{renderStatus(data.status_active)}</td>
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