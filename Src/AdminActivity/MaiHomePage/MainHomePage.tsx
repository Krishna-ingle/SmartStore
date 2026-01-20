import React from "react";
import {
    View,
    SafeAreaView,
    StyleSheet,
    BackHandler,
} from "react-native";
import { BottomNavBarComponent } from "../AdminHomeActivity/AdminHomeScreenComponent/bottomNavBarComponent";
import { MenuBar } from "../AdminHomeActivity/AdminHomeScreenComponent/menuBar";
import { useFocusEffect, useNavigation} from "@react-navigation/native";

export const MainHomePage = () => {
    const navigation = useNavigation() as any;
    useFocusEffect(
        React.useCallback(() => {
            const onBackPress = () =>{
                if(navigation.isFocused()){
                    BackHandler.exitApp();
                    return true;
                }
                return false;
            };

            const sub = BackHandler.addEventListener('hardwareBackPress', onBackPress);
            return () => sub.remove();
        },[navigation])
    );
        return (
            <View style={{backgroundColor:"#16e6c7ff"}}>
                <View style={styles.bottomNavContainer}>
                <BottomNavBarComponent />
            </View>
            </View>

        );
};

const styles = StyleSheet.create({
    bottomNavContainer: {
        height: '100%', // Adjust based on your tab bar height
        justifyContent: 'center',
        backgroundColor: '#ffffff',
        borderTopWidth: 1,
        borderTopColor: '#e5e7eb',
        elevation: 10, // Android shadow
        shadowOffset: { width: 0, height: -2 }, // iOS shadow
        shadowOpacity: 0.1,
        shadowRadius: 8,
        shadowColor: '#000',
    },
});
