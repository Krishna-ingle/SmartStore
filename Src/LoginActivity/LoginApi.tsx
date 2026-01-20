import { TokenStorage } from "../Services/TokenStorage";
import { Alert } from "react-native";

// services/loginApi.ts
export interface LoginRequest {
  email: string;
  password: string;
  type: string;
}

export interface LoginResponse {
  success: boolean;
  message: string;
  data?: {
    accessToken?: string;
    userData?: any;
    refreshToken?: string;
  };
}

const BASE_URL = 'https://smartstorebackend5.onrender.com';

export const loginApi = async (
  email: string,
  password: string,
  userType: string
): Promise<LoginResponse> => {
  try {
    const requestBody: LoginRequest = {
      email: email.trim(),
      password: password.trim(),
      type: userType.toUpperCase()
    };

    console.log('Login request:', requestBody);

    const response = await fetch(`${BASE_URL}/unified-auth/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(requestBody),
    });

    const responseData = await response.json();
    console.log('Login response:', responseData);

    if (!response.ok) {
      throw new Error(responseData.message || 'Login failed');
    }

    // get Access Token from responseData
    const accessToken = responseData.accessToken;
    const refreshToken = responseData.refreshToken;
    const userData = responseData.userData;
    
    console.log('🔍 DEBUG - Response keys:', responseData);
    console.log('🔍 DEBUG - Response keys:', Object.keys(responseData));
    if(accessToken && refreshToken){
      await TokenStorage.saveTokens(accessToken, refreshToken);
      console.log('Tokens saved successfully');
      await TokenStorage.saveVendorId(responseData.userId);
    }
    return {
      success: true,
      message: responseData.message || 'Login successful',
      data: responseData
    };


  } catch (error) {
    console.error('Login error:', error);
    
    return {
      success: false,
      message: error instanceof Error ? error.message : 'Network error occurred'
    };
  }
};

// for renewAccessToken
// Replace your renewAccessToken function with this FIXED version:
// Replace your entire renewAccessToken function with this simplified version:
export const renewAccessToken = async (): Promise<boolean> => {
  try {
    console.log('🔄 Starting token renewal...');
    
    const refreshToken = await TokenStorage.getRefreshToken();
    if (!refreshToken) {
      console.log('❌ No refresh token found');
      return false;
    }
    
    console.log('✅ Refresh token found, calling backend...');

    // Since Srujan fixed backend, we only need Method 1 now
    const response = await fetch(`${BASE_URL}/auth/refresh`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        refreshToken: refreshToken
      }),
    });

    console.log('📥 Refresh API Status:', response.status);
    
    // Parse response
    const responseText = await response.text();
    console.log('📥 Refresh API Response:', responseText);
    
    let responseData;
    try {
      responseData = JSON.parse(responseText);
    } catch (parseError) {
      console.error('❌ JSON Parse Error:', parseError);
      return false;
    }

    // Check if refre sh was successful
    if (response.ok && responseData) {
      // Extract both new tokens (Srujan's backend returns both)
      const newAccessToken = responseData.accessToken;
      const newRefreshToken = responseData.refreshToken;
      
      console.log('🔍 New access token received:',newAccessToken);
      console.log('🔍 New refresh token received:', newRefreshToken);

      if (newAccessToken && newRefreshToken) {
        // Save BOTH new tokens
        await TokenStorage.saveTokens(newAccessToken, newRefreshToken);
        console.log('✅ BOTH tokens refreshed and saved successfully!');
        
        // Also update vendorId if provided in response
        if (responseData.userId) {
          await TokenStorage.saveVendorId(responseData.userId);
          console.log('✅ VendorId also updated');
        }
        
        return true;
      } else {
        console.log('❌ Missing tokens in response');
        console.log('Available fields:', Object.keys(responseData));
        return false;
      }
    } else {
      console.log('❌ Refresh failed:', responseData?.message || 'Unknown error');
      return false;
    }

  } catch (error) {
    console.error('❌ Token renewal error:', error);
    return false;
  }
};
