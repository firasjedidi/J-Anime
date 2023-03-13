import {  gql } from '@apollo/client';
const GET_User = gql`
    query User($userId: ID!) {
        user(id: $userId) {
            id
            username
            email
            password
            image
        }
    }
`;
const GET_PLAYLIST = gql`
    query Playlist($playlistId: ID!) {
        playlist(id: $playlistId) {
            _id
            current {
                amount
                id
            }
            total
            videos {
                id
                amount
            }
        }
    }
`;
const Check_PLAYLIST = gql`
query CheckPlayList($user: ID!, $videoId: ID!) {
    checkPlayList(user: $user, videoId: $videoId) {
        _id
        name
        videos {
           id
            amount
        }
        current {
            amount
            id
        }
        total
        subordub
        image
        info
          
    }
  }
`;

export {
    GET_User,
    GET_PLAYLIST,
    Check_PLAYLIST
}