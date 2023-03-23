import { View, Text, Animated ,Pressable,Image, Switch } from 'react-native'
import React,{useState} from 'react'
import { useSelector,useDispatch } from 'react-redux'
import { XCircleIcon,ChevronUpIcon,ChevronDownIcon ,CheckIcon,} from 'react-native-heroicons/outline';
import {skipconfig,qualityconfig,SkipIntro,SkipNext} from '../../../Redux-Store/PlayerChange'
const skipConfig = [
    {dispaly:"5 seconds",amount:5},{dispaly:"10 seconds",amount:10},
    {dispaly:"15 seconds",amount:15},{dispaly:"20 seconds",amount:20},
    {dispaly:"25 seconds",amount:25},{dispaly:"30 seconds",amount:30}
  ]
const qualityConfig = [
    {dispaly:"360p",id:0},{dispaly:"480p",id:1},
    {dispaly:"720p",id:2},{dispaly:"1080p",id:3},
    {dispaly:"Default",id:4},
]
const VideoSettings = ({top,closeModal}) => {
    const {skip,quality,autoIntro,autoNext} = useSelector(state => state.player);
    const dispatch = useDispatch();
    const [openQuality,setQuality] = useState(false);
    const [openSkip,setSkip] = useState(false);
    const [openAutoSkip,setAutoSkip] = useState(false);
    const selectQuality = (item) => {
        dispatch(qualityconfig(item))
    };
    const selectSkip = (item) => {
        dispatch(skipconfig(item))
    }
    const introSwitch = ()=>{
        dispatch(SkipIntro(!autoIntro))
    }
    const nextSwitch = ()=>{
        dispatch(SkipNext(!autoNext))
    }
  return (
    <Animated.ScrollView className="absolute bg-[#171717]   w-full h-screen rounded-t-3xl" style={{ top:top }}> 
        <View className="flex-row mt-4 px-4  justify-between items-center">
          <Text className="text-gray-300  text-lg ">Settings</Text>
          <Pressable  onPress={closeModal}>
            <XCircleIcon size={30} color={"white"}/>
          </Pressable>
         
        </View>
        <Pressable className=" flex-row items-center justify-between h-14 px-3 mt-6 space-x-1 bg-white/10"  onPress={(e)=>setQuality(prev=>!prev)}>
          <View className="flex-row items-center space-x-3">
            <Image source={require("../../../assets/hd.png")}/>
            <Text className=" text-gray-300">Video Quality: ({quality.dispaly})</Text>
          </View>
          {openQuality ? <ChevronUpIcon size={25} color={"gray"}/>: <ChevronDownIcon size={25} color={"gray"}/>}
        </Pressable>
        <View className=" w-full h-auto ">
          {openQuality && (
            <>
              {qualityConfig.map((item,index)=>(
                  <Pressable key={index} className="transition-all ease-in bg-white/10 px-3 py-2  " onPress={(e)=>selectQuality(item)}>
                    {quality.id == item.id ? 
                      <View  className="flex-row items-center justify-between">
                        <Text className="text-gray-300">{item.dispaly}</Text>
                        <CheckIcon size={20} color={"white"}/>
                      </View> 
                      :
                      <Text className="text-gray-300">{item.dispaly}</Text>
                    }
                  </Pressable>
                ))}
            </>
          )}
        </View>
        <Pressable className=" flex-row items-center justify-between h-14 mt-2  px-3 space-x-1 bg-white/10"  onPress={(e)=>setSkip(prev=>!prev)}>
          <View className="flex-row items-center  space-x-3">
            <Image source={require("../../../assets/skip.png")}/>
            <Text className=" text-gray-300">Skip forward and back: ({skip.dispaly})</Text>
          </View>
          {openSkip ? <ChevronUpIcon size={25} color={"gray"}/>: <ChevronDownIcon size={25} color={"gray"}/>}
        </Pressable>
        <View className=" w-full h-auto ">
          {openSkip && (
            <>
              {skipConfig.map((item,index)=>(
                  <Pressable key={index} className="transition-all ease-in bg-white/10 px-3 py-2 "  onPress={(e)=>selectSkip(item)}>
                     {skip.amount == item.amount ? 
                      <View  className="flex-row items-center justify-between" >
                        <Text className="text-gray-300">{item.dispaly}</Text>
                        <CheckIcon size={20} color={"white"}/>
                      </View> 
                      :
                      <Text className="text-gray-300">{item.dispaly}</Text>
                    }
                  </Pressable>
                ))}
            </>
          )}
        </View>
        <Pressable className=" flex-row items-center justify-between h-14 mt-2  px-3 space-x-1 bg-white/10"  onPress={(e)=>setAutoSkip(prev=>!prev)}>
          <View className="flex-row items-center  space-x-3">
            <Image source={require("../../../assets/forward.png")}/>
            <Text className=" text-gray-300">Auto Skip</Text>
          </View>
          {openAutoSkip ? <ChevronUpIcon size={25} color={"gray"}/>: <ChevronDownIcon size={25} color={"gray"}/>}
        </Pressable>
        <View className=" w-full h-auto ">
          {openAutoSkip && (
            <View className="transition-all ease-in bg-white/10 px-3  " >
                <View className="flex-row items-center  ">
                    <Text className=" text-gray-300">Auto Skip Intro </Text>
                    <Switch
                        trackColor={{false: '#767577', true: '#2d79fc'}}
                        thumbColor={'#fff'}
                        value={autoIntro}
                        onValueChange={introSwitch}
                       
                    />
                </View>
                <View className="flex-row items-center ">
                    <Text className=" text-gray-300">Auto Skip Next </Text>
                    <Switch
                        value={autoNext}
                        trackColor={{false: '#767577', true: '#2d79fc'}}
                        onValueChange={nextSwitch}
                        thumbColor={'#fff'}
                    />
                </View>
             
            </View>
          )}
        </View>
      </Animated.ScrollView>
  )
}

export default VideoSettings