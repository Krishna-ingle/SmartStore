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
export const productDescScreen = ()=>{
    return(
        <SafeAreaView style={{
            backgroundColor:'rgba(208, 248, 208, 0.99)',
            height:'100%'
        }}>
            <View> 
                <View style={{backgroundColor:colors.gradientColorTow,
                            width:40,
                            height:40,
                        }}>
                        <CartIcon/>
                    </View>
                
                <View style={{ width: 300,
                    height: 300,
                    marginHorizontal:45,
                    display:'flex',
                    alignContent:'center',
                    shadowColor: 'rgba(62, 62, 62, 0.73)',           
                    shadowOffset: { width: 0, height: 8 }, 
                    shadowOpacity:0.3,  
                    elevation: 20,           
                    overflow: 'hidden',}}>
                        
                    <Image
                    source={ProductImg}
                    style={{ width: '100%',
                    height: '100%',
                    }}
                    resizeMode="cover"
                    />
                    
                    
                </View>

                
                <View style={{
                    backgroundColor:colors.white,
                    borderTopLeftRadius:40,
                    borderTopRightRadius:40,
                    height:'100%',
                    marginTop:20,
                }}>
                    {/* product name section */}

                    <View style={{
                        display:'flex',
                        flexDirection:'row',
                        justifyContent:'space-between',
                        marginTop:40,
                        alignItems:'center',
                        alignSelf:'center',
                        width:'85%',
                    }}>
                        <View style={{display:'flex',flexDirection:'row'
                        }}>
                            <Text style={style.priceText}>Product Name : </Text>
                            <Text style={style.priceText}>Milk</Text>
                        </View>
                    </View>
                    
                        <View style={{display:'flex',flexDirection:'row',marginTop:20,
                        marginHorizontal:25
                        }}>
                            <Text style={style.priceText}>Price : </Text>
                            <Text style={style.priceText}>₹ 64 </Text>
                            <Text style={style.priceText}>/li</Text>
                        </View>
                 
                 <View style={{
                    display:'flex',
                    flexDirection:'row',
                    justifyContent:'space-around',
                    marginTop:20,
                    alignItems:'center',
                    alignSelf:'center',
                    width:420,
                 }}>

                    {/* total price */}

                    <View style={{display:'flex',
                        flexDirection:'row'
                    }}>
                        <Text style={style.priceText}>Total Price : </Text>
                        <Text style={style.priceText}>₹ </Text>
                        <Text style={style.priceText}>64</Text>
                    </View>


                    <View style={{
                    display:'flex',
                    flexDirection:'row',
                    justifyContent:'space-around',
                    borderColor:'#74BBD5',
                    borderWidth:2,
                    width:140,
                    height:36,
                    borderRadius:8,
                    alignItems:'center'
                    }}> 
                        <TouchableOpacity onPress={()=> Alert.alert('hii')}>
                            <Text style={style.addAndMinusText}>+</Text>
                        </TouchableOpacity>
                        <Text style={style.addAndMinusText}>1</Text>
                        <TouchableOpacity onPress={()=>Alert.alert('hii')}>
                            <Text style={style.addAndMinusText}>-</Text>
                        </TouchableOpacity>
                    </View>
                 </View>

                {/* Product Desc */}
                <View style={{
                    display:'flex',
                    flexDirection:'row',
                    marginHorizontal:30,
                    marginTop:20
                }}>
                    <Text style={style.priceText}>Description : </Text>
                    <Text style={{width:"74%", marginTop:5,marginLeft:2}}>
                        100% Pure A2 Cow Milk from desi cows.
                        Rich in A2 protein, easy to digest, and perfect for all ages.
                    </Text>
                </View>
                

                {/* buy button */}

                <View style={{display:'flex',flexDirection:'row',justifyContent:'center'}}>
                    <TouchableOpacity style={style.buyBtn}>
                    {/* <Text style={style.btnText}>Total: 100</Text> */}
                    <Text style={style.btnText}>Buy Now</Text>
                </TouchableOpacity>
                </View>
                
            </View>

            </View>
        </SafeAreaView>
    )
}
const style = StyleSheet.create({
    addAndMinusText:{
        fontWeight:'500',
        fontSize:20,
    },
    priceText:{
        fontSize:18
    },
    buyBtn:{
        width:'90%',
        display:'flex',
        flexDirection:'row',
        justifyContent:'space-around',
        alignItems:'center',
        padding:12,
        backgroundColor:colors.gradientColorTow,
        borderRadius:6,
        marginTop:40,
    },
    btnText:{
        color:colors.white,
        fontWeight:'600',
        fontSize:16,
    }
});