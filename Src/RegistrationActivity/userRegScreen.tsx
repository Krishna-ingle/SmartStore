import React, { useState, useRef } from "react";
import {
    View,
    SafeAreaView,
    Text,
    StyleSheet,
    Alert,
    Image,
    TouchableOpacity,
    KeyboardAvoidingView,
    TouchableWithoutFeedback,
    Keyboard,
    ScrollView,
    Pressable,
    Modal,
    FlatList,
    TextInput,
} from "react-native";

import citiesData from "../Asset/Data/cities.json";
import InputText from "../UIComponent/inputText";
import RegistrationScreenImg from "../Asset/Icon/Images/RegistrationScreenImg.png";
import colors from "../Asset/Colors/colors";
import { useNavigation } from "@react-navigation/native";
import { useSelector } from "react-redux";
import { RootState } from "../Redux/Store";
import { adminRegApi } from "./adminRegApi";
import { userRegApi } from "./userRegApi";

export const UserRegistrationScreen = () => {
    const [userfullName, setUserFaullName] = useState('');
    const [usermobileno, setUserMobileno] = useState('');
    const [useralternatemobileno, setUserAlternatemobileno] = useState('');
    const [userpassword, setUserPassword] = useState('');
    const [userconfirmPassword, setUserConfirmPassword] = useState('');
    const [userCity, setUserCity] = useState('');
    const [userAdress, setUserAdress] = useState('');

    // City picker states
    const [showCityModal, setShowCityModal] = useState(false);
    const [citySearch, setCitySearch] = useState('');
    const [selectedCityDisplay, setSelectedCityDisplay] = useState('');

    const navigation = useNavigation() as any;
    const email = useSelector((state: RootState) => state.email.email);
    const role = useSelector((state: RootState) => state.role.role);
    const scrollRef = useRef<ScrollView>(null);

    // City data processing
    const allCities = citiesData.map((item: any) => `${item.city}, ${item.state}`);
    const filteredCities = allCities.filter((city: string) =>
        city.toLowerCase().includes(citySearch.toLowerCase())
    );

    const selectCity = (fullCity: string) => {
        const cityName = fullCity.split(',')[0];
        setUserCity(cityName);
        setSelectedCityDisplay(fullCity);
        setShowCityModal(false);
        setCitySearch('');
    };

    const adminRegData = {
        fullName: userfullName,
        email: email,
        mobile: usermobileno,
        mobileOptional: useralternatemobileno,
        password: userpassword,
        confirmPassword: userconfirmPassword
    }
    const userRegData = {
        fullName: userfullName,
        email: email,
        mobileNumber: usermobileno,
        password: userpassword,
        confirmPassword: userconfirmPassword,
        city: userCity,
    }

    const handleNavigation = async () => {
        const trimmedData = {
            fullName: userfullName.trim(),
            email: email?.trim() || '',
            mobileNumber: usermobileno.trim(),
            password: userpassword.trim(),
            confirmPassword: userconfirmPassword.trim(),
            city: userCity.trim(),
        };


        if (!trimmedData.fullName) return Alert.alert("Error", "Full name is required");
        if (!trimmedData.mobileNumber || trimmedData.mobileNumber.length < 10) return Alert.alert("Error", "Valid mobile number is required");
        if (!trimmedData.password || trimmedData.password.length < 6) return Alert.alert("Error", "Password must be at least 6 characters");
        if (trimmedData.password !== trimmedData.confirmPassword) return Alert.alert("Error", "Passwords do not match");
        // if (!trimmedData.city) return Alert.alert("Error", "City is required");

        try {
            if (role === 'User') {
                await userRegApi(userRegData, navigation);
            } else {
                await adminRegApi(adminRegData, navigation);
            }
        } catch (error) {
            Alert.alert("Error", "Registration failed");
        }
    };

    return (
        <SafeAreaView style={styles.safeArea}>
            <KeyboardAvoidingView style={{ flex: 1 }} behavior="padding">
                <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                    <ScrollView
                        ref={scrollRef}
                        contentContainerStyle={styles.container}
                        keyboardShouldPersistTaps="always"
                        showsVerticalScrollIndicator={false}
                    >
                        {/* Heading */}
                        <View style={styles.headerSection}>
                            <View style={{ flexDirection: 'column' }}>
                                <Text style={styles.headingText}>Getting Started!</Text>
                                <Text style={{ width: 150, marginTop: 5 }}>
                                    Create an account to continue
                                </Text>
                                <Text style={styles.emailText}>{email}</Text>
                            </View>
                            <Image
                                source={RegistrationScreenImg}
                                style={styles.headerImage}
                            />
                        </View>

                        {/* Inputs */}
                        <View style={styles.mainContainer}>
                            <View style={styles.inputContainer}>
                                <InputText
                                    value={userfullName}
                                    onChangeText={setUserFaullName}
                                    placeholder="Enter Your Name"
                                />
                            </View>

                            <View style={styles.inputContainer}>
                                <InputText
                                    value={usermobileno}
                                    onChangeText={setUserMobileno}
                                    placeholder="Mobile No"
                                    keyboardType="phone-pad"
                                />
                            </View>

                            {role === 'Vender' && (
                                <View style={styles.inputContainer}>
                                    <InputText
                                        value={useralternatemobileno}
                                        onChangeText={setUserAlternatemobileno}
                                        placeholder="Alternate Mobile No"
                                        keyboardType="phone-pad"
                                    />
                                </View>
                            )}

                            <View style={styles.inputContainer}>
                                <InputText
                                    value={userpassword}
                                    onChangeText={setUserPassword}
                                    placeholder="Password"
                                    secureTextEntry={true}
                                />
                            </View>

                            <View style={styles.inputContainer}>
                                <InputText
                                    value={userconfirmPassword}
                                    onChangeText={setUserConfirmPassword}
                                    placeholder="Confirm Password"
                                    secureTextEntry={true}
                                />
                            </View>

                            {role === 'User' && (
                                <>
                                    <View style={styles.inputContainer}>
                                        <InputText
                                            value={userAdress}
                                            onChangeText={setUserAdress}
                                            placeholder="Address (one line)"
                                        />
                                    </View>

                                    {/* ✅ CITY PICKER INPUT */}
                                    <View style={styles.inputContainer}>
                                        <Pressable
                                            style={styles.cityInputContainer}
                                            onPress={() => setShowCityModal(true)}
                                        >
                                            <Text style={styles.cityInputText}>
                                                {selectedCityDisplay || userCity || 'Select City...'}
                                            </Text>
                                        </Pressable>
                                    </View>
                                </>
                            )}

                            <Pressable onPress={handleNavigation} style={styles.registerButton}>
                                <Text style={styles.registerButtonText}>Register</Text>
                            </Pressable>

                            <TouchableOpacity
                                onPress={() => navigation.navigate("LoginScreen")}
                                style={styles.loginLink}
                            >
                                <Text style={styles.loginText}>
                                    Already have an account?{' '}
                                    <Text style={styles.loginLinkText}>Login</Text>
                                </Text>
                            </TouchableOpacity>
                        </View>
                    </ScrollView>
                </TouchableWithoutFeedback>

                {/* ✅ CITY MODAL */}
                {role === 'User' && (
                    <Modal visible={showCityModal} animationType="slide" transparent>
                        <View style={styles.modalOverlay}>
                            <View style={styles.cityModal}>
                                <View style={styles.modalHeader}>
                                    <Text style={styles.modalTitle}>Select City</Text>
                                    <Pressable onPress={() => setShowCityModal(false)}>
                                        <Text style={styles.closeButton}>✕</Text>
                                    </Pressable>
                                </View>

                                <TextInput
                                    style={styles.searchInput}
                                    placeholder="Search cities (Mumbai, Pune...)"
                                    value={citySearch}
                                    onChangeText={setCitySearch}
                                    autoFocus
                                />

                                <FlatList
                                    data={filteredCities}
                                    keyExtractor={(item, index) => index.toString()}
                                    renderItem={({ item }) => (
                                        <Pressable style={styles.cityItem} onPress={() => selectCity(item)}>
                                            <Text style={styles.cityItemText}>{item}</Text>
                                        </Pressable>
                                    )}
                                    showsVerticalScrollIndicator={false}
                                    keyboardShouldPersistTaps="handled"
                                />
                            </View>
                        </View>
                    </Modal>
                )}
            </KeyboardAvoidingView>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    safeArea: { flex: 1 },
    container: {
        flexGrow: 1,
        paddingBottom: 50,
    },
    mainContainer: {
        alignItems: 'center',
    },
    headerSection: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 30,
    },
    headingText: {
        fontSize: 24,
        fontWeight: '600',
        color: colors.headingBlackColor,
    },
    emailText: {
        color: colors.gradientColorTow,
        fontSize: 16,
        marginTop: 5,
    },
    headerImage: {
        width: 160,
        height: 180,
        resizeMode: 'center',
    },
    inputContainer: {
        width: '100%',
        alignItems: 'center',
    },
    cityInputContainer: {
        width: '85%',
        height: 50,
        borderWidth: 1,
        borderColor: "#ccc",
        borderRadius: 6,
        justifyContent: 'center',
    },
    cityInputText: {
        marginLeft:10,
        fontSize: 18,
        color: "#555",
    },
    registerButton: {
        backgroundColor: colors.gradientColorTow,
        padding: 15,
        borderRadius: 8,
        width: '85%',
        alignItems: 'center',
        marginVertical: 20,
        elevation: 3,
    },
    registerButtonText: {
        color: '#fff',
        fontWeight: '600',
        fontSize: 16,
    },
    loginLink: {
        padding: 10,
    },
    loginText: {
        fontSize: 16,
    },
    loginLinkText: {
        color: colors.gradientColorTow,
        fontWeight: '500',
    },
    // Modal styles
    modalOverlay: {
        flex: 1,
        backgroundColor: 'rgba(0,0,0,0.5)',
        justifyContent: 'center',
        alignItems: 'center',
    },
    cityModal: {
        width: '90%',
        height: '70%',
        backgroundColor: '#fff',
        borderRadius: 12,
    },
    modalHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: 20,
        borderBottomWidth: 1,
        borderBottomColor: '#eee',
    },
    modalTitle: {
        fontSize: 18,
        fontWeight: '600',
        color: colors.headingBlackColor,
    },
    closeButton: {
        fontSize: 24,
        color: '#666',
    },
    searchInput: {
        padding: 15,
        borderBottomWidth: 1,
        borderBottomColor: '#eee',
        fontSize: 16,
    },
    cityItem: {
        padding: 15,
        borderBottomWidth: 1,
        borderBottomColor: '#f5f5f5',
    },
    cityItemText: {
        fontSize: 16,
        color: colors.headingBlackColor,
    },
});
