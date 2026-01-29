import React, { useState,useEffect } from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
} from 'react-native';
import colors from '../../../Asset/Colors/colors';
import { AlignRight, MoveRight, Star, StarIcon, Verified } from 'lucide-react-native';
import { background } from '@cloudinary/url-gen/qualifiers/focusOn';

const { width } = Dimensions.get('window');

interface TopShopCardProps {
  shopId: string;
  shopName: string;
  city: string;
  rating: number;
  openingTime: string;
  closingTime: string;
  totalProducts: number;
  isApproved: boolean;
  bannerUrl?: string;
  onPress?: () => void;
}

export const TopShopCard = ({
  shopName,
  city,
  rating,
  openingTime,
  closingTime,
  totalProducts,
  isApproved,
  bannerUrl,
  onPress,
}: TopShopCardProps) => {



  
  const [isOpenNow, setIsOpenNow] = useState(false);
  useEffect(() => {
    const checkShopStatus = () => {
      if (!openingTime || !closingTime) {
        setIsOpenNow(false);
        return;
      }

      // Get current time in 24hr format (HH:MM)
      const now = new Date();
      const currentTime = `${now.getHours().toString().padStart(2, '0')}:${now.getMinutes().toString().padStart(2, '0')}`;
      
      // Convert times to minutes for comparison
      const [openH, openM] = openingTime.split(':').map(Number);
      const [closeH, closeM] = closingTime.split(':').map(Number);
      const [nowH, nowM] = currentTime.split(':').map(Number);
      
      const openMinutes = openH * 60 + openM;
      const closeMinutes = closeH * 60 + closeM;
      const currentMinutes = nowH * 60 + nowM;
      
      // ✅ Shop is OPEN if current time is BETWEEN open and close
      setIsOpenNow(currentMinutes >= openMinutes && currentMinutes <= closeMinutes);
    };
     // Check every minute
    const interval = setInterval(checkShopStatus, 60000);
    checkShopStatus(); // Check immediately

    return () => clearInterval(interval);
  }, [openingTime, closingTime]);
  return (
    <TouchableOpacity style={styles.card} onPress={onPress} activeOpacity={0.9}>
      {/* Banner Image */}
      <Image
        source={
          bannerUrl 
            ? { uri: bannerUrl }
            : require('../../../Asset/Icon/Images/MilkShopImg.png')
        }
        style={styles.bannerImage}
        resizeMode="cover"
      />

      {/* Gradient Overlay on Image */}
      <View style={styles.imageOverlay} />

      {/* Approved Badge */}
      
        <View style={styles.approvedBadge}>
          {isOpenNow ? (
        <View style={styles.openBadge}>
          <Text style={styles.openText}>Open</Text>
        </View>
      ) : (
        <View style={styles.closedBadge}>
          <Text style={styles.closedText}>Closed</Text>
        </View>
      )}
        </View>

      {/* Content */}
      <View style={styles.content}>
        {/* Shop Name & Rating Row */}
        <View style={styles.headerRow}>
          <Text style={styles.shopName} numberOfLines={1}>
            {shopName}
            {
              isApproved && <Verified size={18} color={colors.white} 
              style={{marginLeft:4,backgroundColor:colors.gradientColorone,borderRadius:20,padding:10}} fill={colors.gradientColorone} />
            }
            </Text>
          <View style={styles.ratingBadge}>
            <Text style={styles.rating}>{rating.toFixed(1)}</Text>
          </View>
        </View>

        {/* Location & Products */}
        <View style={styles.infoRow}>
          <Text style={styles.city}>{city}</Text>
          <Text style={styles.time}>{openingTime} - {closingTime}</Text>
          
        </View>

        {/* Bottom gradient & CTA */}
        <View style={styles.bottomGradient}>
          <Text style={styles.ctaText}>{totalProducts} items Ready for you..</Text>
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
    backgroundColor: "#00000",
    paddingHorizontal: 12,
    paddingVertical: 1,
    borderRadius: 8,
    minWidth: 50,
    alignItems: 'center',
    marginTop: 4
  },
  rating: {
    fontSize: 16,
    fontWeight: '900',
    color: colors.white,
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
  time: {
    fontSize: 13,
    color: '#666',
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
    color: colors.gradientColorone,
  },

  openBadge: {
  position: 'absolute',
  top: 12,
  left: 12,
  backgroundColor: 'rgba(0,200,83,0.95)',
  paddingHorizontal: 12,
  paddingVertical: 6,
  borderRadius: 20,
},
closedBadge: {
  position: 'absolute',
  top: 12,
  left: 12,
  backgroundColor: 'rgba(220,53,69,0.95)',
  paddingHorizontal: 12,
  paddingVertical: 6,
  borderRadius: 20,
},
openText: { color: '#fff', fontSize: 12, fontWeight: '700' },
closedText: { color: '#fff', fontSize: 12, fontWeight: '700' },

});
