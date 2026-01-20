import { Alert } from "react-native";
import LoadingManager from '../Services/LoadingManager';

interface AdminRegData {
    fullName: string;
    email: string;
    mobile: string;
    mobileOptional: string;
    password: string;
    confirmPassword: string;
}

export const adminRegApi = async (adminRegData: AdminRegData, navigation?: any): Promise<void> => {
    const requestId = `admin_reg_${Date.now()}`;
    
    
    try {
        // Show loading screen - ADD THIS LINE
        LoadingManager.showLoading(requestId, "Creating admin account...");
        
        const response = await fetch('https://smartstorebackend5.onrender.com/vendor/register', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(adminRegData),
        });

        const contentType = response.headers.get('content-type');
        let data;
        if (contentType && contentType.indexOf('application/json') !== -1) {
            data = await response.json();
        } else {
            data = await response.text();
        }                
        
        if (response.ok) {
             Alert.alert("Registration Successful", JSON.stringify(data));
                        if (navigation) {
                            navigation.navigate("MainHomePage");
                        }
                   
            console.log("Registration data:", data);
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
