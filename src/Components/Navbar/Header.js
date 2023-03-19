import { Image, Pressable, View,Animated } from 'react-native'
import React from 'react'
import { useNavigation } from '@react-navigation/native'
import {MagnifyingGlassIcon} from "react-native-heroicons/outline";

const Header = ({backgroundStyle}) => {
  const navigation = useNavigation()
  return (
    <View className='relative  z-10'>
      <Animated.View  className=' flex-row  justify-between h-12  p-3 absolute top-0 w-full transition-all ' style={[ backgroundStyle]} >
        <Image className=' h-8 w-8  ' source={{uri:"https://upload.wikimedia.org/wikipedia/commons/6/67/NewNetflixLogo.png"}}/>
        <View className="flex-row space-x-3   justify-between items-center "> 
          <Pressable onPress={()=>navigation.navigate("SearchStack")}>
            <MagnifyingGlassIcon   size={24} color={'gray'}  />          
          </Pressable>
          <Pressable onPress={()=>navigation.navigate("SettingsScreen")}>
            <Image className=' h-5 w-5'  source={{uri:"https://upload.wikimedia.org/wikipedia/commons/0/0b/Netflix-avatar.png"}}/>
          </Pressable>
        </View>
      </Animated.View >
    </View>
  )
}

export default Header

