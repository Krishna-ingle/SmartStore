import React from "react";
import { SafeAreaView,View, Text, StyleSheet, TouchableOpacity, Image } from "react-native";
import { useNavigation } from "@react-navigation/native";
import colors from "../../../Asset/Colors/colors";
import ProductImg from "../../../Asset/Icon&img/Images/ProductImg.png"
export const ProductCardView = ()=>{
    const navigate = useNavigation() as any;
    return(
        <SafeAreaView>
             <View style={style.MainContainer}>
                <Image source={ProductImg}
                style={{ width: 124, height: 124,
                 resizeMode: 'center',alignSelf:'flex-end'}}/>
                 
            <View style={{display:'flex',flexDirection:'row',
                justifyContent:'space-between'}}>
               <View style={style.textContener}>
                    <Text>Milk</Text>
                    <Text>₹ 64</Text>
                </View>
                <TouchableOpacity
                onPress={()=>navigate.navigate("productDescScreen")}
                style={style.BuyBtn}>
                    <Text style={{color:colors.white,textAlign:'center',
                        fontWeight:'600',fontSize:18
                    }}> Buy</Text>
                </TouchableOpacity>
            </View>
                
               
            </View>
        </SafeAreaView>
    );
}

const style = StyleSheet.create({
    MainContainer:{
        height:180,
        width:170,
        backgroundColor:colors.white,
        margin:20,
        borderRadius:15,
        padding:12
    },
    textContener:{

    },
    BuyBtn:{
        backgroundColor:colors.gradientColorTow,
        padding:5,
        width:70,
        height:42,
        borderBottomEndRadius:15,
        borderTopLeftRadius:15,
        margin:-10,
        marginTop:3,
    },
    imgView:{

    },
})