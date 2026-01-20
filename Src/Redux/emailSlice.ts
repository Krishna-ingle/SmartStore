import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { State } from "react-native-gesture-handler";
interface UserEmail {
    email : string;
}
const initialState: UserEmail={
    email: "",
};
const emailSlice = createSlice({
    name: "email",
    initialState,
    reducers: {
        setEmail: (state, action: PayloadAction<string>) =>{
            state.email = action.payload;
        },
    },
});

export const {setEmail} = emailSlice.actions;
export default emailSlice.reducer;