import { configureStore } from "@reduxjs/toolkit";
import emailReducer from "./emailSlice"
import roleReducer from "./Slices/roleSlice"
import shopReducer from "./Slices/shopSlice";
export const store = configureStore({
    reducer: {
        role: roleReducer,
        email:emailReducer,
        shop: shopReducer,
    }
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;