import React from "react";
import { 
  SafeAreaView, 
  View, 
  Text, 
  StyleSheet, 
  TouchableOpacity, 
  Alert,
  ActivityIndicator 
} from "react-native";
import SmartStoreIcon from "../Asset/Icon/smartStoreIcon";
import InputText from "../UIComponent/inputText";
import { useState } from "react";
import LinearGradient from "react-native-linear-gradient";
import { useNavigation } from "@react-navigation/native";
import { Picker } from '@react-native-picker/picker';
import colors from "../Asset/Colors/colors";

// Redux imports
import { useDispatch } from "react-redux";
import { setEmail } from "../Redux/emailSlice";
import { setRole } from "../Redux/Slices/roleSlice";
import { setUserData } from "../Redux/Slices/userDataSlice";
import { setUserSelectCity } from "../Redux/Slices/userSelectedCitySlice";

// API import
import { loginApi } from "./LoginApi";

// Loading screen import
import LoadingManager from "../Services/LoadingManager";

const LoginScreen = () => {
  const navigation = useNavigation() as any;
  const dispatch = useDispatch();

  const [role, setRoleState] = useState('');
  const [email, setEmailState] = useState('');
  const [password, setPasswordState] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleRoleLoading = (selectedRole: string) => {
    if (selectedRole !== '') {
      const loadingId = `role_change_${Date.now()}`;
      LoadingManager.showLoading(loadingId, `Switching Role ${selectedRole}`);

      setTimeout(() => {
        LoadingManager.hideLoading(loadingId);
        setRoleState(selectedRole);
      }, 2000);
    } else {
      setRoleState(selectedRole);
    }
  };

  // Validation function
  const validateForm = () => {
    if (!email.trim()) {
      Alert.alert('Error', 'Please enter your email');
      return false;
    }
    
    if (!password.trim()) {
      Alert.alert('Error', 'Please enter your password');
      return false;
    }
    
    if (!role || role === '') {
      Alert.alert('Error', 'Please select your role');
      return false;
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      Alert.alert('Error', 'Please enter a valid email address');
      return false;
    }

    return true;
  };

  // Navigation based on user type
  const navigateBasedOnRole = (userType: string, userData: any) => {
    // Store user data in Redux
    dispatch(setEmail(email));

    switch (userType.toUpperCase()) {
      case 'USER':
        navigation.navigate('UserHomeScreen');
        break;
      case 'EMPLOYEE':
        navigation.navigate('EmployeeHomeScreen');
        break;
      case 'VENDOR':
        navigation.navigate('MainHomePage');
        break;
      default:
        Alert.alert('Error', 'Unknown user role');
        break;
    }
  };

  // Handle login
  const handleLogin = async () => {
    if (!validateForm()) {
      return;
    }
   
    setIsLoading(true);

    try {
      const result = await loginApi(email, password, role);

      if (result.success) {
        console.log('responce data on Screen  = ',result.data?.userData);
        dispatch(setUserData({ userData: result.data?.userData }));
        dispatch(setUserSelectCity({ selectCity: result.data?.userData.city || '' }));
        console.log("store data succesfully set");
        Alert.alert('Success', 'Login successful!', [
          {
            text: 'OK',
            onPress: () => {
              // Navigate based on role
              navigateBasedOnRole(role, result.data);
            }
          }
        ]);
      } else {
        Alert.alert('Login Failed', result.message);
      }
    } catch (error) {
      Alert.alert('Error', 'An unexpected error occurred. Please try again.');
      console.error('Login error:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <SafeAreaView style={{ backgroundColor: "#ffffff", height: '100%' }}>
      <View style={style.MainContainer}>
        <View style={style.SmartIcon}>
          <SmartStoreIcon />
        </View>
        
        <View style={style.inputView}>
          {/* Role Picker */}
          <View style={style.roleContainer}>
            <View style={style.pickerContainer}>
              <Picker
                selectedValue={role}
                onValueChange={handleRoleLoading}
                enabled={!isLoading}
                style={[
                  style.picker,
                  { color: role === '' ? '#abababff' : colors.subHeading }
                ]}
              >
                <Picker.Item label="Select Your Role" color="#ccc" value="" />
                <Picker.Item label="Customer" value="USER" />
                <Picker.Item label="Employee" value="EMPLOYEE" />
                <Picker.Item label="Vendor" value="VENDOR" />
              </Picker>
            </View>
          </View>

          {/* Email Input */}
          <InputText
            value={email}
            onChangeText={setEmailState}
            placeholder="Email Address"
            secureTextEntry={false}
            editable={!isLoading}
          />

          {/* Password Input */}
          <InputText
            value={password}
            onChangeText={setPasswordState}
            placeholder="Password"
            secureTextEntry={true}
            editable={!isLoading}
          />
        </View>

        {/* Forgot Password */}
        <TouchableOpacity
          onPress={() => navigation.navigate("forgotPassWordScreen")}
          disabled={isLoading}
        >
          <Text style={style.forgotpasswordText}>Forgot your password?</Text>
        </TouchableOpacity>

        {/* Login Button */}
        <TouchableOpacity
          style={[style.btnLogin, isLoading && style.disabledButton]}
          onPress={handleLogin}
          disabled={isLoading}
        >
          <LinearGradient
            colors={isLoading ? ['#cccccc', '#999999'] : ['#49C749', '#008000']}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
            style={style.btnLogin}
          >
            {isLoading ? (
              <ActivityIndicator size="small" color="#fff" />
            ) : (
              <Text style={style.btnText}>Login</Text>
            )}
          </LinearGradient>
        </TouchableOpacity>

        {/* Create New Account */}
        <TouchableOpacity
          onPress={() => navigation.navigate("userTypeScreen")}
          disabled={isLoading}
        >
          <Text style={style.CreateNewAccText}>Create New Account?</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const style = StyleSheet.create({
  MainContainer: {
    display: 'flex',
    alignContent: 'center',
    alignItems: 'center',
  },
  roleContainer: {
    width: '91%',
    marginBottom: 15,
  },
  roleLabel: {
    fontSize: 16,
    fontWeight: '600',
    color: '#504941',
    marginBottom: 8,
    marginLeft: 5,
  },
  pickerContainer: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    backgroundColor: colors.white,
    height: 50,
    justifyContent: 'center',
    marginHorizontal: 10,
  },
  picker: {
    height: 50,
    width: '100%',
    color: '#333333',
  },
  SmartIcon: {
    marginTop: '40%',
  },
  inputView: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 25,
    width: '100%',
    marginHorizontal: 40,
    backgroundColor: colors.white,
  },
  forgotpasswordText: {
    display: 'flex',
    alignItems: 'flex-end',
    marginLeft: "48%",
    color: '#504941',
  },
  btnText: {
    color: '#ffffff',
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  btnLogin: {
    width: '91%',
    height: 45,
    borderRadius: 5,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 20,
  },
  disabledButton: {
    opacity: 0.6,
  },
  CreateNewAccText: {
    color: '#504941',
    marginTop: 20,
  }
});

export default LoginScreen;
