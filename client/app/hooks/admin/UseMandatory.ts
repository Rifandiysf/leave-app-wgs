// hooks/useMandatoryLeaveData.ts
'use client';

import { getMandatoryLeaves } from "@/lib/api/service/leave";
import { PaginationInfo } from "@/lib/type";
import { useReducer, useState, useEffect, useCallback } from "react";

export type MandatoryLeaveType = {
    id_mandatory: string;
    title: string;
    is_active: boolean;
    description: string;
    start_date: string;
    end_date: string;
};

export interface MandatoryState {
    currentPage: number;
    search: string;
    debouncedSearch: string;
}

export type MandatoryAction =
    | { type: "SET_PAGE"; payload: number }
    | { type: "SET_SEARCH"; payload: string }
    | { type: "SET_DEBOUNCED_SEARCH"; payload: string };

const initialState: MandatoryState = {
    currentPage: 1,
    search: "",
    debouncedSearch: "",
};

function mandatoryReducer(state: MandatoryState, action: MandatoryAction): MandatoryState {
    switch (action.type) {
        case "SET_PAGE":
            return { ...state, currentPage: action.payload };
        case "SET_SEARCH":
            return { ...state, search: action.payload };
        case "SET_DEBOUNCED_SEARCH":
            return { ...state, debouncedSearch: action.payload, currentPage: 1 };
        default:
            return state;
    }
}

export const itemPerPage = 7;

export function useMandatoryLeaveData() {
    const [state, dispatch] = useReducer(mandatoryReducer, initialState);
    const [isLoading, setIsLoading] = useState(true);
    const [dataMandatoryLeave, setDataMandatoryLeave] = useState<MandatoryLeaveType[]>([]);
    const [paginationInfo, setPaginationInfo] = useState<PaginationInfo | null>(null);

    // debounce search
    useEffect(() => {
        const handler = setTimeout(() => {
            dispatch({ type: "SET_DEBOUNCED_SEARCH", payload: state.search });
        }, 500);
        return () => clearTimeout(handler);
    }, [state.search]);

    const fetchMandatoryLeaves = useCallback(async () => {
        setIsLoading(true);
        try {
            const result = await getMandatoryLeaves({
                currentPage: state.currentPage,
                limit: itemPerPage,
                debouncedSearch: state.debouncedSearch,
            });

            setDataMandatoryLeave(result.data || []);
            setPaginationInfo(result.pagination || null);

            if (
                result.pagination &&
                state.currentPage > result.pagination.last_visible_page &&
                result.pagination.last_visible_page > 0
            ) {
                dispatch({ type: "SET_PAGE", payload: result.pagination.last_visible_page });
            }
        } catch (err: any) {
            console.error("Error fetching mandatory leaves:", err.response?.data?.message || err.message);
            setDataMandatoryLeave([]);
            setPaginationInfo(null);
        } finally {
            setIsLoading(false);
        }
    }, [state.currentPage, state.debouncedSearch]);

    useEffect(() => {
        fetchMandatoryLeaves();
    }, [fetchMandatoryLeaves]);

    return { state, dispatch, isLoading, dataMandatoryLeave, paginationInfo };
}
