import { configureStore } from "@reduxjs/toolkit";
import emailReducer from "./emailSlice"
import roleReducer from "./Slices/roleSlice"
import shopReducer from "./Slices/shopSlice";
import userDataReducer from "./Slices/userDataSlice";
import userSelectCityReducer from "./Slices/userSelectedCitySlice";
export const store = configureStore({
    reducer: {
        role: roleReducer,
        email:emailReducer,
        shop: shopReducer,
        userData: userDataReducer, 
        SelectedCity: userSelectCityReducer,
    }
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;