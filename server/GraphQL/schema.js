const {  gql } = require('apollo-server');

const typeDefs = gql`
  type User {
    id: ID!
    username: String!
    email: String!
    password: String!
    image: String!
    playlists:[Playlist]
  }

  
  type PlaylistVideo {
    id: String!
    watched: Boolean!
    amount: Float!
  }
  type Current {
    id: String!
    amount: Float!
  }
  type Playlist {
    _id: ID!
    user: User!
    name:String!
    videos: [PlaylistVideo]!
    current:Current!
    total: Int!
    subordub: String!
    image: String!
    info: String!
  }

  type Query {
    user(id: ID!): User
    playlist(id: ID!): Playlist
    checkPlayList(user: ID!, videoId: ID!): Playlist
  }

  type Mutation {
    createUser(username: String!, email: String!, password: String!, image: String!): User
    socailAuth(username: String!, email: String!, password: String!, image: String!): User
    login(email: String!, password: String!): User
    createPlaylist(name: String!, userId: ID!, total: Int!, subordub: String!, image: String!, info: String!, current: CurrentInput!  ): Playlist!
    addVideoToPlaylist(id: ID!, newCurrent: newCurrentInput!, oldCurrent: oldCurrentInput!): Playlist
    updatePlaylistVideo(id: ID!, videoId: ID!,  amount: Float): Playlist
    updatePlaylist(id: ID!, subordub: String!, current: CurrentInput!, videos:  Boolean!, total: Int!, ):Playlist!
  }
  input CurrentInput {
    id: String!
  }
  input newCurrentInput {
    id: String!
    amount: Float!
  }
  input oldCurrentInput {
    id: String!
    amount: Float!
  }
`;
module.exports = typeDefs
