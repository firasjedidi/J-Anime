import { View, Image,Pressable } from 'react-native'
import React from 'react'
import { XMarkIcon} from "react-native-heroicons/mini"
import { openPlayer } from '../../../Redux-Store/PlayerChange'
import { useDispatch } from 'react-redux'
import { useNavigation } from '@react-navigation/native'
const TopImage = ({cover}) => {
  const dispatch = useDispatch()
  const navigation = useNavigation()
  return (
    <View className="w-full relative  h-[215px] ">
      <Image className="w-full h-full"  source={{uri:cover}}/>
      <Pressable className="absolute right-2 top-8 w-6 h-6  border-[1px] rounded-full bg-black/60  border-white items-center   " onPress={()=>{dispatch(openPlayer(false));navigation.goBack()}}>
        <XMarkIcon 
          style={{
            position:"absolute" , 
            alignSelf:'center'
          }} 
          color={"white"} 
          size={20}
        />
      </Pressable>
    </View>
  )
}

export default TopImage