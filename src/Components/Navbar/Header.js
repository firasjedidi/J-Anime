import { Image, Pressable, View,Animated } from 'react-native'
import React from 'react'
import { useNavigation } from '@react-navigation/native'
import {MagnifyingGlassIcon} from "react-native-heroicons/outline";
import { useSelector} from 'react-redux';
const Header = ({backgroundStyle}) => {
  const navigation = useNavigation()
  const {user} = useSelector(state=>state.user);
  return (
    <View className='relative  z-10'>
      <Animated.View  className=' flex-row  justify-between h-12  p-3 absolute top-0 w-full transition-all ' style={[ backgroundStyle]} >
        <Image className=' h-8 w-8  ' source={{uri:user.image}}/>
        <View className="flex-row space-x-3   justify-between items-center "> 
          <Pressable onPress={()=>navigation.navigate("SearchStack")}>
            <MagnifyingGlassIcon   size={24} color={'gray'}  />          
          </Pressable>
          <Pressable onPress={()=>navigation.navigate("SettingsScreen")}>
            <Image className=' h-6 w-6'  source={{uri:user?.image}}/>
          </Pressable>
        </View>
      </Animated.View >
    </View>
  )
}

export default Header

