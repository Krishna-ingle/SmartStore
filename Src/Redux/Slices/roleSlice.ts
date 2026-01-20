import { createSlice , PayloadAction } from "@reduxjs/toolkit";

interface RoleState{
    role: "User" | "Vender" | ""; 
}
const initialState: RoleState = {
    role: "",
}

const roleSlice = createSlice({
    name:"role",
    initialState,
    reducers:{
        setRole: (state, action: PayloadAction<"User" | "Vender">)=>{
            state.role = action.payload;
        },
    },
});

export const {setRole} = roleSlice.actions;
export default roleSlice.reducer;