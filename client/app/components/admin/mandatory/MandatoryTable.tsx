// components/admin/mandatory/MandatoryLeaveTable.tsx
'use client';

import { formatDate } from "@/lib/format";
import { EditMandatory } from "@/app/components/ui/form/editMandatory";
import { MandatoryLeaveType } from "@/app/hooks/admin/UseMandatory";
import { Switch } from "../../ui/switch";

interface MandatoryTableProps {
    isLoading: boolean;
    data: MandatoryLeaveType[];
    itemsPerPage: number;
    currentPage: number;
    onToggle: (id: string, currentStatus: boolean) => void;
    onFormSubmit: () => void;
}

export const MandatoryLeaveTable = ({
    isLoading,
    data,
    itemsPerPage,
    currentPage,
    onToggle,
    onFormSubmit,
}: MandatoryTableProps) => {
    return (
        <div className="rounded-md overflow-hidden">
            <div className="overflow-x-auto">
                <table className="w-full min-w-max text-base text-center">
                    <thead className="text-foreground bg-[#F0f4f9] dark:bg-card">
                        <tr className="text-base">
                            <th className="p-3 font-semibold">No</th>
                            <th className="p-3 font-semibold">Leave Title</th>
                            <th className="p-3 font-semibold">Information</th>
                            <th className="p-3 font-semibold">Start Date</th>
                            <th className="p-3 font-semibold">End Date</th>
                            <th className="p-3 font-semibold">Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {isLoading ? (
                            Array.from({ length: itemsPerPage }).map((_, rowIdx) => (
                                <tr key={rowIdx} className="animate-pulse">
                                    {Array.from({ length: 6 }).map((_, colIdx) => (
                                        <td key={colIdx} className="p-4">
                                            <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-3/4 mx-auto" />
                                        </td>
                                    ))}
                                </tr>
                            ))
                        ) : data.length === 0 ? (
                            <tr>
                                <td colSpan={6} className="p-4 text-center text-gray-500">
                                    No mandatory leaves found.
                                </td>
                            </tr>
                        ) : (
                            data.map((item, idx) => (
                                <tr
                                    key={item.id_mandatory}
                                    className="odd:bg-[#e8efff] even:bg-[#f8faff] hover:bg-[#e3e7f0] odd:dark:bg-card/30 even:dark:bg-card/70 transition-colors duration-300"
                                >
                                    <td className="p-3 border-b border-border">
                                        {(currentPage - 1) * itemsPerPage + idx + 1}
                                    </td>
                                    <td className="p-3 border-b border-border">{item.title}</td>
                                    <td className="p-3 border-b border-border max-w-3xs">{item.description}</td>
                                    <td className="p-3 border-b border-border">{formatDate(item.start_date)}</td>
                                    <td className="p-3 border-b border-border">{formatDate(item.end_date)}</td>
                                    <td className="p-3 border-b border-border">
                                        <div className="flex justify-center items-center gap-2">
                                            <EditMandatory initialData={item} onFormSubmit={onFormSubmit} />
                                            <Switch checked={item.is_active} onClick={() => onToggle(item.id_mandatory, item.is_active)} />
                                        </div>
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
