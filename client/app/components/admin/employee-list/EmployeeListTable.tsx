'use client';

import React from 'react';
import Statistics from "@/app/components/ui/Modal/Statistics"; 
import { Employee } from "@/app/hooks/admin/UseEmployeeListData"; 

interface EmployeeListTableProps {
    isLoading: boolean;
    employees: Employee[];
    itemsPerPage: number;
}

const renderStatus = (status: string) => {
    const isActive = (status || '').toLowerCase() === 'active';
    const className = isActive ? "text-[#00c41d] bg-[#82ff9544] p-2 px-3 rounded-full text-xs" : "text-red-500 bg-red-100 p-2 px-3 rounded-full text-xs";
    return <span className={className}>{(status || '-').toUpperCase()}</span>;
};

export const EmployeeListTable = ({ isLoading, employees, itemsPerPage }: EmployeeListTableProps) => {
    return (
        <section className="relative px-5 pb-5 min-h-[calc(100vh-250px)] max-sm:mb-14">
            <div className="rounded-md overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full text-base text-center">
                        <thead className="text-foreground bg-[#F0f4f9] dark:bg-card">
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
                                Array.from({ length: itemsPerPage }).map((_, rowIdx) => (
                                    <tr key={rowIdx} className='animate-pulse'><td colSpan={9} className="p-4"><div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-3/4 mx-auto" /></td></tr>
                                ))
                            ) : employees.length === 0 ? (
                                <tr><td colSpan={9} className="p-4 text-center text-gray-500">No Data User Found.</td></tr>
                            ) : (
                                employees.map((data) => (
                                    <tr key={data.nik} className="odd:bg-[#e8efff] even:bg-[#f8faff] hover:bg-[#e3e7f0] odd:dark:bg-card/30 even:dark:bg-card/70">
                                        <td className="p-3">{data.nik}</td>
                                        <td className="p-3">{data.name}</td>
                                        <td className="p-3 capitalize">{data.gender}</td>
                                        <td className="p-3">{data.this_year_leave || 0}</td>
                                        <td className="p-3">{data.last_year_leave || 0}</td>
                                        <td className="p-3">{data.leave_total || 0}</td>
                                        <td className="p-3">{(data.role || '').replace(/_/g, ' ')}</td>
                                        <td className="p-3">{renderStatus(data.status)}</td>
                                        <td className="p-3"><Statistics user={data}/></td>
                                    </tr>
                                ))
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </section>
    );
};

