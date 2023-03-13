import { createSlice } from '@reduxjs/toolkit';
const PlayListSlice = createSlice({
    name:"PlayList",
    initialState:{
        list:[],
        manga:[],
        fade:false,
    },
    reducers:{
        toggleFade(state){
            state.fade = false
        },
        addToList(state,action){
            const index = state.list.findIndex((listItem)=>listItem.id === action.payload.id);
            if (index >= 0) {
                state.fade = true;
            } else {
                state.list = [...state.list,action.payload];
            }
        },
        addToManga(state,action){
            const index = state.manga.findIndex((listItem)=>listItem.id === action.payload.id);
            if (index >= 0) {
               
            } else {
                state.manga = [...state.manga,action.payload];
            }
        }
    }
})
 
export const {addToList,addToManga,toggleFade} = PlayListSlice.actions
export default PlayListSlice.reducer