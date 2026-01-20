import React, { useState, useEffect, useCallback } from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  SafeAreaView,
  RefreshControl,
  ActivityIndicator,
  TouchableOpacity,
  Alert,
} from 'react-native';
import { Plus, Search, Filter } from 'lucide-react-native';
import { useFocusEffect } from '@react-navigation/native';
import { ShopServices, Shop } from './showshopApiCall';
import ShopCard from './showAllShopsScreeen';

// for redux
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../Redux/Store";
import {setShopId , setShopDetails} from "../../Redux/Slices/shopSlice";

interface ShopListScreenProps {
  navigation: any;
}

const ShopListScreen: React.FC<ShopListScreenProps> = ({ navigation }) => {
  const [shops, setShops] = useState<Shop[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isRefreshing, setIsRefreshing] = useState(false);

  const dispathch = useDispatch();
  // Load shops when screen focuses
  useFocusEffect(
    useCallback(() => {
      loadShops();
    }, [])
  );

  const loadShops = async () => {
    try {
      setIsLoading(true);
      const shopsData = await ShopServices.getAllShops();
      
      if (shopsData) {
        setShops(shopsData);
        console.log('✅ Loaded', shopsData.length, 'shops');
      } else {
        setShops([]);
      }
    } catch (error) {
      console.error('❌ Error loading shops:', error);
      Alert.alert('Error', 'Failed to load shops. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleRefresh = async () => {
    setIsRefreshing(true);
    await loadShops();
    setIsRefreshing(false);
  };

  const handleShopPress = (shop: Shop) => {
    // Navigate to shop details
    console.log(shop.id); 
    dispathch(setShopId(shop.id));
    dispathch(setShopDetails(shop));
    console.log(shop);
    
    navigation.navigate('MainHomePage');
  };

  const handleEditShop = (shop: Shop) => {
    // Navigate to edit shop
    navigation.navigate('EditShop', { shop });
  };

  const handleDeleteShop = async (shopId: string) => {
    try {
      const success = await ShopServices.deleteShop(shopId);
      
      if (success) {
        Alert.alert('Success', 'Shop deleted successfully');
        // Remove from local state
        setShops(shops.filter(shop => shop.id !== shopId));
      } else {
        Alert.alert('Error', 'Failed to delete shop');
      }
    } catch (error) {
      Alert.alert('Error', 'Failed to delete shop');
    }
  };

  const renderShopCard = ({ item }: { item: Shop }) => (
    <ShopCard
      shop={item}
      onPress={handleShopPress}
      onEdit={handleEditShop}
      onDelete={handleDeleteShop}
    />
  );

  const renderEmptyState = () => (
    <View style={styles.emptyState}>
      <View style={styles.emptyIconContainer}>
        <Plus color="#CCC" size={48} />
      </View>
      <Text style={styles.emptyTitle}>No Shops Yet</Text>
      <Text style={styles.emptySubtitle}>
        Create your first shop to get started
      </Text>
      <TouchableOpacity
        style={styles.addFirstShopButton}
        onPress={() => navigation.navigate('AddShopDetails')}
      >
        <Plus color="#FFF" size={20} />
        <Text style={styles.addFirstShopText}>Add Your First Shop</Text>
      </TouchableOpacity>
    </View>
  );

  const renderHeader = () => (
    <View style={styles.header}>
      <View style={styles.headerTop}>
        <Text style={styles.title}>My Shops</Text>
        <View style={styles.headerActions}>
          <TouchableOpacity style={styles.headerButton}>
            <Search color="#666" size={24} />
          </TouchableOpacity>
          <TouchableOpacity style={styles.headerButton}>
            <Filter color="#666" size={24} />
          </TouchableOpacity>
        </View>
      </View>
      
      <View style={styles.statsContainer}>
        <Text style={styles.statsText}>
          {shops.length} {shops.length === 1 ? 'Shop' : 'Shops'}
        </Text>
        <TouchableOpacity
          style={styles.addButton}
          onPress={() => navigation.navigate('AddShopDetails')}
        >
          <Plus color="#FFF" size={20} />
          <Text style={styles.addButtonText}>Add Shop</Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  if (isLoading) {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color="#4CAF50" />
          <Text style={styles.loadingText}>Loading your shops...</Text>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        data={shops}
        renderItem={renderShopCard}
        keyExtractor={(item) => item.id}
        ListHeaderComponent={renderHeader}
        ListEmptyComponent={renderEmptyState}
        refreshControl={
          <RefreshControl
            refreshing={isRefreshing}
            onRefresh={handleRefresh}
            colors={['#4CAF50']}
            tintColor="#4CAF50"
          />
        }
        showsVerticalScrollIndicator={false}
        contentContainerStyle={shops.length === 0 ? styles.emptyContainer : undefined}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8F9FA',
  },
  
  // Loading Styles
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingText: {
    marginTop: 16,
    fontSize: 16,
    color: '#666',
  },
  
  // Header Styles
  header: {
    backgroundColor: '#FFF',
    paddingTop: 20,
    paddingBottom: 16,
    paddingHorizontal: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#F0F0F0',
  },
  headerTop: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  title: {
    fontSize: 28,
    fontWeight: '700',
    color: '#1A1A1A',
  },
  headerActions: {
    flexDirection: 'row',
  },
  headerButton: {
    padding: 8,
    marginLeft: 8,
    borderRadius: 8,
    backgroundColor: '#F5F5F5',
  },
  statsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  statsText: {
    fontSize: 16,
    color: '#666',
    fontWeight: '500',
  },
  addButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#4CAF50',
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 12,
  },
  addButtonText: {
    color: '#FFF',
    fontSize: 15,
    fontWeight: '600',
    marginLeft: 6,
  },
  
  // Empty State Styles
  emptyContainer: {
    flexGrow: 1,
  },
  emptyState: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 40,
  },
  emptyIconContainer: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: '#F5F5F5',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 24,
  },
  emptyTitle: {
    fontSize: 24,
    fontWeight: '600',
    color: '#1A1A1A',
    marginBottom: 8,
  },
  emptySubtitle: {
    fontSize: 16,
    color: '#666',
    textAlign: 'center',
    lineHeight: 22,
    marginBottom: 32,
  },
  addFirstShopButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#4CAF50',
    paddingHorizontal: 24,
    paddingVertical: 14,
    borderRadius: 12,
  },
  addFirstShopText: {
    color: '#FFF',
    fontSize: 16,
    fontWeight: '600',
    marginLeft: 8,
  },
});

export default ShopListScreen;
