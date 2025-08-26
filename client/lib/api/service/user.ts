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