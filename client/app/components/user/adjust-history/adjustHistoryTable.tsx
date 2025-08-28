// app/components/adjust-history/AdjustHistoryTable.tsx

'use client';

import { HistoryLog } from "@/app/hooks/useAdjustHistoryData";
import { Label } from "@/app/components/ui/label";
import Modal from "@/app/components/ui/Modal/Modal";

interface AdjustHistoryTableProps {
    isLoading: boolean;
    error: string | null;
    history: HistoryLog[];
    itemsPerPage: number;
}

export const AdjustHistoryTable = ({ isLoading, error, history, itemsPerPage }: AdjustHistoryTableProps) => (
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
                        Array.from({ length: itemsPerPage }).map((_, rowIdx) => (
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
                                    <Modal mode='info' size='icon' variant='ghost' title='Adjusment Detail' triggerLabel={<i className="bi bi-info-circle text-xl text-blue-500 hover:text-blue-700"></i>} showFooter={false}>
                                        <div className="grid grid-cols-2 grid-rows-1 gap-3">
                                            <div className="flex flex-col gap-5">
                                                <div className="flex flex-col gap-0.5"><Label className="font-bold text-gray-500">NIK</Label><h1>{log.NIK}</h1></div>
                                                <div className="flex flex-col gap-0.5"><Label className="font-bold text-gray-500">Name</Label><h1>{log.name}</h1></div>
                                                <div className="flex flex-col gap-0.5"><Label className="font-bold text-gray-500">Adjusment</Label><h1>{log.adjustment_value} Days (s)</h1></div>
                                                <div className="flex flex-col gap-0.5"><Label className="font-bold text-gray-500">Notes</Label><h1>{log.notes || '-'}</h1></div>
                                            </div>
                                            <div className="flex flex-col gap-5">
                                                <div className="flex flex-col gap-0.5"><Label className="font-bold text-gray-500">Balance Year</Label><h1>{log.balance_year}</h1></div>
                                                <div className="flex flex-col gap-0.5"><Label className="font-bold text-gray-500">Time</Label><h1>{log.date} at {log.time}</h1></div>
                                                <div className="flex flex-col gap-0.5"><Label className="font-bold text-gray-500">Actor</Label><h1>{log.actor}</h1></div>
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
);