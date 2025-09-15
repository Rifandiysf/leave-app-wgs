'use client';

import React from 'react';
import {
    Select, SelectContent, SelectGroup, SelectItem, SelectLabel,
    SelectTrigger, SelectValue
} from "@/app/components/ui/select";
import { EmployeeState, EmployeeAction } from "@/app/hooks/admin/UseEmployeeListData";

interface EmployeeListFiltersProps {
    state: EmployeeState;
    dispatch: React.Dispatch<EmployeeAction>;
}

export const EmployeeListFilters = ({ state, dispatch }: EmployeeListFiltersProps) => {

    return (
        <section className="p-5">
            {/* Desktop Layout */}
            <div className="hidden sm:flex justify-between items-center">
                <h1 className="text-2xl font-bold text-foreground">Employee List</h1>
                <div className="flex items-center gap-3">
                    <input
                        type="text"
                        value={state.searchTerm}
                        onChange={(e) => dispatch({ type: 'SET_SEARCH', payload: e.target.value })}
                        placeholder="Search..."
                        className="w-full px-4 py-2 border rounded-lg bg-gray-50 dark:bg-card text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
                    />

                    {/* Gender Filter */}
                    <Select
                        onValueChange={(value) => dispatch({ type: 'SET_GENDER', payload: value === 'all' ? null : value })}
                    >
                        <SelectTrigger className="min-w-[120px]">
                            <SelectValue placeholder="Gender" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectGroup>
                                <SelectLabel>Gender</SelectLabel>
                                <SelectItem value="all">All</SelectItem>
                                <SelectItem value="true">Male</SelectItem>
                                <SelectItem value="false">Female</SelectItem>
                            </SelectGroup>
                        </SelectContent>
                    </Select>

                    {/* Status Filter */}
                    <Select
                        onValueChange={(value) => dispatch({ type: 'SET_STATUS', payload: value === 'all' ? null : value })}
                    >
                        <SelectTrigger className="min-w-[120px]">
                            <SelectValue placeholder="Role" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectGroup>
                                <SelectLabel>Status</SelectLabel>
                                <SelectItem value="all">All</SelectItem>
                                <SelectItem value="Tetap">Tetap</SelectItem>
                                <SelectItem value="Kontrak">Kontrak</SelectItem>
                            </SelectGroup>
                        </SelectContent>
                    </Select>

                    {/* Role Filter */}
                    <Select
                        onValueChange={(value) => dispatch({ type: 'SET_ACTIVE', payload: value === 'all' ? null : value })}
                    >
                        <SelectTrigger className="min-w-[180px]">
                            <SelectValue placeholder="Status" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectGroup>
                                <SelectLabel>Status</SelectLabel>
                                <SelectItem value="all">All</SelectItem>
                                <SelectItem value="true">Active</SelectItem>
                                <SelectItem value="false">Resign</SelectItem>
                            </SelectGroup>
                        </SelectContent>
                    </Select>
                </div>
            </div>

            {/* Mobile Layout */}
            <div className="sm:hidden space-y-3">
                <h1 className="text-2xl font-bold text-foreground text-center">Employee List</h1>
                <input
                    type="text"
                    value={state.searchTerm}
                    onChange={(e) => dispatch({ type: 'SET_SEARCH', payload: e.target.value })}
                    placeholder="Search..."
                    className="w-full px-4 py-2 border rounded-lg bg-gray-50 dark:bg-card text-foreground text-sm"
                />
                <div className="flex w-full gap-2">
                    <div className="flex-1">
                        <Select
                            onValueChange={(value) => dispatch({ type: 'SET_GENDER', payload: value === 'all' ? null : value })}
                        >
                            <SelectTrigger><SelectValue placeholder="Gender" /></SelectTrigger>
                            <SelectContent>
                                <SelectGroup>
                                    <SelectLabel>Gender</SelectLabel>
                                    <SelectItem value="all">All</SelectItem>
                                    <SelectItem value="true">Male</SelectItem>
                                    <SelectItem value="false">Female</SelectItem>
                                </SelectGroup>
                            </SelectContent>
                        </Select>
                    </div>
                    <div className="flex-1">
                        <Select
                            onValueChange={(value) => dispatch({ type: 'SET_STATUS', payload: value === 'all' ? null : value })}
                        >
                            <SelectTrigger className="min-w-[120px]">
                                <SelectValue placeholder="Role" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectGroup>
                                    <SelectLabel>Status</SelectLabel>
                                    <SelectItem value="all">All</SelectItem>
                                    <SelectItem value="Tetap">Tetap</SelectItem>
                                    <SelectItem value="Kontrak">Kontrak</SelectItem>
                                </SelectGroup>
                            </SelectContent>
                        </Select>
                    </div>
                    <div className="flex-1">
                        <Select
                            onValueChange={(value) => dispatch({ type: 'SET_ACTIVE', payload: value === 'all' ? null : value })}
                        >
                            <SelectTrigger className="min-w-[180px]">
                                <SelectValue placeholder="Status" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectGroup>
                                    <SelectLabel>Status</SelectLabel>
                                    <SelectItem value="all">All</SelectItem>
                                    <SelectItem value="true">Active</SelectItem>
                                    <SelectItem value="false">Resign</SelectItem>
                                </SelectGroup>
                            </SelectContent>
                        </Select>
                    </div>
                </div>
            </div>
        </section>
    );
};
