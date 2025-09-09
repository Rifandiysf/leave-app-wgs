import { MandatoryPayload, MandatoryType, SpecialPayload } from "@/lib/type";
import axiosInstance from "../axiosInstance";

export const getSpecialLeaveUsers = async () => {
    const res = await axiosInstance.get('/users/special');
    return res.data.data;
}

export const applyLeave = async (payload: any) => {
    const res = await axiosInstance.post('/users/leave', payload);
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

export interface SpecialParams {
    currentPage: number;
    limit: number;
    debouncedSearch?: string;
}

export const getSpecialLeaves = async (params: SpecialParams) => {
    const queryParams = new URLSearchParams();
    queryParams.append("page", String(params.currentPage));
    queryParams.append("limit", String(params.limit));
    if (params.debouncedSearch) queryParams.append("value", params.debouncedSearch);

    const response = await axiosInstance.get("/leaves/special/search", {
        params: queryParams,
    });

    return response.data;
}

export const addSpecialLeave = async (payload: SpecialPayload) => {
    const response = await axiosInstance.post("/leaves/special", payload);
    return response.data
}

export const updateSpecialLeave = async (
    id: string,
    payload: {
        title: string;
        applicable_gender: string;
        duration: number;
        type: string;
        description: string;
    }
) => {
    const response = await axiosInstance.patch(`/leaves/special/${id}`, payload);
    return response.data
}

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

export const updateMandatoryLeave = async (
    id: string,
    payload: {
        title: string;
        description: string;
        start_date: string;
        end_date: string;
    }
) => {
    const response = await axiosInstance.patch(`/leaves/mandatory/${id}`, payload);
    return response.data;
};

export const updateMandatoryLeaveStatus = async (id: string, newStatus: boolean) => {
    const response = await axiosInstance.patch(`/leaves/mandatory/${id}`, {
        is_active: newStatus
    })

    return response.data
}

export const addMandatoryLeave = async (payload: MandatoryPayload) => {
    const response = await axiosInstance.post("/leaves/mandatory", payload);
    return response.data;
};

