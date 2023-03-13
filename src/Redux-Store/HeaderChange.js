import { createSlice } from '@reduxjs/toolkit'
const HeaderSlice =createSlice({
    name:"header",
    initialState:{
        view:"Home",
        openView:false,
        openCategories:false,
        gener:""
    },
    reducers:{
        ChangeView(state,action){
            state.view = action.payload
        }, 
        toggleView(state){
            state.openView = !state.openView
        },
        toggleCategories(state){
            state.openCategories = !state.openCategories
        },
        ChangeGener(state,action){
            state.gener = action.payload
        },
    }
})

export const {ChangeView,toggleView,toggleCategories,ChangeGener} = HeaderSlice.actions
export default HeaderSlice.reducer