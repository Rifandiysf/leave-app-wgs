'use client';

import Modal from "@/app/components/ui/Modal/Modal";
import { formatDate, formatUppercase } from "@/lib/format";
import { Label } from "@/app/components/ui/label";
import { LeaveHistoryType } from "@/app/hooks/user/UseHistoryData"; 

interface HistoryTableProps {
    isLoading: boolean;
    data: LeaveHistoryType[];
    itemsPerPage: number;
}

const statusTag = (status: string) => {
    switch (status?.toLowerCase()) {
        case 'pending': return <span className="text-yellow-600 bg-yellow-100 p-2 px-3 rounded-full text-xs">PENDING</span>;
        case 'approved': return <span className="text-green-600 bg-green-100 p-2 px-3 rounded-full text-xs">APPROVED</span>;
        case 'rejected': return <span className="text-red-600 bg-red-100 p-2 px-3 rounded-full text-xs">REJECTED</span>;
        default: return <span className="text-gray-600 bg-gray-100 p-2 px-3 rounded-full text-xs">{status?.toUpperCase() || 'N/A'}</span>;
    }
};

export const HistoryTable = ({ isLoading, data, itemsPerPage }: HistoryTableProps) => {
    return (
        <div className="w-full border-border rounded-md overflow-hidden">
            <div className="overflow-x-auto">
                <table className="w-full min-w-max text-sm">
                    <thead className="border-b-[1.5px] border-border bg-[#f0f4f9] dark:bg-card">
                        <tr>
                            <th className="p-3 font-semibold text-center">Status</th>
                            <th className="p-3 font-semibold text-center">Type</th>
                            <th className="p-3 font-semibold text-center">Start Leave</th>
                            <th className="p-3 font-semibold text-center">End Leave</th>
                            <th className="p-3 font-semibold text-center">Leave Usage</th>
                            <th className="p-3 font-semibold text-center">Title</th>
                            <th className="p-3 font-semibold text-center">Detail</th>
                        </tr>
                    </thead>
                    <tbody className="cursor-pointer">
                        {isLoading ? (
                            Array.from({ length: itemsPerPage }).map((_, rowIdx) => (
                                <tr key={rowIdx} className="animate-pulse">
                                    {Array.from({ length: 7 }).map((_, colIdx) => (
                                        <td key={colIdx} className="p-4 text-center">
                                            <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-3/4 mx-auto" />
                                        </td>
                                    ))}
                                </tr>
                            ))
                        ) : data.length === 0 ? (
                            <tr><td colSpan={7} className="p-4 text-center text-gray-500">No history leaves found.</td></tr>
                        ) : (
                            data.map((item) => (
                                <tr key={item.id_leave} className="odd:bg-[#e8efff] even:bg-[#f8faff] hover:bg-[#e3e7f0] odd:dark:bg-card/30 even:dark:bg-card/70 transition-colors duration-300">
                                    <td className="p-2 text-center border-b-[1.5px] border-[#0000001f]">{statusTag(item.status)}</td>
                                    <td className="p-2 text-center border-b-[1.5px] border-[#0000001f]">{formatUppercase(item.leave_type)}</td>
                                    <td className="p-2 text-center border-b-[1.5px] border-[#0000001f]">{formatDate(item.start_date)}</td>
                                    <td className="p-2 text-center border-b-[1.5px] border-[#0000001f]">{formatDate(item.end_date)}</td>
                                    <td className="p-2 text-center border-b-[1.5px] border-[#0000001f]">{item.total_days} Days</td>
                                    <td className="p-2 text-center border-b-[1.5px] border-[#0000001f]">{item.title}</td>
                                    <td className="p-2 text-center border-b-[1.5px] border-[#0000001f]">
                                        <Modal
                                            mode="info"
                                            size="icon"
                                            variant="ghost"
                                            title="Information"
                                            triggerLabel={<i className="bi bi-exclamation-circle text-xl text-blue-500 hover:text-blue-700"></i>}
                                            triggerClassName='hover:bg-blue-50'
                                            showFooter={false}
                                        >
                                            <div className={`grid grid-rows-1 gap-3 ${item.leave_type === 'mandatory_leave' ? 'grid-cols-1' : 'grid-cols-2'}`}>
                                                <div className="flex flex-col gap-5">
                                                    <div className="flex flex-col gap-0.5">
                                                        <Label className="font-bold text-gray-500">Type</Label>
                                                        <h1>{formatUppercase(item.leave_type)}</h1>
                                                    </div>
                                                    <div className="flex flex-col gap-0.5">
                                                        <Label className="font-bold text-gray-500">Start Leave</Label>
                                                        <h1>{formatDate(item.start_date)}</h1>
                                                    </div>
                                                    <div className="flex flex-col gap-0.5">
                                                        <Label className="font-bold text-gray-500">End Leave</Label>
                                                        <h1>{formatDate(item.end_date)}</h1>
                                                    </div>
                                                    <div className="flex flex-col gap-0.5">
                                                        <Label className="font-bold text-gray-500">Leave Used</Label>
                                                        <h1>{item.total_days} Days</h1>
                                                    </div>
                                                </div>
                                                {item.leave_type !== 'mandatory_leave' && (
                                                    <div className="flex flex-col gap-5">
                                                        <div className="flex flex-col gap-0.5">
                                                            <Label className="font-bold text-gray-500">Reason Leave</Label>
                                                            <h1>{item.reason}</h1>
                                                        </div>
                                                        <div className="flex flex-col gap-0.5">
                                                            <Label className="font-bold text-gray-500">Status</Label>
                                                            <div className="flex items-center gap-1">
                                                                <i className={`bi bi-circle-fill text-xs ${item.status === 'rejected' ? 'text-red-500' : item.status === 'approved' ? 'text-green-500' : item.status === 'pending' ? 'text-yellow-500' : 'text-gray-500'}`}></i>
                                                                <div className="flex gap-1">
                                                                    <h1>{formatUppercase(item.status)}</h1>
                                                                    {item.status !== 'pending' && (<h1>by {item.tb_leave_log?.tb_users?.fullname}</h1>)}
                                                                </div>
                                                            </div>
                                                        </div>
                                                        {item.status === 'rejected' && (
                                                            <div className="flex flex-col gap-0.5">
                                                                <Label className="font-bold text-gray-500">Reason Rejected</Label>
                                                                <h1>{item.tb_leave_log?.reason}</h1>
                                                            </div>
                                                        )}
                                                    </div>
                                                )}
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
    );
};