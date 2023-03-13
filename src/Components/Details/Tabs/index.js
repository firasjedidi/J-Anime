import { View, Text,Pressable, } from 'react-native'
import React,{useState} from 'react'
import {CardVer,EpisodesCard,ChaptersCard} from '../../index'
import {PlusIcon} from "react-native-heroicons/mini";
import { useDispatch } from 'react-redux';
import { addToList,addToManga,toggleFade } from '../../../Redux-Store/playList';
const Tabs = ({data}) => {
  const [activeTab,setActive] = useState(data.type === "MANGA" ? "Chapters" : "Episodes")
  const dispatch = useDispatch()
  const add = ()=>{
    if (data.type === "MANGA") {
      dispatch(addToManga({id:data.id,image:data.image,title:data.title}))
     
    } else {
      dispatch(addToList({id:data.id,image:data.image,title:data.title}))
      setTimeout(() => {
        dispatch(toggleFade())
      }, 3000);
      
    }
  }
  return (
    <>
      <Pressable onPress={add}  className="mx-6 mt-1 ">
        <PlusIcon size={30} color="#fff"/>
        <Text  className="text-gray-100 u ">{data.type === "MANGA" ? "My Manga List" :"My List"}</Text>
      </Pressable>
      <View className="py-3 px-3 flex-row items-center space-x-3 ">
        <View className={`border-b-2 ${activeTab === 'Episodes' || activeTab === "Chapters" ? ' border-white p-1' : 'border-none '}`}>
          <Pressable activeOpacity={0.5}  onPress={() => setActive(data.type === "MANGA" ? "Chapters" :"Episodes")} >
            <Text  className="text-gray-400 text-center ">{data.type === "MANGA" ? "Chapters" :"Episodes"}</Text>
          </Pressable>
        </View>
        <View className={`border-b-2 ${activeTab === 'Collection' &&' border-white p-1'}`}>
          <Pressable activeOpacity={0.5} onPress={() => setActive("Collection")}>
            <Text  className="text-gray-400 text-center" >{data.relations ? "Collection" :""}</Text>
          </Pressable>
        </View>
        <View className={`border-b-2 ${activeTab === 'recommendations' &&' border-white p-1'}`}>
          <Pressable activeOpacity={0.5} onPress={() => setActive("recommendations")}>
            <Text  className="text-gray-400 text-center" >{data.recommendations ? "recommendations" :""}</Text>
          </Pressable>
        </View>
      </View> 
      {getTab(activeTab,data)}
    </>
  )
}

export default Tabs

const  getTab = (tab,data) => {
  switch (tab) {
    case "Chapters":
      return (
        <View>
          <ChaptersCard data={data.chapters} img={data} />
        </View>
     )
    case "Episodes":
      return (
        <View>
          <EpisodesCard data={data.episodes} />
        </View>
     )
    
    case "recommendations":
      return( 
        <View>
          <CardVer data={data.recommendations} />
        </View>
      )
    case "Collection":
      return (
        <View>
          <CardVer data={data.relations} />
        </View>
      )
    default:
      return(
        <View>
          <EpisodesCard data={data.episodes} />
        </View>
      )
  }
}