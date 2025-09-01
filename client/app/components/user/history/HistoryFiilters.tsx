'use client';

import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from "@/app/components/ui/select";
import { HistoryState, HistoryAction } from "@/app/hooks/user/UseHistoryData";

interface HistoryFiltersProps {
    state: HistoryState;
    dispatch: React.Dispatch<HistoryAction>;
}

export const HistoryFilters = ({ state, dispatch }: HistoryFiltersProps) => {
    return (
        <div className="mb-4">
            {/* Desktop Layout */}
            <div className='hidden sm:flex justify-between items-center gap-3'>
                <h1 className="text-2xl sm:text-3xl font-bold text-foreground truncate">History</h1>
                <div className="flex items-center gap-3">
                    <input
                        type="text"
                        placeholder="Search By Title..."
                        value={state.search}
                        onChange={(e) => dispatch({ type: 'SET_SEARCH', payload: e.target.value })}
                        className="w-full px-4 py-2 border rounded-lg bg-gray-50 text-foreground dark:bg-card text-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
                    />
                    <Select onValueChange={(value) => dispatch({ type: 'SET_STATUS', payload: value === 'all' ? null : value })}>
                        <SelectTrigger className="min-w-[120px]"><SelectValue placeholder="Status" /></SelectTrigger>
                        <SelectContent><SelectGroup>
                            <SelectLabel>Status Leave</SelectLabel>
                            <SelectItem value="all">All</SelectItem>
                            <SelectItem value="pending">Pending</SelectItem>
                            <SelectItem value="approved">Approved</SelectItem>
                            <SelectItem value="rejected">Rejected</SelectItem>
                        </SelectGroup></SelectContent>
                    </Select>
                    <Select onValueChange={(value) => dispatch({ type: 'SET_LEAVE_TYPE', payload: value === 'all' ? null : value })}>
                        <SelectTrigger className="min-w-[140px]"><SelectValue placeholder="Type leave" /></SelectTrigger>
                        <SelectContent><SelectGroup>
                            <SelectLabel>Type Leave</SelectLabel>
                            <SelectItem value="all">All</SelectItem>
                            <SelectItem value="personal">Personal</SelectItem>
                            <SelectItem value="mandatory">Mandatory</SelectItem>
                            <SelectItem value="special">Special</SelectItem>
                        </SelectGroup></SelectContent>
                    </Select>
                </div>
            </div>

            {/* Mobile Layout */}
            <div className='flex flex-col gap-3 sm:hidden'>
                <h1 className="text-xl font-semibold text-foreground text-center">History</h1>
                <div className="flex items-center gap-2">
                    <input
                        type="text"
                        placeholder="Search..."
                        value={state.search}
                        onChange={(e) => dispatch({ type: 'SET_SEARCH', payload: e.target.value })}
                        className="w-full flex-1 px-4 py-2 border rounded-lg bg-gray-50 text-foreground dark:bg-card text-sm"
                    />
                    <Select onValueChange={(value) => dispatch({ type: 'SET_STATUS', payload: value === 'all' ? null : value })}>
                        <SelectTrigger className="px-3"><SelectValue placeholder="Status" /></SelectTrigger>
                        <SelectContent><SelectGroup>
                            <SelectLabel>Status Leave</SelectLabel>
                            <SelectItem value="all">All</SelectItem>
                            <SelectItem value="pending">Pending</SelectItem>
                            <SelectItem value="approved">Approved</SelectItem>
                            <SelectItem value="rejected">Rejected</SelectItem>
                        </SelectGroup></SelectContent>
                    </Select>
                    <Select onValueChange={(value) => dispatch({ type: 'SET_LEAVE_TYPE', payload: value === 'all' ? null : value })}>
                        <SelectTrigger className="px-3"><SelectValue placeholder="Type" /></SelectTrigger>
                        <SelectContent><SelectGroup>
                            <SelectLabel>Type Leave</SelectLabel>
                            <SelectItem value="all">All</SelectItem>
                            <SelectItem value="personal">Personal</SelectItem>
                            <SelectItem value="mandatory">Mandatory</SelectItem>
                            <SelectItem value="special">Special</SelectItem>
                        </SelectGroup></SelectContent>
                    </Select>
                </div>
            </div>
        </div>
    );
};
