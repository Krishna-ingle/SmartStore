import React, { useEffect } from "react";
import { View, Text, TouchableOpacity, StyleSheet, Dimensions, SafeAreaView } from "react-native";
import { Package, Users, DollarSign, Megaphone, Menu, ChevronDown, Store, Home } from "lucide-react-native";

// Importing other screens for navigation
import { EmployeeDetails } from "../../EmployeeDetails/employeeDetails";
import { TodaySalesScreen } from "../../TodaySaleActivity/todaySalesScreen";
import { AdvertisementScreen } from "../../AddvertisementActivity/addvertisementScreen";
import AddShopDetailsScreen from "../../AddShopActivity/addShopDetails";
// for navigation
import { useNavigation } from "@react-navigation/native";
// use for redux
import { useSelector } from "react-redux";
import { RootState } from "../../../Redux/Store";

const { width } = Dimensions.get('window');
const cardWidth = (width - 56) / 2; // Account for container padding + card spacing
export default function VendorFourCardView() {
  // Navigation instance
  const navigation = useNavigation() as any;
  // const shopId = useSelector((state: RootState) => state.shop.currentShopId);
  const shopId = '68ebb36a9a9ab97c7ffcf6bf';
  const currentShop = useSelector((state: RootState) => state.shop.currentShop);
  return (
    <SafeAreaView style={{flex:1,backgroundColor:"#ffffff"}}>
      <View style={styles.container}>
        
        {/* Header Card - Shop Selector */}
        <View style={styles.headerCard}>
          <View style={styles.shopSelectorButton}>
            <View style={[styles.iconContainer, { backgroundColor: '#f7ffc67c',
              marginRight :10,
             }]}>
                <Home size={28} color="#f4e40bff" />
              </View>
            <View style={styles.shopInfoContainer}>
              <Text style={styles.currentShopLabel}>Current Shop</Text>
              <Text style={styles.currentShopName}>{currentShop?.shopName}</Text>
              <Text style={styles.currentShopName}>{currentShop?.id}</Text>
              <Text style={styles.currentShopType}>{currentShop?.description}</Text>
              
            </View>
            <View style={styles.menuIconContainer}>
              <Menu color="#22c55e" size={20} />
            </View>
          </View>
        </View>

        {/* 4 Card Grid - Row by Row */}
        <View style={styles.cardContainer}>
          
          {/* First Row */}
          <View style={[styles.row]}>
            {/* Product Details */}
            <TouchableOpacity onPress={() => 
              {navigation.navigate("ProductListScreen",{shopId:currentShop?.id})}
              } style={styles.card}>
              <View style={[styles.iconContainer, { backgroundColor: '#c2d2fd7c' }]}>
                <Package size={28} color="#3758eaff" />
              </View>
              <Text style={styles.cardTitle}>Product Details</Text>
              <Text style={styles.cardSubtitle}>View and manage</Text>
            </TouchableOpacity>

            {/* Employee Details */}
            <TouchableOpacity onPress={() => {navigation.navigate(EmployeeDetails)}} style={styles.card}>
              <View style={[styles.iconContainer, { backgroundColor: '#e8f5e8' }]}>
                <Users size={28} color="#22c55e" />
              </View>
              <Text style={styles.cardTitle}>Employee Details</Text>
              <Text style={styles.cardSubtitle}>Track staff and roles</Text>
            </TouchableOpacity>
          </View>

          {/* Second Row */}
          <View style={[styles.row]}>
            {/* Today's Sales */}
            <TouchableOpacity onPress={() => {navigation.navigate(TodaySalesScreen)}} style={styles.card}>
              <View style={[styles.iconContainer, { backgroundColor: '#fff7ed' }]}>
                <DollarSign size={28} color="#f59e0b" />
              </View>
              <Text style={styles.cardTitle}>Today's Sales</Text>
              <Text style={styles.cardSubtitle}>₹25,400 earned today</Text>
            </TouchableOpacity>

            {/* Advertisement */}
            <TouchableOpacity onPress={() => {navigation.navigate(AdvertisementScreen)}} style={styles.card}>
              <View style={[styles.iconContainer, { backgroundColor: '#fef2f2' }]}>
                <Megaphone size={28} color="#ef4444" />
              </View>
              <Text style={styles.cardTitle}>Advertisement</Text>
              <Text style={styles.cardSubtitle}>Promote your business</Text>
            </TouchableOpacity>
          </View>

        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 20,
    marginTop: 10,
    paddingTop: 40,
    backgroundColor: "#ffffff",
  },
  
  // Header Card Styles
  headerCard: {
    marginBottom: 30,
  },
  shopSelectorButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#ffffffff',
    paddingHorizontal: 16,
    paddingVertical: 14,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: '#e5ebe7ff',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 3,
  },
  menuIconContainer: {
    width: 44,
    height: 44,
    borderRadius: 12,
    backgroundColor: '#fcfcfcff',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 14,
    shadowColor: '#22c55e',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 1,
  },
  shopInfoContainer: {
    flex: 1,
    paddingVertical: 2,
  },
  currentShopLabel: {
    fontSize: 12,
    color: '#6b7280',
    fontWeight: '500',
    marginBottom: 2,
  },
  currentShopName: {
    fontSize: 17,
    fontWeight: '700',
    color: '#1f2937',
    marginBottom: 2,
  },
  currentShopType: {
    fontSize: 12,
    color: '#22c55e',
    fontWeight: '600',
  },

  // Original Card Styles
  header: {
    fontSize: 24,
    fontWeight: "700",
    color: "#1f2937",
    textAlign: "left",
  },
  cardContainer: {
    flex: 1,
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between", // This ensures proper spacing
    marginBottom: 46,
  },
  card: {
    width: cardWidth,
    backgroundColor: "#ffffff",
    borderRadius: 20,
    padding: 20,
    alignItems: "center",
    justifyContent: "center",
    minHeight: 160,
    // Enhanced shadow for iOS
    shadowColor: "#22c55e",
    shadowOpacity: 0.08,
    shadowOffset: { width: 0, height: 4 },
    shadowRadius: 12,
    // Enhanced elevation for Android
    elevation: 6,
    // Subtle border
    borderWidth: 1,
    borderColor: "#f1f5f9",
  },
  iconContainer: {
    width: 56,
    height: 56,
    borderRadius: 28,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 16,
  },
  cardTitle: {
    fontSize: 16,
    fontWeight: "600",
    color: "#1f2937",
    textAlign: "center",
    marginBottom: 8,
    lineHeight: 20,
  },
  cardSubtitle: {
    fontSize: 12,
    color: "#6b7280",
    textAlign: "center",
    lineHeight: 16,
    paddingHorizontal: 4,
  },
});
