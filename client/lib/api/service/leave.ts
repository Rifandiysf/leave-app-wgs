import { MandatoryType } from "@/lib/type";
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

export const applyMandatoryLeave = async (
    id_mandatory: string,
    status: "approved" | "rejected",
    reason?: string
) => {
    const payload = {
        id_mandatory,
        leave_type: "mandatory_leave",
        status,
        ...(status === "rejected" ? { reason } : {}),
    };

    return axiosInstance.post("/users/leave", payload);
};

export const updateSpecialLeaveStatus = async (id: string, newStatus: boolean) => {
    const response = await axiosInstance.patch(`/leaves/special/${id}`, {
        is_active: newStatus
    })

    return response.data
}

export const getMandatoryLeaveUsers = async (): Promise<MandatoryType[]> => {
    const res = await axiosInstance.get("/users/mandatory?limit=50");
    return res.data.data;
};

export interface MandatoryParams {
    currentPage: number;
    limit: number;
    debouncedSearch?: string;
}

export const getMandatoryLeaves = async (params: MandatoryParams) => {
    const queryParams = new URLSearchParams();
    queryParams.append("page", String(params.currentPage));
    queryParams.append("limit", String(params.limit));
    if (params.debouncedSearch) queryParams.append("value", params.debouncedSearch);

    const response = await axiosInstance.get("/leaves/mandatory/search", {
        params: queryParams,
    });

    return response.data;
};

export const updateMandatoryLeaveStatus = async (id: string, newStatus: boolean) => {
    const response = await axiosInstance.patch(`/leaves/mandatory/${id}`, {
        is_active: newStatus
    })

    return response.data
}

