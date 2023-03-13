import { View, Text,Pressable} from 'react-native'
import React from 'react'
import { ChevronLeftIcon, ForwardIcon,BackwardIcon } from 'react-native-heroicons/mini'
import { useNavigation } from '@react-navigation/native'
const MangaHeader = ({header,setP,cp}) => {
    var title = header.split("-").indexOf("chapter")
    var subTitle = header.split("-").slice(title,header.length).join(" ")
    const navigation = useNavigation()
    const n = () => { 
        var  c =  header.split("-").slice(-1)
        var cNum=parseInt(c)+1
        if (cNum <= cp) {
            var t = header.split("-").slice(0,-1).concat(cNum).join("-")
            setP(t)    
        }
    }
    const p = () => { 
        var  c =  header.split("-").slice(-1)
        var cNum=parseInt(c)-1
        if (cNum >0) {
            var t = header.split("-").slice(0,-1).concat(cNum).join("-")
            setP(t) 
        }
    }
  return (
    <View className="fixed w-full top-0 left-0 right-0">
        <View className="flex-row items-center justify-start flex-wrap w-full  py-3 px-3 bg-white/10 ">
            <Pressable  onPress={()=>navigation.goBack()}>
                <ChevronLeftIcon size={30} color={'white'}/>
            </Pressable>
            <View className="w-full flex-1 ml-2">
                <Text className="text-white text-lg">{header.split("-").slice(0,title).join(" ")}</Text>
                <Text className=" text-gray-200 text-xs">{subTitle}</Text>
            </View>
            <View className="w-full flex-1 flex-row justify-evenly ml-2">
                <Pressable onPress={p}>
                    < BackwardIcon size={30} color={'white'}  />
                </Pressable>
                <Pressable onPress={n}>
                    < ForwardIcon size={30} color={'white'}  />
                </Pressable>
            </View>
        </View>
    </View>
  )
}

export default MangaHeader