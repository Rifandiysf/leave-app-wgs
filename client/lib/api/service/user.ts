import axiosInstance from "../axiosInstance";

export interface UserData {
  NIK: string;
  fullname: string;
  gender: string;
  status_active: string;
  role: 'user' | 'admin' | 'super_admin';
  balance: {
    total_amount: number;
    current_amount: number;
    carried_amount: number;
    pending_request: number;
    used_days: number;
  };
}

export const getMe = async (): Promise<UserData> => {
  const response = await axiosInstance.get('/users/me');
  return response.data.user_data; 
};

export const getUserDashboardByNik = async (nik: string) => {
  const response = await axiosInstance.get(`/users/${nik}`);
  return response.data.data;
};

export const logoutUser = async () => {
  const response = await axiosInstance.get('/auth/logout');
  return response.data;
};

interface HistoryParams {
    currentPage: number;
    limit: number;
    leaveType?: string | null;
    status?: string | null;
    debouncedSearch?: string;
}

export const getLeaveHistory = async (params: HistoryParams) => {
    const queryParams = new URLSearchParams();
    queryParams.append('page', String(params.currentPage));
    queryParams.append('limit', String(params.limit));
    if (params.leaveType) queryParams.append("type", params.leaveType);
    if (params.status) queryParams.append("status", params.status);
    if (params.debouncedSearch) queryParams.append('value', params.debouncedSearch);

    const response = await axiosInstance.get('/users/leave/search', {
        params: queryParams
    });
    
    return response.data; 
};

interface AdjustHistoryParams {
    currentPage: number;
    limit: number;
    debouncedSearch?: string;
    yearFilter?: string | null;
}

export const getAdjustHistoryLogs = async (params: AdjustHistoryParams) => {
    const queryParams = new URLSearchParams();
    queryParams.append('page', String(params.currentPage));
    queryParams.append('limit', String(params.limit));
    if (params.debouncedSearch) queryParams.append('value', params.debouncedSearch);
    if (params.yearFilter) queryParams.append('year', params.yearFilter);

    const response = await axiosInstance.get('/balances/logs/me', {
        params: queryParams
    });
    
    return response.data;
};