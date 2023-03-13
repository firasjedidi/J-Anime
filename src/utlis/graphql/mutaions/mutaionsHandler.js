import { CREATE_PLAYLIST,UPDATE_PLAYLIST,UPDATE_PLAYLIST_PROGRESS,ADD_VIDEO_TO_PLAYLIST } from './mutaions';
import { client } from '../client';
const createPlaylist = async(variables) => {
    try {
        const {data} = await client.mutate({mutation:CREATE_PLAYLIST,variables:variables});
        return data
    } catch (error) {
        return error?.message
    }

}
const updatePlaylist = async(variables) =>{
    try {
        const {data} = await client.mutate({mutation:UPDATE_PLAYLIST,variables:variables});
        return data
    } catch (error) {
        return error?.message
    }
}
const updatePlaylistProgress = async(variables) =>{
    try {
        const {data} = await client.mutate({mutation:UPDATE_PLAYLIST_PROGRESS,variables:variables});
        return data
    } catch (error) {
        return error?.message
    }
}
const AddVideoToPlaylist = async(variables) =>{
    try {
        const {data} = await client.mutate({mutation:ADD_VIDEO_TO_PLAYLIST,variables:variables});
        return data
    } catch (error) {
        console.log(error?.message);
        return error?.message
    }
}
export {
    createPlaylist,
    updatePlaylist,
    updatePlaylistProgress,
    AddVideoToPlaylist
}