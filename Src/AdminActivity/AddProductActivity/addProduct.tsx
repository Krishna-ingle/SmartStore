import React, { useState } from 'react';
import {
  SafeAreaView,
  ScrollView,
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Alert,
  ActivityIndicator,
  Image,
} from 'react-native';
import ImagePicker from 'react-native-image-crop-picker';
import LinearGradient from 'react-native-linear-gradient';
import InputText from '../../UIComponent/inputText';
import { useNavigation } from '@react-navigation/native';
import { ApiHelper } from '../../Services/ApiHelper';
import { uploadImageToCloudinary } from '../../Utils/cloudinaryUpload';
import { useRoute } from '@react-navigation/native';
const AddProductScreen = () => {
  const navigation = useNavigation() as any;
  const route = useRoute();
  const { shopId } = route.params as { shopId: string };
    
  // Form states
  const [productName, setProductName] = useState('');
  const [description, setDescription] = useState('');
  const [brand, setBrand] = useState('');
  const [unit, setUnit] = useState('');
  const [price, setPrice] = useState('');
  const [discount, setDiscount] = useState('');
  const [category, setCategory] = useState('');
  const [quantity, setQuantity] = useState('');
  
  // Image states
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [imageUrl, setImageUrl] = useState(''); // Cloudinary URL
  const [uploading, setUploading] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  // Categories
  const [showCategoryPicker, setShowCategoryPicker] = useState(false);
  const categories = [
    'Food & Beverages',
    'Dairy Products',
    'Fruits & Vegetables',
    'Packaged Foods',
    'Beverages',
    'Snacks',
    'Personal Care',
    'Household Items',
  ];

  // AUTO-UPLOAD: Select image and upload immediately
  const handleImagePick = async () => {
    try {
      const image = await ImagePicker.openPicker({
        width: 800,
        height: 800,
        cropping: true,
        mediaType: 'photo',
        cropperCircleOverlay: false,
      });

      console.log('📷 Image selected:', image.path);
      setSelectedImage(image.path); // Show preview
      
      // Automatically upload to Cloudinary
      setUploading(true);
      
      try {
        const cloudinaryUrl = await uploadImageToCloudinary(image.path);
        setImageUrl(cloudinaryUrl);
        console.log('✅ Cloudinary URL:', cloudinaryUrl);
        Alert.alert('Success!', 'Image uploaded to cloud');
      } catch (uploadError) {
        console.error('Upload failed:', uploadError);
        Alert.alert('Failed', 'Could not upload to cloud');
        setSelectedImage(null);
      } finally {
        setUploading(false);
      }
      
    } catch (error: any) {
      if (error.code !== 'E_PICKER_CANCELLED') {
        Alert.alert('Error', 'Could not open gallery');
      }
    }
  };

  // Validate form
  const validateForm = () => {
    if (!productName.trim()) {
      Alert.alert('Error', 'Product name is required');
      return false;
    }
    if (!price.trim() || isNaN(Number(price))) {
      Alert.alert('Error', 'Valid price is required');
      return false;
    }
    if (!quantity.trim() || isNaN(Number(quantity))) {
      Alert.alert('Error', 'Valid quantity is required');
      return false;
    }
    if (!category) {
      Alert.alert('Error', 'Please select a category');
      return false;
    }
    if (!imageUrl) {
      Alert.alert('Error', 'Please upload product image');
      return false;
    }
    return true;
  };

  // Save product with Cloudinary URL
  const handleSaveProduct = async () => {
    if (!validateForm()) return;

    setIsLoading(true);
    try {
      const productData = {
        productName: productName.trim(),
        description: description.trim(),
        brand: brand.trim(),
        unit: unit.trim(),
        price: parseFloat(price),
        discount: discount ? parseFloat(discount) : 0,
        category: category,
        quantity: parseInt(quantity),
        imageUrl: imageUrl, // Cloudinary URL saved to MongoDB
      };

      console.log('📤 Saving product with Cloudinary URL:', imageUrl);

      const result = await ApiHelper.makeApiCall(
        `/vendor/products/shop/${shopId}`,
        'POST',
        productData
      );

      if (result) {
        Alert.alert('Success!', 'Product added successfully', [
          { text: 'Done', onPress: () => navigation.goBack() }
        ]);
      }
    } catch (error) {
      Alert.alert('Error', 'Could not add product');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <LinearGradient
        colors={['#4facfe', '#00f2fe']}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 0 }}
        style={styles.header}
      >
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Text style={styles.backIcon}>←</Text>
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Add Product</Text>
        <View style={{ width: 24 }} />
      </LinearGradient>

      <ScrollView style={styles.scroll} showsVerticalScrollIndicator={false}>
        {/* Image Section - Auto Upload */}
        <View style={styles.section}>
          <Text style={styles.label}>Product Image *</Text>
          
          <TouchableOpacity 
            style={styles.imageBox}
            onPress={handleImagePick}
            disabled={uploading}
          >
            {uploading ? (
              <View style={styles.uploadingBox}>
                <ActivityIndicator size="large" color="#00c851" />
                <Text style={styles.uploadingText}>Uploading to cloud...</Text>
              </View>
            ) : selectedImage ? (
              <Image 
                source={{ uri: selectedImage }} 
                style={styles.image}
              />
            ) : (
              <View style={styles.imagePlaceholder}>
                <Text style={styles.cameraIcon}>📷</Text>
                <Text style={styles.imagePlaceholderText}>
                  Tap to select & upload
                </Text>
              </View>
            )}
          </TouchableOpacity>

          {imageUrl && (
            <View style={styles.successBox}>
              <Text style={styles.successText}>✅ Uploaded to Cloudinary</Text>
              <Text style={styles.urlPreview} numberOfLines={1}>
                {imageUrl}
              </Text>
            </View>
          )}
        </View> 

        {/* Product Info */}
        <View style={styles.section}>
          <Text style={styles.label}>Product Name *</Text>
          <InputText
            value={productName}
            onChangeText={setProductName}
            placeholder="Enter product name"
            secureTextEntry={false}
          />
        </View>

        <View style={styles.section}>
          <Text style={styles.label}>Description</Text>
          <InputText
            value={description}
            onChangeText={setDescription}
            placeholder="Product description"
            secureTextEntry={false}
            multiline={true}
          />
        </View>

        <View style={styles.row}>
          <View style={styles.halfWidth}>
            <Text style={styles.label}>Brand</Text>
            <InputText
              value={brand}
              onChangeText={setBrand}
              placeholder="Brand"
              secureTextEntry={false}
            />
          </View>
          
          <View style={styles.halfWidth}>
            <Text style={styles.label}>Unit</Text>
            <InputText
              value={unit}
              onChangeText={setUnit}
              placeholder="500g, 1L"
              secureTextEntry={false}
            />
          </View>
        </View>

        <View style={styles.row}>
          <View style={styles.halfWidth}>
            <Text style={styles.label}>Price (₹) *</Text>
            <InputText
              value={price}
              onChangeText={setPrice}
              placeholder="299"
              secureTextEntry={false}
              keyboardType="numeric"
            />
          </View>
          
          <View style={styles.halfWidth}>
            <Text style={styles.label}>Discount (%)</Text>
            <InputText
              value={discount}
              onChangeText={setDiscount}
              placeholder="10"
              secureTextEntry={false}
              keyboardType="numeric"
            />
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.label}>Quantity *</Text>
          <InputText
            value={quantity}
            onChangeText={setQuantity}
            placeholder="Stock quantity"
            secureTextEntry={false}
            keyboardType="numeric"
          />
        </View>

        <View style={styles.section}>
          <Text style={styles.label}>Category *</Text>
          <TouchableOpacity 
            style={styles.categoryBtn}
            onPress={() => setShowCategoryPicker(true)}
          >
            <Text style={category ? styles.categoryText : styles.categoryPlaceholder}>
              {category || 'Select category'}
            </Text>
            <Text>▼</Text>
          </TouchableOpacity>
        </View>

        <View style={{ height: 100 }} />
      </ScrollView>

      {/* Save Button */}
      <View style={styles.footer}>
        <TouchableOpacity 
          style={[styles.saveBtn, isLoading && styles.saveBtnDisabled]}
          onPress={handleSaveProduct}
          disabled={isLoading}
        >
          <LinearGradient
            colors={isLoading ? ['#ccc', '#aaa'] : ['#00c851', '#00ff88']}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 0 }}
            style={styles.saveBtnGradient}
          >
            {isLoading ? (
              <ActivityIndicator color="#fff" />
            ) : (
              <Text style={styles.saveBtnText}>Add Product</Text>
            )}
          </LinearGradient>
        </TouchableOpacity>
      </View>

      {/* Category Modal */}
      {showCategoryPicker && (
        <View style={styles.modalOverlay}>
          <View style={styles.modal}>
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle}>Select Category</Text>
              <TouchableOpacity onPress={() => setShowCategoryPicker(false)}>
                <Text style={styles.modalClose}>✕</Text>
              </TouchableOpacity>
            </View>
            <ScrollView>
              {categories.map((cat, index) => (
                <TouchableOpacity
                  key={index}
                  style={styles.categoryItem}
                  onPress={() => {
                    setCategory(cat);
                    setShowCategoryPicker(false);
                  }}
                >
                  <Text style={styles.categoryItemText}>{cat}</Text>
                  {category === cat && <Text>✓</Text>}
                </TouchableOpacity>
              ))}
            </ScrollView>
          </View>
        </View>
      )}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingVertical: 15,
    paddingTop: 40,
  },
  backIcon: {
    fontSize: 24,
    color: '#fff',
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: '#fff',
  },
  scroll: {
    flex: 1,
    paddingHorizontal: 20,
  },
  section: {
    marginTop: 20,
  },
  label: {
    fontSize: 14,
    fontWeight: '600',
    color: '#333',
    marginBottom: 8,
  },
  imageBox: {
    width: '100%',
    height: 200,
    borderRadius: 12,
    borderWidth: 2,
    borderColor: '#00c851',
    borderStyle: 'dashed',
    overflow: 'hidden',
    backgroundColor: '#f0fff4',
  },
  image: {
    width: '100%',
    height: '100%',
  },
  imagePlaceholder: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  cameraIcon: {
    fontSize: 48,
    marginBottom: 8,
  },
  imagePlaceholderText: {
    fontSize: 14,
    color: '#666',
  },
  uploadingBox: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  uploadingText: {
    marginTop: 12,
    fontSize: 14,
    color: '#00c851',
    fontWeight: '600',
  },
  successBox: {
    backgroundColor: '#d1f2eb',
    borderRadius: 8,
    padding: 12,
    marginTop: 12,
  },
  successText: {
    color: '#00c851',
    fontWeight: '600',
    marginBottom: 4,
  },
  urlPreview: {
    fontSize: 12,
    color: '#666',
  },
  row: {
    flexDirection: 'row',
    gap: 12,
    marginTop: 20,
  },
  halfWidth: {
    flex: 1,
  },
  categoryBtn: {
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    paddingHorizontal: 16,
    paddingVertical: 16,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  categoryText: {
    fontSize: 16,
    color: '#333',
  },
  categoryPlaceholder: {
    fontSize: 16,
    color: '#999',
  },
  footer: {
    backgroundColor: '#fff',
    paddingHorizontal: 20,
    paddingVertical: 16,
    borderTopWidth: 1,
    borderTopColor: '#eee',
  },
  saveBtn: {
    borderRadius: 12,
    overflow: 'hidden',
  },
  saveBtnDisabled: {
    opacity: 0.6,
  },
  saveBtnGradient: {
    paddingVertical: 16,
    alignItems: 'center',
  },
  saveBtnText: {
    fontSize: 18,
    fontWeight: '700',
    color: '#fff',
  },
  modalOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modal: {
    backgroundColor: '#fff',
    borderRadius: 16,
    width: '85%',
    maxHeight: '60%',
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: '700',
  },
  modalClose: {
    fontSize: 24,
    color: '#666',
  },
  categoryItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#f5f5f5',
  },
  categoryItemText: {
    fontSize: 16,
  },
});

export default AddProductScreen;
