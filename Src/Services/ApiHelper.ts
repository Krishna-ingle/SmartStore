import { TokenStorage } from "./TokenStorage";
import { renewAccessToken } from "../LoginActivity/LoginApi";
import { Alert } from "react-native";

export class ApiHelper {
    private static BASE_URL = 'https://smartstorebackend5.onrender.com';

    static async makeApiCall(endpoint: string, method: string = 'GET', body?: any){
        try {
            let accessToken = await TokenStorage.getAccessToken();
            if(!accessToken){
                Alert.alert('Error', 'No access token found. Please log in again.');
                return null;
            }
            
            console.log('📤 Making API call:', method, endpoint);
            console.log('📤 Request body:', body);
            
            let response = await fetch(`${this.BASE_URL}${endpoint}`, {
                method: method,
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${accessToken}`,
                },
                body: body ? JSON.stringify(body) : undefined,
            });
            
            console.log('📥 Response status:', response.status);
            
            // Parse initial response
            const responseText = await response.text();
            console.log('📥 Raw response:', responseText);
            
            let responseData = this.parseResponse(responseText);
            if (responseData === null) return null; // Parse error
            
            // Handle token expiry
            if(response.status === 401){
                console.log('🔄 Access token expired, renewing...');
                const renewed = await renewAccessToken();

                if(renewed){
                    console.log('✅ Token renewed, retrying...');
                    accessToken = await TokenStorage.getAccessToken();

                    // Retry the request
                    response = await fetch(`${this.BASE_URL}${endpoint}`, {
                        method: method,
                        headers: {
                            'Content-Type': 'application/json',
                            'Authorization': `Bearer ${accessToken}`,
                        },
                        body: body ? JSON.stringify(body) : undefined,
                    });
                    
                    // Parse retry response
                    const retryResponseText = await response.text();
                    console.log('🔄 Retry response status:', response.status);
                    console.log('🔄 Retry response:', retryResponseText);
                    
                    responseData = this.parseResponse(retryResponseText);
                    if (responseData === null) return null;

                    // Check retry response status
                    if (response.ok) {
                        console.log('✅ Retry API call successful');
                        return responseData;
                    } else {
                        console.log('❌ Retry API call failed with status:', response.status);
                        Alert.alert('API Error', responseData?.message || 'Request failed after token refresh');
                        return null;
                    }

                } else {
                    console.log('❌ Token renewal failed');
                    Alert.alert('Session Expired', 'Please log in again.');
                    return null;
                }
            }

            // Handle initial response
            if(response.ok){
                console.log('✅ API call successful');
                return responseData;
            } else {
                console.log('❌ API call failed:', responseData?.message || 'Unknown error');
                Alert.alert('API Error', responseData?.message || 'Request failed');
                return null;
            }
            
        } catch(error) {
            console.error('❌ API call error:', error);
            Alert.alert('Network Error', 'Please check your internet connection');
            return null;
        }
    }

    // Smart response parsing helper method
    private static parseResponse(responseText: string): any {
        try {
            if (!responseText.trim()) {
                console.log('⚠️ Empty response');
                return { success: true, message: 'Empty response' };
            }
            
            // Check if it's JSON or plain text
            if (responseText.trim().startsWith('{') || responseText.trim().startsWith('[')) {
                // It's JSON - parse it
                const parsed = JSON.parse(responseText);
                console.log('✅ Response parsed as JSON:', parsed);
                return parsed;
            } else {
                // It's plain text - create a response object
                const textResponse = {
                    message: responseText.trim(),
                    success: true
                };
                console.log('✅ Response is plain text, created object:', textResponse);
                return textResponse;
            }
            
        } catch (parseError) {
            console.error('❌ JSON Parse Error:', parseError);
            console.error('❌ Response was:', responseText);
            
            // Check if it's HTML error page
            if (responseText.includes('<html>') || responseText.includes('<!DOCTYPE')) {
                Alert.alert('Server Error', 'Server returned an error page.');
            } else {
                Alert.alert('Response Error', 'Invalid response format from server.');
            }
            return null;
        }
    }

    // Public API calls (no authentication required)
    static async makePublicApiCall(endpoint: string, method: string = 'GET', body?: any) {
        try {
            console.log(`📤 PUBLIC API CALL: ${method} ${endpoint}`);

            const response = await fetch(`${this.BASE_URL}${endpoint}`, {
                method: method,
                headers: {
                    'Content-Type': 'application/json',
                    // No Authorization header
                },
                body: body ? JSON.stringify(body) : undefined,
            });

            console.log('📥 Public API response status:', response.status);
            
            const responseText = await response.text();
            console.log('📥 Public API raw response:', responseText);
            
            let responseData = this.parseResponse(responseText);
            if (responseData === null) return null;

            if (response.ok) {
                console.log('✅ Public API call successful');
                return responseData;
            } else {
                console.log('❌ Public API call failed:', responseData?.message);
                Alert.alert('Error', responseData?.message || 'API call failed');
                return null;
            }

        } catch (error) {
            console.error('❌ Public API call error:', error);
            Alert.alert('Network Error', 'Please check your internet connection');
            return null;
        }
    }
}
