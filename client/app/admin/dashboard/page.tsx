'use client'

import { useState, useEffect, useCallback, useMemo } from "react";
// Removed 'bootstrap-icons/font/bootstrap-icons.css' import as it's better handled by a global stylesheet or CDN link in your main HTML file.
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
// Removed the dependency on a custom axiosInstance to make the component more self-contained. Standard fetch will be used instead.

type dataLeaveType = {
    nik: string;
    name: string;
    gender: string;
    role: string;
    status: string;
    join_date: string;
    balance: {
        total_amount: number;
        current_amount: number;
        carried_amount: number;
    };
};

type ApiLeaveType = {
    id_leave: string;
    name: string;
    nik: string;
    leave_type: string;
    start_date: string;
    end_date: string;
    total_days: number;
    reason: string;
    status: string;
};

type UserStatsType = dataLeaveType & {
    average_leave: number;
};


const DashboardPage = () => {
    const [dataLeave, setDataLeave] = useState<dataLeaveType[]>([]);
    const [leaveRequests, setLeaveRequests] = useState<ApiLeaveType[]>([]);
    const [leaveHistory, setLeaveHistory] = useState<ApiLeaveType[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [selectedYear, setSelectedYear] = useState(new Date().getFullYear());
    const [stats, setStats] = useState<any>({});

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
            // Replaced axios with standard fetch for consistency and to remove external dependencies.
            const requestsResponse = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/leaves?limit=1000`, {
                method: 'GET',
                credentials: 'include',
            });
            const requestsJson = await requestsResponse.json();
            // Added more robust data parsing to handle different API response structures.
            const leaveRequestData = requestsJson?.data?.data || requestsJson?.data || [];
            if (Array.isArray(leaveRequestData)) {
                setLeaveRequests(leaveRequestData);
            } else {
                 console.error("Leave requests data is not an array:", leaveRequestData);
                 setLeaveRequests([]);
            }

            const historyResponse = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/leaves/logs?limit=1000`, {
                method: 'GET',
                credentials: 'include',
            });
            const historyJson = await historyResponse.json();
            // Added more robust data parsing for history as well.
            const leaveHistoryData = historyJson?.data?.data || historyJson?.data || [];
            if (Array.isArray(leaveHistoryData)) {
                setLeaveHistory(leaveHistoryData);
            } else {
                console.error("Leave history data is not an array:", leaveHistoryData);
                setLeaveHistory([]);
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

    const availableYears = useMemo(() => {
        const allLeaveData = [...leaveRequests, ...leaveHistory];
        if (!allLeaveData.length) return [new Date().getFullYear()];
         console.log("DATA SEMUA KARYAWAN:", dataLeave);
        console.log("DATA SEMUA CUTI (requests & history):", allLeaveData);

        const years = new Set(allLeaveData.map(leave => new Date(leave.start_date).getFullYear()).filter(year => !isNaN(year)));
        const sortedYears = Array.from(years).sort((a, b) => b - a);

        return sortedYears.length > 0 ? sortedYears : [new Date().getFullYear()];
    }, [leaveRequests, leaveHistory, dataLeave]);


   const calculateStats = useCallback((yearForChart: number) => {
    if (!dataLeave.length) return {};

    const activeUsers = dataLeave.filter(user => user.status?.toLowerCase() === 'active');
    const totalUsers = dataLeave.length;
    const activeCount = activeUsers.length;
    const inactiveCount = totalUsers - activeCount;

    const allLeaveData = [...leaveRequests, ...leaveHistory];
    const currentYearForCards = new Date().getFullYear();

    const approvedLeaves = allLeaveData.filter(leave => {
        const isApproved = leave.status?.toLowerCase() === 'approved' || leave.status?.toLowerCase() === 'taken';
        return isApproved;
    });
      // DEBUG: Cek apakah ada cuti yang berhasil difilter sebagai 'approved'
    console.log("DATA CUTI APPROVED:", approvedLeaves);

    const currentYearLeaves = approvedLeaves.filter(leave => new Date(leave.start_date).getFullYear() === currentYearForCards);
    const totalThisYearLeave = currentYearLeaves.reduce((sum, leave) => sum + (leave.total_days || 0), 0);

    const lastYearLeaves = approvedLeaves.filter(leave => new Date(leave.start_date).getFullYear() === currentYearForCards - 1);
    const totalLastYearLeave = lastYearLeaves.reduce((sum, leave) => sum + (leave.total_days || 0), 0);

    const oneWeekAgo = new Date();
    oneWeekAgo.setDate(oneWeekAgo.getDate() - 7);
    const weeklyLeaveUsers = approvedLeaves.filter(leave => {
        const leaveDate = new Date(leave.start_date);
        return leaveDate >= oneWeekAgo && leaveDate <= new Date();
    }).length;

    const pendingLeaves = leaveRequests.filter(leave => leave.status?.toLowerCase() === 'pending');
    const pendingLeaveCount = pendingLeaves.length;

    const DEFAULT_YEARLY_LEAVE = 12; // jatah cuti per tahun

    const userLeaveStats = dataLeave.map(user => {
    // 1. Menghitung Masa Kerja (dalam tahun)
    const joinYear = new Date(user.join_date).getFullYear();
    const currentYear = new Date().getFullYear();
    const yearsWorked = (currentYear - joinYear) + 1; // Termasuk tahun ini
      console.log(`--- Menghitung untuk: ${user.name} (NIK: ${user.nik}) ---`);

    // 2. Menghitung Total Cuti yang Dipakai (Numerator)
        const userApprovedLeaves = approvedLeaves.filter(leave =>
        leave.nik === user.nik
    );
      
        // DEBUG: Ini adalah bagian paling penting. Apakah cuti user ditemukan?
        if(userApprovedLeaves.length === 0) {
            console.warn(`Peringatan: Tidak ada cuti 'approved' yang ditemukan untuk ${user.name}. Pencocokan nama mungkin gagal.`);
        } else {
             console.log(`Berhasil menemukan ${userApprovedLeaves.length} data cuti untuk ${user.name}`, userApprovedLeaves);
        }
    const totalLeaveTaken = userApprovedLeaves.reduce((sum, leave) => sum + (leave.total_days || 0), 0);
   console.log(`Total Cuti Diambil: ${totalLeaveTaken}`);
    // 3. Menghitung Total Jatah Cuti Sejak Bergabung (Denominator)
    const totalLeaveQuota = yearsWorked * DEFAULT_YEARLY_LEAVE;

    // 4. Kalkulasi Akhir (Total Dipakai / Total Jatah)
    const averageLeave = totalLeaveQuota > 0 ? totalLeaveTaken / totalLeaveQuota : 0;

        return {
            ...user,
            balance: user.balance || { total_amount: 0, current_amount: 0, carried_amount: 0 },
            average_leave: parseFloat(averageLeave.toFixed(2)) 
        };
    });

    const topRemainingLeaveUsers = [...userLeaveStats].sort((a, b) => b.balance.total_amount - a.balance.total_amount).slice(0, 5);
    const bottomRemainingLeaveUsers = [...userLeaveStats].sort((a, b) => a.balance.total_amount - b.balance.total_amount).slice(0, 5);

    const monthlyChartLeaves = approvedLeaves.filter(leave => new Date(leave.start_date).getFullYear() === yearForChart);

    const monthlyLeaveData: { month: string; leave: number; }[] = [];
    for (let month = 0; month < 12; month++) {
        const monthName = new Date(yearForChart, month).toLocaleDateString('en', { month: 'short' });
        const monthLeaves = monthlyChartLeaves.filter(leave => new Date(leave.start_date).getMonth() === month);
        const monthTotal = monthLeaves.reduce((sum, leave) => sum + (leave.total_days || 0), 0);
        monthlyLeaveData.push({ month: monthName, leave: monthTotal });
    }

    return {
        totalUsers, activeCount, inactiveCount, totalThisYearLeave, totalLastYearLeave,
        pendingLeaveCount, pendingLeaves, topRemainingLeaveUsers, bottomRemainingLeaveUsers,
        monthlyLeaveData, weeklyLeaveUsers,
    };
}, [dataLeave, leaveRequests, leaveHistory]);



    useEffect(() => {
        if (!isLoading) {
            const newStats = calculateStats(selectedYear);
            setStats(newStats);
        }
    }, [selectedYear, isLoading, calculateStats]);

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
                <StatCard title="Total Karyawan" value={stats.totalUsers || 0} subtitle={`${stats.activeCount || 0} aktif, ${stats.inactiveCount || 0} tidak aktif`} icon="bi-people-fill" color="blue" />
                <StatCard title="Total Cuti Tahun Ini" value={stats.totalThisYearLeave || 0} subtitle={`Approved di ${new Date().getFullYear()}`} icon="bi-calendar-check-fill" color="green" />
                <StatCard title="Karyawan Cuti Mingguan" value={`${stats.weeklyLeaveUsers || 0} orang`} subtitle="Cuti dalam 7 hari terakhir" icon="bi-person-dash-fill" color="orange" />
                <StatCard title="Cuti Pending" value={`${stats.pendingLeaveCount || 0} orang`} subtitle={`Menunggu persetujuan`} icon="bi-clock-history" color="yellow" />
            </div>

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

            <div className=" grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
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

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
                <div className="dark:bg-card rounded-2xl p-6 shadow-sm border border-border">
                    <h3 className="text-xl font-semibold text-foreground mb-4 flex items-center gap-2">
                        <i className="bi bi-arrow-up-circle text-green-500"></i>
                        User Dengan Sisa Cuti Terbanyak
                    </h3>
                    <div className="space-y-3">
                        {(stats.topRemainingLeaveUsers || []).map((user: UserStatsType, index: number) => (
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
                                    <p className="text-xs text-gray-500 mt-1">Rerata Cuti: <b>{user.average_leave}</b> hari</p>
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
                        {(stats.bottomRemainingLeaveUsers || []).map((user: UserStatsType, index: number) => (
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
                                    <p className="text-xs text-gray-500 mt-1">Rerata Cuti: <b>{user.average_leave}</b> hari</p>
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
