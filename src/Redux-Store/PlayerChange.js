import { createSlice } from '@reduxjs/toolkit'
const PlayerSlice = createSlice({
    name:"Player",
    initialState:{
        hideTab:false,
        hideStatusBar:false,
        watching:[],
        watched:[],
        skip:{dispaly:"5 seconds",amount:5},
        quality:{dispaly:"Default",id:4},
    },
    reducers:{
        openPlayer(state,action){
            state.hideTab = action.payload;
        },
        hideStatusBar(state){
            state.hideStatusBar = !state.hideStatusBar;
        }, 
        updateWatching (state,{payload}){
            const index = state.watching.findIndex((watch)=>watch.id === payload.id);            
            if(index >= 0){
                state.watching[index].id = payload.id;
                state.watching[index].current = payload.current;
                state.watching[index].total = payload.total;
                state.watching[index].subordub = payload.subordub;
                state.watching[index].image = payload.image;
                state.watching[index].info = payload.info;
                if (payload.list) {
                    state.watching[index].list ? state.watching[index].list : state.watching[index].list = [];
                    const index2 = state.watching[index].list.findIndex((watch)=> watch.id === payload.list.id);
                    if(index2 >= 0){
                        state.watching[index].list[index2] = payload.list;
                    }else{
                        state.watching[index].list  = [...state.watching[index].list , payload.list];
                    }  
                } 
            }else{
                state.watching = [...state.watching,payload]; 
            }
        },
        checkvideo(state,{payload}){
            const {y,ep} = payload;
            var  inde ;
            var  indexLis;
            var  lis;
            if (state.watching.length > 0 ) {
                inde = state.watching.findIndex((watch)=> watch?.id === y);
                lis = state.watching[inde].current;
                if (state.watching[inde].list) {
                    indexLis = state.watching[inde].list.findIndex((watch)=> watch.id === ep);     
                }else{
                     indexLis = -1;
                }
            }else{
                inde = -1;
                lis = -1;  
            }  
            return {
                inde,
                indexLis,
                lis
            }
        },
        deletewatching(state,{payload}){ 
            // const index = state.watching.findIndex((watch)=>watch.id === payload.id)
            // if(index >= 0){
            //     state.watching.splice(index,1)
            // }           
            state.watching.splice(payload,1);
        },
        skipconfig(state,{payload}){
           
            state.skip = payload
        },
        qualityconfig(state,{payload}){
            state.quality = payload
        },

    },

})

export const {openPlayer,hideStatusBar,updateWatching,deletewatching,skipconfig,qualityconfig,checkvideo} = PlayerSlice.actions
export default PlayerSlice.reducer