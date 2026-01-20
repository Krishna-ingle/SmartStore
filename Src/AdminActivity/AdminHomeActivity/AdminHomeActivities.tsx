import React from "react";
import {
    View,
    SafeAreaView,
    Text,
    StyleSheet,
}from "react-native"
import { MenuBar } from "./AdminHomeScreenComponent/menuBar";
import VendorFourCardView from "./AdminHomeScreenComponent/foreCardView";
import {BottomNavBarComponent} from "./AdminHomeScreenComponent/bottomNavBarComponent"
import FirstTimeShopAdd from "./AdminHomeScreenComponent/firstTimeShopAdd";
import { useNavigation } from "@react-navigation/native";

// Redux data retrieve
import { useSelector } from "react-redux";
import { RootState } from "../../Redux/Store";
export const AdminHomeScreen = () =>{
    const Navigation = useNavigation() as any;
    const shopId = useSelector((state: RootState) => state.shop.currentShopId);
    const currentShop = useSelector((state: RootState) => state.shop.currentShop);
    const shopName = currentShop?.shopName;
    return(
         <SafeAreaView style={{ flex: 1,height:'100%' }}>
            <View style={{ flex: 1 }}>
                <View style={{ flex: 1 }}>
                    <VendorFourCardView />
                </View>
                {/* <BottomNavBarComponent /> */}
            </View>
        </SafeAreaView>

    );
}

const style = StyleSheet.create({
    
})