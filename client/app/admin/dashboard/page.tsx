'use client'

import { useState, useEffect, useCallback } from "react";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';

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

    const StatCard = ({ title, value, subtitle, icon, color = "blue" }: any) => (
        <div className="bg-white dark:bg-card rounded-2xl p-6 border hover:shadow-md transition-all duration-200">
            <div className="flex items-start justify-between">
                <div>
                    <p className="text-sm font-medium text-foreground mb-1">{title}</p>
                    <p className={`text-3xl font-bold text-${color}-600 mb-1`}>{value}</p>
                    {subtitle && <p className="text-sm text-muted-foreground">{subtitle}</p>}
                </div>
                <div className={`p-3 bg-${color}-100 rounded-xl`}>
                    <i className={`bi ${icon} text-2xl text-${color}-600`}></i>
                </div>
            </div>
        </div>
    );
    const dateOptions: Intl.DateTimeFormatOptions = { day: 'numeric', month: 'long', year: 'numeric' };

    if (isLoading) {
        return (
            <div className="min-h-screen p-6">
                <div className="animate-pulse">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                        {[...Array(4)].map((_, i) => (
                            <div key={i} className="rounded-2xl p-6 h-32 bg-gray-200 dark:bg-gray-500">
                                <div className="h-4 bg-gray-300 dark:bg-gray-600 rounded w-1/2 mb-4"></div>
                                <div className="h-8 bg-gray-300 dark:bg-gray-600 rounded w-3/4"></div>
                            </div>
                        ))}
                    </div>
                    <div className="h-96 bg-gray-200 dark:bg-gray-500 rounded-2xl mb-8"></div>
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
                        <div className="h-96 bg-gray-200 dark:bg-gray-500 rounded-2xl"></div>
                        <div className="h-96 bg-gray-200 dark:bg-gray-500 rounded-2xl"></div>
                    </div>
                </div>
            </div>
        );
    }

    return (
        // STATISTIK
        <div className="min-h-screen p-6 bg-background">
            <div className="mb-8">
                <h1 className="text-3xl font-bold text-foreground mb-2">Dashboard Admin</h1>
                <p className="text-muted-foreground">Summary of employee information and statistics</p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                <StatCard 
                    title="Total Employee" 
                    value={stats.totalEmployees?.total || 0} 
                    subtitle={`${stats.totalEmployees?.activeEmployees || 0} aktif, ${stats.totalEmployees?.resignEmployees || 0} tidak aktif`} 
                    icon="bi-people-fill" 
                    color="blue" 
                />
                <StatCard 
                    title="Total Leave This Year" 
                    value={stats.thisYearLeave || 0} 
                    subtitle={`Approved at ${new Date().getFullYear()}`} 
                    icon="bi-calendar-check-fill" 
                    color="green" 
                />
                <StatCard 
                    title="Employees on Weekly Leave" 
                    value={`${stats.weeklyLeave || 0} `} 
                    subtitle="Leave in the last 7 days" 
                    icon="bi-person-dash-fill" 
                    color="green" 
                />
                <StatCard 
                    title="Pending Leave Requests" 
                    value={`${stats.pendingLeaves || 0} `} 
                    subtitle={`Waiting for approval`} 
                    icon="bi-clock-history" 
                    color="yellow" 
                />
            </div>

            {/* CUTI PENDING */}
            {pendingLeaveRequests && pendingLeaveRequests.length > 0 && (
                <div className="bg-white dark:bg-card rounded-2xl p-6 shadow-sm border border-border mb-8">
                    <h3 className="text-xl font-semibold text-foreground mb-4 flex items-center gap-2">
                        <i className="bi bi-clock-history text-yellow-500"></i>
                        Employees on Pending Leave ({pendingLeaveRequests.length} request)
                    </h3>
                    <div className={`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 ${pendingLeaveRequests.length > 3 ? 'max-h-[400px] overflow-y-auto pr-2' : ''}`}>
                        {pendingLeaveRequests.map((leave, index) => (
                            <div key={`${leave.NIK}-${index}`} className="bg-yellow-50 dark:bg-yellow-900/20 rounded-lg p-4 border border-yellow-200 dark:border-yellow-800/30 text-gray-800 dark:text-gray-200">
                                <div className="flex justify-between items-start">
                                    <div>
                                        <p className="font-bold">{leave.name}</p>
                                        <p className="text-sm capitalize text-gray-600 dark:text-gray-400">{leave.type}</p>
                                    </div>
                                    <span className="px-2 py-1 bg-yellow-200 text-yellow-800 rounded-full text-xs font-medium">{leave.status}</span>
                                </div>
                                <div className="mt-3 text-sm space-y-1 text-gray-700 dark:text-gray-300">
                                    <p>
                                        Start Date :{new Date(leave.start_date).toLocaleDateString('id-ID', dateOptions)} 
                                    </p>
                                    <p>
                                         End Date : {new Date(leave.end_date).toLocaleDateString('id-ID', dateOptions)}
                                    </p>
                                    <p className="font-medium"> Duration : {leave.duration.replace('days', 'Hari')}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            )}

       <div className="grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
                <div className="bg-white dark:bg-card rounded-2xl p-6 shadow-sm border border-border">
                    <div className="flex items-center justify-between mb-4">
                        <h3 className="text-xl font-semibold text-foreground flex items-center gap-2">
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
            </div>


            {/* Leaderboard */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
                <div className="bg-white dark:bg-card rounded-2xl p-6 shadow-sm border border-border">
                    <h3 className="text-xl font-semibold text-foreground mb-4 flex items-center gap-2">
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
                                    <p className="font-bold text-green-600">{user.remaining_leave || 0} hari</p>
                                    <p className="text-xs text-gray-500">
                                        This Year: {user.this_year || 0} | Last Year: {user.last_year || 0}
                                    </p>
                                    <p className="text-xs text-gray-500 mt-1">Average Leave: <b>{user.average_leave}</b></p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                <div className="bg-white dark:bg-card rounded-2xl p-6 shadow-sm border border-border">
                    <h3 className="text-xl font-semibold text-foreground mb-4 flex items-center gap-2">
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
                                    <p className="font-bold text-red-600">{user.remaining_leave || 0} hari</p>
                                    <p className="text-xs text-gray-500">
                                         This Year: {user.this_year || 0} | Last Year: {user.last_year || 0}
                                    </p>
                                    <p className="text-xs text-gray-500 mt-1">Average Leave: <b>{user.average_leave}</b></p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default DashboardPage;