import { Text, SafeAreaView ,ScrollView,Pressable} from 'react-native'
import React from 'react'
import { useSelector } from 'react-redux'
import { ChevronLeftIcon} from 'react-native-heroicons/outline';
import { CardVer } from '../../Components'
import Global from '../../../Global';
const PlayList = ({route ,navigation }) => {
  const {type} = route.params;
  const {list,manga} = useSelector(state => state.playList);
  if(type !== "MANGA" && list.length > 0  || type === "MANGA" && manga.length > 0 ){
    return (
      <SafeAreaView style={Global.AndroidSafeArea}>
        <ScrollView className="mt-2">
          <Pressable className="flex-row px-2 items-center" onPress={(e)=>navigation.goBack()}> 
            <ChevronLeftIcon size={30} color={"white"}/>
            <Text className="text-white mx-8 text-2xl font-bold tracking-wide uppercase">{type === "MANGA" ? "My Manga List" :"My List"}</Text>
          </Pressable>
          <CardVer  data={type === "MANGA" ? manga : list} />
        </ScrollView>
      </SafeAreaView>
    )
  }else{
    return ( 
      <SafeAreaView style={Global.AndroidSafeArea}> 
        <Pressable  className="flex-row mt-1 px-2 items-center" onPress={(e)=>navigation.goBack()}> 
          <ChevronLeftIcon   size={30} color={"white"}/>   
          <Text className="text-white mx-8 text-2xl font-bold tracking-wide uppercase">{type === "MANGA" ? "My Manga List" :"My List"}</Text>
        </Pressable>
        <Text className="text-white mx-auto mt-8 text-md font-bold tracking-wide ">Your {type === "MANGA" ? "Manga List" :"List"} is empty</Text>
      </SafeAreaView>
    )
  }
}


export default PlayList