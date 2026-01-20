import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

interface SendOTPResponse {
  success: boolean;
  message: string;
  data?: any;
}

interface APIError {
  success: boolean;
  message: string;  
  statusCode?: number;
  error?: any;
}

const BASE_URL = 'https://smartstorebackend5.onrender.com';

// Create axios instance with better configuration
const apiClient = axios.create({
  baseURL: BASE_URL,
  timeout: 15000, // Reduced timeout to 15 seconds
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
  },
});

// Add request interceptor for debugging
apiClient.interceptors.request.use(
  (config) => {
    console.log('API Request Started:');
    console.log('URL:', `${config.baseURL || ''}${config.url || ''}`);
    console.log('Method:', config.method?.toUpperCase());
    console.log('Headers:', config.headers);
    console.log('Data:', config.data);
    return config;
  },
  (error) => {
    console.log('Request Error:', error);
    return Promise.reject(error);
  }
);

// Add response interceptor for debugging
apiClient.interceptors.response.use(
  (response) => {
    console.log('✅ API Response Success:');
    console.log('Status:', response.status);
    console.log('Data:', response.data);
    return response;
  },
  (error) => {
    console.log('API Response Error:');
    console.log('Error Code:', error.code);
    console.log('Error Message:', error.message);
    console.log('Response Status:', error.response?.status);
    console.log('Response Data:', error.response?.data);
    return Promise.reject(error);
  }
);

class AuthAPI {
  // Send OTP to email with better error handling
  static async sendOTP(email: string): Promise<SendOTPResponse> {
    try {
      console.log('Sending OTP to:',email);
      
      const response = await apiClient.post('/auth/send-otp', {
        email: email.toLowerCase().trim()
      });
      
      // Store email temporarily for later use
      await AsyncStorage.setItem('pendingEmail', email);
      await AsyncStorage.setItem('otpSentTime', Date.now().toString());
      
      return {
        success: true,
        message: response.data.message || 'OTP sent successfully to your email',
        data: response.data
      };
    } catch (error: any) {
      console.log('Send OTP Error Details:', error);
      
      // Network error (no internet, server unreachable)
      if (error.code === 'NETWORK_ERROR' || error.code === 'ERR_NETWORK') {
        throw {
          success: false,
          message: 'No internet connection. Please check your network and try again.',
          statusCode: 0,
          error: error
        } as APIError;
      }
      
      // Timeout error
      if (error.code === 'ECONNABORTED' || error.message.includes('timeout')) {
        throw {
          success: false,
          message: 'Request timeout. Please try again.',
          statusCode: 0,
          error: error
        } as APIError;
      }
      
      // Server response error
      if (error.response) {
        throw {
          success: false,
          message: error.response.data?.message || `Server error: ${error.response.status}`,
          statusCode: error.response.status,
          error: error.response.data
        } as APIError;
      }
      
      // Unknown error
      throw {
        success: false,
        message: 'Something went wrong. Please try again.',
        statusCode: 0,
        error: error
      } as APIError;
    }
  }
}

export default AuthAPI;
export type { SendOTPResponse, APIError };
