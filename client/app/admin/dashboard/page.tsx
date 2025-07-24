    'use client'

    import { useState, useEffect, useCallback } from "react";
    import 'bootstrap-icons/font/bootstrap-icons.css';
    import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar, PieChart, Pie, Cell } from 'recharts';
    import withAuth from "@/lib/auth/withAuth";
    import axiosInstance from '@/app/api/axiosInstance';

    type dataLeaveType = {
        nik: string,
        name: string,
        gender: string,
        role: string,
        status: string,
        last_year_leave?: number,
        this_year_leave?: number,
        leave_total?: number,
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
        
        // Konstanta jatah cuti per tahun
        const ANNUAL_LEAVE_QUOTA = 12;
        
        const fetchUsersData = useCallback(async () => {
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
                console.error("Failed to fetch users data:", error);
                setDataLeave([]);
            }
        }, []);

        const fetchLeaveData = useCallback(async () => {
            try {
                // Fetch leave requests (pending/approved/rejected)
                const requestsResponse = await axiosInstance.get('/leaves');
                if (requestsResponse.data && Array.isArray(requestsResponse.data.data)) {
                    setLeaveRequests(requestsResponse.data.data);
                }

                // Fetch leave history
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

        const calculateStats = () => {
            if (!dataLeave.length || !leaveRequests) return {};

             const activeUsers = dataLeave.filter(user => user.status?.toLowerCase() === 'active');
                const totalUsers = dataLeave.length;
                const activeCount = activeUsers.length;
                const inactiveCount = totalUsers - activeCount;
            // Calculate leave statistics from actual leave data
            const allLeaveData = [...leaveRequests, ...leaveHistory];
            
            // Get current year
            const currentYear = new Date().getFullYear();
            
            // Filter current year leaves (hanya yang approved/taken)
            const currentYearLeaves = allLeaveData.filter(leave => {
                const leaveYear = new Date(leave.start_date).getFullYear();
                const isApproved = leave.status?.toLowerCase() === 'approved' || leave.status?.toLowerCase() === 'taken';
                return leaveYear === currentYear && isApproved;
            });

            const totalThisYearLeave = currentYearLeaves.reduce((sum, leave) => sum + (leave.total_days || 0), 0);
            
            // Filter last year leaves (hanya yang approved/taken)
            const lastYearLeaves = allLeaveData.filter(leave => {
                const leaveYear = new Date(leave.start_date).getFullYear();
                const isApproved = leave.status?.toLowerCase() === 'approved' || leave.status?.toLowerCase() === 'taken';
                return leaveYear === currentYear - 1 && isApproved;
            });

            const totalLastYearLeave = lastYearLeaves.reduce((sum, leave) => sum + (leave.total_days || 0), 0);
            const totalAllLeave = allLeaveData.filter(leave => {
                const isApproved = leave.status?.toLowerCase() === 'approved' || leave.status?.toLowerCase() === 'taken';
                return isApproved;
            }).reduce((sum, leave) => sum + (leave.total_days || 0), 0);

            // Count pending leave requests
            const pendingLeaves = leaveRequests.filter(leave => 
                leave.status?.toLowerCase() === 'pending'
            );
            const pendingLeaveCount = pendingLeaves.length;

            // Calculate total pending leave days
            const totalPendingLeaveDays = pendingLeaves.reduce((sum, leave) => {
                return sum + (leave.total_days || 0);
            }, 0);

            // Generate monthly leave data based on actual leave dates
            const monthlyLeaveData: { month: string; leave: number; cumulative: any; }[] = [];
            for (let month = 0; month < 12; month++) {
                const monthName = new Date(currentYear, month).toLocaleDateString('en', { month: 'short' });
                const monthLeaves = currentYearLeaves.filter(leave => {
                    const leaveMonth = new Date(leave.start_date).getMonth();
                    return leaveMonth === month;
                });
                const monthTotal = monthLeaves.reduce((sum, leave) => sum + (leave.total_days || 0), 0);
                
                monthlyLeaveData.push({
                    month: monthName,
                    leave: monthTotal,
                    cumulative: monthlyLeaveData.reduce((sum, m) => sum + m.leave, 0) + monthTotal
                });
            }

            const sixMonthLeave = monthlyLeaveData.slice(0, 6).reduce((sum, month) => sum + month.leave, 0);
            
            // Data untuk semester comparison
            const semesterData = [
                { semester: 'Semester 1 (Jan-Jun)', leave: sixMonthLeave, percentage: totalThisYearLeave > 0 ? ((sixMonthLeave / totalThisYearLeave) * 100).toFixed(1) : '0' },
                { semester: 'Semester 2 (Jul-Des)', leave: totalThisYearLeave - sixMonthLeave, percentage: totalThisYearLeave > 0 ? (((totalThisYearLeave - sixMonthLeave) / totalThisYearLeave) * 100).toFixed(1) : '0' }
            ];

            // Hitung jumlah orang yang mengambil cuti dalam seminggu terakhir
            const oneWeekAgo = new Date();
            oneWeekAgo.setDate(oneWeekAgo.getDate() - 7);
            
            const weeklyLeaveUsers = allLeaveData.filter(leave => {
                const leaveDate = new Date(leave.start_date);
                const isApproved = leave.status?.toLowerCase() === 'approved' || leave.status?.toLowerCase() === 'taken';
                return leaveDate >= oneWeekAgo && leaveDate <= new Date() && isApproved;
            }).length;

            const userLeaveStats = dataLeave.map(user => {
    const userApprovedLeaves = allLeaveData.filter(leave =>
        leave.name === user.name &&
        (leave.status?.toLowerCase() === 'approved' || leave.status?.toLowerCase() === 'taken')
    );

    const thisYearTaken = userApprovedLeaves
        .filter(leave => new Date(leave.start_date).getFullYear() === currentYear)
        .reduce((sum, leave) => sum + (leave.total_days || 0), 0);

    const lastYearTaken = userApprovedLeaves
        .filter(leave => new Date(leave.start_date).getFullYear() === currentYear - 1)
        .reduce((sum, leave) => sum + (leave.total_days || 0), 0);

    const thisYearRemaining = ANNUAL_LEAVE_QUOTA - thisYearTaken;
    const lastYearRemaining = ANNUAL_LEAVE_QUOTA - lastYearTaken;

    const totalRemainingLeave = thisYearRemaining + lastYearRemaining;

    return {
        ...user,
        this_year_taken: thisYearTaken,
        last_year_taken: lastYearTaken,
        this_year_remaining: thisYearRemaining,
        last_year_remaining: lastYearRemaining,
        total_remaining_leave: totalRemainingLeave
    };
});

    

        const topRemainingLeaveUsers = [...userLeaveStats]
        .sort((a, b) => b.total_remaining_leave - a.total_remaining_leave)
        .slice(0, 5);

    const bottomRemainingLeaveUsers = [...userLeaveStats]
        .sort((a, b) => a.total_remaining_leave - b.total_remaining_leave)
        .slice(0, 5);

            const genderStats = dataLeave.reduce((acc, user) => {
                const gender = user.gender || 'unknown';
                acc[gender] = (acc[gender] || 0) + 1;
                return acc;
            }, {} as Record<string, number>);

            const roleStats = dataLeave.reduce((acc, user) => {
                const role = (user.role || 'unknown').replace(/_/g, ' ');
                acc[role] = (acc[role] || 0) + 1;
                return acc;
            }, {} as Record<string, number>);

            const roleLeaveStats = dataLeave.reduce((acc, user) => {
                const role = (user.role || 'unknown').replace(/_/g, ' ');
                if (!acc[role]) {
                    acc[role] = { total: 0, count: 0, sum: 0 };
                }
                acc[role].count += 1;
                
                // Get actual leave data for this user
                const userStats = userLeaveStats.find(u => u.nik === user.nik);

                const userLeaveThisYear = userStats?.this_year_taken || 0;
                
                acc[role].sum += userLeaveThisYear;
                acc[role].total = acc[role].count > 0 ? acc[role].sum / acc[role].count : 0;
                return acc;
            }, {} as Record<string, { total: number, count: number, sum: number }>);

            const topDepartmentLeave = Object.entries(roleLeaveStats)
                .sort(([, a], [, b]) => b.sum - a.sum)
                .slice(0, 3);

            return {
                totalUsers,
                activeCount,
                inactiveCount,
                totalThisYearLeave,
                totalLastYearLeave,
                totalAllLeave,
                sixMonthLeave,
                weeklyLeaveUsers,
                pendingLeaveCount,
                pendingLeaves,
                totalPendingLeaveDays,
                topRemainingLeaveUsers,
                bottomRemainingLeaveUsers,
                genderStats,
                roleStats,
                roleLeaveStats,
                topDepartmentLeave,
                averageLeaveThisYear: totalUsers > 0 ? (totalThisYearLeave / totalUsers).toFixed(1) : '0',
                monthlyLeaveData,
                semesterData
            };
        };

        const stats = calculateStats();


        const COLORS = ['#3B82F6', '#10B981', '#F59E0B', '#EF4444', '#8B5CF6', '#06B6D4'];

        const StatCard = ({ title, value, subtitle, icon, color = "blue", trend }: any) => (
            <div className="bg-white rounded-2xl p-6 border hover:shadow-md transition-all duration-200">
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
                <div className="min-h-screen p-6">
                    <div className="animate-pulse">
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                            {[...Array(4)].map((_, i) => (
                                <div key={i} className="rounded-2xl p-6 h-32 ">
                                    <div className="h-4  rounded w-1/2 mb-4"></div>
                                    <div className="h-8  rounded w-3/4"></div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            );
        }

        return (
            <div className="min-h-screen p-6">
                <div className="mb-8">
                    <h1 className="text-3xl font-bold text-gray-900 mb-2">Dashboard Admin</h1>
                    <p className="text-gray-600">Ringkasan informasi dan statistik karyawan</p>
                </div>

                {/* Main Stats Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                    <StatCard
                        title="Total Karyawan"
                        value={stats.totalUsers || 0}
                        subtitle={`${stats.activeCount || 0} aktif, ${stats.inactiveCount || 0} tidak aktif`}
                        icon="bi-people-fill"
                        color="blue"
                    />
                    <StatCard
                        title="Cuti 6 Bulan (Jan-Jun)"
                        value={stats.sixMonthLeave || 0}
                        subtitle="Total jumlah cuti per 6 bulan "
                        icon="bi-calendar-range-fill"
                        color="green"
                    />
                    <StatCard
                        title="Karyawan Cuti Mingguan"
                        value={`${stats.weeklyLeaveUsers || 0} orang`}
                        subtitle="Cuti dalam 7 hari terakhir"
                        icon="bi-person-dash-fill"
                        color="orange"
                    />
                    <StatCard
                        title="Cuti Pending"
                        value={`${stats.pendingLeaveCount || 0} orang`}
                        subtitle={`${stats.totalPendingLeaveDays || 0} hari menunggu persetujuan`}
                        icon="bi-clock-history"
                        color="yellow"
                    />
                </div>

                  {/* Pending Leave Users Section */}
                {stats.pendingLeaves && stats.pendingLeaves.length > 0 && (
                    <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 mb-8">
                        <h3 className="text-xl font-semibold text-gray-800 mb-4 flex items-center gap-2">
                            <i className="bi bi-clock-history text-yellow-500"></i>
                            Karyawan dengan Cuti Pending ({stats.pendingLeaveCount} orang)
                        </h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                            {stats.pendingLeaves.map((leave: ApiLeaveType) => (
                                <div key={leave.id_leave} className="bg-yellow-50 rounded-lg p-4 border border-yellow-200">
                                    <div className="flex items-center justify-between mb-2">
                                        <h4 className="font-medium text-gray-800">{leave.name}</h4>
                                        <span className="px-2 py-1 bg-yellow-200 text-yellow-800 rounded-full text-xs font-medium">
                                            Pending
                                        </span>
                                    </div>
                                    <p className="text-sm text-gray-600 mb-1">
                                        Tipe: {leave.leave_type?.replace(/_/g, ' ')}
                                    </p>
                                    <p className="text-sm text-gray-600 mb-1">
                                        Tanggal: {new Date(leave.start_date).toLocaleDateString('id-ID')} - {new Date(leave.end_date).toLocaleDateString('id-ID')}
                                    </p>
                                    <p className="text-sm text-gray-600">
                                        Durasi: {leave.total_days} hari
                                    </p>
                                </div>
                            ))}
                        </div>
                    </div>
                )}


                {/* Charts Section */}
                <div className=" grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
                    {/* Monthly Leave Chart */}
                    <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
                        <h3 className="text-xl font-semibold text-gray-800 mb-4 flex items-center gap-2">
                            <i className="bi bi-graph-up text-blue-500"></i>
                            Trend Cuti Bulanan {new Date().getFullYear()}
                        </h3>
                        <div className="h-80">
                            <ResponsiveContainer width="100%" height="100%">
                                <LineChart data={stats.monthlyLeaveData}>
                                    <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                                    <XAxis 
                                        dataKey="month" 
                                        stroke="#6b7280"
                                        fontSize={12}
                                    />
                                    <YAxis 
                                        stroke="#6b7280"
                                        fontSize={12}
                                    />
                                    <Tooltip 
                                        contentStyle={{
                                            backgroundColor: '#fff',
                                            border: '1px solid #e5e7eb',
                                            borderRadius: '8px',
                                            boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)'
                                        }}
                                    />
                                    <Line 
                                        type="monotone" 
                                        dataKey="leave" 
                                        stroke="#3b82f6" 
                                        strokeWidth={3}
                                        dot={{ fill: '#3b82f6', strokeWidth: 2, r: 4 }}
                                        activeDot={{ r: 6, stroke: '#3b82f6', strokeWidth: 2, fill: '#fff' }}
                                        name="Cuti (hari)"
                                    />
                                </LineChart>
                            </ResponsiveContainer>
                        </div>
                    </div>
                </div>

              
        
                {/* Top and Bottom Remaining Leave Users */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
                    <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
                        <h3 className="text-xl font-semibold text-gray-800 mb-4 flex items-center gap-2">
                            <i className="bi bi-arrow-up-circle text-green-500"></i>
                            Top 5 Sisa Cuti Terbanyak (2 Tahun)
                        </h3>
                        <div className="space-y-3">
                            {(stats.topRemainingLeaveUsers || []).map((user, index) => (
                                <div key={user.nik} className="flex items-center justify-between p-3 bg-green-50 rounded-lg border border-green-100">
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
                                        <p className="font-bold text-green-600">{user.total_remaining_leave || 0} hari</p>
                                        <p className="text-xs text-gray-500">
                                            Tahun ini: {user.this_year_remaining || 0} | Tahun lalu: {user.last_year_remaining || 0}
                                        </p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
                        <h3 className="text-xl font-semibold text-gray-800 mb-4 flex items-center gap-2">
                            <i className="bi bi-arrow-down-circle text-red-500"></i>
                            Top 5 Sisa Cuti Tersedikit (2 Tahun)
                        </h3>
                        <div className="space-y-3">
                            {(stats.bottomRemainingLeaveUsers || []).map((user, index) => (
                                <div key={user.nik} className="flex items-center justify-between p-3 bg-red-50 rounded-lg border border-red-100">
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
                                        <p className="font-bold text-red-600">{user.total_remaining_leave || 0} hari</p>
                                        <p className="text-xs text-gray-500">
                                            Tahun ini: {user.this_year_remaining || 0} | Tahun lalu: {user.last_year_remaining || 0}
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

    export default withAuth(DashboardPage, { requireAdmin: true });