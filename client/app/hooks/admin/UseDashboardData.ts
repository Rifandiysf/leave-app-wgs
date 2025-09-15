'use client';

import { useState, useEffect } from "react";
import {
    getDashboardStatistics,
    getDashboardTrend,
    getDashboardLeaderboard,
    getDashboardPendingLeave
} from "@/lib/api/service/admin";

// (Tipe data tidak perlu diubah)
export interface DashboardStats { /* ... */ }
export type LeaderboardUserType = { /* ... */ };
export type PendingLeaveRequestType = { /* ... */ };
export type MonthlyTrendType = { /* ... */ };


export function useDashboardData(year: number) {
    const [stats, setStats] = useState<DashboardStats>({});
    const [leaderboard, setLeaderboard] = useState<{ top: LeaderboardUserType[]; bottom: LeaderboardUserType[] }>({ top: [], bottom: [] });
    const [pendingLeaveRequests, setPendingLeaveRequests] = useState<PendingLeaveRequestType[]>([]);
    const [availableYears, setAvailableYears] = useState<number[]>([]);
    const [trendData, setTrendData] = useState<MonthlyTrendType[]>([]);
    const [isInitialLoading, setIsInitialLoading] = useState(true);
    const [isTrendLoading, setIsTrendLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    // Efek untuk data yang dimuat sekali
    useEffect(() => {
        const fetchInitialData = async () => {
            setIsInitialLoading(true);
            setError(null);
            try {
                const [statsRes, leaderboardRes, pendingLeaveRes] = await Promise.all([
                    getDashboardStatistics(),
                    getDashboardLeaderboard(),
                    getDashboardPendingLeave()
                ]);

                setStats(statsRes.data || {});
                setLeaderboard({ top: leaderboardRes.data?.most_used || [], bottom: leaderboardRes.data?.least_used || [] });
                setPendingLeaveRequests(pendingLeaveRes.data?.pendingLeaveList?.data || []);

            } catch (err) {
                console.error("Gagal mengambil data awal dasbor:", err);
                setError("Gagal memuat data utama dasbor.");
            } finally {
                setIsInitialLoading(false);
            }
        };

        fetchInitialData();
    }, []); // <-- Hanya berjalan sekali

    // Efek untuk data tren yang berubah sesuai tahun
    useEffect(() => {
        if (!year) return;

        const fetchTrendData = async () => {
            setIsTrendLoading(true);
            try {
                const trendRes = await getDashboardTrend(year);
                setTrendData(trendRes.data?.trend || []);

                // ✅ SUMBER DATA YANG BENAR ADA DI SINI
                const yearsFromServer = trendRes.data?.availableYears;
                if (yearsFromServer && yearsFromServer.length > 0) {
                    setAvailableYears(yearsFromServer.sort((a: number, b: number) => b - a));
                } else {
                    setAvailableYears([new Date().getFullYear()]);
                }

            } catch (err) {
                console.error(`Gagal mengambil data tren untuk tahun ${year}:`, err);
                setTrendData([]);
            } finally {
                setIsTrendLoading(false);
            }
        };

        fetchTrendData();
    }, [year]); // <-- Berjalan setiap kali tahun berubah

    return {
        stats,
        leaderboard,
        trendData,
        pendingLeaveRequests,
        availableYears,
        isLoading: isInitialLoading || isTrendLoading,
        isInitialLoading,
        isTrendLoading,
        error
    };
}