'use client';

import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from "@/app/components/ui/select";
import { AdjustHistoryState, AdjustHistoryAction } from "@/app/hooks/useAdjustHistoryData";

interface AdjustHistoryFiltersProps {
    state: AdjustHistoryState;
    dispatch: React.Dispatch<AdjustHistoryAction>;
}

export const AdjustHistoryFilters = ({ state, dispatch }: AdjustHistoryFiltersProps) => (
    <div className='mb-4'>
        {/* Desktop */}
        <div className='hidden md:flex justify-between items-center gap-3'>
            <h1 className="text-2xl font-bold text-foreground">Adjust History</h1>
            <div className="flex items-center gap-3">
                <input
                    type="text"
                    placeholder="Search..."
                    value={state.searchTerm}
                    onChange={(e) => dispatch({ type: 'SET_SEARCH', payload: e.target.value })}
                    className="w-full px-4 py-2 border rounded-lg bg-gray-50 text-foreground dark:bg-card text-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
                />
                <Select onValueChange={(value) => dispatch({ type: 'SET_YEAR_FILTER', payload: value === 'all' ? null : value })}>
                    <SelectTrigger className="min-w-[120px]"><SelectValue placeholder="Year" /></SelectTrigger>
                    <SelectContent><SelectGroup>
                        <SelectLabel>Balance Year</SelectLabel>
                        <SelectItem value="all">All</SelectItem>
                        <SelectItem value="2026">2026</SelectItem>
                        <SelectItem value="2025">2025</SelectItem>
                        <SelectItem value="2024">2024</SelectItem>
                    </SelectGroup></SelectContent>
                </Select>
            </div>
        </div>
        {/* Mobile */}
        <div className='md:hidden flex flex-col gap-4'>
            <h1 className="text-2xl font-bold text-foreground text-center">Adjust History</h1>
            <div className="flex items-center gap-3">
                <input
                    type="text"
                    placeholder="Search..."
                    value={state.searchTerm}
                    onChange={(e) => dispatch({ type: 'SET_SEARCH', payload: e.target.value })}
                    className="w-full px-4 py-2 border rounded-lg bg-gray-50 text-foreground dark:bg-card text-sm"
                />
                <Select onValueChange={(value) => dispatch({ type: 'SET_YEAR_FILTER', payload: value === 'all' ? null : value })}>
                    <SelectTrigger className="min-w-[120px]"><SelectValue placeholder="Year" /></SelectTrigger>
                    <SelectContent><SelectGroup>
                        <SelectLabel>Balance Year</SelectLabel>
                        <SelectItem value="all">All</SelectItem>
                        <SelectItem value="2026">2026</SelectItem>
                        <SelectItem value="2025">2025</SelectItem>
                        <SelectItem value="2024">2024</SelectItem>
                    </SelectGroup></SelectContent>
                </Select>
            </div>
        </div>
    </div>
);