import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface Shop {
  id: string;
  shopName: string;
  shopAddress: string;
  shopType: string;
  contactNumber: string;
  description?: string;
  gstNumber?: string | null;
  isActive?: boolean;
  vendorId?: string;
  createdAt?: string;
}

interface ShopState {
  currentShopId: string | null;
  currentShop: Shop | null;
}

const initialState: ShopState = {
  currentShopId: null,
  currentShop: null,
}; 

const shopSlice = createSlice({
    name: 'shop',
    initialState,  // ✅ Use the defined initialState
    reducers: {
        setShopId: (state, action: PayloadAction<string>) => {  // ✅ Add PayloadAction type
            state.currentShopId = action.payload;
        },
        setShopDetails: (state, action: PayloadAction<Shop>) => {  // ✅ Add PayloadAction type
            state.currentShop = action.payload;
        }
    }
});

export const { setShopId, setShopDetails } = shopSlice.actions;
export default shopSlice.reducer;
