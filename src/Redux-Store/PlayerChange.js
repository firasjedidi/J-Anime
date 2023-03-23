import { createSlice } from '@reduxjs/toolkit'
const PlayerSlice = createSlice({
    name:"Player",
    initialState:{
        hideTab:false,
        hideStatusBar:false,
        skip:{dispaly:"5 seconds",amount:5},
        quality:{dispaly:"Default",id:4},
        autoIntro:true,
        autoNext:true,
    },
    reducers:{
        openPlayer(state,action){
            state.hideTab = action.payload;
        },
        hideStatusBar(state){
            state.hideStatusBar = !state.hideStatusBar;
        }, 
        skipconfig(state,{payload}){
            state.skip = payload
        },
        qualityconfig(state,{payload}){
            state.quality = payload
        },
        SkipIntro(state,{payload}){
            state.autoIntro = payload
        },
        SkipNext(state,{payload}){
            state.autoNext = payload
        }
    },

})

export const {openPlayer,hideStatusBar,skipconfig,qualityconfig,SkipIntro,SkipNext} = PlayerSlice.actions
export default PlayerSlice.reducer