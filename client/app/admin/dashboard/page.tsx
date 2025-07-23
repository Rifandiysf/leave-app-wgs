'use client'

import { useState, useEffect, useCallback } from "react";
import 'bootstrap-icons/font/bootstrap-icons.css';
import withAuth from "@/lib/auth/withAuth";

type dataLeaveType = {
    nik: string,
    name: string,
    gender: string,
    role: string,
    status: string,
    last_year_leave?: number,
    this_year_leave?: number,
    leave_total?: number
};

const DashboardPage = () => {
    const [dataLeave, setDataLeave] = useState<dataLeaveType[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const fetchData = useCallback(async () => {
        setIsLoading(true);
        try {
            const token = localStorage?.getItem?.('token');
            const deviceId = localStorage?.getItem?.('device-id');

            const response = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/users?limit=1000`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    ...(token && { Authorization: `${token}` }),
                    ...(deviceId && { 'device-id': deviceId }),
                },
            });

            const resJson = await response.json();
            const fetchedData = resJson?.data?.data || resJson?.data || resJson || [];

            if (Array.isArray(fetchedData)) {
                setDataLeave(fetchedData);
            }
        } catch (error) {
            console.error("Failed to fetch data:", error);
            setDataLeave([]);
        } finally {
            setIsLoading(false);
        }
    }, []);

    useEffect(() => {
        fetchData();
    }, [fetchData]);

    // Calculate statistics
    const calculateStats = () => {
        if (!dataLeave.length) return {};

        const activeUsers = dataLeave.filter(user => user.status?.toLowerCase() === 'active');
        const totalUsers = dataLeave.length;
        const activeCount = activeUsers.length;
        const inactiveCount = totalUsers - activeCount;

        // Total cuti
        const totalThisYearLeave = dataLeave.reduce((sum, user) => sum + (user.this_year_leave || 0), 0);
        const totalLastYearLeave = dataLeave.reduce((sum, user) => sum + (user.last_year_leave || 0), 0);
        const totalAllLeave = dataLeave.reduce((sum, user) => sum + (user.leave_total || 0), 0);

        // Get all users with leave data, sorted by leave amount
        const usersWithLeave = [...dataLeave]
            .filter(user => (user.this_year_leave || 0) > 0)
            .sort((a, b) => (b.this_year_leave || 0) - (a.this_year_leave || 0));

        // Top 5 highest leave
        const topLeaveUsers = usersWithLeave.slice(0, 5);

        // Top 5 lowest leave (reverse the sorted array and take first 5)
        const bottomLeaveUsers = [...usersWithLeave].reverse().slice(0, 5);

        // Gender distribution
        const genderStats = dataLeave.reduce((acc, user) => {
            const gender = user.gender || 'unknown';
            acc[gender] = (acc[gender] || 0) + 1;
            return acc;
        }, {} as Record<string, number>);

        // Role distribution
        const roleStats = dataLeave.reduce((acc, user) => {
            const role = (user.role || 'unknown').replace(/_/g, ' ');
            acc[role] = (acc[role] || 0) + 1;
            return acc;
        }, {} as Record<string, number>);

        // Average leave by role
        const roleLeaveStats = dataLeave.reduce((acc, user) => {
            const role = (user.role || 'unknown').replace(/_/g, ' ');
            if (!acc[role]) {
                acc[role] = { total: 0, count: 0, sum: 0 };
            }
            acc[role].count += 1;
            acc[role].sum += (user.this_year_leave || 0);
            acc[role].total = acc[role].sum / acc[role].count;
            return acc;
        }, {} as Record<string, { total: number, count: number, sum: number }>);

        return {
            totalUsers,
            activeCount,
            inactiveCount,
            totalThisYearLeave,
            totalLastYearLeave,
            totalAllLeave,
            topLeaveUsers,
            bottomLeaveUsers,
            genderStats,
            roleStats,
            roleLeaveStats,
            averageLeaveThisYear: totalUsers > 0 ? (totalThisYearLeave / totalUsers).toFixed(1) : 0
        };
    };

    const stats = calculateStats();

    // Chart data preparation
    const genderChartData = Object.entries(stats.genderStats || {}).map(([gender, count]) => ({
        name: gender.charAt(0).toUpperCase() + gender.slice(1),
        value: count
    }));

    const roleChartData = Object.entries(stats.roleLeaveStats || {}).map(([role, data]) => ({
        role: role.charAt(0).toUpperCase() + role.slice(1),
        average: Math.round(data.total * 10) / 10,
        count: data.count
    }));

    const COLORS = ['#3B82F6', '#10B981', '#F59E0B', '#EF4444', '#8B5CF6', '#06B6D4'];

    const StatCard = ({ title, value, subtitle, icon, color = "blue", trend }: any) => (
        <div className="bg-white rounded-2xl p-6  border  hover:shadow-md transition-all duration-200">
            <div className="flex items-center justify-between">
                <div>
                    <p className="text-sm font-medium text-gray-500 mb-1">{title}</p>
                    <p className={`text-3xl font-bold text-${color}-600 mb-1`}>{value}</p>
                    {subtitle && <p className="text-sm text-gray-400">{subtitle}</p>}
                </div>
                <div className={`p-3 bg-${color}-100 rounded-xl`}>
                    <i className={`bi ${icon} text-2xl text-${color}-600`}></i>
                </div>
            </div>
            {trend && (
                <div className="mt-4 flex items-center gap-1">
                    <i className={`bi ${trend.direction === 'up' ? 'bi-arrow-up' : 'bi-arrow-down'} text-sm ${trend.direction === 'up' ? 'text-green-500' : 'text-red-500'}`}></i>
                    <span className={`text-sm font-medium ${trend.direction === 'up' ? 'text-green-500' : 'text-red-500'}`}>
                        {trend.value}
                    </span>
                    <span className="text-sm text-gray-500">from last period</span>
                </div>
            )}
        </div>
    );

    if (isLoading) {
        return (
            <div className="min-h-screen  p-6">
                <div className="animate-pulse">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                        {[...Array(4)].map((_, i) => (
                            <div key={i} className=" rounded-2xl p-6 h-32">
                                <div className="h-4 rounded w-1/2 mb-4"></div>
                                <div className="h-8 rounded w-3/4"></div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen  p-6">
            {/* Header */}
            <div className="mb-8">
                <h1 className="text-3xl font-bold text-gray-900 mb-2">Dashboard Admin</h1>
                <p className="text-gray-600">Ringkasan informasi dan statistik karyawan</p>
            </div>

            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                <StatCard
                    title="Total Karyawan"
                    value={stats.totalUsers || 0}
                    subtitle={`${stats.activeCount || 0} aktif, ${stats.inactiveCount || 0} tidak aktif`}
                    icon="bi-people-fill"
                    color="blue"
                />
                <StatCard
                    title="Total Cuti Tahun Ini"
                    value={stats.totalThisYearLeave || 0}
                    subtitle="Hari cuti diambil"
                    icon="bi-calendar-check-fill"
                    color="green"
                />
                <StatCard
                    title="Rata-rata Cuti"
                    value={`${stats.averageLeaveThisYear || 0} hari`}
                    subtitle="Per karyawan tahun ini"
                    icon="bi-graph-up"
                    color="purple"
                />
                <StatCard
                    title="Karyawan Aktif"
                    value={`${stats.activeCount || 0}`}
                    subtitle={`${((stats.activeCount || 0) / (stats.totalUsers || 1) * 100).toFixed(1)}% dari total`}
                    icon="bi-person-check-fill"
                    color="emerald"
                />
            </div>

       
            {/* Top/Bottom Users Section */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
                {/* Top 5 Users with Highest Leave */}
                <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
                    <h3 className="text-xl font-semibold text-gray-800 mb-4 flex items-center gap-2">
                        <i className="bi bi-arrow-up-circle text-green-500"></i>
                        Top 5 Cuti Terbanyak
                    </h3>
                    <div className="space-y-3">
                        {(stats.topLeaveUsers || []).map((user, index) => (
                            <div key={user.nik} className="flex items-center justify-between p-3 bg-red-50 rounded-lg border border-red-100">
                                <div className="flex items-center gap-3">
                                    <div className={`w-8 h-8 rounded-full flex items-center justify-center text-white font-bold text-sm ${
                                        index === 0 ? 'bg-green-500' : index === 1 ? 'bg-green-400' : 'bg-green-300'
                                    }`}>
                                        {index + 1}
                                    </div>
                                    <div>
                                        <p className="font-medium text-gray-800">{user.name}</p>
                                        <p className="text-sm text-gray-500">{user.nik} • {(user.role || '').replace(/_/g, ' ')}</p>
                                    </div>
                                </div>
                                <div className="text-right">
                                    <p className="font-bold text-green-600">{user.this_year_leave || 0} hari</p>
                                    <p className="text-xs text-gray-500">cuti tahun ini</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Bottom 5 Users with Lowest Leave */}
                <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
                    <h3 className="text-xl font-semibold text-gray-800 mb-4 flex items-center gap-2">
                        <i className="bi bi-arrow-down-circle text-red-500"></i>
                        Top 5 Cuti Terendah
                    </h3>
                    <div className="space-y-3">
                        {(stats.bottomLeaveUsers || []).map((user, index) => (
                            <div key={user.nik} className="flex items-center justify-between p-3 bg-green-50 rounded-lg border border-green-100">
                                <div className="flex items-center gap-3">
                                    <div className={`w-8 h-8 rounded-full flex items-center justify-center text-white font-bold text-sm ${
                                        index === 0 ? 'bg-red-500' : index === 1 ? 'bg-red-400' : 'bg-red-300'
                                    }`}>
                                        {index + 1}
                                    </div>
                                    <div>
                                        <p className="font-medium text-gray-800">{user.name}</p>
                                        <p className="text-sm text-gray-500">{user.nik} • {(user.role || '').replace(/_/g, ' ')}</p>
                                    </div>
                                </div>
                                <div className="text-right">
                                    <p className="font-bold text-red-600">{user.this_year_leave || 0} hari</p>
                                    <p className="text-xs text-gray-500">cuti tahun ini</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* Quick Stats */}
            <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
                <h3 className="text-xl font-semibold text-gray-800 mb-6">Statistik Cepat</h3>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    <div className="text-center p-4 bg-blue-50 rounded-xl border border-blue-100">
                        <i className="bi bi-calendar-event text-2xl text-blue-500 mb-2"></i>
                        <p className="text-2xl font-bold text-blue-600">{stats.totalThisYearLeave || 0}</p>
                        <p className="text-sm text-gray-600">Cuti Tahun Ini</p>
                    </div>
                    <div className="text-center p-4 bg-purple-50 rounded-xl border border-purple-100">
                        <i className="bi bi-calendar-minus text-2xl text-purple-500 mb-2"></i>
                        <p className="text-2xl font-bold text-purple-600">{stats.totalLastYearLeave || 0}</p>
                        <p className="text-sm text-gray-600">Cuti Tahun Lalu</p>
                    </div>
                    <div className="text-center p-4 bg-emerald-50 rounded-xl border border-emerald-100">
                        <i className="bi bi-people text-2xl text-emerald-500 mb-2"></i>
                        <p className="text-2xl font-bold text-emerald-600">{stats.activeCount || 0}</p>
                        <p className="text-sm text-gray-600">Karyawan Aktif</p>
                    </div>
                    <div className="text-center p-4 bg-orange-50 rounded-xl border border-orange-100">
                        <i className="bi bi-graph-up text-2xl text-orange-500 mb-2"></i>
                        <p className="text-2xl font-bold text-orange-600">{stats.averageLeaveThisYear || 0}</p>
                        <p className="text-sm text-gray-600">Rata-rata Cuti</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default withAuth(DashboardPage, { requireAdmin: true });