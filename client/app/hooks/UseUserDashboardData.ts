'use client';

import { useState, useEffect } from 'react';
import { getUserDashboardByNik, UserData } from '@/lib/api/service/user'; 

type DashboardData = {
  balance: {
    total_amount: number;
    current_amount: number;
    carried_amount: number;
    pending_request: number;
    used_days: number;
  };
};

export const useUserDashboardData = (globalUser: UserData | null) => {
  const [dashboardData, setDashboardData] = useState<DashboardData | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (globalUser?.NIK) {
      const fetchDashboardData = async () => {
        setIsLoading(true);
        setError(null);
        try {
          const data = await getUserDashboardByNik(globalUser.NIK);
          setDashboardData(data);
        } catch (err: any) {
          setError(err.message || "Failed to fetch dashboard data.");
          console.error("Error fetching dashboard specific data:", err);
        } finally {
          setIsLoading(false);
        }
      };
      fetchDashboardData();
    } else if (!globalUser) {
        setIsLoading(false);
    }
  }, [globalUser]);

  return { dashboardData, isLoading, error };
};