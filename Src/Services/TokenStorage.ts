// services/TokenStorage.ts
import EncryptedStorage from 'react-native-encrypted-storage';

export class TokenStorage {
  
  // In your Services/TokenStorage.ts - ADD this method:
static async saveVendorId(vendorId: string) {
  try {
    await EncryptedStorage.setItem('vendor_id', vendorId);
    console.log('VendorId saved successfully:', vendorId);
    return true;
  } catch (error) {
    console.log('Error saving vendorId:', error);
    return false;
  }
}

static async getVendorId(): Promise<string | null> {
  try {
    const vendorId = await EncryptedStorage.getItem('vendor_id');
    return vendorId;
  } catch (error) {
    console.log('Error getting vendorId:', error);
    return null;
  }
}

  static async saveTokens(accessToken: string, refreshToken: string) {
    try {
      await EncryptedStorage.setItem('access_token', accessToken);
      await EncryptedStorage.setItem('refresh_token', refreshToken);
      console.log('Tokens saved successfully!');
      return true;
    } catch (error) {
      console.log('Error saving tokens:', error);
      return false;
    }
  }

  // Get access token when you need it
  static async getAccessToken(): Promise<string | null> {
    try {
      const token = await EncryptedStorage.getItem('access_token');
      return token;
    } catch (error) {
      console.log('Error getting access token:', error);
      return null;
    }
  }

  // Get refresh token when you need it
  static async getRefreshToken(): Promise<string | null> {
    try {
      const token = await EncryptedStorage.getItem('refresh_token');
      return token;
    } catch (error) {
      console.log('Error getting refresh token:', error);
      return null;
    }
  }

  // Clear tokens when user logs out
  static async clearTokens() {
    try {
      await EncryptedStorage.removeItem('access_token');
      await EncryptedStorage.removeItem('refresh_token');
      await EncryptedStorage.removeItem('Vender_id');
      console.log('Tokens cleared!');
      return true;
    } catch (error) {
      console.log('Error clearing tokens:', error);
      return false;
    }
  }
  static async clearVendorId() {
  try {
    await EncryptedStorage.removeItem('vendor_id');
    console.log('VendorId cleared');
    return true;
  } catch (error) {
    console.log('Error clearing vendorId:', error);
    return false;
  }
}
}
