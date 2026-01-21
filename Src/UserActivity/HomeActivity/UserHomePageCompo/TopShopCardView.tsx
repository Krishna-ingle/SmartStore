import React from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
} from 'react-native';
import colors from '../../../Asset/Colors/colors';
import { Star, StarIcon } from 'lucide-react-native';

const { width } = Dimensions.get('window');

interface TopShopCardProps {
  shopId: string;
  shopName: string;
  city: string;
  rating: number;
  totalProducts: number;
  isApproved: boolean;
  bannerUrl?: string;
  onPress?: () => void;
}

export const TopShopCard = ({
  shopName,
  city,
  rating,
  totalProducts,
  isApproved,
  bannerUrl,
  onPress,
}: TopShopCardProps) => {
  return (
    <TouchableOpacity style={styles.card} onPress={onPress} activeOpacity={0.9}>
      {/* Banner Image */}
      <Image
        source={
          bannerUrl 
            ? { uri: bannerUrl }
            : require('../../../Asset/Icon&img/Images/ShopImg.png')
        }
        style={styles.bannerImage}
        resizeMode="cover"
      />

      {/* Gradient Overlay on Image */}
      <View style={styles.imageOverlay} />

      {/* Approved Badge */}
      {isApproved && (
        <View style={styles.approvedBadge}>
          <Text style={styles.approvedText}>Verified</Text>
        </View>
      )}

      {/* Content */}
      <View style={styles.content}>
        {/* Shop Name & Rating Row */}
        <View style={styles.headerRow}>
          <Text style={styles.shopName} numberOfLines={1}>
            {shopName}
          </Text>
          <View style={styles.ratingBadge}>
            <Text style={styles.rating}>{rating.toFixed(1)}</Text>
          </View>
        </View>

        {/* Location & Products */}
        <View style={styles.infoRow}>
          <Text style={styles.city}>{city}</Text>
          
        </View>

        {/* Bottom gradient & CTA */}
        <View style={styles.bottomGradient}>
          <Text style={styles.ctaText}>View {totalProducts} Products & More..</Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  // ✅ FULL WIDTH SINGLE CARD
  card: {
    width: width - 40, // Full width - 16px margins each side
    backgroundColor: '#fff',
    borderRadius: 16,
    justifyContent: 'center',
    marginVertical: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 8 },
    shadowRadius: 20,
    elevation: 2,
    overflow: 'hidden',
    marginHorizontal:10
  },
  bannerImage: {
    height: 140,
    width: '100%',
    alignSelf: 'center',
    justifyContent: 'center'
  },
  imageOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
  approvedBadge: {
    position: 'absolute',
    top: 12,
    left: 12,
    backgroundColor: 'rgba(250, 252, 251, 0.95)',
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 20,
  },
  approvedText: {
    color: colors.gradientColorone,
    fontSize: 11,
    fontWeight: '700',
  },
  content: {
    paddingHorizontal:16,
    paddingBottom: 30,
  },
  headerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 4,
  },
  shopName: {
    fontSize: 20,
    fontWeight: '800',
    color: colors.headingBlackColor,
    flex: 1,
    marginRight: 12,
  },
  ratingBadge: {
    backgroundColor: '#00D084',
    paddingHorizontal: 12,
    paddingVertical: 2,
    borderRadius: 10,
    minWidth: 50,
    alignItems: 'center',
    marginTop: 4
  },
  rating: {
    fontSize: 16,
    fontWeight: '900',
    color: '#fff',
  },
  infoRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  city: {
    fontSize: 15,
    color: '#666',
    fontWeight: '600',
  },
  productsBadge: {
    backgroundColor: '#f8f9fa',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
    flexDirection: 'row',
    alignItems: 'center',
  },
  products: {
    fontSize: 14,
    fontWeight: '700',
    color: colors.headingBlackColor,
    marginRight: 4,
  },
  productsLabel: {
    fontSize: 12,
    color: '#666',
  },
  bottomGradient: {
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,

  },
  ctaText: {
    fontSize: 14,
    fontWeight: '700',
    color: '#00D084',
  },
});
