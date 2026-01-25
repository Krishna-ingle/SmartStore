import { createSlice , PayloadAction } from "@reduxjs/toolkit";

interface userDataState{
    userData: {
    address: string | null;
    city: string | null;
    email: string;
    emailVerified: boolean;
    fullName: string;
    id: string;
    mobileNumber: string;
    mobileVerified: boolean;
    pinCode: string | null;
    totalOrders: number;
    }
    
}
const initialState: userDataState = {
    userData: {
        address: null,
        city: null,
        email: "",
        emailVerified: false,
        fullName: "",
        id: "",
        mobileNumber: "",
        mobileVerified: false,
        pinCode: null,
        totalOrders: 0,
    }
}

const userDataSlice = createSlice({
    name:"userData",
    initialState,
    reducers: {
        setUserData: (state, action) => {
            state.userData = action.payload.userData;
        },
        clearUserData: (state) => {
            state.userData = initialState.userData;
        },
    },
});

export const {setUserData, clearUserData} = userDataSlice.actions;
export default userDataSlice.reducer;