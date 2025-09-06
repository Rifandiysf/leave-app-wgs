'use client';

import { useReducer, useState, useEffect, useCallback } from 'react';
import { getAdjustHistoryLogs } from '@/lib/api/service/user';
import { PaginationInfo } from '@/lib/type';

// --- Tipe Data ---
export type HistoryLog = { NIK: string; name: string; adjustment_value: number; balance_year: string; date: string; time: string; actor: string; notes: string; id?: string; };

// --- State Management ---
export interface AdjustHistoryState { currentPage: number; searchTerm: string; debouncedSearch: string; yearFilter: string | null; }
export type AdjustHistoryAction = | { type: 'SET_PAGE'; payload: number } | { type: 'SET_SEARCH'; payload: string } | { type: 'SET_DEBOUNCED_SEARCH'; payload: string } | { type: 'SET_YEAR_FILTER'; payload: string | null };

const initialState: AdjustHistoryState = { currentPage: 1, searchTerm: "", debouncedSearch: "", yearFilter: null };

function reducer(state: AdjustHistoryState, action: AdjustHistoryAction): AdjustHistoryState {
    switch (action.type) {
        case 'SET_PAGE': return { ...state, currentPage: action.payload };
        case 'SET_SEARCH': return { ...state, searchTerm: action.payload };
        case 'SET_DEBOUNCED_SEARCH': return { ...state, debouncedSearch: action.payload, currentPage: 1 };
        case 'SET_YEAR_FILTER': return { ...state, yearFilter: action.payload, currentPage: 1 };
        default: return state;
    }
}

const itemPerPage = 7;

export function useAdjustHistoryData() {
    const [state, dispatch] = useReducer(reducer, initialState);
    const [isLoading, setIsLoading] = useState(true);
    const [history, setHistory] = useState<HistoryLog[]>([]);
    const [paginationInfo, setPaginationInfo] = useState<PaginationInfo | null>(null);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const handler = setTimeout(() => {
            dispatch({ type: 'SET_DEBOUNCED_SEARCH', payload: state.searchTerm });
        }, 500);
        return () => clearTimeout(handler);
    }, [state.searchTerm]);

    const fetchData = useCallback(async () => {
        setIsLoading(true);
        setError(null);
        setHistory([]);
        setPaginationInfo(null);
        try {
            const result = await getAdjustHistoryLogs({
                currentPage: state.currentPage,
                limit: itemPerPage,
                debouncedSearch: state.debouncedSearch,
                yearFilter: state.yearFilter,
            });

            if (result.success) {
                setHistory(result.data || []);
                setPaginationInfo(result.pagination);
            } else {
                throw new Error(result.message || 'An unknown error occurred');
            }
        } catch (err: any) {
            console.error('Error fetching adjustment history:', err);
            setError(err.message);
        } finally {
            setIsLoading(false);
        }
    }, [state.currentPage, state.debouncedSearch, state.yearFilter]);

    useEffect(() => {
        fetchData();
    }, [fetchData]);

    return { state, dispatch, isLoading, error, history, paginationInfo, itemPerPage };
}