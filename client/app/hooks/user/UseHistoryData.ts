'use client';

import { useReducer, useState, useEffect, useCallback } from 'react';
import { getLeaveHistory } from '@/lib/api/service/user'; 
import { PaginationInfo } from '@/lib/type';
export type LeaveHistoryType = { id_leave: string; leave_type: string; start_date: string; end_date: string; title: string; reason: string; status: string; total_days: number; tb_leave_log: { reason: string; tb_users: { fullname: string } } };

export interface HistoryState {
    currentPage: number;
    search: string;
    debouncedSearch: string;
    status: string | null;
    leaveType: string | null;
}
export type HistoryAction = | { type: 'SET_PAGE'; payload: number } | { type: 'SET_SEARCH'; payload: string } | { type: 'SET_DEBOUNCED_SEARCH'; payload: string } | { type: 'SET_STATUS'; payload: string | null } | { type: 'SET_LEAVE_TYPE'; payload: string | null };

const initialState: HistoryState = { currentPage: 1, search: "", debouncedSearch: "", status: null, leaveType: null, };
function historyReducer(state: HistoryState, action: HistoryAction): HistoryState {
    switch (action.type) {
        case 'SET_PAGE': return { ...state, currentPage: action.payload };
        case 'SET_SEARCH': return { ...state, search: action.payload };
        case 'SET_DEBOUNCED_SEARCH': return { ...state, debouncedSearch: action.payload, currentPage: 1 };
        case 'SET_STATUS': return { ...state, status: action.payload, currentPage: 1 };
        case 'SET_LEAVE_TYPE': return { ...state, leaveType: action.payload, currentPage: 1 };
        default: return state;
    }
}

const itemPerPage = 7;

export function useHistoryData() {
    const [state, dispatch] = useReducer(historyReducer, initialState);
    const [isLoading, setIsLoading] = useState(true);
    const [dataHistoryLeave, setDataHistoryLeave] = useState<LeaveHistoryType[]>([]);
    const [paginationInfo, setPaginationInfo] = useState<PaginationInfo | null>(null);

    useEffect(() => {
        const handler = setTimeout(() => {
            dispatch({ type: 'SET_DEBOUNCED_SEARCH', payload: state.search });
        }, 500);
        return () => clearTimeout(handler);
    }, [state.search]);

    const fetchHistoryLeaves = useCallback(async () => {
        setIsLoading(true);
        setDataHistoryLeave([]);
        setPaginationInfo(null);
        try {
            const result = await getLeaveHistory({
                currentPage: state.currentPage,
                limit: itemPerPage,
                leaveType: state.leaveType,
                status: state.status,
                debouncedSearch: state.debouncedSearch,
            });
            setDataHistoryLeave(result.data || []);
            setPaginationInfo(result.pagination || null);

            if (result.pagination && state.currentPage > result.pagination.last_visible_page && result.pagination.last_visible_page > 0) {
                dispatch({ type: 'SET_PAGE', payload: result.pagination.last_visible_page });
            }
        } catch (err: any) {
            console.error('Error fetching history leaves:', err.response?.data?.message || err.message);
        } finally {
            setIsLoading(false);
        }
    }, [state.currentPage, state.debouncedSearch, state.leaveType, state.status]);

    useEffect(() => {
        fetchHistoryLeaves();
    }, [fetchHistoryLeaves]);

    return { state, dispatch, isLoading, dataHistoryLeave, paginationInfo, itemPerPage };
}