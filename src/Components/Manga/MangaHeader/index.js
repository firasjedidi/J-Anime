import { View, Text,Pressable} from 'react-native'
import React from 'react'
import { ChevronLeftIcon, ForwardIcon,BackwardIcon } from 'react-native-heroicons/mini'
import { useNavigation } from '@react-navigation/native'
const MangaHeader = ({header,setP,cp,p}) => {
    const title = header.title.split(":").slice(0,1).join(" ")
    const subTitle = header.title.split(":").slice(-1).join(" ").split("page").slice(0,1).join(" ")
    const navigation = useNavigation()
    const chapter = p.split("$").slice(0,1).join(" ");
    const chapterPart2 = p.split("$").slice(-1).join(" ");
    console.log(chapter,chapterPart2,p);
    const next = () => { 
        var  ch =  chapter.split("-").slice(-1)
        var cNum= parseInt(ch)+1
        if (cNum <= cp) {
            var nextCh = chapter.split("-").slice(0,-1).concat(cNum).join("-").concat(`$$${chapterPart2}`) 
            setP(nextCh)    
        }
    }
    const prev = () => { 
        var  ch =  chapter.split("-").slice(-1)
        var cNum = parseInt(ch)-1
        if (cNum >0) {
            var prevCh = chapter.split("-").slice(0,-1).concat(cNum).join("-").concat(`$$${chapterPart2}`)
            setP(prevCh) 
        }
    }
  return (
    <View className="fixed w-full top-0 left-0 right-0">
        <View className="flex-row items-center justify-start flex-wrap w-full  py-3 px-2 bg-white/10 ">
            <Pressable  onPress={()=>navigation.goBack()}>
                <ChevronLeftIcon size={40} color={'white'}/>
            </Pressable>
            <View className="w-full flex-1 ml-1">
                <Text className="text-white text-base">{title}</Text>
                <Text className=" text-gray-400 text-xs">{subTitle}</Text>
            </View>
            <View className="w-full flex-1 flex-row justify-evenly ml-1">
                <Pressable
                    onPress={prev}
                 >
                    < BackwardIcon size={30} color={'white'}  />
                </Pressable>
                <Pressable 
                    onPress={next}
                >
                    < ForwardIcon size={30} color={'white'}  />
                </Pressable>
            </View>
        </View>
    </View>
  )
}

export default MangaHeader