import React, { useState, useRef, useEffect } from 'react';
import {
  SafeAreaView,
  ScrollView,
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
  Alert,
  KeyboardAvoidingView,
  Platform,
  ActivityIndicator,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import InputText from '../../UIComponent/inputText';
import { useNavigation } from '@react-navigation/native';
import { ApiHelper } from '../../Services/ApiHelper'; // Import your ApiHelper
import { TokenStorage } from '../../Services/TokenStorage';
import { renewAccessToken } from '../../LoginActivity/LoginApi';

const { width, height } = Dimensions.get('window');

const AddShopDetailsScreen = () => {
  const navigation = useNavigation() as any;
  const scrollRef = useRef<ScrollView>(null);

  // Form state matching your API structure
  const [vendorId, setVendorId] = useState('');
  const [shopName, setShopName] = useState('');
  const [shopAddress, setShopAddress] = useState('');
  const [shopType, setShopType] = useState(''); // Electronics & Mobile
  const [contactNumber, setContactNumber] = useState('');
  const [description, setDescription] = useState('');
  const [gstNumber, setGstNumber] = useState('');
  const [latitude, setLatitude] = useState('');
  const [longitude, setLongitude] = useState('');

  // Additional fields for better UX
  const [isLoading, setIsLoading] = useState(false);
  
  // Validation function
  const validateForm = () => {
    if (!shopName.trim()) {
      Alert.alert('Error', 'Shop name is required');
      return false;
    }
    if (!shopAddress.trim()) {
      Alert.alert('Error', 'Shop address is required');
      return false;
    }
    if (!shopType.trim()) {
      Alert.alert('Error', 'Shop type is required');
      return false;
    }
    if (!contactNumber.trim()) {
      Alert.alert('Error', 'Contact number is required');
      return false;
    }
    if (contactNumber.length !== 10) {
      Alert.alert('Error', 'Please enter a valid 10-digit phone number');
      return false;
    }
    if (!description.trim()) {
      Alert.alert('Error', 'Shop description is required');
      return false;
    }
    return true;
  };
  // Replace getVendorId function with:

 const getVendorId = async () => {
    try {
      const vendorId = await TokenStorage.getVendorId();
      if (vendorId) {
        setVendorId(vendorId);
        console.log('✅ Vendor ID loaded automatically:', vendorId);
      } else {
        Alert.alert('Error', 'Please login again');
      }
    } catch (error) {
      Alert.alert('Error', 'Please login again');
    } finally {
      
    }
  };
// get vender id 
  useEffect(()=> {
    getVendorId();
  },[]);


  const handleSaveShop = async () => {
    if (!validateForm()) {
      return;
    }

    setIsLoading(true);

    try {
      console.log('🏪 Submitting shop data...');

      // Prepare data exactly as your API expects
      const shopData = {
        vendorId: vendorId,
        shopName: shopName.trim(),
        shopAddress: shopAddress.trim(),
        shopType: shopType.trim(),
        contactNumber: contactNumber.trim(),
        description: description.trim(),
        gstNumber: gstNumber.trim() || "27ABCDE1234F1Z5", // Default if empty
        latitude: parseFloat(latitude) || 18.5204, // Default latitude
        longitude: parseFloat(longitude) || 73.8567, // Default longitude
      };

      console.log('📤 Shop data to send:', shopData);

      // Call your API using ApiHelper (with authentication)
      const result = await ApiHelper.makeApiCall('/vendor/shops', 'POST', shopData);

      if (result) {
        console.log('✅ Shop created successfully:', result);
        
        Alert.alert(
          '✅ Success!', 
          'Shop details saved successfully!',
          [
            {
              text: 'OK',
              onPress: () => {
                // Navigate back or to next screen
                navigation.goBack();
                // or navigation.navigate('ShopListScreen');
              }
            }
          ]
        );
      } else {
        Alert.alert('❌ Failed', 'Could not save shop details. Please try again.');
      }

    } catch (error) {
      console.error('❌ Shop creation error:', error);
      Alert.alert('❌ Error', 'Something went wrong. Please check your connection and try again.');
    } finally {
      setIsLoading(false);
    }
  };

  // Get current location (optional enhancement)
  const getCurrentLocation = () => {
    Alert.alert(
      'Location', 
      'Location feature will be added soon!',
      [{ text: 'OK' }]
    );
    // TODO: Implement location fetching
    // For now, using default coordinates
    setLatitude('18.5204');
    setLongitude('73.8567');
  };

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView 
        style={{ flex: 1 }} 
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      >
        {/* Clean Header */}
        <View style={styles.header}>
          <TouchableOpacity 
            style={styles.backButton}
            onPress={() => navigation.goBack()}
          >
            <Text style={styles.backIcon}>←</Text>
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Add New Shop</Text>
          <View style={styles.placeholder} />
        </View>

        <ScrollView
          ref={scrollRef}
          style={styles.scrollContainer}
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
          keyboardShouldPersistTaps="handled"
        >
          {/* Progress Indicator */}
          <View style={styles.progressContainer}>
            <Text style={styles.progressText}>Complete your shop information</Text>
            <View style={styles.progressLine} />
          </View>

          {/* Form Container */}
          <View style={styles.formContainer}>
            
            {/* Basic Information */}
            <Text style={styles.sectionTitle}>📋 Basic Information</Text>
            
            <InputText
              value={shopName}
              onChangeText={setShopName}
              placeholder="Shop Name *"
              secureTextEntry={false}
            />

            <InputText
              value={shopType}
              onChangeText={setShopType}
              placeholder="Shop Type (e.g., Electronics & Mobile) *"
              secureTextEntry={false}
            />

            <InputText
              value={description}
              onChangeText={setDescription}
              placeholder="Shop Description *"
              secureTextEntry={false}
              multiline={true}
            />

            {/* Contact Information */}
            <Text style={styles.sectionTitle}>📞 Contact Information</Text>

            <InputText
              value={contactNumber}
              onChangeText={setContactNumber}
              placeholder="Contact Number *"
              secureTextEntry={false}
              keyboardType="phone-pad"
              maxLength={10}
            />

            {/* Address */}
            <Text style={styles.sectionTitle}>📍 Address & Location</Text>

            <InputText
              value={shopAddress}
              onChangeText={setShopAddress}
              placeholder="Complete Shop Address *"
              secureTextEntry={false}
              multiline={true}
            />

            {/* Location Coordinates */}
            <View style={styles.rowContainer}>
              <View style={styles.halfWidth}>
                <InputText
                  value={latitude}
                  onChangeText={setLatitude}
                  placeholder="Latitude (Optional)"
                  secureTextEntry={false}
                  keyboardType="numeric"
                />
              </View>

              <View style={styles.halfWidth}>
                <InputText
                  value={longitude}
                  onChangeText={setLongitude}
                  placeholder="Longitude (Optional)"
                  secureTextEntry={false}
                  keyboardType="numeric"
                />
              </View>
            </View>

            <TouchableOpacity 
              style={styles.locationButton}
              onPress={getCurrentLocation}
            >
              <Text style={styles.locationButtonText}>Get Current Location</Text>
            </TouchableOpacity>

            {/* Business Details */}
            <Text style={styles.sectionTitle}>Business Details</Text>

            <InputText
              value={gstNumber}
              onChangeText={setGstNumber}
              placeholder="GST Number (Optional)"
              secureTextEntry={false}
              autoCapitalize="characters"
            />

            {/* Info Note */}
            <View style={styles.infoNote}>
              <Text style={styles.infoText}>
                💡 Fields marked with * are required for shop registration
              </Text>
            </View>

            {/* Test API Button (Remove in production) */}
            <TouchableOpacity 
              style={styles.testButton}
              onPress={async () => {
                console.log('🧪 Testing shop API with sample data...');
                const testData = {
                  shopName: 'Test Electronics Store',
                  shopAddress: 'Test Address, Mumbai',
                  shopType: 'Electronics & Mobile',
                  contactNumber: '9876543210',
                  description: 'Complete electronics, mobiles, accessories and repair services',
                  gstNumber: '27ABCDE1234F1Z5',
                  latitude: 18.5204,
                  longitude: 73.8567,
                };
                
                const result = await ApiHelper.makeApiCall('/vendor/shops', 'POST', testData);
                Alert.alert('Test Result', result ? '✅ API Working!' : '❌ API Failed');
              }}
            >
              <Text style={styles.testButtonText}>🧪 Test API</Text>
            </TouchableOpacity>


          </View>

          {/* Bottom Spacing */}
          <View style={{ height: 120 }} />
        </ScrollView>

{/* <TouchableOpacity
  style={{ backgroundColor: 'orange', padding: 10, margin: 5 }}
  onPress={async () => {
    const vendorId = await TokenStorage.getVendorId();
    Alert.alert('Vendor ID', vendorId || 'Not found');
  }}
>
  <Text style={{ color: 'white' }}>Check Vendor ID</Text>
</TouchableOpacity> */}

{/* <TouchableOpacity
  style={{ backgroundColor: 'purple', padding: 15, margin: 10, borderRadius: 5 }}
  onPress={async () => {
    console.log('🧪 TESTING REFRESH TOKEN...');
    console.log('==========================================');
    
    const success = await renewAccessToken();
    
    console.log('==========================================');
    console.log('🏁 REFRESH TEST RESULT:', success ? 'SUCCESS' : 'FAILED');
    
    if (success) {
      Alert.alert('✅ Refresh Works!', 'Token refresh is now working correctly!');
    } else {
      Alert.alert('❌ Still Broken', 'Check console logs to see which method should work');
    }
  }}
>
  <Text style={{ color: 'white', textAlign: 'center' }}>🧪 Test Refresh Token</Text>
</TouchableOpacity> */}
{/* 
<TouchableOpacity
  style={{ backgroundColor: 'red', padding: 15, margin: 10, borderRadius: 5 }}
  onPress={async () => {
    try {
      console.log('🧹 Clearing all old tokens...');
      
      // Clear all tokens completely
      await TokenStorage.clearTokens();
      
      // Also clear vendor ID
      if (TokenStorage.clearVendorId) {
        await TokenStorage.clearVendorId();
      }
      
      console.log('✅ All tokens cleared successfully');
      
      Alert.alert(
        '🧹 Tokens Cleared!', 
        'All old tokens have been removed. Now please LOGIN AGAIN to get fresh tokens.',
        [
          {
            text: 'Go to Login',
            onPress: () => {
              navigation.navigate('LoginScreen'); // Replace with your login screen name
            }
          }
        ]
      );
      
    } catch (error) {
      console.error('Error clearing tokens:', error);
      Alert.alert('Error', 'Failed to clear tokens');
    }
  }}
>
  <Text style={{ color: 'white', textAlign: 'center' }}>🧹 CLEAR ALL TOKENS FIRST</Text>
</TouchableOpacity> */}
{/* 
<TouchableOpacity
  style={{ backgroundColor: 'blue', padding: 15, margin: 10, borderRadius: 5 }}
  onPress={async () => {
    try {
      const accessToken = await TokenStorage.getAccessToken();
      const refreshToken = await TokenStorage.getRefreshToken();
      
      console.log('🔍 Current tokens:');
      console.log('Access token exists:', !!accessToken);
      console.log('Refresh token exists:', !!refreshToken);
      
      if (accessToken) {
        // Decode to check age
        const payload = JSON.parse(atob(accessToken.split('.')[1]));
        const issued = new Date(payload.iat * 1000);
        const expires = new Date(payload.exp * 1000);
        const now = new Date();
        
        console.log('🕐 Token issued:', issued.toLocaleString());
        console.log('🕐 Token expires:', expires.toLocaleString());
        console.log('🕐 Current time:', now.toLocaleString());
        console.log('⏰ Minutes left:', Math.floor((expires.getTime() - now.getTime()) / 60000));
        
        Alert.alert(
          'Token Info',
          `Issued: ${issued.toLocaleTimeString()}\nExpires: ${expires.toLocaleTimeString()}\nMinutes left: ${Math.floor((expires.getTime() - now.getTime()) / 60000)}`
        );
      } else {
        Alert.alert('No Tokens', 'No access token found. Please login first.');
      }
      
    } catch (error) {
      console.error('Token check error:', error);
      Alert.alert('Error', 'Could not check token age');
    }
  }}
>
  <Text style={{ color: 'white', textAlign: 'center' }}>🕐 Check Token Age</Text>
</TouchableOpacity> */}


{/* <TouchableOpacity
  style={{ backgroundColor: 'lime', padding: 20, margin: 10, borderRadius: 5 }}
  onPress={async () => {
    console.log('🏪 TESTING SHOP CREATION (Ignoring Refresh Issue)...');
    
    const   shopData = {
      vendorId: vendorId,
      shopName: "Abc Electronics Store",
      shopAddress: "MG Road, Pune, Maharashtra",
      shopType: "Electronics & Mobile",
      contactNumber: "9876543678",
      description: "Best electronics & mobile store in the city"
    };
    
    console.log('📤 Submitting shop with fresh tokens...');
    
    try {
      // Direct API call without depending on refresh
      const accessToken = await TokenStorage.getAccessToken();
      
      const response = await fetch('https://smartstorebackend5.onrender.com/vendor/shops', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${accessToken}`,
        },
        body: JSON.stringify(shopData),
      });
      
      console.log('📥 Direct API Response Status:', response.status);
      const responseText = await response.text();
      console.log('📥 Direct API Response:', responseText);
      
      if (response.ok) {
        Alert.alert('🎉 SUCCESS!', 'Shop created successfully! Your main functionality works perfectly!');
        console.log('✅ Shop creation works with fresh tokens!');
      } else {
        Alert.alert('API Error', `Status: ${response.status}\nResponse: ${responseText}`);
      }
      
    } catch (error) {
      console.error('Direct shop creation error:', error);
      Alert.alert('Network Error', 'Check your internet connection');
    }
  }}
>
  <Text style={{ color: 'black', textAlign: 'center', fontSize: 16, fontWeight: 'bold' }}>
    🏪 TEST SHOP CREATION (Fresh Tokens - 12min left)
  </Text>
</TouchableOpacity> */}

{/* 
<TouchableOpacity
  style={{ backgroundColor: 'blue', padding: 20, margin: 10, borderRadius: 5 }}
  onPress={async () => {
    console.log('🎯 TESTING AUTO-REFRESH WITH EXPIRED TOKEN...');
    console.log('==========================================');
    
    const shopData = {
      vendorId: vendorId || "68e8da54b831f652c7609750",
      shopName: "Srujan Paper Store",  
      shopAddress: "FC Road, Pune, Maharashtra",
      shopType: "Paper",
      contactNumber: "09345678901",
      description: "automatically"
    };
    
    console.log('📤 Making API call with EXPIRED token...');
    console.log('📤 This should trigger automatic refresh...');
    
    // Use ApiHelper (not direct fetch) so it can auto-refresh
    const result = await ApiHelper.makeApiCall('/vendor/shops', 'POST', shopData);
    
    if (result) {
      Alert.alert('🎉 AUTO-REFRESH SUCCESS!', 'Token was automatically refreshed and shop was created!');
      console.log('✅ Auto-refresh worked perfectly!');
    } else {
      Alert.alert('❌ Auto-Refresh Failed', 'Check console to see what went wrong');
      console.log('❌ Auto-refresh did not work');
    }
    
    console.log('==========================================');
  }}
>
  <Text style={{ color: 'white', textAlign: 'center', fontSize: 16, fontWeight: 'bold' }}>
    🎯 TEST AUTO-REFRESH (Token is Expired!)
  </Text>
</TouchableOpacity> */}



        {/* Fixed Bottom Button */}
        <View style={styles.bottomContainer}>
          <TouchableOpacity 
            style={[styles.saveButton, isLoading && styles.saveButtonDisabled]}
            onPress={handleSaveShop}
            activeOpacity={0.9}
            disabled={isLoading}
          >
            {isLoading ? (
              <View style={styles.loadingContainer}>
                <ActivityIndicator size="small" color="#ffffff" />
                <Text style={[styles.saveButtonText, { marginLeft: 10 }]}>
                  Saving Shop...
                </Text>
              </View>
            ) : (
              <Text style={styles.saveButtonText}>💾 Save Shop Details</Text>
            )}
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingVertical: 15,
    backgroundColor: '#ffffff',
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
    paddingTop: Platform.OS === 'ios' ? 50 : 15,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
  },
  backButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#f5f5f5',
    justifyContent: 'center',
    alignItems: 'center',
  },
  backIcon: {
    fontSize: 18,
    color: '#333',
    fontWeight: '600',
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#333',
  },
  placeholder: {
    width: 40,
  },
  scrollContainer: {
    flex: 1,
  },
  scrollContent: {
    paddingHorizontal: 20,
  },
  progressContainer: {
    paddingVertical: 20,
    alignItems: 'center',
  },
  progressText: {
    fontSize: 16,
    color: '#666',
    marginBottom: 10,
  },
  progressLine: {
    width: 80,
    height: 3,
    backgroundColor: '#4CAF50',
    borderRadius: 2,
  },
  formContainer: {
    flex: 1,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#333',
    marginTop: 25,
    marginBottom: 20,
    paddingLeft: 5,
  },
  rowContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 15,
  },
  halfWidth: {
    flex: 1,
  },
  locationButton: {
    backgroundColor: '#E3F2FD',
    borderRadius: 8,
    paddingVertical: 12,
    paddingHorizontal: 15,
    marginVertical: 10,
    borderWidth: 1,
    borderColor: '#2196F3',
  },
  locationButtonText: {
    color: '#2196F3',
    fontSize: 14,
    fontWeight: '500',
    textAlign: 'center',
  },
  infoNote: {
    backgroundColor: '#f8f9fa',
    borderRadius: 8,
    padding: 15,
    marginTop: 20,
    borderLeftWidth: 3,
    borderLeftColor: '#4CAF50',
  },
  infoText: {
    fontSize: 14,
    color: '#666',
    lineHeight: 20,
  },
  testButton: {
    backgroundColor: '#FF9800',
    borderRadius: 8,
    paddingVertical: 12,
    paddingHorizontal: 15,
    marginTop: 15,
    alignItems: 'center',
  },
  testButtonText: {
    color: '#ffffff',
    fontSize: 14,
    fontWeight: '600',
  },
  bottomContainer: {
    backgroundColor: '#ffffff',
    paddingHorizontal: 20,
    paddingVertical: 15,
    borderTopWidth: 1,
    borderTopColor: '#f0f0f0',
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: -2 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
  },
  saveButton: {
    backgroundColor: '#4CAF50',
    borderRadius: 8,
    paddingVertical: 16,
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 2,
    shadowColor: '#4CAF50',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
  },
  saveButtonDisabled: {
    backgroundColor: '#cccccc',
  },
  saveButtonText: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: '600',
  },
  loadingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default AddShopDetailsScreen;
