'use client';

import { useState, useEffect, useCallback } from "react";
import { 
    getDashboardStatistics, 
    getDashboardTrend, 
    getDashboardLeaderboard, 
    getDashboardPendingLeave 
} from "@/lib/api/service/admin";

// --- Tipe Data ---
export interface DashboardStats {
    totalEmployees?: { total: number; activeEmployees: number; resignEmployees: number; };
    thisYearLeave?: number;
    weeklyLeave?: number;
    pendingLeaves?: number;
    availableYears?: number[];
}
export type LeaderboardUserType = { nik: string; name: string; role: string; total_amount: number; this_year: number; last_year: number; average_leave: string; };
export type PendingLeaveRequestType = { NIK: string; name: string; role?: string; type: string; start_date: string; end_date: string; duration: string; status: string; };
export type MonthlyTrendType = { month: string; mandatory_leave: number; special_leave: number; personal_leave: number; };

/**
 * Custom hook untuk mengambil semua data yang dibutuhkan oleh dasbor admin.
 * @param {number} year - Tahun yang dipilih untuk data tren.
 */
export function useDashboardData(year: number) {
    const [stats, setStats] = useState<DashboardStats>({});
    const [leaderboard, setLeaderboard] = useState<{ top: LeaderboardUserType[]; bottom: LeaderboardUserType[] }>({ top: [], bottom: [] });
    const [trendData, setTrendData] = useState<MonthlyTrendType[]>([]);
    const [pendingLeaveRequests, setPendingLeaveRequests] = useState<PendingLeaveRequestType[]>([]);
    const [availableYears, setAvailableYears] = useState<number[]>([new Date().getFullYear()]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    const fetchDashboardData = useCallback(async () => {
        setIsLoading(true);
        setError(null);
        try {
            const [statsRes, trendRes, leaderboardRes, pendingLeaveRes] = await Promise.all([
                getDashboardStatistics(),
                getDashboardTrend(year),
                getDashboardLeaderboard(),
                getDashboardPendingLeave()
            ]);

            setStats(statsRes.data || {});
            setTrendData(trendRes.data?.trend || []);
            setLeaderboard({ top: leaderboardRes.data?.most_used || [], bottom: leaderboardRes.data?.least_used || [] });
            setPendingLeaveRequests(pendingLeaveRes.data?.pendingLeaveList?.data || []);
            
            const yearsFromServer = statsRes.data?.availableYears;
            if (yearsFromServer?.length > 0) {
                const yearSet = new Set([...yearsFromServer, year]);
                setAvailableYears(Array.from(yearSet).sort((a, b) => b - a));
            }

        } catch (err) {
            console.error("Terjadi kesalahan saat mengambil data dasbor:", err);
            setError("Gagal memuat data dasbor. Silakan coba lagi nanti.");
            setStats({});
            setTrendData([]);
            setLeaderboard({ top: [], bottom: [] });
            setPendingLeaveRequests([]);
        } finally {
            setIsLoading(false);
        }
    }, [year]);

    useEffect(() => {
        fetchDashboardData();
    }, [fetchDashboardData]);

    return { stats, leaderboard, trendData, pendingLeaveRequests, availableYears, isLoading, error };
}
