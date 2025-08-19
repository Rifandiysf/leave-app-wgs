'use client'

import { useState, useEffect, useCallback } from "react";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';

type LeaderboardUserType = {
    nik: string;
    name: string;
    role: string;
    sisa_cuti: number;
    tahun_ini: number;
    tahun_lalu: number;
    rerata_cuti: string;
};

type PendingLeaveType = {
    id_leave: string;
    name: string;
    nik: string;
    leave_type: string;
    start_date: string;
    end_date: string;
    total_days: number;
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
    const [availableYears, setAvailableYears] = useState<number[]>([new Date().getFullYear()]);
    
    const [isLoading, setIsLoading] = useState(true);
    const [selectedYear, setSelectedYear] = useState(new Date().getFullYear());

    const fetchDashboardData = useCallback(async (year: number) => {
        setIsLoading(true);
        try {
            const [statsRes, trendRes, leaderboardRes] = await Promise.all([
                fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/dashboard/statistics`, { credentials: 'include' }),
                fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/dashboard/trend?year=${year}`, { credentials: 'include' }),
                fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/dashboard/leaderboard`, { credentials: 'include' })
            ]);

            if (!statsRes.ok || !trendRes.ok || !leaderboardRes.ok) {
                console.error("Failed to fetch dashboard data.", {
                    stats: statsRes.status,
                    trend: trendRes.status,
                    leaderboard: leaderboardRes.status,
                });
                throw new Error('One or more API requests failed');
            }

            const statsJson = await statsRes.json();
            const trendJson = await trendRes.json();
            const leaderboardJson = await leaderboardRes.json();

            setStats(statsJson.data || {});
            setTrendData(trendJson.data?.trend || []);
            
            setLeaderboard({
                top: leaderboardJson.data?.most_used || [],
                bottom: leaderboardJson.data?.least_used || []
            });
            
            if (statsJson.data?.availableYears && statsJson.data.availableYears.length > 0) {
               setAvailableYears(statsJson.data.availableYears);
            }

        } catch (error) {
            console.error("An error occurred while fetching dashboard data:", error);
            setStats({});
            setTrendData([]);
            setLeaderboard({ top: [], bottom: [] });
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
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
                        <div className="h-96 bg-gray-200 dark:bg-gray-500 rounded-2xl"></div>
                        <div className="h-96 bg-gray-200 dark:bg-gray-500 rounded-2xl"></div>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen p-6 bg-background">
            <div className="mb-8">
                <h1 className="text-3xl font-bold text-foreground mb-2">Dashboard Admin</h1>
                <p className="text-muted-foreground">Ringkasan informasi dan statistik karyawan</p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                <StatCard 
                    title="Total Karyawan" 
                    value={stats.totalEmployees?.total || 0} 
                    subtitle={`${stats.totalEmployees?.activeEmployees || 0} aktif, ${stats.totalEmployees?.resignEmployees || 0} tidak aktif`} 
                    icon="bi-people-fill" 
                    color="blue" 
                />
                <StatCard 
                    title="Total Cuti Tahun Ini" 
                    value={stats.thisYearLeave || 0} 
                    subtitle={`Approved di ${new Date().getFullYear()}`} 
                    icon="bi-calendar-check-fill" 
                    color="green" 
                />
                <StatCard 
                    title="Karyawan Cuti Mingguan" 
                    value={`${stats.weeklyLeave || 0} orang`} 
                    subtitle="Cuti dalam 7 hari terakhir" 
                    icon="bi-person-dash-fill" 
                    color="orange" 
                />
                <StatCard 
                    title="Cuti Pending" 
                    value={`${stats.pendingLeaves || 0} orang`} 
                    subtitle={`Menunggu persetujuan`} 
                    icon="bi-clock-history" 
                    color="yellow" 
                />
            </div>

            {stats.pendingLeaveList && stats.pendingLeaveList.length > 0 && (
                <div className="dark:bg-card rounded-2xl p-6 shadow-sm border border-border mb-8">
                    <h3 className="text-xl font-semibold text-foreground mb-4 flex items-center gap-2">
                        <i className="bi bi-clock-history text-yellow-500"></i>
                        Karyawan dengan Cuti Pending ({stats.pendingLeaves} Pending)
                    </h3>
                    <div className={`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 ${stats.pendingLeaveList.length > 9 ? 'max-h-[400px] overflow-y-auto pr-2' : ''}`}>
                        {stats.pendingLeaveList.map((leave: PendingLeaveType) => (
                            <div key={leave.id_leave} className="bg-yellow-50 rounded-lg p-4 border border-yellow-200">
                                <div className="flex items-center justify-between mb-2">
                                    <h4 className="font-medium text-gray-800">{leave.name}</h4>
                                    <span className="px-2 py-1 bg-yellow-200 text-yellow-800 rounded-full text-xs font-medium">Pending</span>
                                </div>
                                <p className="text-sm text-gray-600 mb-1">Tipe: {leave.leave_type?.replace(/_/g, ' ')}</p>
                                <p className="text-sm text-gray-600 mb-1">Tanggal mulai: {new Date(leave.start_date).toLocaleDateString('id-ID', dateOptions)}</p>
                                <p className="text-sm text-gray-600 mb-1">Tanggal Selesai: {new Date(leave.end_date).toLocaleDateString('id-ID', dateOptions)}</p>
                                <p className="text-sm text-gray-600">Durasi: {leave.total_days} Hari</p>
                            </div>
                        ))}
                    </div>
                </div>
            )}

            <div className="grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
                <div className="dark:bg-card rounded-2xl p-6 shadow-sm border border-border">
                    <div className="flex items-center justify-between mb-4">
                        <h3 className="text-xl font-semibold text-foreground flex items-center gap-2">
                            <i className="bi bi-graph-up text-blue-500"></i>
                            Trend Cuti Bulanan
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
                                <Line type="monotone" dataKey="special_leave" name="Spesial Leave" stroke="var(--chart-2)" strokeWidth={2} activeDot={{ r: 6 }} />
                                <Line type="monotone" dataKey="personal_leave" name="Personal Leave" stroke="var(--chart-3)" strokeWidth={2} activeDot={{ r: 6 }} />
                            </LineChart>
                        </ResponsiveContainer>
                    </div>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
                <div className="dark:bg-card rounded-2xl p-6 shadow-sm border border-border">
                    <h3 className="text-xl font-semibold text-foreground mb-4 flex items-center gap-2">
                        <i className="bi bi-arrow-up-circle text-green-500"></i>
                        User Dengan Sisa Cuti Terbanyak
                    </h3>
                    <div className="space-y-3">
                        {leaderboard.top.map((user: LeaderboardUserType, index: number) => (
                            <div key={user.nik} className="flex items-center justify-between p-3 bg-green-50 rounded-lg border border-green-100">
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
                                    <p className="font-bold text-green-600">{user.sisa_cuti || 0} hari</p>
                                    <p className="text-xs text-gray-500">
                                        Tahun ini: {user.tahun_ini || 0} | Tahun lalu: {user.tahun_lalu || 0}
                                    </p>
                                    <p className="text-xs text-gray-500 mt-1">Rata rata Cuti: <b>{user.rerata_cuti}</b></p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                <div className="dark:bg-card rounded-2xl p-6 shadow-sm border border-border">
                    <h3 className="text-xl font-semibold text-foreground mb-4 flex items-center gap-2">
                        <i className="bi bi-arrow-down-circle text-red-500"></i>
                        User Dengan Sisa Cuti Terendah
                    </h3>
                    <div className="space-y-3">
                        {leaderboard.bottom.map((user: LeaderboardUserType, index: number) => (
                            <div key={user.nik} className="flex items-center justify-between p-3 bg-red-50 rounded-lg border border-red-100">
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
                                    <p className="font-bold text-red-600">{user.sisa_cuti || 0} hari</p>
                                    <p className="text-xs text-gray-500">
                                        Tahun ini: {user.tahun_ini || 0} | Tahun lalu: {user.tahun_lalu || 0}
                                    </p>
                                    <p className="text-xs text-gray-500 mt-1">Rata rata Cuti: <b>{user.rerata_cuti}</b></p>
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
