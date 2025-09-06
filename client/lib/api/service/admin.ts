import axiosInstance from "../axiosInstance";

/**
 * Mengambil data statistik utama untuk dasbor admin.
 * @returns {Promise<any>} Data statistik.
 */
export const getDashboardStatistics = async () => {
    const response = await axiosInstance.get('/dashboard/statistics');
    return response.data;
};

/**
 * Mengambil data tren cuti bulanan berdasarkan tahun.
 * @param {number} year - Tahun yang akan difilter.
 * @returns {Promise<any>} Data tren bulanan.
 */
export const getDashboardTrend = async (year: number) => {
    const response = await axiosInstance.get(`/dashboard/trend?year=${year}`);
    return response.data;
};

/**
 * Mengambil data papan peringkat (leaderboard) sisa cuti.
 * @returns {Promise<any>} Data leaderboard.
 */
export const getDashboardLeaderboard = async () => {
    const response = await axiosInstance.get('/dashboard/leaderboard');
    return response.data;
};

/**
 * Mengambil daftar permintaan cuti yang sedang tertunda (pending).
 * @returns {Promise<any>} Daftar cuti yang pending.
 */
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
}

export const getEmployeeList = async (params: EmployeeListParams) => {
    const queryParams = new URLSearchParams();
    queryParams.append('page', String(params.currentPage));
    queryParams.append('limit', String(params.limit));
    if (params.searchTerm) queryParams.append('search', params.searchTerm);
    if (params.genderFilter) queryParams.append('isMale', params.genderFilter);
    if (params.statusFilter) queryParams.append('statusName', params.statusFilter);
    if (params.roleFilter) queryParams.append('roleSlug', params.roleFilter);

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

//fetch untuk add amount leave
export const searchUsers = async (searchTerm: string) => {
    const response = await axiosInstance.get(`/users?search=${searchTerm}&limit=5`);
    return response.data; // Mengembalikan data mentah dari API
};

// 2. Fungsi untuk memperbarui saldo cuti pengguna
interface UpdateBalancePayload {
    adjustment_value: number;
    notes: string;
    leave_type: "last_year_leave" | "this_year_leave";
}

export const updateUserBalance = async (nik: string, payload: UpdateBalancePayload) => {
    const response = await axiosInstance.patch(`/users/${nik}/balance`, payload);
    return response.data;
};



//fetch untuk adjust history
interface AdjustHistoryParams {
    currentPage: number;
    limit: number;
    debouncedSearch?: string;
    yearFilter?: string | null;
}

/**
 * Mengambil log riwayat penyesuaian untuk Admin dari API.
 * @param params - Parameter kueri untuk panggilan API.
 * @returns Promise yang resolve ke data respons API.
 */
export const getAdminAdjustHistoryLogs = async (params: AdjustHistoryParams) => {
    const queryParams = new URLSearchParams();
    queryParams.append('page', String(params.currentPage));
    queryParams.append('limit', String(params.limit));
    if (params.debouncedSearch) queryParams.append('value', params.debouncedSearch);
    if (params.yearFilter) queryParams.append('year', params.yearFilter);

    // Perbedaan utama: Menggunakan endpoint '/balances/logs' untuk admin
    const response = await axiosInstance.get('/balances/logs', {
        params: queryParams
    });
    
    return response.data;
};
