import React from "react";
import { Image, Pressable, StyleSheet, Text, View } from "react-native";
import { BadgeCheck } from "lucide-react-native";
import colors from "../../../Asset/Colors/colors";

type Shop = {
  shopId: string;
  shopName: string;
  isApproved: boolean;
  rating: number;
  city: string;
  openingTime: string;
  closingTime: string;
  totalProducts: number;
  isOpen: boolean;
  imageUrl?: string;
};

type Props = {
  item: Shop;
  onPress?: (shopId: string) => void;
};

export function ShopCardView({ item, onPress = () => {} }: Props) {
  return (
    <Pressable onPress={() => onPress(item.shopId)} style={styles.card}>
      {/* Left: full-height image */}
      <View style={styles.left}>
        <View style={styles.imageWrap}>
          <Image
            source={
              item.imageUrl
                ? { uri: item.imageUrl }
                : require("../../../Asset/Icon/Images/Adimg1.png")
            }
            style={styles.image}
            resizeMode="cover"
          />
        </View>
      </View>

      {/* Right: content */}
      <View style={styles.right}>
        {/* Name + verified + rating */}
<View style={styles.headerRow}>
  <View style={styles.nameRow}>
    <Text style={styles.title} numberOfLines={2}>
      {item.shopName}
    </Text>
    {item.isApproved && (
      <BadgeCheck 
        size={22} 
        color={colors.white} 
        style={styles.verifiedIcon}
        fill={colors.gradientColorone} 
      />
    )}
  </View>
  <View style={styles.ratingChip}>
    <Text style={styles.ratingText}>
      ★ {item.rating?.toFixed(1) ?? item.rating}
    </Text>
  </View>
</View>



        <Text style={styles.sub} numberOfLines={1}>
          {item.city} • {item.totalProducts} items
        </Text>

        <Text style={styles.time} numberOfLines={1}>
          {item.openingTime} - {item.closingTime}
        </Text>

        <View style={styles.bottomRow}>
          {!item.isApproved && (
            <Text style={styles.pending}>Approval pending</Text>
          )}
        </View>
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  card: {
    flexDirection: "row",
    backgroundColor: "#fff",
    borderRadius: 16,
    padding: 16,
    marginHorizontal: 16,
    marginVertical: 8,
    elevation: 4,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 12,
    shadowOffset: { width: 0, height: 4 },
  },

  left: {
    width: 88,
    justifyContent: "center",
    alignItems: "center",
  },
  imageWrap: {
    width: 80,
    height: 100,
    borderRadius: 12,
    overflow: "hidden",
    backgroundColor: "#F5F5F7",
  },
  image: {
    width: "100%",
    height: "100%",
  },

  right: {
    flex: 1,
    paddingLeft: 5,
    justifyContent: "space-between",
  },
headerRow: {
  flexDirection: 'row',
  justifyContent: 'space-between',
  alignItems: 'flex-start',
  marginBottom: 4,
},

nameRow: {
  flexDirection: 'row',
  alignItems: 'center',
  flex: 1,
},

title: {
  fontSize: 16,
  fontWeight: '800',
  color: '#1F2937',  // ← KEY: space before icon
  lineHeight: 20 * 0.9,  // ← KEY: matches icon height
},

verifiedIcon: {
  flexShrink: 0,  // ← KEY: icon stays fixed size
},

ratingChip: {
  backgroundColor: '#1F2937',
  borderRadius: 20,
  paddingHorizontal: 8,
  paddingVertical: 4,
  minWidth: 44,
  alignItems: 'center',
},


  ratingText: {
    color: "#fff",
    fontSize: 12,
    fontWeight: "700",
  },

  sub: {
    fontSize: 13,
    color: "#6B7280",
    fontWeight: "600",
    marginTop: 2,
  },

  time: {
    fontSize: 13,
    color: "#374151",
    fontWeight: "700",
    marginTop: 2,
  },

  bottomRow: {
    marginTop: 8,
    minHeight: 18,
  },
  pending: {
    fontSize: 12,
    color: "#F59E0B",
    fontWeight: "700",
  },
});
