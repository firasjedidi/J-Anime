import { View, Text,Pressable } from 'react-native'
import React from 'react'
import {ChevronLeftIcon,EllipsisVerticalIcon ,} from 'react-native-heroicons/mini';
import { useNavigation } from '@react-navigation/native'
const VideoBanner = ({setActive,ep,toggleControllers,unlaodplaybackInstance}) => {
  const navigation = useNavigation();
  const title = ep.split('-').join(" ");
  return (
    <>
     <View className={`absolute top-0 left-0 right-0 py-3 px-3  ${toggleControllers ? ' opacity-0 ':'opacity-1'}`}>
        <View className="flex-row items-center  w-full  justify-between ">
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
    </>
  )
}

export default VideoBanner