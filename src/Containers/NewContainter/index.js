import { View, Text,ScrollView,Pressable,Image } from 'react-native'
import React, {useState}   from 'react'
import { CommoningSoon,EveryoneWatching } from '../../Components'
import { ClockIcon,FireIcon } from 'react-native-heroicons/mini'
const NewContainer = () => {
    const [tab,setTab] = useState("soon")
  return (
    <>
        <Text className="text-white text-2xl mx-3 mt-1  font-semibold tracking-normal" >New&Hot</Text>
        <View className="flex-row items-center justify-evenly mt-4">
            <Pressable className={`${tab === "soon" ?  "bg-white p-3 rounded-2xl" :"p-3 rounded-2xl"} flex-row space-x-1 items-center`}  onPress={()=>setTab('soon')}>
                <Image className="w-5 h-5" resizeMode='contain' source={require("../../assets/popcorn.png")}/>
                <Text className={`${tab === "soon" ?  "" :"text-white"}`} >Comming soon</Text>
            </Pressable>
            <Pressable className={`${tab === "watching" ?  "bg-white p-3 rounded-2xl" :"p-3 rounded-2xl"} flex-row space-x-1 items-center`}  onPress={()=>setTab('watching')}>
                <Image className="w-5 h-5 " source={require("../../assets/fire.png")}/> 
                <Text  className={`${tab === "watching" ?  "" :"text-white"}`}>Everyone's watching</Text>  
            </Pressable>
        </View>
        <ScrollView showsVerticalScrollIndicator={false} className="w-full mt-2 mb-auto ">
            {getTab(tab)}
        </ScrollView>
    </>
  )
}

export default NewContainer

const  getTab = (tab) => {
    switch (tab) {
        case 'soon':
            return <CommoningSoon/>
        case 'watching':
            return <EveryoneWatching/>
        default:
            return <CommoningSoon/>
    }
}