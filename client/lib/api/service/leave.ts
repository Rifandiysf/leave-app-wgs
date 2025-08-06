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

export const updateSpecialLeaveStatus = async (id: string, newStatus: boolean) => {
    const response = await axiosInstance.patch(`/leaves/special/${id}`, {
        is_active: newStatus
    })

    return response.data
}

export const updateMandatoryLeaveStatus = async (id: string, newStatus: boolean) => {
    const response = await axiosInstance.patch(`/leaves/mandatory/${id}`, {
        is_active: newStatus
    })

    return response.data
}