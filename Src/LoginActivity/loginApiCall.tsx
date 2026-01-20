// Src/LoginActivity/ApiCallFile/loginApi.ts
import axios from 'axios';

const APIBaseUrl = 'https://smart-store-backend-api.vercel.app/auth/login';

interface LoginPayload {
  useremail: string;
  userpassword: string;
}

export const userLoginApi = async (payload: LoginPayload) => {
  try {
    const response = await axios.post(`https://smart-store-backend-api.vercel.app/auth/login`, payload);
    return { success: true, data: response.data };
  } catch (error: any) {
    const message = error.response?.data?.message || 'Login failed';
    return { success: false, message };
  }
};
