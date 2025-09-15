'use client';

import { useSearchParams, useRouter } from 'next/navigation';
import { useDashboardData } from "@/app/hooks/admin/UseDashboardData";
import { SummaryCards } from "@/app/components/admin/dashboard/SummaryCards";
import { DashboardHeader } from "@/app/components/admin/dashboard/dashboardHeader";
import { PendingLeaveRequests } from "@/app/components/admin/dashboard/PendingLeaveRequest";
import { TrendChart } from "@/app/components/admin/dashboard/TrendCharts";
import { Leaderboard } from "@/app/components/admin/dashboard/Leaderboard";

const DashboardSkeleton = () => (
    <>
        <div className="flex flex-col mb-4">
            <div className="h-8 bg-gray-200 dark:bg-gray-700 rounded w-1/4 mb-2 animate-pulse"></div>
            <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-1/2 animate-pulse"></div>
        </div>
        <div className="grid grid-cols-2 gap-3 sm:gap-6 mb-8">
            {[...Array(4)].map((_, i) => (
                <div key={i} className="h-36 bg-gray-200 dark:bg-gray-700 rounded-lg sm:rounded-2xl animate-pulse"></div>
            ))}
        </div>
        <div className="space-y-6 pb-24">
            <div className="h-48 bg-gray-200 dark:bg-gray-700 rounded-lg sm:rounded-2xl animate-pulse"></div>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div className="h-96 bg-gray-200 dark:bg-gray-700 rounded-lg sm:rounded-2xl animate-pulse"></div>
                <div className="h-96 bg-gray-200 dark:bg-gray-700 rounded-lg sm:rounded-2xl animate-pulse"></div>
            </div>
        </div>
    </>
);

const DashboardPage = () => {
    const searchParams = useSearchParams();
    const router = useRouter();

    // ✅ **Langkah 1: Baca tahun dari URL, bukan dari state lokal.**
    const selectedYear = Number(searchParams.get('year')) || new Date().getFullYear();

    // Hook Anda sekarang akan menerima tahun dari URL secara otomatis.
    // Pastikan hook Anda menggunakan 'isInitialLoading' dan 'isTrendLoading'.
    const { 
        stats, 
        leaderboard, 
        trendData, 
        pendingLeaveRequests, 
        availableYears, 
        isInitialLoading,
        isTrendLoading,
        error 
    } = useDashboardData(selectedYear);

    const handleYearChange = (newYear: number) => {
        router.push(`/admin/dashboard?year=${newYear}`, {scroll : false});
    };

    if (isInitialLoading) {
        return <DashboardSkeleton />;
    }

    if (error) {
        return <div className="text-center text-red-500 mt-10">{error}</div>;
    }

    return (
        <div className="space-y-6 pb-24">
            <DashboardHeader />
            <SummaryCards stats={stats} />
            <PendingLeaveRequests requests={pendingLeaveRequests} />
            
            <TrendChart 
                trendData={trendData} 
                selectedYear={selectedYear} 
                availableYears={availableYears}
                onYearChange={handleYearChange} 
                isLoading={isTrendLoading} 
            />
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <Leaderboard 
                    title="Users With the Most Remaining Leave"
                    icon="bi-arrow-up-circle"
                    themeColor="green"
                    data={leaderboard.bottom} 
                />
                <Leaderboard 
                    title="Users With the Lowest Remaining Leave"
                    icon="bi-arrow-down-circle"
                    themeColor="red"
                    data={leaderboard.top}
                />
            </div>
        </div>
    );
};

export default DashboardPage;