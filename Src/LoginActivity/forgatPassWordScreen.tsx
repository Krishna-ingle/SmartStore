import React, { useState } from "react";
import {
  SafeAreaView,
  View,
  Text,
  StyleSheet,
  Alert,
} from "react-native";
import InputText from "../UIComponent/inputText";
import Button from "../UIComponent/button";
import colors from "../Asset/Colors/colors";
import { useNavigation } from "@react-navigation/native";

export const ForgotPassWordScreen = () => {
  const [usermobileno, setUserMobileNo] = useState('');
  const navigation = useNavigation();

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={style.MainContainer}>
        <Text style={style.heading}>Forgot Password</Text>

        <View style={style.inputWrapper}>
          <InputText
            value={usermobileno}
            onChangeText={setUserMobileNo}
            placeholder="Mobile No"
          />
        </View>

        <View style={style.buttonWrapper}>
          <Button
            title="Get Otp"
            onPress={() => navigation.navigate("otpScreen")}
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
  },
  heading: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 20,
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
