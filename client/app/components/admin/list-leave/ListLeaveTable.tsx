'use client';

import React from 'react';
import Modal from '@/app/components/ui/Modal/Modal';
import { Label } from '@/app/components/ui/label';
import { formatUppercase, formatDate } from '@/lib/format';
import { ApiLeaveType } from '@/app/hooks/admin/UseLeaveData';

interface LeaveTableProps {
    viewMode: 'requests' | 'history';
    isLoading: boolean;
    leaveData: ApiLeaveType[];
    itemsPerPage: number;
    onAction: (id: string, newStatus: 'approved' | 'rejected', reason?: string) => Promise<void>;
}

const getStatusChip = (status: string) => {
    switch (status?.toLowerCase()) {
        case 'pending': return <span className="text-yellow-600 bg-yellow-100 p-2 px-3 rounded-full text-xs font-semibold">PENDING</span>;
        case 'approved': return <span className="text-green-600 bg-green-100 p-2 px-3 rounded-full text-xs font-semibold">APPROVED</span>;
        case 'rejected': return <span className="text-red-600 bg-red-100 p-2 px-3 rounded-full text-xs font-semibold">REJECTED</span>;
        case 'taken': return <span className="text-blue-600 bg-blue-100 p-2 px-3 rounded-full text-xs font-semibold">TAKEN</span>;
        default: return <span className="text-gray-600 bg-gray-100 p-2 px-3 rounded-full text-xs font-semibold">{status?.toUpperCase() || 'N/A'}</span>;
    }
};

export const LeaveTable = ({ viewMode, isLoading, leaveData, itemsPerPage, onAction }: LeaveTableProps) => {
    return (
        <section className="relative p-3 min-h-[calc(100vh-250px)] max-sm:mb-14">
            <div className='rounded-md overflow-hidden'>
                <div className='overflow-x-auto'>
                    <table className="w-full text-base text-center">
                        <thead className="text-foreground bg-[#F0f4f9] dark:bg-card">
                            <tr>
                                <th className="p-3 align-middle font-semibold">Name</th>
                                <th className="p-3 align-middle font-semibold">Type</th>
                                <th className="p-3 align-middle font-semibold">Start Leave</th>
                                <th className="p-3 align-middle font-semibold">End Leave</th>
                                <th className="p-3 align-middle font-semibold">Leave Used</th>
                                <th className="p-3 align-middle font-semibold">Status</th>
                                <th className="p-3 align-middle font-semibold">Action</th>
                            </tr>
                        </thead>
                        <tbody className="cursor-pointer">
                            {isLoading ? (
                                Array.from({ length: itemsPerPage }).map((_, rowIdx) => (
                                    <tr key={`loading-${rowIdx}`} className="animate-pulse">
                                        {Array.from({ length: 7 }).map((_, colIdx) => (
                                            <td key={`loading-cell-${colIdx}`} className="p-4 text-center border-b-[1.5px] border-[#0000001f]"><div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-3/4 mx-auto" /></td>
                                        ))}
                                    </tr>
                                ))
                            ) : leaveData.length === 0 ? (
                                <tr><td colSpan={7} className="p-4 text-center text-gray-500">No leave data found.</td></tr>
                            ) : (
                                leaveData.map((data) => (
                                    <tr key={data.id_leave} className="odd:bg-[#e8efff] even:bg-[#f8faff] hover:bg-[#e3e7f0] odd:dark:bg-card/30 even:dark:bg-card/70 transition-colors duration-300">
                                        <td className="p-3 align-middle text-center border-b-[1.5px] border-[#0000001f]">{data.name || data.fullname}</td>
                                        <td className="p-3 align-middle text-center border-b-[1.5px] border-[#0000001f]">{formatUppercase(data.leave_type)}</td>
                                        <td className="p-3 align-middle text-center border-b-[1.5px] border-[#0000001f]">{formatDate(data.start_date)}</td>
                                        <td className="p-3 align-middle text-center border-b-[1.5px] border-[#0000001f]">{formatDate(data.end_date)}</td>
                                        <td className="p-3 align-middle text-center border-b-[1.5px] border-[#0000001f]">{data.total_days}</td>
                                        <td className="p-3 align-middle text-center border-b-[1.5px] border-[#0000001f]">{getStatusChip(data.status)}</td>
                                        <td className="p-2 text-[14px] text-center font-medium border-b-[1.5px] border-[#0000001f]">
                                            <div className="flex justify-center items-center gap-2">
                                                {/* Actions for Requests View */}
                                                {viewMode === 'requests' && (
                                                    <>
                                                        <Modal
                                                            mode='confirm' size='icon' variant='ghost' title='Accept Request'
                                                            description={`Accept leave from ${data.fullname}? Reason: ${data.reason}`}
                                                            triggerLabel={<i className="bi bi-check2-circle text-xl text-green-500"></i>}
                                                            onConfirm={() => onAction(data.id_leave, 'approved')}
                                                        />
                                                        <Modal
                                                            mode='reject' size='icon' variant='ghost' title='Reject Request'
                                                            description={`Reject leave from ${data.fullname}?`}
                                                            triggerLabel={<i className="bi bi-x-circle text-xl text-red-500"></i>}
                                                            onConfirm={(rejectionReason) => onAction(data.id_leave, 'rejected', rejectionReason)}
                                                        />
                                                    </>
                                                )}

                                                {/* Actions for History View */}
                                                {viewMode === 'history' && (
                                                    <>
                                                        {data.status === 'approved' && (
                                                            <Modal
                                                                mode='reject' size='icon' variant='ghost' title='Reject Leave Request'
                                                                description={
                                                                    <div>
                                                                        <p className="mb-4 text-left text-base text-gray-700">
                                                                            <span className="font-semibold">Employee Name :</span> {data.fullname || data.name}
                                                                        </p>
                                                                        <div className="flex items-start gap-3 rounded-r-lg p-3 mb-4">
                                                                            <i className="bi bi-exclamation-triangle-fill text-yellow-500 text-center"></i>
                                                                            <p className="text-sm font-medium text-red-500 text-center">
                                                                                You are about to reject a leave request that has already been approved.
                                                                            </p>
                                                                        </div>
                                                                    </div>
                                                                }
                                                                triggerLabel={<i className="bi bi-x-circle text-xl text-red-500"></i>}
                                                                triggerClassName='hover:bg-red-50'
                                                                onConfirm={(rejectionReason) => onAction(data.id_leave, 'rejected', rejectionReason)}
                                                            />
                                                        )}
                                                        {data.status === 'rejected' && (
                                                            <Modal
                                                                mode='confirm' size='icon' variant='ghost' title='Change to Approved'
                                                                description={`Change status for ${data.fullname || data.name} from Rejected to Approved?`}
                                                                triggerLabel={<i className="bi bi-check-circle text-xl text-green-500"></i>}
                                                                triggerClassName='hover:bg-green-50'
                                                                onConfirm={() => onAction(data.id_leave, 'approved')}
                                                            />
                                                        )}
                                                    </>
                                                )}

                                                {/* Info Modal for Both Views */}
                                                <Modal mode='info' size='icon' variant='ghost' title='Leave Information' showFooter={false} triggerLabel={<i className="bi bi-info-circle text-xl text-blue-500 hover:text-blue-700"></i>}>
                                                    <div className="grid grid-cols-2 grid-rows-1 gap-3 text-left">
                                                        <div className="flex flex-col gap-5">
                                                            <div className="flex flex-col gap-0.5"><Label className="font-bold text-gray-500">NIK</Label><h1>{data.NIK}</h1></div>
                                                            <div className="flex flex-col gap-0.5"><Label className="font-bold text-gray-500">Name</Label><h1>{data.fullname}</h1></div>
                                                            <div className="flex flex-col gap-0.5"><Label className="font-bold text-gray-500">Title</Label><h1>{data.title}</h1></div>
                                                            <div className="flex flex-col gap-0.5"><Label className="font-bold text-gray-500">Type</Label><h1>{formatUppercase(data.leave_type)}</h1></div>
                                                            <div className="flex flex-col gap-0.5"><Label className="font-bold text-gray-500">Start Leave</Label><h1>{formatDate(data.start_date)}</h1></div>
                                                        </div>
                                                        <div className="flex flex-col gap-5">
                                                            <div className="flex flex-col gap-0.5"><Label className="font-bold text-gray-500">End Leave</Label><h1>{formatDate(data.end_date)}</h1></div>
                                                            <div className="flex flex-col gap-0.5"><Label className="font-bold text-gray-500">Leave Used</Label><h1>{data.total_days} Days</h1></div>
                                                            {data.leave_type !== 'mandatory_leave' && (
                                                                <div className="flex flex-col gap-0.5"><Label className="font-bold text-gray-500">Reason Leave</Label><h1>{data.reason}</h1></div>
                                                            )}
                                                            <div className="flex flex-col gap-0.5">
                                                                <Label className="font-bold text-gray-500">Status</Label>
                                                                <div className="flex items-center gap-1">
                                                                    <i className={`bi bi-circle-fill text-xs ${data.status === 'rejected' ? 'text-red-500' : data.status === 'approved' ? 'text-green-500' : data.status === 'pending' ? 'text-yellow-500' : 'text-gray-500'}`}></i>
                                                                    <div className="flex gap-1">
                                                                        <h1>{formatUppercase(data.status)}</h1>
                                                                        {data.status !== 'pending' && (<h1>by {data.tb_leave_log?.tb_users?.fullname}</h1>)}
                                                                    </div>
                                                                </div>
                                                            </div>
                                                            {data.status === 'rejected' && data.tb_leave_log?.reason && (
                                                                <div className="flex flex-col gap-0.5"><Label className="font-bold text-gray-500">Reason Rejected</Label><h1>{data.tb_leave_log.reason}</h1></div>
                                                            )}
                                                        </div>
                                                    </div>
                                                </Modal>
                                            </div>
                                        </td>
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