'use client';

import { useReducer, useState, useEffect, useCallback } from 'react';
import { getEmployeeList } from '@/lib/api/service/admin';
import { PaginationInfo } from '@/lib/type';

// --- Tipe Data ---
export type Employee = {
    nik: string;
    fullname: string;
    emailKantor: string;
    isMale: boolean;
    isActive: boolean;
    tanggalMasukKerja: string;
    role: {
        id: number;
        name: string
    };
    status: {
        id: number;
        name: string
    };
    last_year_leave?: number;
    this_year_leave?: number;
    leave_total?: number;
};

// --- State Management ---
export interface EmployeeState {
    currentPage: number;
    searchTerm: string;
    genderFilter: string | null;
    statusFilter: string | null;
    roleFilter: string | null;
    activeFilter: string | null;
}

export type EmployeeAction =
    | { type: 'SET_PAGE'; payload: number }
    | { type: 'SET_SEARCH'; payload: string }
    | { type: 'SET_GENDER'; payload: string | null }
    | { type: 'SET_STATUS'; payload: string | null }
    | { type: 'SET_ROLE'; payload: string | null }
    | { type: 'SET_ACTIVE'; payload: string | null };

const initialState: EmployeeState = {
    currentPage: 1,
    searchTerm: "",
    genderFilter: null,
    statusFilter: "",
    roleFilter: "",
    activeFilter: null
};

function reducer(state: EmployeeState, action: EmployeeAction): EmployeeState {
    switch (action.type) {
        case 'SET_PAGE': return { ...state, currentPage: action.payload };
        case 'SET_SEARCH': return { ...state, searchTerm: action.payload, currentPage: 1 };
        case 'SET_GENDER': return { ...state, genderFilter: action.payload, currentPage: 1 };
        case 'SET_STATUS': return { ...state, statusFilter: action.payload, currentPage: 1 };
        case 'SET_ROLE': return { ...state, roleFilter: action.payload, currentPage: 1 };
        case 'SET_ACTIVE': return { ...state, activeFilter: action.payload, currentPage: 1 };
        default: return state;
    }
}

const itemPerPage = 7;

export function useEmployeeData() {
    const [state, dispatch] = useReducer(reducer, initialState);
    const [debouncedSearch, setDebouncedSearch] = useState("");
    const [isLoading, setIsLoading] = useState(true);
    const [employees, setEmployees] = useState<Employee[]>([]);
    const [paginationInfo, setPaginationInfo] = useState<PaginationInfo | null>(null);

    useEffect(() => {
        const handler = setTimeout(() => setDebouncedSearch(state.searchTerm), 500);
        return () => clearTimeout(handler);
    }, [state.searchTerm]);

    const fetchData = useCallback(async () => {
        setIsLoading(true); // Cukup set loading ke true
        try {
            const result = await getEmployeeList({
                currentPage: state.currentPage,
                limit: itemPerPage,
                searchTerm: debouncedSearch,
                genderFilter: state.genderFilter,
                statusFilter: state.statusFilter,
                roleFilter: state.roleFilter,
                activeFilter: state.activeFilter,
            });
            setEmployees(result?.data?.data || result?.data || []);
            setPaginationInfo(result?.pagination || null);
        } catch (error) {
            console.error("Failed to fetch employee data:", error);
        } finally {
            setIsLoading(false);
        }
    }, [state.currentPage, debouncedSearch, state.genderFilter, state.statusFilter, state.roleFilter, state.activeFilter]);

    useEffect(() => {
        fetchData();
    }, [fetchData]);

    return { state, dispatch, isLoading, employees, paginationInfo, itemPerPage };
}