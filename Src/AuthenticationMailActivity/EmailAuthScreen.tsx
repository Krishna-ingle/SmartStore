import React, { useState } from "react";
import {
  SafeAreaView,
  View,
  Text,
  StyleSheet,
  Alert,
  Image,
} from "react-native";
import InputText from "../UIComponent/inputText";
import Button from "../UIComponent/button";
import colors from "../Asset/Colors/colors";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { useNavigation } from "@react-navigation/native";
import { RootStackParamList } from "../Navigation/RootStackParamList";
import EmailAuthimg from "../Asset/Icon&img/Images/EmailAuthimg.png";

//for redux store
import { useDispatch } from "react-redux";
import { setEmail } from "../Redux/emailSlice";
import AuthAPI from "./sendOtpApi";

type EmailAuthScreenNavProp = NativeStackNavigationProp<RootStackParamList,
'emailAuthScreen'>;
export const emailAuthScreen = () => {
  const [userEmail, setUserEmail] = useState('');
  const navigation = useNavigation<EmailAuthScreenNavProp>();

  const dispatch = useDispatch();
  // In your handleSendOTP function:
const handleSendOTP = async () => {
  if (!userEmail) {
    Alert.alert("Error", "Please enter email");
    return;
  }

  try {
    
    const result = await AuthAPI.sendOTP(userEmail);
    dispatch(setEmail(userEmail));
    Alert.alert("Success", result.message, [
      { text: "OK", onPress: () => navigation.navigate("otpScreen", { itemEmail: userEmail }) }
    ]);
  } catch (error: any) {
    Alert.alert("Error", error.message || "Something went wrong");
  } finally {
  }
};


  return (
    <SafeAreaView style={{ flex: 1,backgroundColor:colors.white}}
    >
      <View style={style.MainContainer}>
        <Image
            source={EmailAuthimg}
            style={{ width: 160, height: 180, resizeMode: 'center' }}
            />

        <View style={style.inputWrapper}>
          <InputText
            value={userEmail}
            onChangeText={setUserEmail}
            placeholder="Enter your email"
          />
        </View>

        <View style={style.buttonWrapper}>
          <Button
            title="Get Otp"
            onPress={() =>{
              handleSendOTP();
              }}
            width="100%"
            height={50}
            backgroundColor="#4CAF50"
            textColor="#fff"
          />
        </View>
      </View>
    </SafeAreaView>
  );
};

const style = StyleSheet.create({
  MainContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom:30
  },
  heading: {
    fontSize: 22,
    fontWeight: 'bold',
    color:colors.headingBlackColor
  },
  inputWrapper: {
    width: '100%',
    marginBottom: 16,
    alignItems:'center'
  },
  buttonWrapper: {
    width: '85%',
  },
});
