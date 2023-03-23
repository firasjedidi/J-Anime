import { View, Text,Image ,Pressable,Alert } from 'react-native'
import React from 'react'
import {useDispatch, useSelector } from 'react-redux';
import { PlayIcon} from "react-native-heroicons/mini";
import { useNavigation } from '@react-navigation/native';
import { animeNameConverter, covertToDub, covertToSub, customAlert } from '../../../utlis/helpers/helper';
import {checkPlaylist} from '../../../utlis/graphql/querys/queryHandler';
import {createPlaylist,updatePlaylist} from '../../../utlis/graphql/mutaions/mutaionsHandler'
const Info = ({data}) => {
  const navigation = useNavigation()
  const {user} = useSelector(state => state.user);
  const navigationOnType = async({ep, type, id, videos,total}) => {
    const subordub = type === "dub" ? "dub" : "sub";
    const update = { current: { id: ep}, subordub, updatePlaylistId: id, videos,total };
    const playListId = await updatePlaylist(update);
    if(playListId.updatePlaylist)navigation.navigate('PlayerScreen', {ep,id:playListId.updatePlaylist._id});
    else alert("somthing went wrong try again"+playListId)
  }
  const handelPress =async(type)=>{
    if (data.type === "MANGA" ) {
      const {  chapters, image } = data;
      const chapterId = chapters[0].id;
      navigation.navigate('ReaderScreen', { chapterId, cp: chapters.length, img: image });    
    } else {
      const {image,episodes,id} = data
      const animeName = animeNameConverter(episodes[0].id);
      const playlist = await checkPlaylist({user:user.id,videoId:animeName});
      if ( playlist.checkPlayList ) {   
        const { current, subordub ,_id,total} = playlist.checkPlayList;
        let ep = current.id ;
        if (subordub !== type) {  
          customAlert(
            'Verification',
            'Do you want to continue Watching from your left or start from the beginning ?',
            () => {
              ep =  type === "dub" ? covertToDub(episodes[0].id) : episodes[0].id;
              navigationOnType({ep,type,id:_id,videos:true,total:episodes.length });
            },
            () => {
              ep =  type === "dub" ? covertToDub(current.id) : current.id;
              navigationOnType({ep,type,id:_id,videos:false,total:episodes.length });
            }
          );
          
        } else {
          navigationOnType({ep,type,id:_id,videos:false,total:episodes.length});
        } 
      } else {   
        // creation of playlist and the navigation
        const subordub =  type === "dub" ? "dub" : "sub";
        const ep = type === "dub" ? covertToDub(data.episodes[0].id) : data.episodes[0].id;
        const creation = {
          name:animeName,current:{id:ep},subordub,
          total:episodes.length,image:image,info:id,
          userId:user.id
        };
        const playListId = await createPlaylist(creation);
        if(playListId.createPlaylist)navigation.navigate('PlayerScreen', {ep,id:playListId.createPlaylist._id});
        else alert("somthing went wrong try again"+playListId)
      }
    }
  }
  
  return (
    <View className="flex-row w-full h-60 -mt-20 px-7 py-0">
      <View className="w-32 h-full">
        <Image className="w-full h-full rounded-md" source={{uri:data.image}}/>
      </View>
      <View className="h-[80%] w-52  mt-16 py-0 p-4 ">
          <Text 
            className="text-center text-[15px]  m-1 uppercase"
            style={{color:data.color ? data.color : "white" }}
          >
              {
                  data.title.english
                ? 
                  data.title.english 
                : 
                  data.title.romaji 
                ?
                  data.title.romaji
                : 
                  data.title
                ? 
                  data.title.userPreferred
                : 
                  data.title.native
              }
          </Text>
          <View className=" flex-row items-center  justify-center space-x-2">
            <Text className="text-gray-500">{data.releaseDate}</Text>
            <Text className="text-gray-500">{data.status === "Completed" ? data.status :  data.totalEpisodes  ? "(" +data.totalEpisodes  + " Episodes)" :  data.status }</Text>
            <Text className="text-gray-500">{data.type}</Text>
            <Text className="text-gray-500 text-center ">{data.type === "MANGA" ? "" :"HD"}</Text>   
          </View>
          <View className="  flex-row flex-wrap  w-48 justify-center space-x-2 items-center">
              {data.genres.map((gener,index)=>(<Text key={index} className="text-gray-500   text-xs  ">{gener}</Text>))}
          </View> 
        {
          data.type === "MANGA" 
            ? 
              <Pressable activeOpacity={0.5} className="mt-4  items-center"  onPress={() => {navigation.navigate('ReaderScreen',{id:data.chapters[0].id,cp:data.chapters.length})}}>
                <View className="flex-row  w-20 rounded-md h-8 items-center justify-center"   style={{backgroundColor:data.color ? data.color : "white" }}>
                  <PlayIcon  size={26} color="black"/>
                  <Text className=" text-sm ml-1 font-bold ">Read</Text>
                </View>
              </Pressable>
            :
              <View className=" flex-row items-center mt-4  justify-center space-x-2">
                <Pressable activeOpacity={0.5} className="items-center"  onPress={() =>{handelPress("sub")}}>
                  <View className="flex-row  w-20 rounded-md h-8 items-center justify-center"   style={{backgroundColor:data.color ? data.color : "white" }}>
                    <PlayIcon  size={26} color="black"/>
                    <Text className=" text-sm ml-1 font-bold ">Sub</Text>
                  </View>
                </Pressable>
                <Pressable activeOpacity={0.5} className="items-center" onPress={() =>{handelPress("dub")}}>
                    <View className="flex-row  w-20 rounded-md h-8 items-center justify-center" style={{borderColor:data.color ? data.color : "white" ,borderWidth:1,}} >
                      <PlayIcon  size={26} color="white"/>
                      <Text className=" text-sm ml-1 font-bold text-white ">Dub</Text>
                    </View>
                </Pressable>
              </View>
        }
      </View>
    </View>
  )
}

export default Info
// const handelPress =(type)=>{
//   //after create or optmiase of the watching code
//   if (data.type === "MANGA" ) {
//     navigation.navigate('ReaderScreen',{id:data.chapters[0].id,cp:data.chapters.length,img:data.image})
//   } else {
//     var t = data.episodes[0].id.split('-').indexOf('episode');
//     var y = data.episodes[0].id.split('-').slice(0,t).join(" ");
//     var  index ;
//     var  list; 
//     var subordub;  
//     if (watching?.length > 0 ) {
//       index = watching.findIndex((watch)=> watch?.id === y);
//       list = watching[index]?.current.id;
//       subordub = watching[index]?.subordub;
//     }else{
//       index =-1;
//       list = ""; 
//       subordub = ""
//     }  
//     console.log(subordub,"///",index,"///",list);
//     if (type === "dub") {   
//       var dub2 = data.episodes[0].id.split('-').slice(0,t).concat("dub",data.episodes[0].id.split('-').slice(t)).join("-");
//       const nav1obj ={id:dub2,ep:data.episodes.length,img:data.image,info:data.id};
//       if ( index >=0 && list ) {
//         const dubd = list.split('-').includes('dub'); 
//         const d = dubd ? list : list.split('-').indexOf('episode'); 
//         const dub =dubd ? list :   list.split('-').slice(0,d).concat("dub",list.split('-').slice(d)).join("-");  
//         const nav2obj ={id:dub,ep:data.episodes.length,img:data.image,info:data.id};      
//         if (subordub !== "dub" ) {  
//           Alert.alert(
//             'Verification',
//             'Do you want to continue watching from where you left off or start from the beginning ?',
//             [
//               {
//                 text: 'cancel',
//                 onPress: () =>{},
//                 style: 'cancel',
//               },
//               {
//                 text: 'No',
//                 onPress: () => navigation.navigate('PlayerScreen',nav1obj),
//               },
//               {text: 'OK', onPress: () =>   navigation.navigate('PlayerScreen',nav2obj) },
//             ]
//           )
//         } else {
//           navigation.navigate('PlayerScreen',nav2obj) 
//         } 
//       }else{
//         navigation.navigate('PlayerScreen',nav1obj)
//       }
//     } else {   
//       const nav1obj = {id:data.episodes[0].id,ep:data.episodes.length,img:data.image,info:data.id};
//       if ( index >=0 && list ) {
//         const dub = list.split('-').includes('dub'); 
//         const t = dub ? list.split('-').indexOf('dub') : list;
//         const sub = dub ? list.split('-').slice(0,t ).concat(list.split('-').slice(t +1)).join("-") : list;  
//         const nav2obj = {id:sub,ep:data.episodes.length,img:data.image,info:data.id};      
//         if (subordub !== "sub" ) {
//           Alert.alert(
//             'Verification',
//             'Do you want to continue Watching from your left or start from the beginning ?',
//             [
//               {
//                 text: 'cancel',
//                 onPress: () =>{},
//                 style: 'cancel',
//               },
//               {
//                 text: 'No',
//                 onPress: () => navigation.navigate('PlayerScreen',nav1obj),
//                 style: 'cancel',
//               },
//               {text: 'OK', onPress: () =>   navigation.navigate('PlayerScreen',nav2obj) },
//             ]
//           )
//         } else {
//           navigation.navigate('PlayerScreen',nav2obj) 
//         } 
//       }else{
//         navigation.navigate('PlayerScreen',nav1obj)
//       }
//     }
//   }