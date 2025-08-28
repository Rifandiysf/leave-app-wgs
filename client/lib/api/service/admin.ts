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
