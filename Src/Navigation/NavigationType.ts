// NavigationTypes.ts
export type RootStackParamList = {
  emailAuthScreen: undefined;
  userTypeScreen: undefined;        
  AdminHomeScreen: undefined;         
  userRegistration: undefined;
  LoginScreen: undefined;             
  homeScreen: undefined;
  notificationScreen: undefined;
  productDescScreen: undefined;
  businessVendorRegistration: undefined;
  forgotPassWordScreen: undefined;
  otpScreen: { itemEmail: string };
  OrderScreen: undefined;
  BackUpScreen: undefined;
  MainHomePage: undefined;  
  AddProductScreen: undefined; 
  EmployeeDetails: undefined;
  TodaySalesScreen: undefined;
  AdvertisementScreen: undefined;
  AddShopDetailsScreen: undefined;
  ShopListScreen: undefined;
  AdminProfileScreen: undefined;
  ProductListScreen: { shopId: string };
  EmployeeHomeScreen: undefined;
  AddEmployeeScreen: {
     AddEmployeeScreen:
    | { mode: "create" }
    | {
        mode: "edit";
        employee: {
          id: string;
          employeeName?: string;
          email?: string;
          employeeMobile?: string;
          employeeRole?: string;
          department?: string;
          basicSalary?: number | string;
          shiftTiming?: string;
        };
      };
  };
  SpecificEmpScreen: {empId: string};
  UserHomeScreen: undefined;
};
