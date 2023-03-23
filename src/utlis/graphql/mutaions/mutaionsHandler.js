import { 
    CREATE_PLAYLIST,UPDATE_PLAYLIST,UPDATE_PLAYLIST_PROGRESS,
    ADD_VIDEO_TO_PLAYLIST,CREATE_USER,LOGIN,SOCIAL_AUTH,UPDATE_PROFILE
} from './mutaions';
import { client } from '../client';
const createPlaylist = async(variables) => {
    try {
        const {data} = await client.mutate({mutation:CREATE_PLAYLIST,variables:variables});
        return data;
    } catch (error) {
        return error?.message;
    }

}
const updatePlaylist = async(variables) =>{
    try {
        const {data} = await client.mutate({mutation:UPDATE_PLAYLIST,variables:variables});
        return data;
    } catch (error) {
        return error?.message;
    }
}
const updatePlaylistProgress = async(variables) =>{
    try {
        const {data} = await client.mutate({mutation:UPDATE_PLAYLIST_PROGRESS,variables:variables});
        return data;
    } catch (error) {
        return error?.message;
    }
}
const AddVideoToPlaylist = async(variables) =>{
    try {
        const {data} = await client.mutate({mutation:ADD_VIDEO_TO_PLAYLIST,variables:variables});
        return data;
    } catch (error) {
        return error?.message;
    }
}
const register = async(variables) =>{
    try {
        const {data} = await client.mutate({mutation:CREATE_USER,variables:variables});
        return data;
    } catch (error) {
        return error?.message;
    }
}
const login = async(variables) =>{
    try {
        const {data} = await client.mutate({mutation:LOGIN,variables:variables});
        return data;
    } catch (error) {
        return error?.message;
    }
}
const socialAuth = async(variables) =>{
    try {
        const {data} = await client.mutate({mutation:SOCIAL_AUTH,variables:variables});
        return data;
    } catch (error) {
        return error?.message;
    }
}
const updateProfile = async(variables) =>{
    try {
        const {data} = await client.mutate({mutation:UPDATE_PROFILE,variables:variables});
        return data;
    } catch (error) {
        console.log(error?.message);
        return error?.message;
    }
}
export {
    createPlaylist,
    updatePlaylist,
    updatePlaylistProgress,
    AddVideoToPlaylist,
    register,
    login,
    socialAuth,
    updateProfile,
}