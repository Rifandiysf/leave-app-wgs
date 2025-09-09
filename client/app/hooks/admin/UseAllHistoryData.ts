import { useReducer, useEffect } from 'react';
import { fetchUserHistory } from '@/lib/api/service/admin';
import { Employee } from './UseEmployeeListData';

// INTERFACE DIPERBARUI: Menambahkan rawData untuk menyimpan data asli dari API
interface HistoryItem {
    date: string;
    type: 'Leave Request' | 'Adjustment';
    description: string;
    status: string;
    created_at: string;
    rawData: any; // Menyimpan objek data asli
}

interface PaginationInfo {
    current_page: number;
    last_visible_page: number;
    has_next_page: boolean;
    item: {
        count: number;
        total: number;
        per_page: number;
    };
}

interface HistoryState {
    isLoading: boolean;
    history: HistoryItem[];
    error: string | null;
    currentPage: number;
    paginationInfo: PaginationInfo | null;
}

type HistoryAction =
    | { type: 'SET_PAGE'; payload: number }
    | { type: 'FETCH_START' }
    | { type: 'FETCH_SUCCESS'; payload: { data: HistoryItem[]; pagination: PaginationInfo } }
    | { type: 'FETCH_ERROR'; payload: string }
    | { type: 'RESET' };

// State awal
const initialState: HistoryState = {
    isLoading: false,
    history: [],
    error: null,
    currentPage: 1,
    paginationInfo: null,
};

// Reducer untuk mengelola state
const historyReducer = (state: HistoryState, action: HistoryAction): HistoryState => {
    switch (action.type) {
        case 'SET_PAGE':
            return { ...state, currentPage: action.payload };
        case 'FETCH_START':
            return { ...state, isLoading: true, error: null };
        case 'FETCH_SUCCESS':
            return { ...state, isLoading: false, history: action.payload.data, paginationInfo: action.payload.pagination };
        case 'FETCH_ERROR':
            return { ...state, isLoading: false, error: action.payload, history: [] };
        case 'RESET':
            return initialState;
        default:
            return state;
    }
};

// Props untuk custom hook
interface UseAllHistoryDataProps {
    user: Employee | null;
    isOpen: boolean;
}

const PAGE_SIZE = 7;

// Custom Hook Utama
export const useAllHistoryData = ({ user, isOpen }: UseAllHistoryDataProps) => {
    const [state, dispatch] = useReducer(historyReducer, initialState);

    useEffect(() => {
        const loadData = async () => {
            if (!user?.nik) return;

            dispatch({ type: 'FETCH_START' });

            try {
                const response: any = await fetchUserHistory(user.nik, state.currentPage, PAGE_SIZE);
                const rawData = response.data;


                if (!Array.isArray(rawData)) throw new Error("Format data tidak sesuai");

                const processedHistory: HistoryItem[] = rawData.map((item: any): HistoryItem => {
                    if (item.data_source === 'leave') {
                        return {
                            type: 'Leave Request',
                            date: item.created_at,
                            created_at: item.created_at,
                            description: item.reason || item.title || 'No description provided',
                            status: item.status || 'Unknown',
                            rawData: item // <-- Data asli disimpan di sini
                        };
                    } else {
                        const value = item.adjustment_value || 0;
                        const sign = value > 0 ? '+' : '';
                        return {
                            type: 'Adjustment',
                            date: item.created_at,
                            created_at: item.created_at,
                            description: `[${sign}${value} days] ${item.notes || 'No notes'}`,
                            status: 'Completed',
                            rawData: item // <-- Data asli disimpan di sini
                        };
                    }
                }).sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

                dispatch({ type: 'FETCH_SUCCESS', payload: { data: processedHistory, pagination: response.pagination } });
            } catch (err: any) {
                dispatch({ type: 'FETCH_ERROR', payload: err.message || "Gagal memuat data." });
            }
        };

        if (isOpen) {
            loadData();
        } else {
            dispatch({ type: 'RESET' });
        }
    }, [isOpen, user?.nik, state.currentPage]);

    return { state, dispatch };
};