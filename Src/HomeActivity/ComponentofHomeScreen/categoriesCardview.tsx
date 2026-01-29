import React from "react";
import { View,SafeAreaView,Text, StyleSheet } from "react-native";
import { Image, SvgUri } from "react-native-svg";
import categoriesData from "../../Asset/Icon/CategoriesData";
type prop ={
    name: string;
    color: string;
    iconComponent : React.FC<any>;
}

export const  CategoriesCardview: React.FC<prop> = ({name,color,iconComponent})=>{
    return(
    <SafeAreaView style={style.MainContainer}>
        <View style={[style.CategoriesCard,{backgroundColor: color}]}>
        </View>
        <Text style={style.CategoriesText}>{name}</Text>
    </SafeAreaView>
    );
};
const style = StyleSheet.create({
    MainContainer:{
        marginTop:10,
        marginLeft:10,
        display:'flex',
        flexDirection:'column',
        alignItems:'center'
    },
    CategoriesCard:{
        width:60,
        height:60,
        borderRadius:10,
        backgroundColor:'#EBF3F5'
    },
    CategoriesText:{
        color:'#555B55',
        fontSize:12,
        marginTop:5,
    }
});
