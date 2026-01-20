// components/CustomShareMenu.tsx
import React, { useState } from 'react';
import { 
  View, 
  Text, 
  TouchableOpacity, 
  Modal, 
  StyleSheet, 
  Share,
  Linking,
  Alert
} from 'react-native';
import { 
  MoreVertical, 
  Share2, 
  Copy, 
  MessageCircle, 
  Mail,
  Download,
  Star,
  Plus,
  Home,
  MemoryStick,
  Contact,
  Contact2,
  User,
  Receipt,
  File
} from 'lucide-react-native';
import colors from '../../../Asset/Colors/colors';
import { useNavigation } from '@react-navigation/native';

export const CustomShareMenu = ({ iconColor = colors.gradientColorTow }: { navigation: any, iconColor?: string }) => {
  const [showMenu, setShowMenu] = useState(false);
  const navigation = useNavigation() as any;
  const shareOptions = [
    {
      id: 'native_share',
      title: 'Share App',
      subtitle: 'Share via apps',
      icon: Share2,
      color: '#22c55e',
      onPress: handleNativeShare
    },
    {
      id: 'copy_link',
      title: 'My Profile',
      subtitle: 'Show your details',
      icon: User,
      color: '#6366f1',
      onPress: () => handleMyProfile()
    },
    {
      id: 'whatsapp',
      title: 'Add Shop',
      subtitle: 'click to add shop',
      icon: Plus,
      color: '#25d366',
      onPress: () => addShops()
    },
    {
      id: 'email',
      title: 'Your Shops',
      subtitle: 'show all shops',
      icon: Home,
      color: '#ea4335',
      onPress: () => allShops()
    },
    {
      id: 'rate_app',
      title: 'Rate App',
      subtitle: 'Rate on Play Store',
      icon: Star,
      color: '#f59e0b',
      onPress: () => handleRateApp()
    },
    {
      id: 'download',
      title: 'Term & Condition',
      subtitle: 'Show term and policy',
      icon: File,
      color: '#8b5cf6',
      onPress: () => handleDownload()
    }
  ];

  async function handleNativeShare() {
    try {
      await Share.share({
        message: 'Check out this amazing Smart Store app! Download now: https://play.google.com/store/apps/smartstore',
        title: 'Smart Store App'
      });
      setShowMenu(false);
    } catch (error) {
      Alert.alert('Error', 'Could not share');
    }
  }

  function addShops() {
    navigation.navigate('AddShopDetailsScreen');
  }
  

  function allShops() {
    navigation.navigate('ShopListScreen');
  }

  function handleMyProfile() {
    // You can use Clipboard API here
    navigation.navigate('AdminProfileScreen');
    setShowMenu(false);
  }

  function handleRateApp() {
    const playStoreUrl = 'https://play.google.com/store/apps/details?id=com.yourapp';
    Linking.openURL(playStoreUrl);
    setShowMenu(false);
  }

  function handleDownload() {
    Alert.alert('Download', 'Feature coming soon!');
    setShowMenu(false);
  }

  const toggleMenu = () => {
    setShowMenu(!showMenu);
  };

  return (
    <View style={styles.container}>
      {/* Three Dots Button */}
      <TouchableOpacity
        onPress={toggleMenu}
        style={styles.menuButton}
        activeOpacity={0.7}
      >
        <MoreVertical size={24} color={iconColor} strokeWidth={2} />
      </TouchableOpacity>

      {/* Custom Dropdown Modal - Partial Screen */}
      <Modal
        visible={showMenu}
        transparent={true}
        animationType="fade"
        onRequestClose={() => setShowMenu(false)}
      >
        {/* Semi-transparent background */}
        <TouchableOpacity
          style={styles.modalOverlay}
          activeOpacity={1}
          onPress={() => setShowMenu(false)}
        >
          {/* Dropdown Container - Positioned near button */}
          <View style={styles.dropdownContainer}>
            {/* Header */}
            <View style={styles.headerSection}>
              <Text style={styles.headerTitle}>Share & More</Text>
              <Text style={styles.headerSubtitle}>Choose an option</Text>
            </View>

            {/* Share Options Cards */}
            <View style={styles.cardsContainer}>
              {shareOptions.map((option) => (
                <TouchableOpacity
                  key={option.id}
                  style={[styles.shareCard, { borderLeftColor: option.color }]}
                  onPress={option.onPress}
                  activeOpacity={0.8}
                >
                  <View style={[styles.iconContainer, { backgroundColor: `${option.color}15` }]}>
                    <option.icon size={20} color={option.color} strokeWidth={2} />
                  </View>
                  <View style={styles.cardTextContainer}>
                    <Text style={styles.cardTitle}>{option.title}</Text>
                    <Text style={styles.cardSubtitle}>{option.subtitle}</Text>
                  </View>
                </TouchableOpacity>
              ))}
            </View>

            {/* Close Button */}
            <TouchableOpacity
              style={styles.closeButton}
              onPress={() => setShowMenu(false)}
              activeOpacity={0.8}
            >
              <Text style={styles.closeButtonText}>Close</Text>
            </TouchableOpacity>
          </View>
        </TouchableOpacity>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'relative',
  },
  menuButton: {
    paddingHorizontal: 15,
    paddingVertical: 8,
    borderRadius: 20,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.4)',
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    paddingTop: 60, // Adjust based on header height
    paddingLeft: 15,
  },
  dropdownContainer: {
    backgroundColor: '#ffffff',
    borderRadius: 16,
    paddingVertical: 20,
    paddingHorizontal: 15,
    minWidth: 280,
    maxWidth: 320,
    elevation: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.25,
    shadowRadius: 12,
  },
  headerSection: {
    marginBottom: 20,
    paddingBottom: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#f1f5f9',
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#1f2937',
    marginBottom: 4,
  },
  headerSubtitle: {
    fontSize: 14,
    color: '#6b7280',
  },
  cardsContainer: {
    marginBottom: 15,
  },
  shareCard: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    paddingHorizontal: 15,
    marginVertical: 4,
    backgroundColor: '#f8fafc',
    borderRadius: 12,
    borderLeftWidth: 4,
  },
  iconContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  cardTextContainer: {
    flex: 1,
  },
  cardTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#374151',
    marginBottom: 2,
  },
  cardSubtitle: {
    fontSize: 13,
    color: '#6b7280',
  },
  closeButton: {
    backgroundColor: '#f3f4f6',
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 10,
  },
  closeButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#374151',
  },
});
