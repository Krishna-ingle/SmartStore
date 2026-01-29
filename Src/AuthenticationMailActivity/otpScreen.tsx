import React, { useEffect, useRef, useState } from 'react';
import {
  SafeAreaView,
  View,
  TextInput,
  Text,
  StyleSheet,
  TouchableOpacity,
  Alert,
  Keyboard,
  Button,
  Image
} from 'react-native';
import colors from '../Asset/Colors/colors';
import { preset } from '../../jest.config';
import otpScreen from "../Asset/Icon/Images/otpScreen.png";

import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RootStackParamList } from "../Navigation/RootStackParamList";
import { useNavigation } from "@react-navigation/native";

// import for redux 
import { useSelector } from "react-redux";
import { RootState } from "../Redux/Store";
// Api call import
import { verifyOtp } from './veriflyOtpApi';
// import for screen 

  const OtpScreen = ({route}:any) => {
  // redux retrive data 
  const email = useSelector((state: RootState) => state.email.email);

  const [otp, setOtp] = useState(['', '', '', '']);
  const [focusedIndex, setFocusedIndex] = useState<number | null>(null);
  const [error, setError] = useState('');
  const inputs = useRef<(TextInput | null)[]>([]);

  type NavigationProp = NativeStackNavigationProp<RootStackParamList>;
  const navigation = useNavigation<NavigationProp>();

  const emailData = route?.params?.itemEmail;
  console.log(emailData);

  // for timer reset otp
  const [timer,setTimer] = useState(30);
  const [isDisable, setIsDisable] = useState(true);

  // function for reset otp
  useEffect(()=>{
    let interval: NodeJS.Timeout | undefined;

     if (isDisable) {
      interval = setInterval(() => {
        setTimer((prev) => {
          if (prev <= 1) {
            clearInterval(interval);
            setIsDisable(false); // enable resend
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }

    return() =>clearInterval(interval);
  },[isDisable]);

  // function for handle reset otp
  const handleResetOtp = () =>{
    setTimer(30);
    setIsDisable(true);
  };

  // function for second to mm:ss
  const formatTime = (seconds: number)=>{
    const m = Math.floor(seconds / 60);
    const s = seconds %60;
    return ` ${m}:${s<10 ?"0":""}${s}`;
  }



  const handleChange = (text: string, index: number) => {
    const newOtp = [...otp];
    newOtp[index] = text;
    setOtp(newOtp);

    if (/^\d$/.test(text)) {
      if (index < 3) {
        inputs.current[index + 1]?.focus();
      } else {
        Keyboard.dismiss();
      }
    }
  };

  const handleVerify = async () => {
    const finalOtp = otp.join('');
    if (finalOtp.length !== 4 || otp.includes('')) {
      setError('Please enter all 4 digits');
      Alert.alert('Error', 'OTP is incomplete');
      return;
    }
    if(!emailData){
      Alert.alert('Error', 'Email not found');
      return;
    }
    // setIsLoading(true);
    // setError(' ');
    try{
      const result = await verifyOtp(emailData, finalOtp);
      if(result.success){
        Alert.alert('Success','OTP Verified Successfully',[{
          text:'Press Ok to Continue',
          onPress: ()=>{

            navigation.navigate('userRegistration');
          }
        }]);
      }else{
        setError(result.message || 'OTP verification failed');
        Alert.alert('Error', result.message || 'OTP verification failed');
      }

    }catch(error){
      const errorMessage = 'An unexpected error occurred. Please try again later.';
      setError(errorMessage);
      Alert.alert('Error', errorMessage);
    } 
    
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={{
        display:'flex',
        alignItems:'flex-start',
        marginBottom:60,flexDirection:'row',
        
      }}>

      <View>
        <Image
            source={otpScreen}
            style={{ width: 120, height: 120, resizeMode: 'center' }}
            />
      </View>
      <View>
        <Text style={styles.title}>Verification</Text>
        <Text>We've send you the verification code</Text>
        <Text>on {emailData}</Text>
      </View>
      
      
      </View>

      <View style={styles.otpContainer}>
        {otp.map((digit, index) => (
          <TextInput
            key={index}
            ref={(ref) => (inputs.current[index] = ref)}
            value={digit}
            onChangeText={(text) => handleChange(text, index)}
            onFocus={() => setFocusedIndex(index)}
            onBlur={() => setFocusedIndex(null)}
            style={[
              styles.otpInput,
              focusedIndex === index && styles.focusedInput,
            ]}
            keyboardType="number-pad"
            maxLength={1}
          />
        ))}
      </View>


      {error !== '' && <Text style={styles.errorText}>{error}</Text>}

      <TouchableOpacity style={styles.button} onPress={handleVerify}>
        <Text style={styles.buttonText}>Verify</Text>
      </TouchableOpacity>


      <View style={{
        display:'flex',flexDirection:'row',
        width:'100%',justifyContent:'center',
        marginTop:20
      }}>
        <TouchableOpacity
        onPress={handleResetOtp}
        disabled={isDisable}>
          <Text style={{
            color:isDisable?"#676666ff":"#181818ff"
          }}>Re-send OTP</Text>
        </TouchableOpacity>
        <Text>
          {isDisable ?`${formatTime(timer)}`: ""}
        </Text>
      </View>
    </SafeAreaView>
  );
};

export default OtpScreen;

const styles = StyleSheet.create({ 
  container: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: '#fff',
    paddingHorizontal: 20,
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 10,
    marginTop:20,
    color:colors.headingBlackColor
  },
  otpContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 4,
    marginLeft:20,
  },
  otpInput: {
    width: 45,
    height: 55,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    textAlign: 'center',
    fontSize: 20,
    color: '#000',
    marginHorizontal: 5,
  },
  focusedInput: {
    borderColor: '#4CAF50',
    backgroundColor: '#E8F5E9',
  },
  errorText: {
    marginTop: 10,
    color: 'red',
    fontSize: 14,
    textAlign:'center'
  },
  button: {
    marginTop: 20,
    backgroundColor: '#4CAF50',
    paddingVertical: 14,
    paddingHorizontal: 150,
    borderRadius: 6,
    elevation: 2,
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '600',
  },
});
