import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  Image,
  StyleSheet,
  Dimensions,
  ActivityIndicator,
  RefreshControl,
  Alert
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../Navigation/NavigationType';
import { useRoute } from '@react-navigation/native';
import  {ApiHelper} from '../../Services/ApiHelper'

import { useNavigation } from "@react-navigation/native";
import colors from '../../Asset/Colors/colors';
import { EmpCardView } from '../EmployeeDetails/empCardView';
const { width } = Dimensions.get('window');
const ITEM_WIDTH = (width - 48) / 2;

const ProductListScreen = () => {
  
  const navigation = useNavigation() as any;
  const route = useRoute();
  const { shopId } = route.params as { shopId: string };
   interface Product {
  id: string;
  productName: string;
  description: string;
  brand: string;
  unit: string;
  price: number;
  discount: number;
  category: string;
  quantity: number;
  imageUrl: string;
}
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
  try {
    console.log('🔍 Fetching products for shopId:', shopId);
    
    // ✅ FIX: Correct parameter order (endpoint first, then method)
    const response = await ApiHelper.makeApiCall(
      `/vendor/products/shop/${shopId}`, // endpoint first
      'GET',                              // method second  
      null                               // body third
    );

    console.log('📥 API Response:', response);

    if (response) {
      const productsData = Array.isArray(response) ? response : [];
      setProducts(productsData);
      console.log('✅ Products loaded:', productsData.length, 'items');
    }
  } catch (error) {
    console.error('Products fetch error:', error);
    Alert.alert('Error', 'Failed to fetch products');
  } finally {
    setLoading(false);
    setRefreshing(false);
  }
};




  const onRefresh = () => {
    setRefreshing(true);
    fetchProducts();
  };

  const calculateDiscountedPrice = (price: number, discount: number) => {
    return price - (price * discount / 100);
  };

  const renderProductCard = ({ item }: { item: Product }) => (
    <TouchableOpacity 
      style={styles.productCard}
      activeOpacity={0.7}
    >
      {/* Product card content */}
      <View style={styles.imageContainer}>
        <Image
          source={{ uri: item.imageUrl || 'https://via.placeholder.com/150' }}
          style={styles.productImage}
          resizeMode="cover"
        />
        {item.discount > 0 && (
          <View style={styles.discountBadge}>
            <Text style={styles.discountText}>{item.discount}% OFF</Text>
          </View>
        )}
      </View>
      
      <View style={styles.productInfo}>
        <Text style={styles.brandText}>{item.brand}</Text>
        <Text style={styles.productName} numberOfLines={2}>
          {item.productName}
        </Text>
        
        <View style={styles.priceContainer}>
          {item.discount > 0 ? (
            <>
              <Text style={styles.discountedPrice}>
                ₹{calculateDiscountedPrice(item.price, item.discount).toFixed(2)}
              </Text>
              <Text style={styles.originalPrice}>₹{item.price}</Text>
            </>
          ) : (
            <Text style={styles.price}>₹{item.price}</Text>
          )}
        </View>
        
        <View style={styles.bottomRow}>
          <Text style={styles.categoryText}>{item.category}</Text>
          <Text style={styles.stockText}>Stock: {item.quantity}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );

  const renderEmptyComponent = () => (
    <View style={styles.emptyContainer}>
      <Text style={styles.emptyText}>No products found</Text>
      <Text style={styles.emptySubText}>Add your first product to get started</Text>
    </View>
  );

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#007AFF" />
        <Text style={styles.loadingText}>Loading products...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>My Products</Text>
        <Text style={styles.productCount}>{products.length} items</Text>
      </View>

      <FlatList
        data={products}
        renderItem={renderProductCard}
        keyExtractor={(item) => item.id}
        numColumns={2}
        columnWrapperStyle={styles.row}
        contentContainerStyle={styles.listContent}
        showsVerticalScrollIndicator={false}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
        ListEmptyComponent={renderEmptyComponent} 

      />

      <TouchableOpacity
        style={styles.addButton}
        onPress={() => navigation.navigate("AddProductScreen",{shopId:shopId})}
        activeOpacity={0.8}
      >
        <Text style={styles.addButtonText}>+ Add Product</Text>
      </TouchableOpacity>
    </View>
  );
};


// ... styles remain the same

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f9fa',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 16,
    backgroundColor: '#ffffff',
    borderBottomWidth: 1,
    borderBottomColor: '#e9ecef',
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: '700',
    color: '#212529',
  },
  productCount: {
    fontSize: 14,
    color: '#6c757d',
    fontWeight: '500',
  },
  listContent: {
    padding: 16,
    paddingBottom: 100,
  },
  row: {
    justifyContent: 'space-between',
    marginBottom: 16,
  },
  productCard: {
    width: ITEM_WIDTH,
    backgroundColor: '#ffffff',
    borderRadius: 12,
    overflow: 'hidden',
  },
  imageContainer: {
    position: 'relative',
    width: '100%',
    height: 140,
    padding: 10,
    marginTop: 10,
  },
  productImage: {
    width: '100%',
    height: '100%',
  },
  discountBadge: {
    position: 'absolute',
    top: 8,
    right: 8,
    backgroundColor: colors.gradientColorTow,
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 4,
  },
  discountText: {
    color: '#ffffff',
    fontSize: 10,
    fontWeight: '600',
  },
  productInfo: {
    padding: 12,
  },
  brandText: {
    fontSize: 12,
    color: '#6c757d',
    fontWeight: '500',
    marginBottom: 4,
    textTransform: 'uppercase',
  },
  productName: {
    fontSize: 14,
    fontWeight: '600',
    color: '#212529',
    marginBottom: 8,
    lineHeight: 18,
  },
  priceContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  price: {
    fontSize: 16,
    fontWeight: '700',
    color: colors.gradientColorTow,
  },
  discountedPrice: {
    fontSize: 16,
    fontWeight: '700',
    color: colors.gradientColorTow,
    marginRight: 6,
  },
  originalPrice: {
    fontSize: 12,
    color: '#6c757d',
    textDecorationLine: 'line-through',
  },
  bottomRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  categoryText: {
    fontSize: 11,
    color: '#495057',
    backgroundColor: '#e9ecef',
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 4,
    fontWeight: '500',
  },
  stockText: {
    fontSize: 11,
    color: '#28a745',
    fontWeight: '500',
  },
  addButton: {
    position: 'absolute',
    bottom: 20,
    left: 16,
    right: 16,
    backgroundColor: '#007AFF',
    paddingVertical: 16,
    borderRadius: 12,
    alignItems: 'center',
    shadowColor: '#007AFF',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 5,
  },
  addButtonText: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: '600',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f8f9fa',
  },
  loadingText: {
    marginTop: 12,
    fontSize: 16,
    color: '#6c757d',
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: 60,
  },
  emptyText: {
    fontSize: 18,
    fontWeight: '600',
    color: '#495057',
    marginBottom: 8,
  },
  emptySubText: {
    fontSize: 14,
    color: '#6c757d',
    textAlign: 'center',
  },
});


export default ProductListScreen;