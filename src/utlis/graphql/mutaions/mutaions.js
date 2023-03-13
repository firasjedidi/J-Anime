import {  gql } from '@apollo/client';
const CREATE_PLAYLIST = gql`
    mutation CreatePlaylist($name: String!, $userId: ID!, $total: Int!, $subordub: String!, $image: String!, $info: String!, $current: CurrentInput!) {
        createPlaylist(name: $name, userId: $userId, total: $total, subordub: $subordub, image: $image, info: $info, current: $current) {
            _id
        }
    }
`;
const UPDATE_PLAYLIST = gql`
    mutation UpdatePlaylist($updatePlaylistId: ID!, $subordub: String!, $current: CurrentInput!, $videos: Boolean!, $total: Int!) {
        updatePlaylist(id: $updatePlaylistId, subordub: $subordub, current: $current, videos: $videos, total: $total) {
            _id
        }
    }
`;
const UPDATE_PLAYLIST_PROGRESS = gql`
    mutation UpdatePlaylistVideo($updatePlaylistVideoId: ID!, $videoId: ID!, $amount: Float) {
        updatePlaylistVideo(id: $updatePlaylistVideoId, videoId: $videoId, amount: $amount) {
            _id  
        }
    }
`;
const ADD_VIDEO_TO_PLAYLIST = gql`
    mutation AddVideoToPlaylist($addVideoToPlaylistId: ID!, $newCurrent: newCurrentInput!, $oldCurrent: oldCurrentInput!) {
        addVideoToPlaylist(id: $addVideoToPlaylistId, newCurrent: $newCurrent, oldCurrent: $oldCurrent) {
            _id  
        }
    }
`;

export {
    CREATE_PLAYLIST,
    UPDATE_PLAYLIST,
    UPDATE_PLAYLIST_PROGRESS,
    ADD_VIDEO_TO_PLAYLIST
}