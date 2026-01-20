import React from "react";
import {
 SafeAreaView,
 View,
 Text,StyleSheet,Image,
 TouchableOpacity
 }from "react-native";
import NotificationIcon from "../../Asset/Icon&img/notificationIcon";
import LinearGradient from "react-native-linear-gradient";
import { useNavigation } from "@react-navigation/native";
import Profileicon from "../../Asset/Icon&img/profileIcon";
const ProfileNotificatonComp = ()=>{
  const navigation = useNavigation();
     return(<SafeAreaView>

       <View style={style.Container}>
        {/* for ProfileLogo */}
       <View style={style.circleContener}>
            <LinearGradient
            colors={['#49C749', '#008000']}
            style={style.circle}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
            >
            <Profileicon/>
            </LinearGradient>
        </View>

        {/* for Notification */}
        <TouchableOpacity
        onPress={()=>navigation.navigate("notificationScreen")}>
          <View style={style.NotificationContainer}>
            <View style={style.notiflysymbol}></View>
            <NotificationIcon/>
        </View>
        </TouchableOpacity>
        

       </View>
        
     </SafeAreaView>);
};

const style =StyleSheet.create({
    Container:{
        flexDirection:'row',
        alignItems:'center',
        justifyContent:'space-between',
        margin:18,
    },
    
    circleContener:{
        width:30,
        height:30,
    },
    circle: {
        width: 32,
        height: 32,
        justifyContent:'center',
        alignItems:'center',
        borderRadius: 17, // half of width/height for perfect circle
      },
      NotificationContainer:{
        position:'relative',
        width: 35,
        height:35,
      },
      notiflysymbol:{
        position:'absolute',
        top:1,
        right:5,
        width:8,
        height:8,
        zIndex:1,
        backgroundColor:'#FC7373',
        borderRadius:5,
      },

    text: {
        color: 'white',
        fontSize: 24,
        fontWeight: 'bold',
      },

});
export default ProfileNotificatonComp;