import {  useQuery } from '@apollo/client';
import { Check_PLAYLIST ,GET_PLAYLIST,GET_PLAYLISTS} from './querys';
import { client } from '../client';
const checkPlaylist = async(variables)=>{
    try {
        const {data} = await client.query({query:Check_PLAYLIST,variables,fetchPolicy: "no-cache"});
        return data
    } catch (error) {
        return error?.message
    }
    
}
const getPlayList = async (id) =>{
    try {
        const {data} = await client.query({query:GET_PLAYLIST, variables: { playlistId:id },fetchPolicy: "no-cache"});
        return data
    } catch (error) {
        return error?.message
    }   
}
const getPlayLists = async (variables) =>{
    try {
        const {data} = await client.query({query:GET_PLAYLISTS,variables,fetchPolicy: "no-cache"});
        return data
    } catch (error) {
        return error?.message
    }
    
}
export{
    checkPlaylist,
    getPlayList,
    getPlayLists
}