import { View, Pressable,Image,Text,Dimensions } from 'react-native'
import React, {  forwardRef,useImperativeHandle}  from 'react'
import {PlayIcon,PauseIcon,ForwardIcon,BackwardIcon,} from 'react-native-heroicons/mini';
import { useSelector,useDispatch } from 'react-redux'
import { covertToDub,covertToSub } from '../../../utlis/helpers/helper';
import { getPlayList } from '../../../utlis/graphql/querys/queryHandler';
import { AddVideoToPlaylist } from '../../../utlis/graphql/mutaions/mutaionsHandler';
const PlayPause =  forwardRef((props,ref) => {
  const {vidStatus,videoRef,setEp,ep,total,id}=props;
  const {skip} = useSelector(state => state.player);
  const { width: DEVICE_WIDTH} = Dimensions.get("window");
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
  const {current,videos, _id} = playList.playlist;
  delete current['__typename']
  const newCurrent = videos.find(video => video.id === sub || video.id === dub) || { id: episode, amount: 0 };
  delete newCurrent['__typename'];
  const added = await AddVideoToPlaylist({ newCurrent, addVideoToPlaylistId: _id, oldCurrent: current });
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
    <View className={` h-auto absolute bottom-1 duration-300 `} style={{width:DEVICE_WIDTH}}>
      <View className="flex-row items-center justify-center space-x-12  ">
        <Pressable onPress={handelPrev}>
          <BackwardIcon size={35} color={"white"} />
        </Pressable>
        <Pressable onPress={()=>handelSkip("-")} >
          <Image  source={require("../../../assets/rotate-left.png")}/>
          <Text className="text-white absolute self-center top-1 ">{skip.amount}</Text>
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
          <Text className="text-white absolute self-center top-1 ">{skip.amount}</Text>
        </Pressable>
        <Pressable  onPress={handelNext}>
          <ForwardIcon size={35} color={"white"}/>
        </Pressable>
      </View>
    </View>
  )
})

export default PlayPause