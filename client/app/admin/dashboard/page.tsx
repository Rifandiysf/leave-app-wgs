'use client'

import { useState, useEffect, useCallback, useMemo } from "react"; // MODIFIED: Added useMemo
import 'bootstrap-icons/font/bootstrap-icons.css';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import axiosInstance from "@/lib/api/axiosInstance";

// Type definitions remain the same
type dataLeaveType = {
    nik: string;
    name: string;
    gender: string;
    role: string;
    status: string;
    balance: {
        total_amount: number;
        current_amount: number;
        carried_amount: number;
    };
};

type ApiLeaveType = {
    id_leave: string;
    name: string;
    leave_type: string;
    start_date: string;
    end_date: string;
    total_days: number;
    reason: string;
    status: string;
};

const DashboardPage = () => {
    const [dataLeave, setDataLeave] = useState<dataLeaveType[]>([]);
    const [leaveRequests, setLeaveRequests] = useState<ApiLeaveType[]>([]);
    const [leaveHistory, setLeaveHistory] = useState<ApiLeaveType[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    // NEW: State for selected year and calculated statistics
    const [selectedYear, setSelectedYear] = useState(new Date().getFullYear());
    const [stats, setStats] = useState<any>({});

    // Data fetching logic (fetchUsersData, fetchLeaveData, fetchData) remains the same
    const fetchUsersData = useCallback(async () => {
        try {
            const initialResponse = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/users?limit=1000`, {
                method: 'GET',
                credentials: 'include',
            });
            const initialJson = await initialResponse.json();
            const basicUsers = initialJson?.data?.data || initialJson?.data || [];

            if (!Array.isArray(basicUsers) || basicUsers.length === 0) {
                setDataLeave([]);
                return;
            }

            const detailPromises = basicUsers.map(user =>
                fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/users/${user.nik}`, {
                    method: 'GET',
                    credentials: 'include',
                }).then(res => {
                    if (!res.ok) {
                        console.error(`Gagal mengambil detail untuk user ${user.nik}. Status: ${res.status}`);
                        return { data: {} };
                    }
                    return res.json();
                })
            );

            const detailedResponses = await Promise.all(detailPromises);

            const usersWithDetails = basicUsers.map((basicUser, index) => {
                const detailedData = detailedResponses[index].data;
                const mergedUser = { ...basicUser, ...detailedData };
                if (!mergedUser.balance) {
                    mergedUser.balance = { total_amount: 0, current_amount: 0, carried_amount: 0 };
                }
                return mergedUser;
            });
            setDataLeave(usersWithDetails);
        } catch (error) {
            console.error("Gagal mengambil data pengguna secara detail:", error);
            setDataLeave([]);
        }
    }, []);

    const fetchLeaveData = useCallback(async () => {
        try {
            const requestsResponse = await axiosInstance.get('/leaves');
            if (requestsResponse.data && Array.isArray(requestsResponse.data.data)) {
                setLeaveRequests(requestsResponse.data.data);
            }
            const historyResponse = await axiosInstance.get('/leaves/logs');
            if (historyResponse.data && Array.isArray(historyResponse.data.data)) {
                setLeaveHistory(historyResponse.data.data);
            }
        } catch (error) {
            console.error("Failed to fetch leave data:", error);
            setLeaveRequests([]);
            setLeaveHistory([]);
        }
    }, []);

    const fetchData = useCallback(async () => {
        setIsLoading(true);
        try {
            await Promise.all([fetchUsersData(), fetchLeaveData()]);
        } catch (error) {
            console.error("Failed to fetch data:", error);
        } finally {
            setIsLoading(false);
        }
    }, [fetchUsersData, fetchLeaveData]);

    useEffect(() => {
        fetchData();
    }, [fetchData]);

    // NEW: Memoize the available years for the dropdown to prevent recalculation on every render
    const availableYears = useMemo(() => {
        const allLeaveData = [...leaveRequests, ...leaveHistory];
        if (!allLeaveData.length) return [new Date().getFullYear()];

        const years = new Set(allLeaveData.map(leave => new Date(leave.start_date).getFullYear()).filter(year => !isNaN(year)));
        const sortedYears = Array.from(years).sort((a, b) => b - a); // Sort descending

        return sortedYears.length > 0 ? sortedYears : [new Date().getFullYear()];
    }, [leaveRequests, leaveHistory]);

    // MODIFIED: Wrapped calculation logic in useCallback and it now accepts a year parameter
    const calculateStats = useCallback((yearForChart: number) => {
        if (!dataLeave.length) return {};

        const activeUsers = dataLeave.filter(user => user.status?.toLowerCase() === 'active');
        const totalUsers = dataLeave.length;
        const activeCount = activeUsers.length;
        const inactiveCount = totalUsers - activeCount;

        const allLeaveData = [...leaveRequests, ...leaveHistory];
        const currentYearForCards = new Date().getFullYear(); // For stat cards, always use the current year

        const currentYearLeaves = allLeaveData.filter(leave => {
            const leaveYear = new Date(leave.start_date).getFullYear();
            const isApproved = leave.status?.toLowerCase() === 'approved' || leave.status?.toLowerCase() === 'taken';
            return leaveYear === currentYearForCards && isApproved;
        });
        const totalThisYearLeave = currentYearLeaves.reduce((sum, leave) => sum + (leave.total_days || 0), 0);

        const lastYearLeaves = allLeaveData.filter(leave => {
            const leaveYear = new Date(leave.start_date).getFullYear();
            const isApproved = leave.status?.toLowerCase() === 'approved' || leave.status?.toLowerCase() === 'taken';
            return leaveYear === currentYearForCards - 1 && isApproved;
        });
        const totalLastYearLeave = lastYearLeaves.reduce((sum, leave) => sum + (leave.total_days || 0), 0);

        const sixMonthLeave = currentYearLeaves
            .filter(leave => new Date(leave.start_date).getMonth() < 6) // Jan-Jun
            .reduce((sum, leave) => sum + (leave.total_days || 0), 0);

        // ... other calculations for cards and lists remain the same ...
        const oneWeekAgo = new Date();
        oneWeekAgo.setDate(oneWeekAgo.getDate() - 7);
        const weeklyLeaveUsers = allLeaveData.filter(leave => {
            const leaveDate = new Date(leave.start_date);
            const isApproved = leave.status?.toLowerCase() === 'approved' || leave.status?.toLowerCase() === 'taken';
            return leaveDate >= oneWeekAgo && leaveDate <= new Date() && isApproved;
        }).length;

        const pendingLeaves = leaveRequests.filter(leave => leave.status?.toLowerCase() === 'pending');
        const pendingLeaveCount = pendingLeaves.length;

        const userLeaveStats = dataLeave.map(user => ({
            ...user,
            current_amount: user.balance?.current_amount || 0,
            carried_amount: user.balance?.carried_amount || 0,
            total_amount: user.balance?.total_amount || 0,
        }));
        const topRemainingLeaveUsers = [...userLeaveStats].sort((a, b) => b.total_amount - a.total_amount).slice(0, 5);
        const bottomRemainingLeaveUsers = [...userLeaveStats].sort((a, b) => a.total_amount - b.total_amount).slice(0, 5);

        // MODIFIED: This calculation now uses the 'yearForChart' parameter
        const monthlyChartLeaves = allLeaveData.filter(leave => {
            const leaveYear = new Date(leave.start_date).getFullYear();
            const isApproved = leave.status?.toLowerCase() === 'approved' || leave.status?.toLowerCase() === 'taken';
            return leaveYear === yearForChart && isApproved;
        });

        const monthlyLeaveData: { month: string; leave: number; }[] = [];
        for (let month = 0; month < 12; month++) {
            const monthName = new Date(yearForChart, month).toLocaleDateString('en', { month: 'short' });
            const monthLeaves = monthlyChartLeaves.filter(leave => new Date(leave.start_date).getMonth() === month);
            const monthTotal = monthLeaves.reduce((sum, leave) => sum + (leave.total_days || 0), 0);
            monthlyLeaveData.push({ month: monthName, leave: monthTotal });
        }

        return {
            totalUsers, activeCount, inactiveCount, totalThisYearLeave, totalLastYearLeave,
            sixMonthLeave, pendingLeaveCount, pendingLeaves, topRemainingLeaveUsers, bottomRemainingLeaveUsers,
            monthlyLeaveData, weeklyLeaveUsers,
        };
    }, [dataLeave, leaveRequests, leaveHistory]);

    // NEW: useEffect to trigger calculations when data or selected year changes
    useEffect(() => {
        if (!isLoading) {
            const newStats = calculateStats(selectedYear);
            setStats(newStats);
        }
    }, [selectedYear, isLoading, calculateStats]);

    // StatCard and dateOptions remain the same
    const StatCard = ({ title, value, subtitle, icon, color = "blue" }: any) => (
        <div className="bg-white dark:bg-card rounded-2xl p-6 border hover:shadow-md transition-all duration-200">
            <div className="flex items-center justify-between">
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

    // Loading skeleton remains the same
    if (isLoading) {
        return (
            <div className="min-h-screen p-6">
                <div className="animate-pulse">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                        {[...Array(4)].map((_, i) => (
                            <div key={i} className="rounded-2xl p-6 h-32 bg-gray-200">
                                <div className="h-4 bg-gray-300 rounded w-1/2 mb-4"></div>
                                <div className="h-8 bg-gray-300 rounded w-3/4"></div>
                            </div>
                        ))}
                    </div>
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
                        <div className="h-96 bg-gray-200 rounded-2xl"></div>
                        <div className="h-96 bg-gray-200 rounded-2xl"></div>
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

            {/* Stat Cards section remains the same, it will use the `stats` state */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                <StatCard title="Total Karyawan" value={stats.totalUsers || 0} subtitle={`${stats.activeCount || 0} aktif, ${stats.inactiveCount || 0} tidak aktif`} icon="bi-people-fill" color="blue" />
                <StatCard title="Cuti 6 Bulan (Jan-Jun)" value={stats.sixMonthLeave || 0} subtitle={`Total cuti di ${new Date().getFullYear()}`} icon="bi-calendar-range-fill" color="green" />
                <StatCard title="Karyawan Cuti Mingguan" value={`${stats.weeklyLeaveUsers || 0} orang`} subtitle="Cuti dalam 7 hari terakhir" icon="bi-person-dash-fill" color="orange" />
                <StatCard title="Cuti Pending" value={`${stats.pendingLeaveCount || 0} orang`} subtitle={`Menunggu persetujuan`} icon="bi-clock-history" color="yellow" />
            </div>

            {/* Pending Leaves section remains the same */}
            {stats.pendingLeaves && stats.pendingLeaves.length > 0 && (
                <div className="dark:bg-card rounded-2xl p-6 shadow-sm border border-border mb-8">
                    <h3 className="text-xl font-semibold text-foreground mb-4 flex items-center gap-2">
                        <i className="bi bi-clock-history text-yellow-500"></i>
                        Karyawan dengan Cuti Pending ({stats.pendingLeaveCount} Pending)
                    </h3>
                    <div className={`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 ${stats.pendingLeaves.length > 9 ? 'max-h-[400px] overflow-y-auto pr-2' : ''}`}>
                        {stats.pendingLeaves.map((leave: ApiLeaveType) => (
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

            {/* MODIFIED: Chart section now includes the year selector */}
            <div className=" grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
                <div className="dark:bg-card rounded-2xl p-6 shadow-sm border border-border">
                    {/* MODIFIED: Title is now a flex container with the dropdown */}
                    <div className="flex items-center justify-between mb-4">
                        <h3 className="text-xl font-semibold text-foreground flex items-center gap-2">
                            <i className="bi bi-graph-up text-blue-500"></i>
                            Trend Cuti Bulanan
                        </h3>
                        {/* NEW: Year Selector Dropdown */}
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
                            {/* MODIFIED: Chart data now comes from the 'stats' state */}
                            <LineChart data={stats.monthlyLeaveData}>
                                <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                                <XAxis dataKey="month" stroke="#6b7280" fontSize={12} />
                                <YAxis stroke="#6b7280" fontSize={12} />
                                <Tooltip contentStyle={{ backgroundColor: '#fff', border: '1px solid #e5e7eb', borderRadius: '8px', boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)' }} />
                                <Line type="monotone" dataKey="leave" stroke="#3b82f6" strokeWidth={3} dot={{ fill: '#3b82f6', strokeWidth: 2, r: 4 }} activeDot={{ r: 6, stroke: '#3b82f6', strokeWidth: 2, fill: '#fff' }} name="Cuti (hari)" />
                            </LineChart>
                        </ResponsiveContainer>
                    </div>
                </div>
            </div>

            {/* Top/Bottom users lists remain the same */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
                <div className="dark:bg-card rounded-2xl p-6 shadow-sm border border-border">
                    <h3 className="text-xl font-semibold text-foreground mb-4 flex items-center gap-2">
                        <i className="bi bi-arrow-up-circle text-green-500"></i>
                        User Dengan Sisa Cuti Terbanyak
                    </h3>
                    <div className="space-y-3">
                        {(stats.topRemainingLeaveUsers || []).map((user: dataLeaveType, index: number) => (
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
                                    <p className="font-bold text-green-600">{user.balance.total_amount || 0} hari</p>
                                    <p className="text-xs text-gray-500">
                                        Tahun ini: {user.balance.current_amount || 0} | Tahun lalu: {user.balance.carried_amount || 0}
                                    </p>
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
                        {(stats.bottomRemainingLeaveUsers || []).map((user: dataLeaveType, index: number) => (
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
                                    <p className="font-bold text-red-600">{user.balance.total_amount || 0} hari</p>
                                    <p className="text-xs text-gray-500">
                                        Tahun ini: {user.balance.current_amount || 0} | Tahun lalu: {user.balance.carried_amount || 0}
                                    </p>
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