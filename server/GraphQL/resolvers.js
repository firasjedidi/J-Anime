const Playlist = require('../Database/models/playlist');
const User = require('../Database/models/user');
const resolvers = {
  Query: {
    user: async (parent, { id }) => {
      return User.findById(id);
    },
    playlist: async (parent, { id }) => {
      return Playlist.findById(id);
    },
    checkPlayList: async (parent, { user,videoId },context) => {
      const playlists = await Playlist.find({ user });
      if (!playlists) {
        throw new Error( 'Playlist not found');
      };
      console.log(playlists,"serverr",user,videoId);
      const playlist = playlists.find((pv) => pv.name.toString() === videoId.toString());
      console.log(playlist,"serverr");
      if (!playlist || playlist === undefined) {
        throw new Error( 'playlistVideo not found');
      };
      return playlist;
    },
  },
  Mutation: {
    createUser: async (parent, { username, email, password,image }) => {
      const user = new User({ username, email, password,image, });
      await user.save();
      return user;
    },
    createPlaylist: async (_, { name, userId,  total, subordub, image, info,current}) => {
      const user = await User.findById(userId);
      const playlist = new Playlist({ name, user,  total, subordub, image, info,current})
      await playlist.save();
      return playlist.toObject();
    },
    addVideoToPlaylist: async (parent, { id, newCurrent,oldCurrent },context) => {
      const playlist =  await resolvers.Query.playlist(parent,{id:id},context);
      const video = oldCurrent;
      if (!playlist) {
        throw new Error('Playlist not found');
      };
      playlist.current = newCurrent;
      playlist.videos = [...playlist.videos,video];
      const updatedPlaylist = await Playlist.findByIdAndUpdate(playlist._id, playlist, { new: true });
      return updatedPlaylist
    },
    updatePlaylistVideo: async (parent, { id, videoId, amount },context) => {
      const playlist =  await resolvers.Query.playlist(parent,{id:id},context)
      const  playlistVideo = playlist.current;
      if(playlistVideo.id === videoId){
       if (amount !== undefined) playlistVideo.amount = amount;
       const updatedPlaylist = await Playlist.findByIdAndUpdate(playlist._id, playlist, { new: true });
       return updatedPlaylist
      }
    },
    updatePlaylist:async (parent, { id, subordub, current, videos,total },context) => {
      const playlist = await resolvers.Query.playlist(parent,{id:id},context)
      if(total) playlist.total = total;
      if(videos && playlist.videos.length > 0 ) playlist.videos = [];
      if(subordub && current){
        playlist.subordub = subordub;
        playlist.current.id = current.id;
      }
      const updatedPlaylist = await Playlist.findByIdAndUpdate(playlist._id, playlist, { new: true });
      return updatedPlaylist
    }
  },
};
module.exports = resolvers