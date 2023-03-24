const Playlist = require('../Database/models/playlist');
const User = require('../Database/models/user');
const bcrypt = require('bcrypt');
const resolvers = {
  Query: {
    user: async (parent, { id }) => {
      return User.findById(id);
    },
    playlist: async (parent, { id }) => {
      return Playlist.findById(id);
    },
    playlists:async(parent,{user},context) =>{
      const playlists = await Playlist.find({ user });
      return playlists;
    },
    checkPlayList: async (parent, { user,videoId },context) => {
      const playlists = await Playlist.find({ user });
      if (!playlists) {
        throw new Error('User Playlist not found');
      };
      console.log(playlists,"serverr",user,videoId);
      const playlist = playlists.find((pv) => pv.name.toString() === videoId.toString());
      console.log(playlist,"serverr");
      if (!playlist || playlist === undefined) {
        throw new Error('playlist not found');
      };
      return playlist;
    },
  },
  Mutation: {
    createUser: async (_, { username, email, password,image }) => {
      const userExists = await User.findOne({ email });
      const salt = await bcrypt.genSalt(10);
      const hashedpassword = await bcrypt.hash(password,salt)
      console.log(userExists,salt,hashedpassword);
      if (userExists) {
        throw new Error('User already exists');
      }
      const user = new User({ username, email, password:hashedpassword,image, });
      await user.save();
      return user;
    },
    socailAuth: async (_, { username, email, password,image })=>{
      const userExists = await User.findOne({ email });
      const salt = await bcrypt.genSalt(10);
      const hashedpassword = await bcrypt.hash(password,salt);
      if (userExists) {
        console.log("user Exists socailAuth");
        if (username !== userExists.username)  throw new Error('Chosse another email');
        const user = await bcrypt.compare(password,userExists.password);
        if (!user)  throw new Error('Chosse another email');
        return userExists;
      }
      const user = new User({ username, email, password:hashedpassword,image,});
      await user.save();
      return user;
    },
    login: async (_, { email, password}) => {
      const userExists = await User.findOne({ email });
      if (!userExists) {
        console.log("user does not Exists");
        throw new Error('User does not exists');
      }
      const user = await bcrypt.compare(password,userExists.password);
      if (!user)  throw new Error('password is incorrect');
      return userExists;
    },
    createPlaylist: async (_, { name, userId,  total, subordub, image, info,current}) => {
      const user = await User.findById(userId);
      const playlist = new Playlist({ name, user,  total, subordub, image, info,current})
      await playlist.save();
      return playlist.toObject();
    },
    addVideoToPlaylist: async (parent, { id, newCurrent,oldCurrent },context) => {
      const playlist =  await resolvers.Query.playlist(parent,{id:id},context);
      if (!playlist) {
        throw new Error('Playlist not found');
      };
      console.log("yo");
      playlist.current = newCurrent;
      const videoIndex = playlist.videos.findIndex(vid => vid.id === oldCurrent.id);
      console.log("index",videoIndex);
      if (videoIndex < 0) {
        console.log("ma famch",oldCurrent);
        playlist.videos.push(oldCurrent);
      } else {
        console.log("fama playlist");
        playlist.videos[videoIndex].amount = oldCurrent.amount;
      }
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
    },
    updateUser:async (parent, {id,username, email, password,image  },context) => {
      const user = await resolvers.Query.user(parent,{id:id},context)
      const salt = await bcrypt.genSalt(10);
      const hashedpassword = await bcrypt.hash(password,salt)
      if(username && email && hashedpassword && image){
        console.log('len');
        user.email = email;
        user.password = hashedpassword;
        user.username = username;
        user.image = image;
      }
      const updatedUser = await User.findByIdAndUpdate(user._id, user, { new: true });
      return updatedUser
    },
  },
};
module.exports = resolvers