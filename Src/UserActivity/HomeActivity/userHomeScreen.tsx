import React, { useRef, useMemo, useEffect } from "react";
import {
  Animated, SafeAreaView, StatusBar, StyleSheet, ScrollView, Text,
  View,
  FlatList,
  Alert
} from "react-native";
import { LocateIcon, MapIcon, MapPin, Search, ShoppingCart } from "lucide-react-native";
import colors from "../../Asset/Colors/colors";
import HomeHeader from "./UserHomePageCompo/headerCompo";
import { DairyCategoryRow } from "./UserHomePageCompo/filterCardView";
import LinearGradient from "react-native-linear-gradient";
import { AddverisementCerdViewCompo } from "./UserHomePageCompo/AdvertiseCardViewCompo";
import { ProductCardView } from "./UserHomePageCompo/productCardView";
import ShopListScreen from "./shopListScreen";
import { TopShopCard } from "./UserHomePageCompo/TopShopCardView";

const BIG_HEADER_HEIGHT = 140;
const SMALL_HEADER_HEIGHT = 65;

export const UserHomeScreen = () => {
  const mockShops = [
    {
      shopId: "696173b13cfe40283ade591b",
      shopName: "Ram Milk Dairy",
      city: "Murtizapur",
      rating: 8.0,
      totalProducts: 12,
      bannerUrl: "",
      isApproved: false
    },
    {
      shopId: "2abc123def456ghi789",
      shopName: "Gupta General Store",
      city: "Mumbai",
      rating: 9.2,
      totalProducts: 45,
      bannerUrl: "",
      isApproved: true
    },
  ]
  const scrollY = useRef(new Animated.Value(0)).current;

  const headerClamp = useMemo(
    () => Animated.diffClamp(scrollY, 0, BIG_HEADER_HEIGHT),
    [scrollY]
  );

  const bigHeaderY = headerClamp.interpolate({
    inputRange: [0, BIG_HEADER_HEIGHT],
    outputRange: [0, -BIG_HEADER_HEIGHT],
    extrapolate: "clamp",
  });
  const smallHeaderY = headerClamp.interpolate({
    inputRange: [0, BIG_HEADER_HEIGHT],
    outputRange: [-SMALL_HEADER_HEIGHT, 0],
    extrapolate: "clamp",
  });

  useEffect(() => {
    let lastUpdate = 0;
    const UPDATE_INTERVAL = 16; // 60fps

    const listener = scrollY.addListener(({ value }) => {
      const now = Date.now();

      // Only update 60fps max (perfect smoothness)
      if (now - lastUpdate < UPDATE_INTERVAL) return;
      lastUpdate = now;

      const progress = Math.max(0, Math.min(1, value / BIG_HEADER_HEIGHT));

      // Direct hex colors - FASTEST
      const colors = [
        '#AFE79E', // Green
        '#B8E2B5',
        '#C1E8C9',
        '#D4EFF4',
        '#E8F5E8',
        '#F0F8F0',
        '#FFFFFF'  // White
      ];

      const colorIndex = Math.floor(progress * (colors.length - 1));
      const color = colors[colorIndex];

      // ✅ INSTANT color change (no animation)
      StatusBar.setBackgroundColor(color, false);
      StatusBar.setBarStyle('dark-content', false);
    });

    return () => scrollY.removeListener(listener);
  }, []);





  const smallHeaderHeight = headerClamp.interpolate({
    inputRange: [0, BIG_HEADER_HEIGHT],
    outputRange: [SMALL_HEADER_HEIGHT + 44, SMALL_HEADER_HEIGHT],
    extrapolate: "clamp",
  });
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#DFF6D8" }}>
      <StatusBar barStyle="dark-content" backgroundColor="#AFE79E" />

      <Animated.View
        style={[
          styles.bigHeaderContainer,
          { transform: [{ translateY: bigHeaderY }] }
        ]}
      >
        <HomeHeader />
      </Animated.View>

      <Animated.View
        style={[
          styles.smallHeaderContainer,
          {
            transform: [{ translateY: smallHeaderY }],
            backgroundColor: "#FFFFFF",
            marginTop: -10,
          }
        ]}
      >
        <View style={styles.smallHeaderContent}>
          <View style={styles.locationBox}>
            <MapPin size={18} color="#374151" />
            <Text style={styles.locationText}>Set Location</Text>
          </View>

          {/* Search */}
          <View style={styles.searchBox}>
            <Search size={20} color="#9CA3AF" />
            <Text style={styles.searchPlaceholder}>Search shops...</Text>
          </View>

        </View>
      </Animated.View>

      {/* Scrollable Content */}
      <Animated.ScrollView
        style={{ flex: 1 }}
        contentContainerStyle={{ paddingTop: BIG_HEADER_HEIGHT + 20, paddingBottom: 40 }}
        scrollEventThrottle={1}
        onScroll={Animated.event(
          [{ nativeEvent: { contentOffset: { y: scrollY } } }],
          { useNativeDriver: true }
        )}
        showsVerticalScrollIndicator={false}
      >
        {/* Your existing content */}
        <LinearGradient
          colors={["#CFF5C2", "#e7f7e2"]}
          locations={[0.0, 0.9]}
          start={{ x: 0.5, y: 0 }}
          end={{ x: 0.5, y: 1 }}
          style={{ marginHorizontal: 10, paddingTop: 20 }}
        >
          <View >
            <AddverisementCerdViewCompo />
          </View>
        </LinearGradient>

        <LinearGradient
          colors={["#e7f7e2", "#e7f7e2"]}
          locations={[0.0, 0.9]}
          start={{ x: 0.5, y: 0 }}
          end={{ x: 0.5, y: 1 }}
          style={{ marginHorizontal: 10, paddingTop: 10 }}
        >
          <Text style={{
            marginLeft: 10, fontWeight: '600', marginBottom: 10,
            fontSize: 14
          }}>Select Category</Text>
          <DairyCategoryRow onChange={(id) => console.log("Selected:", id)} />
        </LinearGradient>

        <LinearGradient
          colors={["#e7f7e2", "#f0f5ee"]}
          locations={[0.0, 0.9]}
          start={{ x: 0.5, y: 0 }}
          end={{ x: 0.5, y: 1 }}
          style={{ paddingTop: 10 }}
        >
          <Text style={{
            marginLeft: 20, fontWeight: '600',
            fontSize: 14.8,
          }}>popular items & products</Text>
          <ProductCardView />
        </LinearGradient>

        {/* popular shop section */}
        <View style={{ backgroundColor: "#f2f5f0", width: '100%', paddingBottom: 40 }}>
          <Text style={{
            marginLeft: 20, fontWeight: '600',
            fontSize: 14.8,
          }}>popular Shops</Text>
          <View style={{backgroundColor:"#f5f5f5"}}>
            <FlatList
            data={mockShops}
            numColumns={1}
             key="shopsList" 
            keyExtractor={(item) => item.shopId}
            renderItem={({ item }) => (
              <TopShopCard
                shopId={item.shopId}
                shopName={item.shopName}
                city={item.city}
                rating={item.rating}
                totalProducts={item.totalProducts}
                isApproved={item.isApproved}
                bannerUrl={item.bannerUrl}
                // onPress={() => navigation.navigate('ShopDetails', { shopId: item.shopId })}
                onPress = {() => Alert.alert("click")}
              />
            )}
            contentContainerStyle={{ padding: 8 }}
          />
          </View>
          


        </View>
      </Animated.ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  bigHeaderContainer: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    height: BIG_HEADER_HEIGHT,
    zIndex: 5,
  },

  smallHeaderContainer: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    height: SMALL_HEADER_HEIGHT,
    zIndex: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: -2 },
    shadowOpacity: 0.12,        // ✅ STATIC VALUE - No animation
    shadowRadius: 16,
    elevation: 12,
  },

  smallHeaderContent: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 16,
    paddingVertical: 8,
  },

  locationBox: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#F3F4F6",
    borderRadius: 12,
    paddingHorizontal: 12,
    paddingVertical: 6,
    marginRight: 12,
  },
  locationText: {
    marginLeft: 6,
    fontSize: 14,
    fontWeight: "600",
    color: "#374151",
  },

  searchBox: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#F9FAFB",
    borderRadius: 12,
    paddingHorizontal: 14,
    paddingVertical: 8,
    marginRight: 12,
  },
  searchPlaceholder: {
    marginLeft: 8,
    fontSize: 15,
    color: "#9CA3AF",
  },

  cartIcon: {
    width: 40,
    height: 40,
    borderRadius: 12,
    backgroundColor: "#F3F4F6",
    justifyContent: "center",
    alignItems: "center",
  },
});
