import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
  Alert,
} from 'react-native';
import { 
  Store, 
  MapPin, 
  Phone, 
  Edit3, 
  Trash2, 
  MoreVertical,
  Clock,
  CheckCircle
} from 'lucide-react-native';
import { Shop } from './showshopApiCall';
// import { Shop } from '../Services/ShopServices';

const { width } = Dimensions.get('window');
const CARD_WIDTH = width - 32; // 16px margin on each side

interface ShopCardProps {
  shop: Shop;
  onEdit: (shop: Shop) => void;
  onDelete: (shopId: string) => void;
  onPress: (shop: Shop) => void;
}

const ShopCard: React.FC<ShopCardProps> = ({ shop, onEdit, onDelete, onPress }) => {
  
  const handleDelete = () => {
    Alert.alert(
      'Delete Shop',
      `Are you sure you want to delete "${shop.shopName}"?`,
      [
        { text: 'Cancel', style: 'cancel' },
        { 
          text: 'Delete', 
          style: 'destructive',
          onPress: () => onDelete(shop.id)
        }
      ]
    );
  };

  const formatDate = (dateString?: string) => {
    if (!dateString) return '';
    return new Date(dateString).toLocaleDateString('en-IN', {
      day: '2-digit',
      month: 'short',
      year: 'numeric'
    });
  };

  return (
    <TouchableOpacity style={styles.card} onPress={() => onPress(shop)}>
      {/* Header */}
      <View style={styles.header}>
        <View style={styles.headerLeft}>
          <View style={styles.iconContainer}>
            <Store color="#4CAF50" size={20} />
          </View>
          <View style={styles.headerInfo}>
            <Text style={styles.shopName} numberOfLines={1}>
              {shop.shopName}
            </Text>
            <Text style={styles.shopType}>{shop.shopType}</Text>
          </View>
        </View>
        
        <View style={styles.headerRight}>
          {shop.isActive !== false && (
            <View style={styles.activeIndicator}>
              <CheckCircle color="#4CAF50" size={16} />
            </View>
          )}
          <TouchableOpacity style={styles.menuButton}>
            <MoreVertical color="#666" size={18} />
          </TouchableOpacity>
        </View>
      </View>

      {/* Address */}
      <View style={styles.addressContainer}>
        <MapPin color="#666" size={16} />
        <Text style={styles.address} numberOfLines={2}>
          {shop.shopAddress}
        </Text>
      </View>

      {/* Contact */}
      <View style={styles.contactContainer}>
        <Phone color="#666" size={16} />
        <Text style={styles.contact}>{shop.contactNumber}</Text>
      </View>

      {/* Description */}
      {shop.description && (
        <Text style={styles.description} numberOfLines={2}>
          {shop.description}
        </Text>
      )}

      {/* Footer */}
      <View style={styles.footer}>
        <View style={styles.footerLeft}>
          <Clock color="#999" size={14} />
          <Text style={styles.dateText}>
            Created {formatDate(shop.createdAt)}
          </Text>
        </View>
        
        <View style={styles.footerRight}>
          <TouchableOpacity 
            style={styles.actionButton} 
            onPress={() => onEdit(shop)}
          >
            <Edit3 color="#4CAF50" size={18} />
          </TouchableOpacity>
          
          <TouchableOpacity 
            style={[styles.actionButton, { marginLeft: 12 }]} 
            onPress={handleDelete}
          >
            <Trash2 color="#FF5252" size={18} />
          </TouchableOpacity>
        </View>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  card: {
    width: CARD_WIDTH,
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 20,
    marginHorizontal: 16,
    marginVertical: 8,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 6,
    borderWidth: 1,
    borderColor: '#F0F0F0',
  },
  
  // Header Styles
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 16,
  },
  headerLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  iconContainer: {
    width: 44,
    height: 44,
    borderRadius: 12,
    backgroundColor: '#E8F5E8',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  headerInfo: {
    flex: 1,
  },
  shopName: {
    fontSize: 18,
    fontWeight: '700',
    color: '#1A1A1A',
    marginBottom: 2,
  },
  shopType: {
    fontSize: 14,
    color: '#4CAF50',
    fontWeight: '600',
  },
  headerRight: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  activeIndicator: {
    marginRight: 8,
  },
  menuButton: {
    padding: 4,
  },
  
  // Content Styles
  addressContainer: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: 12,
  },
  address: {
    fontSize: 15,
    color: '#555',
    marginLeft: 8,
    flex: 1,
    lineHeight: 20,
  },
  contactContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  contact: {
    fontSize: 15,
    color: '#333',
    marginLeft: 8,
    fontWeight: '500',
  },
  description: {
    fontSize: 14,
    color: '#666',
    lineHeight: 18,
    marginBottom: 16,
    fontStyle: 'italic',
  },
  
  // Footer Styles
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingTop: 16,
    borderTopWidth: 1,
    borderTopColor: '#F5F5F5',
  },
  footerLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  dateText: {
    fontSize: 12,
    color: '#999',
    marginLeft: 6,
  },
  footerRight: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  actionButton: {
    padding: 8,
    borderRadius: 8,
    backgroundColor: '#F8F8F8',
  },
});

export default ShopCard;
