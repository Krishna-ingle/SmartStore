import React from "react";
import { SafeAreaView, StyleSheet, View } from "react-native";
import LinearGradient from "react-native-linear-gradient";
import CartIcon from "../../Asset/Icon/cartIcon";
const CartButton =()=>{
    return(
        <SafeAreaView>
            <View style={styles.containermain}>
                <LinearGradient
                            colors={['#49C749', '#008000']}
                            start={{ x: 0, y: 0 }}
                            end={{ x: 1, y: 1 }}
                            style={styles.container}
                            >
                            <CartIcon style={styles.Carticon}/>
                            </LinearGradient>
            </View>
        </SafeAreaView>
    );
}
const styles=StyleSheet.create({
    containermain:{},
    container:{
        height:40,
        width:40,
        borderRadius:8,
        display:'flex',
        alignItems:'center',
        alignContent:'center',
        marginRight:20,
        padding:4,
    },
    Carticon:{
    },

});
export default CartButton;