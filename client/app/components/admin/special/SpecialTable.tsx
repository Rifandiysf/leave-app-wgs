import { SpecialLeaveType } from "@/lib/type";
import { EditSpecial } from "../../ui/form/editSpecial"
import { Switch } from "../../ui/switch"
import { formatUpperCase } from "@/lib/format";

interface SpecialTableProps {
    isLoading: boolean;
    data: SpecialLeaveType[];
    itemsPerPage: number;
    currentPage: number;
    onToggle: (id: string, currentStatus: boolean) => void;
    onFormSubmit: () => void;
}

export const SpecialLeaveTable = ({
    isLoading,
    data,
    itemsPerPage,
    currentPage,
    onToggle,
    onFormSubmit,
}: SpecialTableProps) => {
    return (
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
                                No Special leaves found.
                            </td>
                        </tr>
                    ) : (
                        data.map((item, idx) => (
                            <tr key={item.id_special} className="odd:bg-[#e8efff] even:bg-[#f8faff] hover:bg-[#e3e7f0] odd:dark:bg-card/30 even:dark:bg-card/70 transition-colors duration-300">
                                <td className="p-2 text-center border-b-[1.5px] border-black/10">
                                    {(currentPage - 1) * itemsPerPage + idx + 1}
                                </td>
                                <td className="p-2 text-center border-b-[1.5px] border-black/10">{item.title}</td>
                                <td className="p-2 text-center border-b-[1.5px] border-black/10">{formatUpperCase(item.applicable_gender)}</td>
                                <td className="p-2 text-center border-b-[1.5px] border-black/10">{item.duration} Days</td>
                                <td className="p-2 text-center border-b-[1.5px] border-black/10">{item.description}</td>
                                <td className="p-2 text-center border-b-[1.5px] border-black/10">
                                    <div className="flex justify-center items-center gap-2">
                                        <EditSpecial initialData={item} onFormSubmit={onFormSubmit} />
                                        <Switch checked={item.is_active} onClick={() => onToggle(item.id_special, item.is_active)} />
                                    </div>
                                </td>
                            </tr>
                        ))
                    )}
                </tbody>
            </table>
        </div>
    )
}