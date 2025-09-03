import axiosInstance from "../axiosInstance";

export const loginRequest = async (email: string, password: string) => {
    const response = await axiosInstance.post("/auth/login", { email, password });
    return response.data;
};