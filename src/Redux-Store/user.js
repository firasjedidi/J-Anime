import { createSlice } from "@reduxjs/toolkit";
const userSlice = createSlice({
    name:"user",
    initialState:{
        user:null,
        isAuth:false,
    },
    reducers:{
        authed(state,action){
            state.user = action.payload;
            state.isAuth = true;
        }
    }
})
export const { authed } = userSlice.actions
export default userSlice.reducer