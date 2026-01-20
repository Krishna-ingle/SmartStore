import { ApiHelper } from '../../Services/ApiHelper';

export interface Shop {
  id: string;
  vendorId: string;
  shopName: string;
  shopAddress: string;
  shopType: string;
  contactNumber: string;
  description?: string;
  gstNumber?: string;
  latitude?: number;
  longitude?: number;
  isActive?: boolean;
  createdAt?: string;
  updatedAt?: string;
}

export interface ShopListResponse {
  success: boolean;
  message: string;
  shops?: Shop[];
  totalShops?: number;
}

export class ShopServices {
  // Get all shops for current vendor
  static async getAllShops(): Promise<Shop[] | null> {
    try {
      console.log('📋 Fetching all shops...');
      
      const response = await ApiHelper.makeApiCall('/vendor/shops', 'GET');
      
      if (response && response.success) {
        console.log('✅ Shops fetched successfully:', response.shops?.length || 0);
        return response.shops || [];
      } else if (response && Array.isArray(response)) {
        // In case backend returns array directly
        console.log('✅ Shops array received:', response.length);
        return response;
      } else {
        console.log('❌ Failed to fetch shops:', response?.message);
        return [];
      }
    } catch (error) {
      console.error('❌ Error fetching shops:', error);
      return null;
    }
  }

  // Get single shop by ID
  static async getShopById(shopId: string): Promise<Shop | null> {
    try {
      console.log('📋 Fetching shop by ID:', shopId);
      
      const response = await ApiHelper.makeApiCall(`/vendor/shops/${shopId}`, 'GET');
      
      if (response && response.success) {
        return response.shop;
      }
      return null;
    } catch (error) {
      console.error('❌ Error fetching shop:', error);
      return null;
    }
  }

  // Update shop
  static async updateShop(shopId: string, shopData: Partial<Shop>): Promise<boolean> {
    try {
      console.log('📝 Updating shop:', shopId);
      
      const response = await ApiHelper.makeApiCall(`/vendor/shops/${shopId}`, 'PUT', shopData);
      
      return response && (response.success || response.message?.includes('updated'));
    } catch (error) {
      console.error('❌ Error updating shop:', error);
      return false;
    }
  }

  // Delete shop
  static async deleteShop(shopId: string): Promise<boolean> {
    try {
      console.log('🗑️ Deleting shop:', shopId);
      
      const response = await ApiHelper.makeApiCall(`/vendor/shops/${shopId}`, 'DELETE');
      
      return response && (response.success || response.message?.includes('deleted'));
    } catch (error) {
      console.error('❌ Error deleting shop:', error);
      return false;
    }
  }
}
