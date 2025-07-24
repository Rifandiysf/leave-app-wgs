import axiosInstance from "../axiosInstance";


export async function getSpecialLeaves() {
    const res = await axiosInstance.get('/leaves/special');
    return res.data;
}

export async function applyLeave(payload: {
    leave_type: string;
    title: string;
    reason: string;
    start_date: string;
    end_date: string;
    id_special?: string;
}) {
    const res = await axiosInstance.post('/users/leave', payload, {
        withCredentials: true
    });
    return res.data;
}
