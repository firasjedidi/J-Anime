import { Alert } from "react-native";
const  animeNameConverter = (episodeID)=>{
    const trim = episodeID.split('-').indexOf('episode');
    const name = episodeID.split('-').slice(0,trim).join(" ");
    return name
}
const covertToSub = (episodeID) =>{
    // check and convert episodeID to sub episodeID
    const dub = episodeID.split('-').includes('dub'); 
    const covert = dub ? episodeID.split('-').indexOf('dub') : episodeID;
    const sub = dub ? episodeID.split('-').slice(0,covert ).concat(episodeID.split('-').slice(covert +1)).join("-") : episodeID;  
    return sub
}
const covertToDub = (episodeID) =>{
    // check and convert episodeID to dub episodeID
    const checkdubed = episodeID.split('-').includes('dub'); 
    const covert = checkdubed ? episodeID : episodeID.split('-').indexOf('episode'); 
    const dub =checkdubed ? episodeID :   episodeID.split('-').slice(0,covert).concat("dub",episodeID.split('-').slice(covert)).join("-");  
    return  dub
}
const customAlert = (title,message,noPress,okPress)=>{
  Alert.alert(
    title,
    message,
    [
      {text: 'cancel',onPress: () =>{},style: 'cancel'},
      {text: 'No',onPress:noPress},
      {text: 'OK', onPress: okPress },
    ]
  )
}
const rGI = ()=>{
  // random genreater image
  const images = ["https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Ftse1.mm.bing.net%2Fth%3Fid%3DOIP.LEnJzyxSSM9PXoZhuNOvTwHaHa%26pid%3DApi&f=1&ipt=e69bd4e0ae87cbf606d4e1a68510354df653e3fc5e7509dfe218c68f92fe48cc&ipo=images","https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Ftse4.mm.bing.net%2Fth%3Fid%3DOIP.USXX-FX5VGYtPLcPdhH6uQHaHa%26pid%3DApi&f=1&ipt=341310c68092c4a7b42d019dfdb3843d371e04d781defa7cee9fe49589056c45&ipo=images",
  "https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Ftse1.mm.bing.net%2Fth%3Fid%3DOIP.DrxDkQ3UbR2yxmzY9tHCcgHaHs%26pid%3DApi&f=1&ipt=fe0b4cfc0476bf0a8001b4addc490de87b192a4e67172f31b5af384f83d1be84&ipo=images","https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Ftse1.mm.bing.net%2Fth%3Fid%3DOIP.nQHAApX274tcaWhPxdywSwHaHa%26pid%3DApi&f=1&ipt=b496194a836be7826ca00d476b8bfefa165d04c92a8e2ec6dfec3deac649b858&ipo=images"]
  const random = Math.floor(Math.random()*images.length);
  return images[random];
}
export {
    animeNameConverter,
    covertToDub,
    covertToSub,
    customAlert,
    rGI
}

// const handle = async (episode)=>{
//     const sub = covertToSub(episode);
//     const dub = covertToDub(episode);
//     const playList = await getPlayList(id);
//     const {current,videos,subordub, _id} = playList.playlist;
//     if (videos.length >0) {
//         const newCurrent = videos.find(video => video.videoId === sub || dub )
//         if (newCurrent) {
//             const added = await AddVideoToPlaylist({newCurrent,addVideoToPlaylistId:_id,oldCurrent:current})
//             console.log(added,'videos array');
//         }
//     } else {
//         const newCurrent = {id:episode,amount:0}
//         const added = await AddVideoToPlaylist({newCurrent,addVideoToPlaylistId:_id,oldCurrent:current})
//         console.log(added,"current");
//     }
// }
// const handel = (tt) => {
//     const dub = ep.split('-').includes('dub');  
//     const t = dub ? ep.split('-').indexOf('dub') : ep.split('-').indexOf('episode');
//     const y = dub ? ep.split('-').slice(0,t).join(" ") : ep.split('-').slice(0,t).join(" ");
//     console.log("nextttttttttttttttttttt");
//     var  index ;
//     var  indexList;
//     var  list;
//     var img;
//     var id2;
//     if (watching.length > 0 ) {
//       index = watching.findIndex((watch)=> watch?.id === y);
//       list = watching[index].current;
//       img  = watching[index].image;
//       id2 = watching[index].info;
//       if (watching[index]?.list ) {
//         indexList = watching[index].list.findIndex((watch)=> watch.id === tt);
//       }else{
//         indexList =-1; 
//       }  
//     }else{
//       index =-1;    
//       // list = -1;
//     }  
//     if(index  >= 0){
//       console.log("wasellll play pause");
//       var amount = watching[index]?.current?.id === tt ?  watching[index]?.current?.amount :  indexList >= 0 && watching[index]?.list[indexList]?.id === tt ? watching[index]?.list[indexList]?.amount : 0;
//       console.log(amount,"ammmouunnnt");
//       if(amount){
//         console.log(list," have");
//         dispatch(updateWatching({id:y,current:{ id:tt,amount:amount },total:total,subordub:dub ? "dub":"sub",image:img,list:list,info:id2}));
//       }
//       else{
//         console.log(list,"don't have");
//         dispatch(updateWatching({id:y,current:{ id:tt,amount: 0},total:total,subordub:dub ? "dub":"sub",image:img,list:list,info:id2}));
//       }
//       }
//     else{
//      console.log("ma temchichhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhh2222222222222222222222é");
//     }
//   }

// const  continueWatching = async() =>{
//     const dub = ep.split('-').includes('dub');  
//     const t = dub ? ep.split('-').indexOf('dub') : ep.split('-').indexOf('episode');
//     const y = dub ? ep.split('-').slice(0,t).join(" ") : ep.split('-').slice(0,t).join(" ");

//     var  index ;
//     var  indexList;   
//     if (watching?.length > 0 ) {
//       index = watching.findIndex((watch)=> watch?.id === y);
//       if (watching[index]?.list ) {
//         indexList = watching[index].list.findIndex((watch)=> {
//           if (watch?.id.split('-').includes('dub')&& !dub) {
//             const b = watch?.id.split('-').indexOf('dub');
//             const v= watch?.id.split('-').slice(0,b).concat( watching[index]?.current?.id.split('-').slice(b +1)).join("-")
//             return v === ep;
//           } else {
//              return watch?.id === ep;
//           }
//         });
//       }
//     }else{
//       index =-1;
//       indexList =-1; 
//     }  
//     if(index  >= 0 ){
//       let curent = "r"
//       if (watching[index]?.current?.id.split('-').includes('dub') && !dub) {
//         const b = watching[index]?.current?.id.split('-').indexOf('dub');
//         const v = watching[index]?.current?.id.split('-').slice(0,b).concat( watching[index]?.current?.id.split('-').slice(b +1)).join("-")
//         curent = v === ep;
//       } else {
//         curent =  watching[index]?.current?.id === ep;
//       }
//       console.log(curent);
//       const amount = curent? watching[index]?.current?.amount : indexList >= 0 && watching[index]?.list[indexList]?.id === ep ?  watching[index]?.list[indexList]?.amount : 0 ;
//       console.log(amount,"ammmmount");
//       if(amount){
//         console.log('waselllllllllll',amount * 15250);
//         if (!videoRef.current) return false; 
//         await videoRef.current.playFromPositionAsync(amount * 15250)
//         console.log(vidStatus.positionMillis,"waselllllllllllllll222");
//         if (vidStatus.positionMillis !== (amount * 15250) || vidStatus.positionMillis < (0 * 15250) ) {
//           await videoRef.current.playFromPositionAsync(amount * 15250)
//         }
//       }   
//     }else{
//       console.log('ma temchichhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhh');
//       if (!videoRef.current) return false; 
//       await videoRef.current.playFromPositionAsync(0* 15250)
//       if (vidStatus.positionMillis !== (0 * 15250) || vidStatus.positionMillis < (0 * 15250) ) {
//         await videoRef.current.playFromPositionAsync(0 * 15250)
//       }
//     }     
//   } 

// const handelPress =(type)=>{
//     //after create or optmiase of the watching code
//     if (data.type === "MANGA" ) {
//         const {  chapters, image } = data;
//         const chapterId = chapters[0].id;
//         navigation.navigate('ReaderScreen', { chapterId, cp: chapters.length, img: image });    
//     } else {
//         const animeName = animeName(data.episodes[0].id);
//         const playlist = checkPlaylist("",animeName)
//         console.log(playlist);
//         if ( playlist) {   
//             const { current, subordub ,id} = playlist;
//             const isDub = subordub=== "dub";
//             const dub = isDub ? covertToDub(current.id) : null;
//             const sub = isDub ? null : covertToSub(current.id);
//             const navObj = {
//               id: isDub ? (type === "dub" ? dub : covertToDub(data.episodes[0].id)) : (type === "dub" ? covertToDub(data.episodes[0].id) : sub),
//               ep: data.episodes.length,
//               img: data.image,
//               info: data.id
//             };
//             if (subordub !== type) {
//                 const navigation = ({ep, type, id, videos}) => {
//                     const suborDub = type === "dub" ? "dub" : "sub";
//                     const update = { current: { id: ep}, suborDub, updatePlaylistId: id, videos };
//                     const playListId = updatePlaylist(update);
//                     navigation.navigate('PlayerScreen', {ep,playListId});
//                 }
//               customAlert(
//                 'Verification',
//                 'Do you want to continue Watching from your left or start from the beginning ?',
//                 () => {
//                     navigation({ep:navObj.id,type,id,videos:true })
//                 },
//                 () => {
//                     navigation({ep:navObj.id,type,id,videos:false })
//                 }
//               )
//             } else {
//                 navigation.navigate('PlayerScreen', navObj); 
//             } 
//         } else {   
//             // creation of playlist and the navigation
//             console.log("no playlist");
//             const suborDub =  type === "dub" ? "dub" : "sub";
//             const ep = type === "dub" ? covertToDub(data.episodes[0].id) : data.episodes[0].id;
//             const creation = {current:{id:ep},suborDub,total:data.episodes.length,image:data.image,info:data.id};
//             const playListId = createPlaylist(creation);
//             console.log(playListId);
//             // navigation.navigate('PlayerScreen',{ep,playListId})
//         }
//     }
//   }


//   if ( type === "dub" ) { 
//     const dub2 = covertToDub(data.episodes[0].id);
//     const nav1obj ={id:dub2,ep:data.episodes.length,img:data.image,info:data.id};
//     const dub = covertToDub(playlist.current.id);
//     const nav2obj ={id:dub,ep:data.episodes.length,img:data.image,info:data.id};      
//     if (playlist.subordub !== "dub" ) { 
//         const navigation1 = (ep,type,id,videos)=>{
//             //reomve all the vidoes and update subordub and current object or  update subordub and current object  for this playlist and the navigate
//             const suborDub =  type === "dub" ? "dub" : "sub";
//             const update = {current:{id:ep},suborDub,updatePlaylistId:id,videos};
//             const playListId =  updatePlaylist(update); 
//         }
//         customAlert(
//             'Verification',
//             'Do you want to continue Watching from your left or start from the beginning ?',
//             navigation.navigate('PlayerScreen',nav1obj),
//             navigation.navigate('PlayerScreen',nav2obj) 
//         )
//     } else {
//         navigation.navigate('PlayerScreen',nav2obj); 
//     } 
// }else{ 
//     const nav1obj = {id:data.episodes[0].id,ep:data.episodes.length,img:data.image,info:data.id};
//     const sub = covertToSub(playlist.current.id);
//     const nav2obj = {id:sub,ep:data.episodes.length,img:data.image,info:data.id};      
//     if (playlist.subordub  !== "sub" ) {
//         customAlert(
//             'Verification',
//             'Do you want to continue Watching from your left or start from the beginning ?',
//             navigation.navigate('PlayerScreen',nav1obj),
//             navigation.navigate('PlayerScreen',nav2obj) 
//         )
//     } else {
//         navigation.navigate('PlayerScreen',nav2obj); 
//     }  
// }