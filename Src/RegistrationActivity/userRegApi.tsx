import { Alert } from "react-native";
import LoadingManager from '../Services/LoadingManager';

interface userRegData {
    fullName: string;
    email: string;
    mobileNumber: string;
    password: string;
    confirmPassword: string;
    city: string;
}

export const userRegApi = async (userRegData: userRegData, navigation?: any): Promise<void> => {
    const requestId = `user_reg_${Date.now()}`;
    const requestBody = JSON.stringify(userRegData);
    console.log("Sent to backend:", requestBody);
    try {
        // Show loading screen - ADD THIS LINE
        LoadingManager.showLoading(requestId, "Creating user account...");

        const response = await fetch('https://smartstorebackend5.onrender.com/auth/register', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            
            body: JSON.stringify(userRegData),
        });

        const contentType = response.headers.get('content-type');
        console.log("in api call = ",userRegData);
        let data;
        if (contentType && contentType.indexOf('application/json') !== -1) {
            data = await response.json();
        } else {
            data = await response.text();
        }                
        
        if (response.ok) {
             Alert.alert("UserRegistration Successful", JSON.stringify(data));
                        if (navigation) {
                            navigation.navigate("homeScreen");
                        }
        } else {
            Alert.alert("Registration Failed", data.message || "Please try again");
        }
    } catch (error) {
        console.error("Error during registration:", error);
        Alert.alert("Registration Error", "An error occurred. Please try again.");
    } finally {
        // Hide loading screen - ADD THIS LINE  
        LoadingManager.hideLoading(requestId);
    }
};
