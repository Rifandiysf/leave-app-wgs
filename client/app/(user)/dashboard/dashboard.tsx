'use client'

import React, { useState, useEffect, useCallback } from "react";
import { Card } from "../../components/ui/card"
import 'bootstrap-icons/font/bootstrap-icons.css'
import Modal from "@/app/components/Modal/Modal"
import withAuth from "@/lib/auth/withAuth"

// Type untuk data user dashboard
type UserDashboardData = {
  nik: string,
  name: string,
  gender: string,
  role: string,
  status: string,
  this_year_leave: number,
  last_year_leave: number,
  leave_total: number,
  pending_requests: number,
  days_used: number
};

const UserDashboard = () => {
  const [userData, setUserData] = useState<UserDashboardData | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Fungsi untuk fetch data user dashboard
  const fetchUserDashboardData = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    
    try {
      const token = localStorage.getItem('token');
      const deviceId = localStorage.getItem('device-id');
      
      if (!token) {
        throw new Error('No token found');
      }

      // Decode token untuk mendapatkan informasi user (jika token berupa JWT)
      // Atau langsung fetch semua users dan filter berdasarkan user yang login
      let currentUserData = null;
      
      // Method 1: Coba decode JWT token untuk mendapatkan user info
      try {
        const tokenPayload = JSON.parse(atob(token.split('.')[1]));
        const userNik = tokenPayload.nik || tokenPayload.sub || tokenPayload.user_id;
        
        if (userNik) {
          // Fetch user data berdasarkan NIK dari token
          const userResponse = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/users?search=${userNik}&limit=1`, {
            method: 'GET',
            headers: {
              'Content-Type': 'application/json',
              'Authorization': `${token}`,
              ...(deviceId && { 'device-id': deviceId }),
            },
          });

          if (userResponse.ok) {
            const userResult = await userResponse.json();
            const userData = userResult?.data?.data || userResult?.data || userResult || [];
            currentUserData = Array.isArray(userData) ? userData[0] : userData;
          }
        }
      } catch (tokenError) {
        console.warn('Failed to decode token:', tokenError);
      }

      // Method 2: Jika decode token gagal, coba fetch endpoint auth/me atau user/me
      if (!currentUserData) {
        try {
          const authResponse = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/auth/me`, {
            method: 'GET',
            headers: {
              'Content-Type': 'application/json',
              'Authorization': `${token}`,
              ...(deviceId && { 'device-id': deviceId }),
            },
          });

          if (authResponse.ok) {
            const authResult = await authResponse.json();
            currentUserData = authResult?.data || authResult;
          }
        } catch (authError) {
          console.warn('Failed to fetch from auth/me:', authError);
        }
      }

      // Method 3: Jika masih gagal, coba endpoint user/me
      if (!currentUserData) {
        try {
          const meResponse = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/user/me`, {
            method: 'GET',
            headers: {
              'Content-Type': 'application/json',
              'Authorization': `${token}`,
              ...(deviceId && { 'device-id': deviceId }),
            },
          });

          if (meResponse.ok) {
            const meResult = await meResponse.json();
            currentUserData = meResult?.data || meResult;
          }
        } catch (meError) {
          console.warn('Failed to fetch from user/me:', meError);
        }
      }

      // Method 4: Jika semua gagal, ambil data dari localStorage jika tersedia
      if (!currentUserData) {
        const storedUser = localStorage.getItem('user');
        if (storedUser) {
          try {
            currentUserData = JSON.parse(storedUser);
          } catch (parseError) {
            console.warn('Failed to parse stored user:', parseError);
          }
        }
      }

      // Jika masih tidak ada data user, throw error
      if (!currentUserData || !currentUserData.nik) {
        throw new Error('Unable to identify current user. Please login again.');
      }

      const userNik = currentUserData.nik;

      // Fetch pending requests count
      let pendingCount = 0;
      try {
        const pendingResponse = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/leaves?status=pending&nik=${userNik}`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `${token}`,
            ...(deviceId && { 'device-id': deviceId }),
          },
        });

        if (pendingResponse.ok) {
          const pendingResult = await pendingResponse.json();
          const pendingData = pendingResult?.data?.data || pendingResult?.data || [];
          pendingCount = Array.isArray(pendingData) ? pendingData.length : 0;
        }
      } catch (pendingError) {
        console.warn('Failed to fetch pending requests:', pendingError);
      }

      // Fetch days used (approved leaves untuk tahun ini)
      let daysUsed = 0;
      try {
        const currentYear = new Date().getFullYear();
        const usedResponse = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/leaves?status=approved&nik=${userNik}&year=${currentYear}`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `${token}`,
            ...(deviceId && { 'device-id': deviceId }),
          },
        });

        if (usedResponse.ok) {
          const usedResult = await usedResponse.json();
          const usedData = usedResult?.data?.data || usedResult?.data || [];
          if (Array.isArray(usedData)) {
            daysUsed = usedData.reduce((total, leave) => total + (leave.duration || leave.days || 0), 0);
          }
        }
      } catch (usedError) {
        console.warn('Failed to fetch used days:', usedError);
      }

      // Set user data dengan default values jika data tidak ada
      const finalUserData: UserDashboardData = {
        nik: currentUserData.nik,
        name: currentUserData.name || 'Unknown',
        gender: currentUserData.gender || 'unknown',
        role: currentUserData.role || 'unknown',
        status: currentUserData.status || 'unknown',
        this_year_leave: currentUserData.this_year_leave || 0,
        last_year_leave: currentUserData.last_year_leave || 0,
        leave_total: currentUserData.leave_total || ((currentUserData.this_year_leave || 0) + (currentUserData.last_year_leave || 0)),
        pending_requests: pendingCount,
        days_used: daysUsed
      };

      setUserData(finalUserData);
    } catch (error) {
      console.error("Failed to fetch user dashboard data:", error);
      setError(error instanceof Error ? error.message : 'Failed to fetch data');
    } finally {
      setIsLoading(false);
    }
  }, []);

  // Effect untuk fetch data saat component mount
  useEffect(() => {
    fetchUserDashboardData();
  }, [fetchUserDashboardData]);

  // Loading state
  if (isLoading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[400px]">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
        <p className="mt-4 text-gray-600">Loading dashboard...</p>
      </div>
    );
  }

  // Error state
  if (error) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[400px]">
        <div className="text-red-500 text-center">
          <i className="bi bi-exclamation-triangle text-4xl mb-4"></i>
          <p className="text-lg font-semibold mb-2">Failed to load dashboard</p>
          <p className="text-sm text-gray-600 mb-4">{error}</p>
          <button 
            onClick={fetchUserDashboardData}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  // Jika tidak ada data user
  if (!userData) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[400px]">
        <p className="text-gray-600">No user data available</p>
      </div>
    );
  }

  return (
    <>
      <div className="flex flex-col mb-4">
        {/* Mobile Header */}
        <div className="sm:hidden w-full bg-white pb-4 sticky top-[-1rem] z-10">
          <h1 className="text-2xl font-bold text-gray-800 mt-5">Dashboard</h1>
          <p className="text-gray-600 text-sm mt-2">
            Welcome back, {userData.name}! Manage your leave requests and track your remaining days
          </p>
        </div>

        {/* Desktop Header */}
        <div className="hidden sm:flex items-center space-x-4 flex-1">
          <div className="flex-1 min-w-0">
            <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-800 mb-2 truncate">
              Dashboard
            </h1>
            <p className="text-gray-600 text-sm sm:text-base">
              Welcome back, {userData.name}! Manage your leave requests and track your remaining days
            </p>
          </div>
        </div>
      </div>

      {/* Stats Card */}
      <div className="grid grid-cols-2 gap-3 sm:gap-6 mb-8">
        {[
          { count: userData.this_year_leave, label: "Remaining Leave", subtitle: "This Year" }, 
          { count: userData.last_year_leave, label: "Remaining Leave", subtitle: "From Last Year" }
        ].map((item, idx) => (
          <Card
            key={idx}
            className="group hover:shadow-lg transition-all duration-300 bg-gradient-to-br from-blue-50 to-blue-100 border-0 overflow-hidden relative rounded-lg sm:rounded-2xl p-2 sm:p-3">
            <div className="absolute top-0 right-0 w-14 h-14 sm:w-20 sm:h-20 bg-blue-200 rounded-full -mr-6 -mt-6 opacity-50"></div>
            <div className="absolute bottom-0 left-0 w-12 h-12 sm:w-16 sm:h-16 bg-blue-300 rounded-full -ml-4 -mb-4 opacity-30"></div>
            <div className="relative p-1 sm:p-2">
              <div className="flex items-center justify-between mb-2 sm:mb-4">
                <div className="w-8 h-8 sm:w-12 sm:h-12 bg-blue-600 rounded-xl flex items-center justify-center">
                  <i className="bi bi-calendar-check text-white text-base sm:text-xl" />
                </div>
                <div className="text-right">
                  <div className="text-4xl sm:text-5xl md:text-9xl font-bold text-blue-800 mb-0.5 sm:mb-1">
                    {item.count}
                  </div>
                  <div className="w-6 h-1 bg-blue-600 rounded-full ml-auto"></div>
                </div>
              </div>
              <div>
                <h3 className="text-sm sm:text-lg font-semibold text-blue-900 mb-0.5 sm:mb-1">
                  {item.label}
                </h3>
                <p className="text-gray-600 text-xs sm:text-sm">{item.subtitle}</p>
              </div>
            </div>
          </Card>
        ))}
      </div>

      {/* Action Section */}
      <div className="space-y-6 pb-24">
        <Card className="bg-gradient-to-r from-blue-50 to-blue-100 border-0 overflow-hidden relative rounded-lg sm:rounded-2xl p-5 sm:p-12">
          <div className="absolute inset-0 bg-gradient-to-r from-blue-100/20 to-blue-200/20"></div>
          <div className="absolute top-0 left-1/4 w-20 h-20 sm:w-32 sm:h-32 bg-blue-200 rounded-full -mt-10 sm:-mt-16 opacity-30"></div>
          <div className="absolute bottom-0 right-1/4 w-16 h-16 sm:w-24 sm:h-24 bg-blue-300 rounded-full -mb-8 sm:-mb-12 opacity-20"></div>

          <div className="relative p-2 sm:p-12 text-center">
            <div className="max-w-md mx-auto">
              <h2 className="text-base sm:text-2xl md:text-3xl font-bold text-blue-900 mb-2 sm:mb-3">
                Ready to take a break?
              </h2>
              <p className="text-gray-600 mb-4 sm:mb-8 text-xs sm:text-base">
                Submit your leave request and we'll process it for you
              </p>
              <Modal
                mode="form"
                title="Leave Application"
                triggerLabel="Apply For Leave"
                description="Fill in the details for your leave request"
                triggerClassName="w-full px-4 sm:px-8 py-2 sm:py-4 bg-white text-blue-900 font-semibold hover:bg-blue-50 hover:shadow-lg transition-all duration-300 rounded-xl border-0 text-sm sm:text-lg"
              />
            </div>
          </div>
        </Card>

        {/* Quick Stats */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          {[
            { icon: "bi-calendar-week", count: userData.leave_total, label: "Total Available" },
            { icon: "bi-clock-history", count: userData.pending_requests, label: "Pending Requests" },
            { icon: "bi-check-circle-fill", count: userData.days_used, label: "Days Used" }
          ].map((stat, idx) => (
            <Card
              key={idx}
              className={`p-4 sm:p-6 bg-gradient-to-br from-blue-50 to-white border border-blue-100 hover:shadow-md transition-shadow ${
                idx === 2 ? 'sm:col-span-2 md:col-span-1' : ''
              }`}
            >
              <div className="flex items-center space-x-3 sm:space-x-4">
                <div className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center flex-shrink-0">
                  <i className={`bi ${stat.icon} text-white text-sm`} />
                </div>
                <div className="min-w-0">
                  <div className="text-3xl sm:text-3xl font-bold text-blue-800">{stat.count}</div>
                  <p className="text-xs sm:text-sm text-gray-600">{stat.label}</p>
                </div>
              </div>
            </Card>
          ))}
        </div>

        {/* Refresh Button */}
        <div className="flex justify-center mt-6">
          <button 
            onClick={fetchUserDashboardData}
            className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center space-x-2"
            disabled={isLoading}
          >
            <i className="bi bi-arrow-clockwise"></i>
            <span>Refresh Data</span>
          </button>
        </div>
      </div>
    </>
  )
}

export default withAuth(UserDashboard)