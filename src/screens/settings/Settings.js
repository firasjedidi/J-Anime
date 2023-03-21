import { View, Text,SafeAreaView, Animated ,Pressable,Image,Dimensions,Easing, } from 'react-native'
import React,{useState,useCallback} from 'react'
import Global from '../../../Global';
import { PencilIcon,ChevronRightIcon,Cog6ToothIcon ,XCircleIcon,ChevronUpIcon,ChevronDownIcon ,CheckIcon,ChevronLeftIcon} from 'react-native-heroicons/outline';
import { useSelector,useDispatch } from 'react-redux'
import {skipconfig,qualityconfig} from '../../Redux-Store/PlayerChange'
const Settings = ({navigation}) => {
  const {skip,quality} = useSelector(state => state.player);
  const dispatch = useDispatch();
  const [openQuality,setQuality] = useState(false);
  const [openSkip,setSkip] = useState(false);
  const [openAutoSkip,setAutoSkip] = useState(false);
  const [Quality,setSelectedQuality] = useState(quality);
  const [Skip,setSelectedSkip] = useState(skip);
  const screenHeight = Dimensions.get('window').height;
  const top = new Animated.Value(screenHeight);
  const scale = new Animated.Value(1);
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
  const  toggleModal = () => {
    Animated.timing(scale, {
      toValue: 0.9,
      duration: 300,
      useNativeDriver:false,
      easing: Easing.in()
    }).start()
    Animated.spring(top, {
      toValue: 85,
      useNativeDriver:false,
    }).start();
  };
  const  closeModal = () => {
    Animated.timing(scale, {
      toValue:1,
      duration: 300,
      useNativeDriver:false,
      easing: Easing.in()
    }).start()
    Animated.spring(top, {
      toValue: screenHeight,
      useNativeDriver:false,
      duration: 300,
      easing: Easing.out()
    },).start();
  };
  const select = (check,item) => {
    console.log(item);
    if (check) {
      dispatch(qualityconfig(item))
      setSelectedQuality(item)
    } else {
      dispatch(skipconfig(item))
      setSelectedSkip(item)
    }
  };
  return (
    <SafeAreaView style={Global.AndroidSafeArea}> 
      <Pressable className="flex-row items-center p-2 justify-start "  onPress={()=>navigation.goBack()}>
        <ChevronLeftIcon size={26} color={"white"}/>  
      </Pressable>
      <Pressable className="flex-row items-center mt-3 justify-center space-x-1" >
          <PencilIcon size={16} color={"gray"}/>
          <Text className=" text-slate-300" >Manage Profile</Text>
      </Pressable>
      <View className="mt-6">
        <Pressable className=" flex-row items-center justify-between h-14 mt-2 space-x-1 bg-white/10" onPress={()=>navigation.navigate("PlayListStack",{type:"Tv"})}>
          <View className="flex-row items-center px-2 space-x-3">
          <Image className="text-white" source={require("../../assets/playlist.png")} />
            <Text className=" text-gray-300">My List</Text>
          </View>
          <ChevronRightIcon size={25} color={"gray"}/>
        </Pressable>
        <Pressable className=" flex-row items-center justify-between h-14 mt-2 space-x-1 bg-white/10" onPress={()=>navigation.navigate("PlayListStack",{type:"MANGA"})}>
          <View className="flex-row items-center px-2 space-x-3">
            <Image source={require("../../assets/manga.png")}/>
            <Text className=" text-gray-300">My Manga List</Text>
          </View>
          <ChevronRightIcon size={25} color={"gray"}/>
        </Pressable>

        <Pressable className=" flex-row items-center justify-between h-14 mt-2 space-x-1 bg-white/10" onPress={toggleModal} >
          <View className="flex-row items-center px-2 space-x-3">
            <Cog6ToothIcon size={20} color={"white"}/>
            <Text className=" text-gray-300">Settings</Text>
          </View>
          <ChevronRightIcon size={25} color={"gray"}/>
        </Pressable>    
      </View>

      <Animated.ScrollView className="absolute bg-[#171717]   w-full h-full rounded-t-3xl" style={{ top:top }}> 
        <View className="flex-row mt-4 px-4  justify-between items-center">
          <Text className="text-gray-300  text-lg ">Settings</Text>
          <Pressable  onPress={closeModal}>
            <XCircleIcon size={30} color={"white"}/>
          </Pressable>
         
        </View>
        {/* onPress={()=>navigation.navigate("PlayListStack",{type:"MANGA"})} */}
        <Pressable className=" flex-row items-center justify-between h-14 px-3 mt-6 space-x-1 bg-white/10"  onPress={(e)=>setQuality(prev=>!prev)}>
          <View className="flex-row items-center space-x-3">
            <Image source={require("../../assets/hd.png")}/>
            <Text className=" text-gray-300">Video Quality: ({Quality.dispaly})</Text>
          </View>
          
          {openQuality ? <ChevronUpIcon size={25} color={"gray"}/>: <ChevronDownIcon size={25} color={"gray"}/>}
          
        </Pressable>
        <View className=" w-full h-auto ">
          {openQuality && (
            <>
              {qualityConfig.map((item,index)=>(
                  <Pressable key={index} className="transition-all ease-in bg-white/10 px-3 py-2  " onPress={(e)=>select(true,item)}>
                    {Quality.id == item.id ? 
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
            <Image source={require("../../assets/skip.png")}/>
            <Text className=" text-gray-300">Skip forward and back: ({Skip.dispaly})</Text>
          </View>
          {openSkip ? <ChevronUpIcon size={25} color={"gray"}/>: <ChevronDownIcon size={25} color={"gray"}/>}
        </Pressable>
        <View className=" w-full h-auto ">
          {openSkip && (
            <>
              {skipConfig.map((item,index)=>(
                  <Pressable key={index} className="transition-all ease-in bg-white/10 px-3 py-2 "  onPress={(e)=>select(false,item)}>
                     {Skip.amount == item.amount ? 
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
            <Image source={require("../../assets/forward.png")}/>
            <Text className=" text-gray-300">Auto Skip</Text>
          </View>
          {openAutoSkip ? <ChevronUpIcon size={25} color={"gray"}/>: <ChevronDownIcon size={25} color={"gray"}/>}
        </Pressable>
        <View className=" w-full h-auto ">
          {openAutoSkip && (
            <>
              {skipConfig.map((item,index)=>(
                  <Pressable key={index} className="transition-all ease-in bg-white/10 px-3 py-2 "  onPress={(e)=>select(false,item)}>
                     {Skip.amount == item.amount ? 
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
      </Animated.ScrollView>
    </SafeAreaView>
  )
}

export default Settings