'use client'

import React, { useState, useEffect } from "react";
import { Card } from "../../components/ui/card";
import 'bootstrap-icons/font/bootstrap-icons.css';
import withAuth from "@/lib/auth/withAuth";
import { ApplyLeave } from "@/app/components/form/applyLeave";

type UserDashboardData = {
  NIK: string;
  fullname: string;
  balance: {
    total_amount: number;
    current_amount: number;
    carried_amount: number;
    days_used: number;
    pending_request: number;
  };
};

const DashboardSkeleton = () => (
  <>
    <div className="flex flex-col mb-4">
      <div className="h-8 bg-gray-200 rounded w-1/4 mb-2 animate-pulse"></div>
      <div className="h-4 bg-gray-200 rounded w-1/2 animate-pulse"></div>
    </div>
    <div className="grid grid-cols-2 gap-3 sm:gap-6 mb-8">
      <div className="h-36 bg-gray-200 rounded-lg sm:rounded-2xl animate-pulse"></div>
      <div className="h-36 bg-gray-200 rounded-lg sm:rounded-2xl animate-pulse"></div>
    </div>
    <div className="space-y-6 pb-24">
     <div className="h-48 bg-gray-200 rounded-lg sm:rounded-2xl animate-pulse"></div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        <div className="h-20 bg-gray-200 rounded-lg animate-pulse"></div>
        <div className="h-20 bg-gray-200 rounded-lg animate-pulse"></div>
        <div className="h-20 bg-gray-200 rounded-lg animate-pulse sm:col-span-2 md:col-span-1"></div>
      </div>
    </div>
  </>
);


const UserDashboard = () => {
  const [userData, setUserData] = useState<UserDashboardData | null>(null);
  const [pendingCount, setPendingCount] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchUserDashboardData = async () => {
      setIsLoading(true);
      setError(null);

      try {
        const token = localStorage.getItem('token');
        const deviceId = localStorage.getItem('device-id');
        const userString = localStorage.getItem('user');

        if (!userString || !token) {
          throw new Error("User data or token not found. Please log in again.");
        }

        const user = JSON.parse(userString);
        const nik = user.NIK || user.nik;
        if (!nik) {
          throw new Error("User NIK not found in local storage.");
        }

        const [dashboardResponse, allLeavesResponse] = await Promise.all([
          fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/users/${nik}`, {
            method: 'GET',
            headers: { 'Authorization': `${token}`, 'device-id': deviceId || '' },
          }),
          fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/users/leave?limit=1000`, {
            method: 'GET',
            headers: { 'Authorization': `${token}`, 'device-id': deviceId || '' },
          })
        ]);

        if (!dashboardResponse.ok || !allLeavesResponse.ok) {
          throw new Error("Failed to fetch all required dashboard data");
        }

        const dashboardJson = await dashboardResponse.json();
        const allLeavesJson = await allLeavesResponse.json();

        setUserData(dashboardJson.data);

        const allUserLeaves = allLeavesJson?.data || [];

        const pendingForUser = allUserLeaves.filter(
          (leave: { status: string }) => leave.status?.toLowerCase() === 'pending'
        );
        setPendingCount(pendingForUser.length);

      } catch (err: any) {
        setError(err.message);
        console.error("Error fetching dashboard data:", err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchUserDashboardData();
  }, []);



  if (isLoading) {
    return <DashboardSkeleton />;
  }

  if (error) {
    return <div className="text-center text-red-500 p-8">Error: {error}</div>;
  }

  const summaryCards = [
    {
      count: userData?.balance.current_amount || 0,
      label: "Remaining Leave",
      subtitle: "This Year"
    },
    {
      count: userData?.balance.carried_amount || 0,
      label: "Remaining Leave",
      subtitle: "From Last Year"
    },
  ];

  const quickStats = [
    {
      icon: "bi-calendar-week",
      count: userData?.balance.total_amount || 0,
      label: "Total Available"
    },
    {
      icon: "bi-clock-history",
      count: pendingCount,
      label: "Pending Requests"
    },
    {
      icon: "bi-check-circle-fill",
      count: userData?.balance.days_used || 0,
      label: "Days Used"
    }
  ];

  return (
    <>
      <div className="flex flex-col mb-4">
        <div className="sm:hidden w-full bg-white pb-4 sticky top-[-1rem] z-10">
          <h1 className="text-2xl font-bold text-gray-800 mt-5">Dashboard</h1>
          <p className="text-gray-600 text-sm mt-2">
            Manage your leave requests and track your remaining days
          </p>
        </div>

        <div className="hidden sm:flex items-center space-x-4 flex-1">
          <div className="flex-1 min-w-0">
            <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-800 mb-2 truncate">
              Dashboard
            </h1>
            <p className="text-gray-600 text-sm sm:text-base">
              Manage your leave requests and track your remaining days
            </p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-3 sm:gap-6 mb-8">
        {summaryCards.map((item, idx) => (
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
                Submit your leave request and we’ll process it for you
              </p>
              <ApplyLeave/>
            </div>
          </div>
        </Card>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          {quickStats.map((stat, idx) => (
            <Card
              key={idx}
              className={`p-4 sm:p-6 bg-gradient-to-br from-blue-50 to-white border border-blue-100 hover:shadow-md transition-shadow ${idx === 2 ? 'sm:col-span-2 md:col-span-1' : ''
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
      </div>
    </>
  )
}

export default withAuth(UserDashboard)