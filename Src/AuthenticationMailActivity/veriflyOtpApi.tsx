// services/otpService.ts
export interface OtpVerificationRequest {
  email: string;
  otp: string;
}

export interface OtpVerificationResponse {
  success: boolean;
  message: string;
  data?: any;
}

const BASE_URL = 'https://smartstorebackend5.onrender.com';

export const verifyOtp = async (
  email: string, 
  otp: string
): Promise<OtpVerificationResponse> => {
  try {
    const requestBody: OtpVerificationRequest = {
      email,
      otp
    };

    console.log('Sending OTP verification request:', requestBody);

    const response = await fetch(`${BASE_URL}/auth/verify-otp`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(requestBody),
    });

    const responseData = await response.json();

    if (!response.ok) {
      throw new Error(responseData.message || 'OTP verification failed');
    }

    return {
      success: true,
      message: responseData.message || 'OTP verified successfully',
      data: responseData
    };

  } catch (error) {
    console.error('OTP verification error:', error);
    
    return {
      success: false,
      message: error instanceof Error ? error.message : 'Network error occurred'
    };
  }
};
