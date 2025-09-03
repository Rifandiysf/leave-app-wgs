'use client'

import { useCallback, useEffect, useReducer, useState } from "react";
import { PaginationInfo, SpecialLeaveType } from "@/lib/type";
import { getSpecialLeaves } from "@/lib/api/service/leave";

export interface SpecialState {
    currentPage: number;
    search: string;
    debouncedSearch: string;
}

export type SpecialAction =
    | { type: "SET_PAGE"; payload: number }
    | { type: "SET_SEARCH"; payload: string }
    | { type: "SET_DEBOUNCED_SEARCH"; payload: string };

const initialState: SpecialState = {
    currentPage: 1,
    search: "",
    debouncedSearch: ""
};

function specialReducer(state: SpecialState, action: SpecialAction): SpecialState {
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

export function UseSpecialLeaveData() {
    const [state, dispatch] = useReducer(specialReducer, initialState);
    const [isLoading, setIsLoading] = useState(true)
    const [dataSpecialLeave, setDataSpecialLeave] = useState<SpecialLeaveType[]>([]);
    const [paginationInfo, setPaginationInfo] = useState<PaginationInfo | null>(null)

    //debounce search
    useEffect(() => {
        const handler = setTimeout(() => {
            dispatch({ type: "SET_DEBOUNCED_SEARCH", payload: state.search });
        }, 500);
        return () => clearTimeout(handler)
    },[state.search])

    const fetchSpecialLeaves = useCallback(async () => {
        setIsLoading(true);
        try {
            const result = await getSpecialLeaves({
                currentPage: state.currentPage,
                limit: itemPerPage,
                debouncedSearch: state.debouncedSearch
            });

            setDataSpecialLeave(result.data || []);
            setPaginationInfo(result.pagination || null);

            if (
                result.pagination &&
                state.currentPage > result.pagination.last_visible_page &&
                result.pagination.last_visible_page > 0
            ) {
                dispatch({ type: "SET_PAGE", payload: result.pagination.last_visible_page });
            }
        } catch (err: any) {
            console.error("Error fetching special leaves:", err.response?.data?.message || err.message);
            setDataSpecialLeave([]);
            setPaginationInfo(null)
        } finally {
            setIsLoading(false)
        }
    }, [state.currentPage, state.debouncedSearch]);

    useEffect(() => {
        fetchSpecialLeaves();
    }, [fetchSpecialLeaves])

    return { state, dispatch, isLoading, dataSpecialLeave, paginationInfo };
}