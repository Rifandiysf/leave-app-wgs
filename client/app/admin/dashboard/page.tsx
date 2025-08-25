'use client'

import { useState, useEffect, useCallback } from "react";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';
import { Card } from "../../components/ui/card";
import 'bootstrap-icons/font/bootstrap-icons.css';

type LeaderboardUserType = {
    nik: string;
    name: string;
    role: string;
    remaining_leave: number;
    this_year: number;
    last_year: number;
    average_leave: string;
};

type PendingLeaveRequestType = {
    NIK: string;
    name: string;
    role?: string; 
    type: string;
    start_date: string;
    end_date: string;
    duration: string;
    status: string;
};

type MonthlyTrendType = {
    month: string;
    mandatory_leave: number;
    special_leave: number;
    personal_leave: number;
};

const DashboardSkeleton = () => (
    <>
        <div className="flex flex-col mb-4">
            <div className="h-8 bg-white-200 dark:bg-gray-600 rounded w-1/4 mb-2 animate-pulse"></div>
            <div className="h-4 bg-white-200 dark:bg-gray-600 rounded w-1/2 animate-pulse"></div>
        </div>
        <div className="grid grid-cols-2 gap-3 sm:gap-6 mb-8">
            {[...Array(4)].map((_, i) => (
                <div key={i} className="h-36 bg-gray-200 dark:bg-gray-600 rounded-lg sm:rounded-2xl animate-pulse"></div>
            ))}
        </div>
        <div className="space-y-6 pb-24">
            <div className="h-48 bg-gray-200 dark:bg-gray-600 rounded-lg sm:rounded-2xl animate-pulse"></div>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div className="h-96 bg-white-200 dark:bg-gray-600 rounded-lg sm:rounded-2xl animate-pulse"></div>
                <div className="h-96 bg-white-200 dark:bg-gray-600 rounded-lg sm:rounded-2xl animate-pulse"></div>
            </div>
        </div>
    </>
);

const DashboardPage = () => {
    const [stats, setStats] = useState<any>({});
    const [leaderboard, setLeaderboard] = useState<{ top: LeaderboardUserType[]; bottom: LeaderboardUserType[] }>({ top: [], bottom: [] });
    const [trendData, setTrendData] = useState<MonthlyTrendType[]>([]);
    const [pendingLeaveRequests, setPendingLeaveRequests] = useState<PendingLeaveRequestType[]>([]);
    const [availableYears, setAvailableYears] = useState<number[]>([new Date().getFullYear()]);
    
    const [isLoading, setIsLoading] = useState(true);
    const [selectedYear, setSelectedYear] = useState(new Date().getFullYear());

    const fetchDashboardData = useCallback(async (year: number) => {
        setIsLoading(true);
        try {
            const [statsRes, trendRes, leaderboardRes, pendingLeaveRes] = await Promise.all([
                fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/dashboard/statistics`, { credentials: 'include' }),
                fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/dashboard/trend?year=${year}`, { credentials: 'include' }),
                fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/dashboard/leaderboard`, { credentials: 'include' }),
                fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/dashboard/pending-leave`, { credentials: 'include' })
            ]);

            if (!statsRes.ok || !trendRes.ok || !leaderboardRes.ok || !pendingLeaveRes.ok) {
                console.error("Gagal mengambil data dasbor.", {
                    stats: statsRes.status,
                    trend: trendRes.status,
                    leaderboard: leaderboardRes.status,
                    pendingLeave: pendingLeaveRes.status,
                });
                throw new Error('Satu atau lebih permintaan API gagal');
            }

            const statsJson = await statsRes.json();
            const trendJson = await trendRes.json();
            const leaderboardJson = await leaderboardRes.json();
            const pendingLeaveJson = await pendingLeaveRes.json();

            setStats(statsJson.data || {});
            setTrendData(trendJson.data?.trend || []);
            
            setLeaderboard({
                top: leaderboardJson.data?.most_used || [],
                bottom: leaderboardJson.data?.least_used || []
            });
            setPendingLeaveRequests(pendingLeaveJson.data?.pendingLeaveList?.data || []);
            
            const yearsFromServer = statsJson.data?.availableYears;
            if (yearsFromServer && yearsFromServer.length > 0) {
                const yearSet = new Set([...yearsFromServer, year]);
                const sortedYears = Array.from(yearSet).sort((a, b) => b - a);
                setAvailableYears(sortedYears);
            } else {
                setAvailableYears(prevYears => {
                    const yearSet = new Set([...prevYears, year]);
                    const sortedYears = Array.from(yearSet).sort((a, b) => b - a);
                    return sortedYears;
                });
            }

        } catch (error) {
            console.error("Terjadi kesalahan saat mengambil data dasbor:", error);
            setStats({});
            setTrendData([]);
            setLeaderboard({ top: [], bottom: [] });
            setPendingLeaveRequests([]); 
        } finally {
            setIsLoading(false);
        }
    }, []);

    useEffect(() => {
        fetchDashboardData(selectedYear);
    }, [selectedYear, fetchDashboardData]);

    const dateOptions: Intl.DateTimeFormatOptions = { day: 'numeric', month: 'long', year: 'numeric' };

    if (isLoading) {
        return <DashboardSkeleton />;
    }

    const summaryCards = [
        {
            count: stats.totalEmployees?.total || 0,
            label: "Total Employee",
            subtitle: `${stats.totalEmployees?.activeEmployees || 0} active, ${stats.totalEmployees?.resignEmployees || 0} resign`,
            icon: "bi-people-fill",
            color: "blue"
        },
        {
            count: stats.thisYearLeave || 0,
            label: "Total Leave This Year", 
            subtitle: `Approved in ${new Date().getFullYear()}`,
            icon: "bi-calendar-check-fill",
            color: "green"
        },
        {
            count: `${stats.weeklyLeave || 0}`,
            label: "Employees on Weekly Leave",
            subtitle: "Leave in the last 7 days",
            icon: "bi-person-dash-fill", 
            color: "orange"
        },
        {
            count: `${stats.pendingLeaves || 0}`,
            label: "Pending Leave Requests",
            subtitle: "Waiting for approval",
            icon: "bi-clock-history",
            color: "yellow"
        }
    ];

    const getColorClasses = (color: string) => {
        const colors: { [key: string]: { bg: string; text: string; line: string } } = {
            blue: { bg: "bg-blue-600", text: "text-blue-600", line: "bg-blue-600" },
            green: { bg: "bg-green-600", text: "text-green-600", line: "bg-green-600" },
            orange: { bg: "bg-orange-600", text: "text-orange-600", line: "bg-orange-600" },
            yellow: { bg: "bg-yellow-600", text: "text-yellow-600", line: "bg-yellow-600" }
        };
        return colors[color] || colors.blue;
    };

    return (
        <>
            <div className="flex flex-col mb-4">
                <div className="sm:hidden w-full bg-background pb-4 sticky top-[-1rem] z-10">
                    <h1 className="text-2xl font-bold text-foreground mt-5">Dashboard Admin</h1>
                    <p className="text-muted-foreground text-sm mt-2">
                        Summary of employee information and statistics
                    </p>
                </div>

                <div className="hidden sm:flex items-center space-x-4 flex-1">
                    <div className="flex-1 min-w-0">
                        <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-foreground mb-2 truncate">
                            Dashboard Admin
                        </h1>
                        <p className="text-muted-foreground text-sm sm:text-base">
                            Summary of employee information and statistics
                        </p>
                    </div>
                </div>
            </div>

            {/* Statistics Cards Mobile */}
            <div className="grid grid-cols-2 gap-3 sm:gap-6 mb-8">
                {summaryCards.map((item, idx) => {
                    const colorClasses = getColorClasses(item.color);
                    return (
                        <Card
                            key={idx}
                            className="group hover:shadow-lg transition-all duration-300 bg-white dark:bg-white border border-gray-200 dark:border-gray-200 overflow-hidden relative rounded-lg sm:rounded-2xl p-2 sm:p-3"
                        >
                            <div className="relative p-1 sm:p-2">
                                <div className="flex items-center justify-between mb-2 sm:mb-4">
                                    <div className={`w-8 h-8 sm:w-12 sm:h-12 ${colorClasses.bg} rounded-xl flex items-center justify-center`}>
                                        <i className={`bi ${item.icon} text-white text-base sm:text-xl`} />
                                    </div>
                                    <div className="text-right">
                                        <div className="text-2xl sm:text-3xl md:text-5xl font-bold text-gray-900 mb-0.5 sm:mb-1">
                                            {item.count}
                                        </div>
                                        <div className={`h-1 ${colorClasses.line} rounded-full ml-auto sm:hidden ${String(item.count).length >= 2 ? 'w-8' : 'w-6'}`}></div>
                                        <div className={`h-1 ${colorClasses.line} rounded-full ml-auto hidden sm:block ${String(item.count).length >= 2 ? 'w-16' : 'w-12'}`}></div>
                                    </div>
                                </div>
                                <div>
                                    <h3 className="text-xs sm:text-sm md:text-base font-semibold text-gray-900 mb-0.5 sm:mb-1 leading-tight">
                                        {item.label}
                                    </h3>
                                    <p className="text-gray-600 text-xs sm:text-xs leading-tight">{item.subtitle}</p>
                                </div>
                            </div>
                        </Card>
                    );
                })}
            </div>

            {/* CUTI PENDING */}
            {pendingLeaveRequests && pendingLeaveRequests.length > 0 && (
                <Card className="bg-white dark:bg-white border border-gray-200 dark:border-gray-200 overflow-hidden relative rounded-lg sm:rounded-2xl p-4 sm:p-6 mb-8">
                    <div className="relative">
                        <h3 className="text-lg sm:text-xl font-semibold text-gray-900 mb-4 flex items-center gap-2">
                            <i className="bi bi-clock-history text-yellow-500"></i>
                           Employees on Pending Leave ({pendingLeaveRequests.length} request)
                        </h3>
                        <div className={`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 ${pendingLeaveRequests.length > 3 ? 'max-h-[400px] overflow-y-auto pr-2' : ''}`}>
                            {pendingLeaveRequests.map((leave, index) => (
                                <div key={`${leave.NIK}-${index}`} className="bg-yellow-50 rounded-lg p-4 border border-yellow-200 text-gray-800">
                                    <div className="flex justify-between items-start">
                                        <div>
                                            <p className="font-bold">{leave.name}</p>
                                            <p className="text-sm capitalize text-gray-600">{leave.type}</p>
                                        </div>
                                        <span className="px-2 py-1 bg-yellow-200 text-yellow-800 rounded-full text-xs font-medium">{leave.status}</span>
                                    </div>
                                    <div className="mt-3 text-sm space-y-1 text-gray-700">
                                        <p>
                                            Start Date: {new Date(leave.start_date).toLocaleDateString('id-ID', dateOptions)} 
                                        </p>
                                        <p>
                                            End Date : {new Date(leave.end_date).toLocaleDateString('id-ID', dateOptions)}
                                        </p>
                                        <p className="font-medium">Duration: {leave.duration.replace('days', 'Hari')}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </Card>
            )}

            <div className="space-y-6 pb-24">
                {/* Trend Chart */}
                <Card className="bg-white dark:bg-white border border-gray-200 dark:border-gray-200 overflow-hidden relative rounded-lg sm:rounded-2xl p-4 sm:p-6">
                    <div className="relative">
                        <div className="flex items-center justify-between mb-4">
                            <h3 className="text-lg sm:text-xl font-semibold text-gray-900 flex items-center gap-2">
                                <i className="bi bi-graph-up text-blue-500"></i>
                                Monthly Leave Trends
                            </h3>
                            <select
                                value={selectedYear}
                                onChange={(e) => setSelectedYear(Number(e.target.value))}
                                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 p-2"
                                aria-label="Pilih tahun untuk tren cuti"
                            >
                                {availableYears.map(year => (
                                    <option key={year} value={year}>
                                        {year}
                                    </option>
                                ))}
                            </select>
                        </div>
                        <div className="h-80">
                            <ResponsiveContainer width="100%" height="100%">
                                <LineChart data={trendData}>
                                    <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                                    <XAxis dataKey="month" stroke="#6b7280" fontSize={12} />
                                    <YAxis stroke="#6b7280" fontSize={12} />
                                    <Tooltip contentStyle={{ backgroundColor: '#fff', border: '1px solid #e5e7eb', borderRadius: '8px', boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)' }} />
                                    <Legend />
                                    <Line type="monotone" dataKey="mandatory_leave" name="Mandatory Leave" stroke="var(--chart-1)" strokeWidth={2} activeDot={{ r: 6 }} />
                                    <Line type="monotone" dataKey="special_leave" name="Special Leave" stroke="var(--chart-2)" strokeWidth={2} activeDot={{ r: 6 }} />
                                    <Line type="monotone" dataKey="personal_leave" name="Personal Leave" stroke="var(--chart-3)" strokeWidth={2} activeDot={{ r: 6 }} />
                                </LineChart>
                            </ResponsiveContainer>
                        </div>
                    </div>
                </Card>

                {/* Leaderboard */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    <Card className="bg-white dark:bg-white border border-gray-200 dark:border-gray-200 overflow-hidden relative rounded-lg sm:rounded-2xl p-4 sm:p-6">
                        <div className="relative">
                            <h3 className="text-lg sm:text-xl font-semibold text-gray-900 mb-4 flex items-center gap-2">
                                <i className="bi bi-arrow-up-circle text-green-500"></i>
                               Users With the Most Remaining Leave
                            </h3>
                            <div className="space-y-3">
                                {leaderboard.top.map((user: LeaderboardUserType, index: number) => (
                                    <div key={`${user.nik}-${index}`} className="flex items-center justify-between p-3 bg-green-50 rounded-lg border border-green-100">
                                        <div className="flex items-center gap-3">
                                            <div className={`w-8 h-8 rounded-full flex items-center justify-center text-white font-bold text-sm ${index === 0 ? 'bg-green-500' : index === 1 ? 'bg-green-400' : 'bg-green-300'}`}>
                                                {index + 1}
                                            </div>
                                            <div>
                                                <p className="font-medium text-gray-800">{user.name}</p>
                                                <p className="text-sm text-gray-500">{user.nik} • {(user.role || '').replace(/_/g, ' ')}</p>
                                            </div>
                                        </div>
                                        <div className="text-right">
                                            <p className="font-bold text-green-600">{user.remaining_leave || 0} Day</p>
                                            <p className="text-xs text-gray-500">
                                                This Year: {user.this_year || 0} | Last Year : {user.last_year || 0}
                                            </p>
                                            <p className="text-xs text-gray-500 mt-1">Average Leave : <b>{user.average_leave}</b></p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </Card>

                    <Card className="bg-white dark:bg-white border border-gray-200 dark:border-gray-200 overflow-hidden relative rounded-lg sm:rounded-2xl p-4 sm:p-6">
                        <div className="relative">
                            <h3 className="text-lg sm:text-xl font-semibold text-gray-900 mb-4 flex items-center gap-2">
                                <i className="bi bi-arrow-down-circle text-red-500"></i>
                                Users With the Lowest Remaining Leave
                            </h3>
                            <div className="space-y-3">
                                {leaderboard.bottom.map((user: LeaderboardUserType, index: number) => (
                                    <div key={`${user.nik}-${index}`} className="flex items-center justify-between p-3 bg-red-50 rounded-lg border border-red-100">
                                        <div className="flex items-center gap-3">
                                            <div className={`w-8 h-8 rounded-full flex items-center justify-center text-white font-bold text-sm ${index === 0 ? 'bg-red-500' : index === 1 ? 'bg-red-400' : 'bg-red-300'}`}>
                                                {index + 1}
                                            </div>
                                            <div>
                                                <p className="font-medium text-gray-800">{user.name}</p>
                                                <p className="text-sm text-gray-500">{user.nik} • {(user.role || '').replace(/_/g, ' ')}</p>
                                            </div>
                                        </div>
                                        <div className="text-right">
                                            <p className="font-bold text-red-600">{user.remaining_leave || 0} Day</p>
                                            <p className="text-xs text-gray-500">
                                                This Year: {user.this_year || 0} | Last Year : {user.last_year || 0}
                                            </p>
                                            <p className="text-xs text-gray-500 mt-1">Average Leave : <b>{user.average_leave}</b></p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </Card>
                </div>
            </div>
        </>
    );
};

export default DashboardPage;