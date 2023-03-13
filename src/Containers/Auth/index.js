import { View, Text,TextInput,TouchableOpacity } from 'react-native'
import React from 'react'
import { GoogleSign, FacebookSign,Login,Register} from '../../Components'
const AuthContainer = () => {
  return (
    <View className="flex-1 justify-center items-center w-full ">
        <View className="-mt-10 p-3">
            <Text className="font-semibold text-white text-xl  text-center ">いらっしゃいませ</Text>
            <Text className=" text-white text-[8px]  text-center">(Welcome to J-Anime)</Text>
        </View>
      
        <View className="w-full flex-col space-y-6 m-4 justify-center items-center">
            <Login/>
        </View>
        <View >
            <GoogleSign/>
            <FacebookSign/>
        </View>
    </View>
  )
}

export default AuthContainer