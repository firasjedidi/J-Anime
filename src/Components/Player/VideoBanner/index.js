import { View, Text,Pressable,Dimensions } from 'react-native'
import React from 'react'
import {ChevronLeftIcon,EllipsisVerticalIcon ,} from 'react-native-heroicons/mini';
import { useNavigation } from '@react-navigation/native'
const VideoBanner = ({setActive,ep,unlaodplaybackInstance}) => {
  const navigation = useNavigation();
  const title = ep.split('-').join(" ");
  const { width: DEVICE_WIDTH} = Dimensions.get("window");
  return (
    <View className={` absolute top-0 duration-300 z-10 left-0 right-0   `}  style={{width:DEVICE_WIDTH}}>
      <View className="flex-row items-center   justify-between px-3 py-3  " >
        <View className="flex-row items-center">
          <Pressable   onPress={() => { unlaodplaybackInstance("stop");  navigation.goBack()}}>
            <ChevronLeftIcon size={40} color={"white"}  />
          </Pressable>
          <Text className='text-white  text-xl '>{title}</Text>
        </View>
        <Pressable onPress={() => setActive(prev => !prev)}>
          <EllipsisVerticalIcon size={30} color={"white"}  />
        </Pressable>
      </View>
    </View>
  )
}

export default VideoBanner