import { View, Pressable,Image,Text } from 'react-native'
import React, {  forwardRef,useImperativeHandle}  from 'react'
import {PlayIcon,PauseIcon,ForwardIcon,BackwardIcon,} from 'react-native-heroicons/mini';
import { useSelector,useDispatch } from 'react-redux'
import { checkvideo,updateWatching } from '../../../Redux-Store/PlayerChange'
import { covertToDub,covertToSub } from '../../../utlis/helpers/helper';
import { getPlayList } from '../../../utlis/graphql/querys/queryHandler';
import { AddVideoToPlaylist } from '../../../utlis/graphql/mutaions/mutaionsHandler';
const PlayPause =  forwardRef((props,ref) => {
  const {vidStatus,videoRef,setEp,ep,total,toggleControllers,id}=props;
  const dispatch = useDispatch();
  const {watching,skip} = useSelector(state => state.player);
  const handelPlayOrPause = async () => {
    if (!vidStatus.isLoaded) return false;
    vidStatus.isPlaying
    ? await videoRef.current.pauseAsync()
    : await  videoRef.current.playAsync();
  }
  const handel = async (episode)=>{
    const sub = covertToSub(episode);
    const dub = covertToDub(episode);
    const playList = await getPlayList(id);
    const {current,videos,subordub, _id} = playList.playlist;
    delete current['__typename']
    const oldCurrent = current
    if (videos.length >0) {
      let newCurrent = videos.find(video => video.videoId === sub || dub )
      if (newCurrent) {
        delete newCurrent['__typename']
        const added = await AddVideoToPlaylist({newCurrent,addVideoToPlaylistId:_id,oldCurrent})
        console.log(added,'videos array');
      }
    } else {
      const newCurrent = {id:episode,amount:0}
      const added = await AddVideoToPlaylist({newCurrent,addVideoToPlaylistId:_id,oldCurrent})
      console.log(added,"current");
    }
}
  const handelNext = () => {  
    var s = ep.split("-").slice(-1);
    var epNum = parseInt(s)+1;
    if(epNum <= total){
      var t = ep.split("-").slice(0,-1).concat(epNum).join("-");
      handel(t);
      setEp(t);   
    }
  }
  const handelPrev = () => {
    var s = ep.split("-").slice(-1);
    var epNum = parseInt(s)-1;
    if(epNum >= 1){
      var t = ep.split("-").slice(0,-1).concat(epNum).join("-");
      handel(t);
      setEp(t);   
    }
  }
  const handelSkip = async(skiped) => {
    if (!vidStatus.isLoaded) return false;
    const currentTime = vidStatus.positionMillis;
    skiped == "-" 
    ? await videoRef.current.setPositionAsync(currentTime + -skip?.amount * 1000) && await  videoRef.current.playAsync() 
    : await videoRef.current.setPositionAsync(currentTime + skip?.amount * 1000) && await  videoRef.current.playAsync();
  }
  useImperativeHandle(ref, () => ({
    finshed() {
      handelNext()
    },
  }))
  return (
    <View className={` w-full h-full absolute  -bottom-[90%] ${toggleControllers ? ' opacity-0 ':'opacity-1'}`} >
      <View className="flex-row items-center justify-center space-x-12 ">
        <Pressable onPress={handelPrev}>
          <BackwardIcon size={35} color={"white"} />
        </Pressable>
        <Pressable onPress={()=>handelSkip("-")} >
          <Image  source={require("../../../assets/rotate-left.png")}/>
          <Text className="text-white absolute self-center top-2 ">{skip.amount}</Text>
        </Pressable>
        <Pressable onPress={handelPlayOrPause}>
          {
            vidStatus.isPlaying 
            ? 
            <PauseIcon size={35} color={"white"}/>
            :
            <PlayIcon size={35} color={"white"} /> 
          }
        </Pressable>
        <Pressable onPress={()=>handelSkip()}  >
          <Image  source={require("../../../assets/rotate-right.png")}/>
          <Text className="text-white absolute self-center top-2 ">{skip.amount}</Text>
        </Pressable>
        <Pressable  onPress={handelNext}>
          <ForwardIcon size={35} color={"white"}/>
        </Pressable>
      </View>
    </View>
  )
})

export default PlayPause