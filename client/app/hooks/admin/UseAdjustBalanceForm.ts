
'use client';

import { useReducer, useEffect, useCallback } from 'react';
import { useRouter } from "next/navigation";
import { jwtDecode } from "jwt-decode";
import { searchUsers, updateUserBalance } from '@/lib/api/service/admin';

// --- Tipe Data ---
export type UserSearchResult = {
    nik: string;
    fullname: string;
    this_year_leave: number;
    last_year_leave: number;
    last_two_year_leave: number; 
};
type JwtPayload = { nik: string; };
type LeaveType = "last_year_leave" | "this_year_leave" | "last_two_year";
type AdjustmentType = "add" | "reduce";

// --- State Management ---
interface FormState {
    nik: string;
    debouncedSearch: string;
    selectedUser: UserSearchResult | null;
    adjustmentAmount: number;
    adjustmentType: AdjustmentType;
    information: string;
    selectedYear: string;
    searchResults: UserSearchResult[];
    isSearching: boolean;
    isSubmitting: boolean;
    error: string | null;
    success: string | null;
    isSelfEdit: boolean;
}

type FormAction =
    | { type: 'SET_FIELD'; field: keyof FormState; payload: any }
    | { type: 'SELECT_USER'; payload: { user: UserSearchResult; currentAdminNik: string } }
    | { type: 'RESET_SEARCH' }
    | { type: 'RESET_FORM' }
    | { type: 'SUBMIT_START' }
    | { type: 'SUBMIT_SUCCESS'; payload: string }
    | { type: 'SUBMIT_ERROR'; payload: string }
    | { type: 'CLEAR_NOTIFICATIONS' };

const thisYear = new Date().getFullYear().toString();

const initialState: FormState = {
    nik: "",
    debouncedSearch: "",
    selectedUser: null,
    adjustmentAmount: 0,
    adjustmentType: "add",
    information: "",
    selectedYear: thisYear,
    searchResults: [],
    isSearching: false,
    isSubmitting: false,
    error: null,
    success: null,
    isSelfEdit: false,
};

function formReducer(state: FormState, action: FormAction): FormState {
    switch (action.type) {
        case 'SET_FIELD':
            if (action.field === 'adjustmentType' || action.field === 'selectedYear') {
                return { ...state, adjustmentAmount: 0, [action.field]: action.payload };
            }
            return { ...state, [action.field]: action.payload };
        
        case 'SELECT_USER': {
            const { user, currentAdminNik } = action.payload;
            return {
                ...state,
                selectedUser: user,
                nik: user.nik,
                isSelfEdit: user.nik === currentAdminNik,
                searchResults: [],
                isSearching: false,
                error: null,
                success: null,
            };
        }
        case 'RESET_SEARCH':
            return {
                ...state,
                nik: "",
                debouncedSearch: "",
                selectedUser: null,
                searchResults: [],
                isSelfEdit: false,
            };
        case 'RESET_FORM':
            return { ...initialState };
        case 'SUBMIT_START':
            return { ...state, isSubmitting: true, error: null, success: null };
        case 'SUBMIT_SUCCESS':
            return { ...state, isSubmitting: false, success: action.payload };
        case 'SUBMIT_ERROR':
            return { ...state, isSubmitting: false, error: action.payload };
        case 'CLEAR_NOTIFICATIONS':
            return { ...state, error: null, success: null };
        default:
            return state;
    }
}

export function UseAdjustBalanceForm() {
    const [state, dispatch] = useReducer(formReducer, initialState);
    const router = useRouter();

    useEffect(() => {
        const handler = setTimeout(() => {
            dispatch({ type: 'SET_FIELD', field: 'debouncedSearch', payload: state.nik });
        }, 500);
        return () => clearTimeout(handler);
    }, [state.nik]);

    useEffect(() => {
        if (!state.debouncedSearch.trim() || state.selectedUser) {
            dispatch({ type: 'SET_FIELD', field: 'searchResults', payload: [] });
            return;
        }
        const performSearch = async () => {
            dispatch({ type: 'SET_FIELD', field: 'isSearching', payload: true });
            try {
                const result = await searchUsers(state.debouncedSearch);
                const users = result?.data?.data || result?.data || [];
                dispatch({ type: 'SET_FIELD', field: 'searchResults', payload: users });
            } catch (error) {
                console.error("Failed to search users:", error);
                dispatch({ type: 'SET_FIELD', field: 'searchResults', payload: [] });
            } finally {
                dispatch({ type: 'SET_FIELD', field: 'isSearching', payload: false });
            }
        };
        performSearch();
    }, [state.debouncedSearch, state.selectedUser]);

    const handleUserSelect = useCallback((user: UserSearchResult) => {
        let currentAdminNik = '';
        try {
            const token = localStorage.getItem("token");
            if (token) currentAdminNik = (jwtDecode(token) as JwtPayload).nik;
        } catch (e) { console.error("Gagal decode token:", e); }
        
        dispatch({ type: 'SELECT_USER', payload: { user, currentAdminNik } });
    }, []);

    const handleSubmit = async () => {
        if (!state.selectedUser || state.isSubmitting) return;
        
        dispatch({ type: 'SUBMIT_START' });

        const lastYear = (new Date().getFullYear() - 1).toString();
        const lastTwoYear = (new Date().getFullYear() - 2).toString();
        
        let leaveType: LeaveType;
        if (state.selectedYear === lastYear) {
            leaveType = "last_year_leave";
        } else if (state.selectedYear === lastTwoYear) {
            leaveType = "last_two_year";
        } else {
            leaveType = "this_year_leave";
        }
        
        const operation: "add_amount" | "reduce_amount" = 
            state.adjustmentType === 'add' ? 'add_amount' : 'reduce_amount';

        const payload = {
            operation: operation,
            adjustment_value: Number(state.adjustmentAmount),
            notes: state.information.trim(),
            leave_type: leaveType,
        };

        try {
            const response = await updateUserBalance(state.selectedUser.nik, payload);
            dispatch({ type: 'SUBMIT_SUCCESS', payload: response.message || "Balance updated successfully!" });
            
            setTimeout(() => dispatch({ type: 'RESET_FORM' }), 3000);
        } catch (error: any) {
            const errorMessage = error.response?.data?.message || "An unexpected error occurred.";
            dispatch({ type: 'SUBMIT_ERROR', payload: errorMessage });
        }
    };

    const closeNotification = () => {
        dispatch({ type: 'CLEAR_NOTIFICATIONS' });
    };

    return { state, dispatch, handleUserSelect, handleSubmit, closeNotification, router };
}