// app/hooks/admin/useLeaveData.ts

'use client';

import { useReducer, useState, useEffect, useCallback } from 'react';
import { getLeaveRequests, getLeaveHistory, updateLeaveStatus } from '@/lib/api/service/admin';
import { PaginationInfo } from '@/lib/type';

// --- Tipe Data ---
export type ApiLeaveType = { NIK: string; fullname: string; id_leave: string; title: string; leave_type: string; start_date: string; end_date: string; total_days: number; reason: string; status: string; tb_leave_log: any; name: string; };

// --- State Management ---
export interface LeaveState { viewMode: 'requests' | 'history' | null; currentPage: number; search: string; debouncedSearch: string; leaveType: string | null; status: string | null; }
export type LeaveAction = | { type: 'SET_VIEW_MODE'; payload: 'requests' | 'history' } | { type: 'RESET_VIEW' } | { type: 'SET_PAGE'; payload: number } | { type: 'SET_SEARCH'; payload: string } | { type: 'SET_DEBOUNCED_SEARCH'; payload: string } | { type: 'SET_LEAVE_TYPE'; payload: string | null } | { type: 'SET_STATUS'; payload: string | null };

const initialState: LeaveState = { viewMode: null, currentPage: 1, search: "", debouncedSearch: "", leaveType: null, status: null };

function reducer(state: LeaveState, action: LeaveAction): LeaveState {
    switch (action.type) {
        case 'SET_VIEW_MODE': return { ...state, viewMode: action.payload };
        case 'RESET_VIEW': return { ...initialState };
        case 'SET_PAGE': return { ...state, currentPage: action.payload };
        case 'SET_SEARCH': return { ...state, search: action.payload };
        case 'SET_DEBOUNCED_SEARCH': return { ...state, debouncedSearch: action.payload, currentPage: 1 };
        case 'SET_LEAVE_TYPE': return { ...state, leaveType: action.payload, currentPage: 1 };
        case 'SET_STATUS': return { ...state, status: action.payload, currentPage: 1 };
        default: return state;
    }
}

const itemPerPage = 7;

export function useLeaveData() {
    const [state, dispatch] = useReducer(reducer, initialState);
    const [isLoading, setIsLoading] = useState(false);
    const [leaveData, setLeaveData] = useState<ApiLeaveType[]>([]);
    const [paginationInfo, setPaginationInfo] = useState<PaginationInfo | null>(null);
    const [notification, setNotification] = useState<{ show: boolean; mode: 'success' | 'failed'; message: string }>({ show: false, mode: 'success', message: '' });

    useEffect(() => {
        const handler = setTimeout(() => dispatch({ type: 'SET_DEBOUNCED_SEARCH', payload: state.search }), 500);
        return () => clearTimeout(handler);
    }, [state.search]);
    
    useEffect(() => {
        const handleReset = () => dispatch({ type: 'RESET_VIEW' });
        window.addEventListener('resetLeaveView', handleReset);
        return () => window.removeEventListener('resetLeaveView', handleReset);
    }, []);

    const fetchData = useCallback(async () => {
        if (!state.viewMode) return;
        setIsLoading(true);
        setLeaveData([]);
        try {
            const fetcher = state.viewMode === 'requests' ? getLeaveRequests : getLeaveHistory;
            const result = await fetcher({
                currentPage: state.currentPage,
                limit: itemPerPage,
                searchTerm: state.debouncedSearch,
                leaveType: state.leaveType,
                status: state.status,
            });
            setLeaveData(result?.data || []);
            setPaginationInfo(result?.pagination || null);
        } catch (error) {
            console.error("Failed to fetch data:", error);
            setLeaveData([]);
        } finally {
            setIsLoading(false);
        }
    }, [state.viewMode, state.currentPage, state.debouncedSearch, state.leaveType, state.status]);

    useEffect(() => {
        fetchData();
    }, [fetchData]);

    const handleAction = async (id: string, newStatus: 'approved' | 'rejected', reason?: string) => {
        try {
            const response = await updateLeaveStatus(id, newStatus, reason);
            setNotification({ show: true, mode: 'success', message: response.message });
            fetchData(); // Re-fetch data to update the list
        } catch (error: any) {
            const message = error.response?.data?.message || `Failed to ${newStatus} request`;
            setNotification({ show: true, mode: 'failed', message });
            console.error(`Failed to ${newStatus} request:`, error);
        }
    };
    
    const closeNotification = () => setNotification(prev => ({ ...prev, show: false }));

    return { state, dispatch, isLoading, leaveData, paginationInfo, itemPerPage, handleAction, notification, closeNotification };
}