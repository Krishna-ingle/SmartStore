import React from "react";
import { FlatList, View } from "react-native";
import { ShopCardView } from "./UserHomePageCompo/ShopCardView";

const shops = [
  {
    shopId: "1",
    shopName: "Subhash Dhoodh Dairy",
    isApproved: true,
    rating: 4.6,
    city: "Murtizapur",
    openingTime: "09:00",
    closingTime: "22:00",
    totalProducts: 120,
    isOpen: true,
    imageUrl: "https://picsum.photos/200/200", // demo image
  },
  {
    shopId: "2",
    shopName: "House of Punjab",
    isApproved: false,
    rating: 2.2,
    city: "Murtizapur",
    openingTime: "09:00",
    closingTime: "22:00",
    totalProducts: 150,
    isOpen: false,
    imageUrl: "https://picsum.photos/200/200", // demo image
  },
  {
    shopId: "3",
    shopName: "Subhash Dhoodh Dairy",
    isApproved: true,
    rating: 4.6,
    city: "Murtizapur",
    openingTime: "09:00",
    closingTime: "22:00",
    totalProducts: 120,
    isOpen: true,
    imageUrl: "https://picsum.photos/200/200", // demo image
  },
  {
    shopId: "4",
    shopName: "House of Punjab",
    isApproved: false,
    rating: 2.2,
    city: "Murtizapur",
    openingTime: "09:00",
    closingTime: "22:00",
    totalProducts: 150,
    isOpen: false,
    imageUrl: "https://picsum.photos/200/200", // demo image
  },
];

export default function ShopListScreen() {
  const openShop = (shopId: string) => {
    // navigation example:
    // navigation.navigate("ShopDetails", { shopId });
    console.log("Pressed shop:", shopId);
  };

  return (
    <View style={{ flex: 1, backgroundColor: "#F5F6F7" }}>
      <FlatList
        data={shops}
        keyExtractor={(item) => item.shopId}
        renderItem={({ item }) => <ShopCardView item={item} onPress={openShop} />}
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
}
