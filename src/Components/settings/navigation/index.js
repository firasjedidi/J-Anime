import { View, Text ,Pressable,Image} from 'react-native'
import React from 'react'
import { PencilIcon,ChevronRightIcon,Cog6ToothIcon ,ChevronLeftIcon} from 'react-native-heroicons/outline';
import { useNavigation } from '@react-navigation/native';
const SettingNavigation = ({toggleModal,toggleModalProfile}) => {
    const navigation = useNavigation();
  return (
    <>
      <Pressable className="flex-row items-center p-2 justify-start "  onPress={()=>navigation.goBack()}>
        <ChevronLeftIcon size={26} color={"white"}/>  
      </Pressable>
      <Pressable className="flex-row items-center mt-3 justify-center space-x-1" onPress={toggleModalProfile} >
          <PencilIcon size={16} color={"gray"}/>
          <Text className=" text-slate-300" >Manage Profile</Text>
      </Pressable>
      <View className="mt-6">
        <Pressable className=" flex-row items-center justify-between h-14 mt-2 space-x-1 bg-white/10" onPress={()=>navigation.navigate("PlayListStack",{type:"Tv"})}>
          <View className="flex-row items-center px-2 space-x-3">
          <Image className="text-white" source={require("../../../assets/playlist.png")} />
            <Text className=" text-gray-300">My List</Text>
          </View>
          <ChevronRightIcon size={25} color={"gray"}/>
        </Pressable>
        <Pressable className=" flex-row items-center justify-between h-14 mt-2 space-x-1 bg-white/10" onPress={()=>navigation.navigate("PlayListStack",{type:"MANGA"})}>
          <View className="flex-row items-center px-2 space-x-3">
            <Image source={require("../../../assets/manga.png")}/>
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
    </>
  )
}

export default SettingNavigation