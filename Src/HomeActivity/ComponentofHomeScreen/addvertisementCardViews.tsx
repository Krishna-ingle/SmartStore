
import React from "react";
import { View,SafeAreaView, Text ,StyleSheet, Button, Alert, TouchableOpacity} from "react-native";
import AddPic1 from "../../Asset/Icon/AddvertisementPic1";
import LinearGradient from "react-native-linear-gradient";
type OfferCardProps ={
    offerText: string;
    discount : string;
    index: number;
}
const AddvertisementcardView: React.FC<OfferCardProps> = ({offerText,discount,index})=>{
    const isEven = index %2===0;
    return(
        <SafeAreaView>
            <View style={[style.MainCardview, isEven ? style.cardbackgound1:style.cardbackground2]}>
                <View>
                    <Text style={style.discriptedText}>{offerText}</Text>
                    <Text style={style.discountText}>{discount}</Text>
                   <LinearGradient
                        colors={['#49C749', '#008000']}
                        start={{ x: 0, y: 0 }}
                        end={{ x: 1, y: 1 }}
                        style={style.btnClickNow}>
                        <TouchableOpacity
                            onPress={ ()=> Alert.alert("Click Now")}>
                            <Text style={style.btnText}>Click Now</Text>
                        </TouchableOpacity>
                     </LinearGradient>
                   
                    
                </View>
                <View>
                    <AddPic1/>
                </View>
            </View>
        </SafeAreaView>
    );
};
const style=StyleSheet.create({
    MainCardview:{
        width: 320,
        height : 114,
        borderRadius :14,
        display:'flex',
        flexDirection:'row',
        alignContent:'space-around',
        justifyContent:'space-around',
        alignItems:'center',
        marginRight :10,
        padding:10,
        paddingLeft:10,
        marginLeft:10,

    },
    cardbackgound1:{
        backgroundColor :"#C8DFC4",
    },
    cardbackground2:{
        backgroundColor :"#F0CD3C",
    },
    discriptedText:{
        fontSize: 16,
        fontStyle: 'normal',
        marginTop: 6,
        color:'#000000'
    },
    discountText:{
         fontSize: 20,
         marginTop:2,
         color:'#046307'

    },
    btnText:{
        color:'#ffffff',
        display:'flex',
        justifyContent:'space-around',
    },
    btnClickNow:{
        width:80,
        height:25,
        borderRadius:20,
        display:'flex',
        justifyContent:'space-around',
        marginTop:10,
        fontSize:6,
        backgroundColor:'#046307',
        color:'#046307',
        alignItems:'center',
    }
    
});

export default AddvertisementcardView;