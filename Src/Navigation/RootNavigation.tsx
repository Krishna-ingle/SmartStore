// Src/Navigation/RootNavigator.tsx
import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import HomeScreen from "../HomeActivity/homeScreen";
import LoginScreen from "../LoginActivity/loginScreen";
import { usertypeScreen } from "../LoginActivity/userType";
import { UserRegistrationScreen } from "../RegistrationActivity/userRegScreen";
import { ForgotPassWordScreen } from "../LoginActivity/forgatPassWordScreen";
import OtpScreen from "../AuthenticationMailActivity/otpScreen";
import { NotificationScreen } from "../NotificationActivity/notificationScreen";
import { productDescScreen } from "../ProductDescActivity/productDescScreen";
import { emailAuthScreen } from "../AuthenticationMailActivity/EmailAuthScreen";
import { RootStackParamList } from "./NavigationType"; // ✅ Import from correct file
import LoadingScreen from "../UIComponent/loadingScreen";
//Admin Screen
import { AdminHomeScreen } from "../AdminActivity/AdminHomeActivity/AdminHomeActivities";
import OrderScreen from "../AdminActivity/OrderActivity/orderScreen";
import BackUpScreen from "../AdminActivity/BackupActivity/BackUpScreen";
import { MainHomePage } from "../AdminActivity/MaiHomePage/MainHomePage";
import AddProductScreen  from "../AdminActivity/AddProductActivity/addProduct";
import { EmployeeDetails } from "../AdminActivity/EmployeeDetails/employeeDetails";
import {AddEmployeeScreen} from "../AdminActivity/EmployeeDetails/addEmployeeScreen"
import  AddShopDetailsScreen from "../AdminActivity/AddShopActivity/addShopDetails";
import { TodaySalesScreen } from "../AdminActivity/TodaySaleActivity/todaySalesScreen";
import { AdvertisementScreen } from "../AdminActivity/AddvertisementActivity/addvertisementScreen";
import AdminProfileScreen from "../AdminActivity/MyProfileActivity/AdminProfile"
import ShopListScreen from "../AdminActivity/Allshops/shopList"
import ProductListScreen from "../AdminActivity/AddProductActivity/ProductList";
//Employee Screen
import { EmployeeHomeScreen} from "../EmployeeActivity/employeeHomeScreen"
import { SpecificEmpScreen } from "../AdminActivity/EmployeeDetails/specificEmpScreen";

// user Screen
import {UserHomeScreen} from "../UserActivity/HomeActivity/userHomeScreen"

const RootStack = createNativeStackNavigator<RootStackParamList>();

const RootNavigator = () => {
  return (
    <NavigationContainer>
      <RootStack.Navigator screenOptions={{ headerShown: false }}>
        <RootStack.Screen name="LoginScreen" component={LoginScreen} />
        <RootStack.Screen name="homeScreen" component={HomeScreen} />
        <RootStack.Screen name="userTypeScreen" component={usertypeScreen} />
        <RootStack.Screen name="userRegistration" component={UserRegistrationScreen} />
        <RootStack.Screen name="forgotPassWordScreen" component={ForgotPassWordScreen} />
        <RootStack.Screen name="otpScreen" component={OtpScreen} />
        <RootStack.Screen name="notificationScreen" component={NotificationScreen} />
        <RootStack.Screen name="productDescScreen" component={productDescScreen} />
        <RootStack.Screen name="emailAuthScreen" component={emailAuthScreen} />
        <RootStack.Screen name="AdminHomeScreen" component={AdminHomeScreen} />
        <RootStack.Screen name="OrderScreen" component={OrderScreen} />
        <RootStack.Screen name="BackUpScreen" component={BackUpScreen} />
        <RootStack.Screen name="MainHomePage" component={MainHomePage}/>
        <RootStack.Screen name="AddProductScreen" component={AddProductScreen}/>
        <RootStack.Screen name="EmployeeDetails" component={EmployeeDetails}/>
        <RootStack.Screen name="TodaySalesScreen" component={TodaySalesScreen}/>
        <RootStack.Screen name="AdvertisementScreen" component={AdvertisementScreen}/>
        <RootStack.Screen name="AddShopDetailsScreen" component={AddShopDetailsScreen}/>
        <RootStack.Screen name="ShopListScreen" component={ShopListScreen} />
        <RootStack.Screen name="AdminProfileScreen" component={AdminProfileScreen} />
        <RootStack.Screen name="ProductListScreen" component={ProductListScreen} />
        <RootStack.Screen name="EmployeeHomeScreen" component={EmployeeHomeScreen} />
        <RootStack.Screen name="AddEmployeeScreen" component={AddEmployeeScreen}/>
        <RootStack.Screen name="SpecificEmpScreen" component={SpecificEmpScreen}/>

        {/* userScreen */}

        <RootStack.Screen name="UserHomeScreen" component={UserHomeScreen}/>
      </RootStack.Navigator>
      <LoadingScreen />
    </NavigationContainer>
  );
};

export default RootNavigator;
