 import React from "react";
import { SafeAreaView,View ,Text, StyleSheet, TouchableOpacity ,Image} from "react-native";
import CustomerTypeUserImage from "../Asset/Icon/customerImage";
import EmailAuthimg from "../Asset/Icon/Images/Bussinessvrndorimg.png"
import colors from "../Asset/Colors/colors";
import { NavigationProp, useNavigation } from "@react-navigation/native";
import { RootStackParamList } from "../Navigation/RootStackParamList";
// redux data import statement
import { useDispatch, UseDispatch } from "react-redux";
import { setRole } from "../Redux/Slices/roleSlice";

type usertypeScreenProp = NavigationProp<RootStackParamList,"userTypeScreen">;

export const usertypeScreen = ()=>{
    const navigation = useNavigation<usertypeScreenProp>();
    //for redux store role user or vender;
    const dispatch = useDispatch();
    return(
        <SafeAreaView style={{flex:2, backgroundColor:colors.white}}>
            <Text style={style.RegistrationHeading}>xyz</Text>
            <TouchableOpacity
            onPress={ ()=> {
            dispatch(setRole("User"));
            navigation.navigate("emailAuthScreen")
            }}>
                <View style={style.MainContainer}>
                <View style={style.CardView}>
                        <View style={style.ImgView}> 
                            <CustomerTypeUserImage/>
                        </View>
                        <View style={style.TextField}>
                            <Text style={style.SlognText}>Your Store, Your Way Only at SmartStore</Text>
                            <Text style={style.UserText}>For User</Text>
                        </View>
                </View>
            </View>
            </TouchableOpacity>

            <TouchableOpacity
            onPress={ ()=>{
                dispatch(setRole('Vender'));
                navigation.navigate("emailAuthScreen")
            }}
            style={{margin:10}}>
                <View style={style.MainContainer}>
                <View style={style.CardView}>
                        <View style={style.ImgView}>
                            <Image
                            source={EmailAuthimg}style={{ marginLeft:10,width: 150, height: 180, resizeMode: 'center' }}
                            />
                        </View>
                        <View style={style.TextField}>
                            <Text style={style.SlognText}>Your Store, Your Way Only at SmartStore</Text>
                            <Text style={style.UserText}>business Vendor</Text>
                        </View>
                </View>
            </View>
            </TouchableOpacity>
            
        </SafeAreaView>
    );
}
const style = StyleSheet.create({
    MainContainer:{
        alignItems:'center'
    },
    RegistrationHeading:{
        fontSize:28,
        fontWeight:'bold',
        textAlign:'center',
        marginTop:60,
        color:colors.headingBlackColor,
    },
    CardView:{
        width:350,
        height:220,
        display:'flex',
        flexDirection:'row',      
        alignItems:'center',
        borderRadius:20,
        borderColor:'rgb(4, 154, 14)',
        borderWidth:3,
        marginTop:50
    },
    ImgView:{
    },
    TextField:{

    },
    SlognText:{
        fontSize:18,
        width:"55%",
        fontWeight:'500',
        color:'rgb(100, 95, 95)'
        
    },
    UserText:{
        fontSize:24,
        textAlign:'right',
        width:160,
        marginTop:20,
        fontWeight:'500',
        color:colors.gradientColorTow,
    },
});