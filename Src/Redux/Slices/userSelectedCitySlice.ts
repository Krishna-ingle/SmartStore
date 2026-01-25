import { createSlice } from "@reduxjs/toolkit";

interface userSelectSlice {
    selectCity: string | null;
}
const initialState: userSelectSlice = {
    selectCity: null
}
const userSelectCitySlice = createSlice({
    name:"userSelectedCity",
    initialState,
    reducers: {
        setUserSelectCity: (state, action) => {
            state.selectCity = action.payload;
        },
    },
});

export const {setUserSelectCity} = userSelectCitySlice.actions;
export default userSelectCitySlice.reducer;