'use client';

import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from "@/app/components/ui/select";
import { LeaveState, LeaveAction } from "@/app/hooks/admin/UseLeaveData"; 

interface LeaveFiltersProps {
    state: LeaveState;
    dispatch: React.Dispatch<LeaveAction>;
}

export const LeaveFilters = ({ state, dispatch }: LeaveFiltersProps) => {
    return (
        <section className="flex flex-col sm:flex-row sm:justify-between sm:items-center p-5 border-b-[1.5px] border-border gap-4">
            <h1 className="text-2xl font-bold text-foreground text-center sm:text-left">
                {state.viewMode === 'requests' ? 'Leave Requests' : 'Leave History'}
            </h1>
            
            {/* Container for all filter controls */}
            <div className="flex items-center gap-2 w-full sm:w-auto">
                <input
                    type="text"
                    value={state.search}
                    onChange={(e) => dispatch({ type: 'SET_SEARCH', payload: e.target.value })}
                    placeholder="Search by name..."
                    className="w-full flex-1 px-4 py-2 border rounded-lg bg-gray-50 text-foreground dark:bg-card text-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
                />
                
                {state.viewMode === 'requests' ? (
                    <Select onValueChange={(value) => dispatch({ type: 'SET_LEAVE_TYPE', payload: value === 'all' ? null : value })}>
                        <SelectTrigger className="w-auto sm:min-w-[140px]">
                            <SelectValue placeholder="Type leave" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectGroup>
                                <SelectLabel>Type Leave</SelectLabel>
                                <SelectItem value="all">All</SelectItem>
                                <SelectItem value="personal_leave">Personal</SelectItem>
                                <SelectItem value="special_leave">Special</SelectItem>
                            </SelectGroup>
                        </SelectContent>
                    </Select>
                ) : (
                    <>
                        <Select onValueChange={(value) => dispatch({ type: 'SET_STATUS', payload: value === 'all' ? null : value })}>
                            <SelectTrigger className="w-auto sm:min-w-[120px]">
                                <SelectValue placeholder="Status" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectGroup>
                                    <SelectLabel>Status</SelectLabel>
                                    <SelectItem value="all">All</SelectItem>
                                    <SelectItem value="approved">Approved</SelectItem>
                                    <SelectItem value="rejected">Rejected</SelectItem>
                                </SelectGroup>
                            </SelectContent>
                        </Select>
                        <Select onValueChange={(value) => dispatch({ type: 'SET_LEAVE_TYPE', payload: value === 'all' ? null : value })}>
                            <SelectTrigger className="w-auto sm:min-w-[140px]">
                                <SelectValue placeholder="Type leave" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectGroup>
                                    <SelectLabel>Type Leave</SelectLabel>
                                    <SelectItem value="all">All</SelectItem>
                                    <SelectItem value="personal_leave">Personal</SelectItem>
                                    <SelectItem value="special_leave">Special</SelectItem>
                                </SelectGroup>
                            </SelectContent>
                        </Select>
                    </>
                )}
            </div>
        </section>
    );
};
