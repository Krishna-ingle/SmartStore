import React from "react"
import { Text,
    SafeAreaView,
    View,
    Image,
    Button,
    Alert,
    TouchableOpacity,
    StyleSheet,
 } from "react-native"
import ProductImg from "../Asset/Icon/Images/ProductImg.png"
import colors from "../Asset/Colors/colors"
import CartIcon from "../Asset/Icon/cartIcon"
import Lefticon from "../Asset/Icon/leftIcon"
export const productDescScreen = ()=>{
    return(
        <SafeAreaView style={{backgroundColor:'rgb(250, 251, 250)'
        }}>

            {/* UpperSection */}

            <View style={{display:'flex',flexDirection:'row',
                justifyContent:'space-between'
            }}>
                <TouchableOpacity style={style.BackSection} >
                    <Lefticon/>
                    <Text>Back</Text>
                </TouchableOpacity>
                <View style={{backgroundColor:colors.headingBlackColor}}>
                    <CartIcon/>
                </View>
            </View>
            
            {/* ProductImageSection */}

            <View style={{
                padding:20,
                alignItems:"center",
                marginHorizontal:50,
                marginTop:20,
                backgroundColor:colors.white,
                shadowColor:'#000',
                shadowOffset:{width: 0, height: 6},
                shadowOpacity: 0.1,
                shadowRadius: 4,
                borderRadius:15
            }}>
                <Image
                source={ProductImg}
                style={{width:240,
                    height:240,
                    alignSelf:'center',
                }}
                resizeMode="cover"></Image>
            </View>

            {/* Product Name And prices */}

            <View style={{
                marginTop:30,
                display:'flex',
                flexDirection:'row',
                justifyContent:'space-between',
                marginHorizontal:30
            }}>

               <View>
                    <Text style={{fontSize:20,fontWeight:'700',
                    color:colors.headingBlackColor
                    }}>Delicious Milk</Text>
                    <Text style={{marginTop:5,
                        color:colors.subHeading,
                        marginLeft:20}}>
                        Desi Product</Text>
               </View>
               <View style={{display:'flex',
                    flexDirection:'row',
                    alignSelf:'center'
                }}>
                    <Text style={{fontSize:20, fontWeight:'600',
                        color:colors.headingBlackColor
                    }}>₹ 64 </Text>
                    <Text style={{alignSelf:'center'}} >/li</Text>
                </View>

            </View>

            {/* Plus and minus product Section */}
            <View style={{display:'flex',
                flexDirection:'row',
                justifyContent:'space-between',
                marginHorizontal:30,
                marginTop:30
            }}>
                <View style={{
                    display:'flex',
                    flexDirection:'row',
                    justifyContent:'space-around',
                    alignItems:'center',
                    borderColor:colors.headingBlackColor,
                    borderWidth:2,
                    borderRadius:5,
                    width:150,
                }}> 
                    <TouchableOpacity>
                        <Text style={style.plusMinusText}>-</Text>
                    </TouchableOpacity>
                    <Text style={style.plusMinusText}>1</Text>
                    <TouchableOpacity>
                        <Text style={style.plusMinusText}>+</Text>
                    </TouchableOpacity>
                </View>
                <View>
                    <Text style={{fontSize:20,
                        marginRight:19,
                    }}>₹ 64</Text>
                </View>
            </View>

            {/* About Product */}

            <View style={{marginHorizontal:30,
                marginTop:30
            }}>
                <Text style={{fontSize:20,fontWeight:'700',
                    color:colors.headingBlackColor
                }}>
                    About product
                </Text>
                <Text style={{marginTop:10,
                    marginLeft:10,
                    color:colors.subHeading
                }}>100% Pure A2 Cow Milk from desi cows.
                    Rich in A2 protein, easy to digest, and perfect for all ages.
                </Text>
            </View>



        </SafeAreaView>     
    )
}
const style = StyleSheet.create({
    BackSection:{
        display:'flex',
        flexDirection:'row',
        justifyContent:'flex-start',
        alignItems:'center',
        marginTop:10,
    },
    plusMinusText:{
        fontSize:24,
        fontWeight:'600',
        color:colors.headingBlackColor
    },
   
});