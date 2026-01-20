// utils/cloudinaryUpload.ts

// TypeScript interfaces for better type safety
interface CloudinaryResponse {
  secure_url: string;
  public_id: string;
  version: number;
  signature: string;
  width: number;
  height: number;
  format: string;
  resource_type: string;
  created_at: string;
  tags: string[];
  bytes: number;
  type: string;
  etag: string;
  placeholder: boolean;
  url: string;
  original_filename: string;
  error?: {
    message: string;
  };
}

interface ImageAsset {
  uri: string;
  type: string;
  name: string;
}

const uploadImageToCloudinary = async (imageUri: string): Promise<string> => {
  const formData = new FormData();
  
  // Add the image file with proper typing
  const imageAsset: ImageAsset = {
    uri: imageUri,
    type: 'image/jpeg',
    name: 'product.jpg',
  };
  
  formData.append('file', imageAsset as any); // React Native FormData typing
  formData.append('upload_preset', 'smart_store_products');

  try {
    const response = await fetch(
      'https://api.cloudinary.com/v1_1/dgefyn8qd/image/upload',
      {
        method: 'POST',
        body: formData,
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      }
    );
    
    const data: CloudinaryResponse = await response.json();
    
    if (data.error) {
      throw new Error(data.error.message);
    }
    
    console.log('✅ Upload successful:', data.secure_url);
    return data.secure_url; // This URL goes to MongoDB!
    
  } catch (error) {
    console.error('❌ Upload failed:', error);
    throw error;
  }
};

export { uploadImageToCloudinary };
export type { CloudinaryResponse, ImageAsset };
