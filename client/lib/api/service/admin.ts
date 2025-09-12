import axiosInstance from "../axiosInstance";

export const getDashboardStatistics = async () => {
    const response = await axiosInstance.get('/dashboard/statistics');
    return response.data;
};


export const getDashboardTrend = async (year: number) => {
    const response = await axiosInstance.get(`/dashboard/trend?year=${year}`);
    return response.data;
};


export const getDashboardLeaderboard = async () => {
    const response = await axiosInstance.get('/dashboard/leaderboard');
    return response.data;
};


export const getDashboardPendingLeave = async () => {
    const response = await axiosInstance.get('/dashboard/pending-leave');
    return response.data;
};

// fetch data employee list with params
interface EmployeeListParams {
    currentPage: number;
    limit: number;
    searchTerm?: string;
    genderFilter?: string | null;
    statusFilter?: string | null;
    roleFilter?: string | null;
    activeFilter?: string | null;
}

export const getEmployeeList = async (params: EmployeeListParams) => {
    const queryParams = new URLSearchParams();
    queryParams.append('page', String(params.currentPage));
    queryParams.append('limit', String(params.limit));
    if (params.searchTerm) queryParams.append('search', params.searchTerm);
    if (params.genderFilter) queryParams.append('isMale', params.genderFilter);
    if (params.statusFilter) queryParams.append('statusName', params.statusFilter);
    if (params.roleFilter) queryParams.append('roleSlug', params.roleFilter);
    if (params.activeFilter) queryParams.append('isActive', params.activeFilter);

    const response = await axiosInstance.get('/users', { params: queryParams });
    return response.data;
};

//fetch untuk history leave dan request leave
interface LeaveListParams {
    currentPage: number;
    limit: number;
    searchTerm?: string;
    leaveType?: string | null;
    status?: string | null;
}

// Fungsi untuk mengambil daftar pengajuan cuti (requests)
export const getLeaveRequests = async (params: LeaveListParams) => {
    const queryParams = new URLSearchParams();
    queryParams.append('page', String(params.currentPage));
    queryParams.append('limit', String(params.limit));
    if (params.searchTerm) queryParams.append("value", params.searchTerm);
    if (params.leaveType) queryParams.append("type", params.leaveType);

    const response = await axiosInstance.get(`/leaves/search?${queryParams.toString()}`);
    return response.data;
};

// Fungsi untuk mengambil riwayat cuti (history)
export const getLeaveHistory = async (params: LeaveListParams) => {
    const queryParams = new URLSearchParams();
    queryParams.append('page', String(params.currentPage));
    queryParams.append('limit', String(params.limit));
    if (params.searchTerm) queryParams.append("value", params.searchTerm);
    if (params.leaveType) queryParams.append("type", params.leaveType);
    if (params.status) queryParams.append("status", params.status);

    const response = await axiosInstance.get(`/leaves/logs/search?${queryParams.toString()}`);

    // Melakukan filter di sini sesuai logika awal Anda
    if (response.data?.data) {
        response.data.data = response.data.data.filter((leave: any) => leave.status.toLowerCase() !== 'pending');
    }
    return response.data;
};

// Fungsi untuk approve/reject cuti
export const updateLeaveStatus = async (id: string, newStatus: 'approved' | 'rejected', reason?: string) => {
    const response = await axiosInstance.patch(`/leaves/${id}`, {
        status: newStatus,
        reason: reason || "Processed by Admin"
    });
    return response.data;
};

//fetch untuk adjust balance
export const searchUsers = async (searchTerm: string) => {
    const response = await axiosInstance.get(`/users?search=${searchTerm}`);
    return response.data;
};

interface UpdateBalancePayload {
    operation: "add_amount" | "reduce_amount";
    adjustment_value: number;
    notes: string;
    leave_type: "last_year_leave" | "this_year_leave" | "last_two_year";
}

export const updateUserBalance = async (nik: string, payload: UpdateBalancePayload) => {
    const response = await axiosInstance.patch(`/users/${nik}/balance`, payload);
    return response.data;
};



export const injectBalanceAdjustment = async (file: File) => {
    const formData = new FormData();
    formData.append('file', file);

    const response = await axiosInstance.post('/uploads/balance-adjustment', formData, {
        headers: {
            'Content-Type': 'multipart/form-data',
        },
    });
    
    return response.data;
};

//fetch untuk adjust history
interface AdjustHistoryParams {
    currentPage: number;
    limit: number;
    debouncedSearch?: string;
    yearFilter?: string | null;
}

export const getAdminAdjustHistoryLogs = async (params: AdjustHistoryParams) => {
    const queryParams = new URLSearchParams();
    queryParams.append('page', String(params.currentPage));
    queryParams.append('limit', String(params.limit));
    if (params.debouncedSearch) queryParams.append('value', params.debouncedSearch);
    if (params.yearFilter) queryParams.append('year', params.yearFilter);

    const response = await axiosInstance.get('/balances/logs', {
        params: queryParams
    });

    return response.data;
};



// fetch all history

// Tipe data untuk item mentah dari API
interface ApiHistoryItem {
    data_source: 'leave' | 'adjustment';
    created_at: string;
    title?: string;
    reason?: string;
    status?: string;
    total_days?: number;
    notes?: string;
    adjustment_value?: number;
    [key: string]: any;
}

interface PaginatedHistoryResponse {
    data: ApiHistoryItem[];
    totalPages: number;
    currentPage: number;
    totalRecords: number;
}

export const fetchUserHistory = async (
    nik: string, 
    page: number, 
    limit: number
): Promise<PaginatedHistoryResponse> => {
    
    const params = new URLSearchParams({
        page: page.toString(),
        limit: limit.toString(),
    });

    const response = await axiosInstance.get(`users/${nik}/history?${params.toString()}`);
    
    return response.data;
};