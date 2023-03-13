import { View, Text ,Pressable,Image} from 'react-native'
import React from 'react'
import { useQuery } from 'react-query';
import sanitizeHtml from 'sanitize-html';
import { getAiring } from '../../../utlis/api';
import { InformationCircleIcon} from "react-native-heroicons/outline";
import { useNavigation } from '@react-navigation/native';
import { NewHotScel } from '../../skeletens';
const EveryoneWatching = () => {
    const navigation = useNavigation();
    const {data,error,status} = useQuery(['airing'],()=>getAiring(false),{caches:0});
    const date  = new Date()
  return (
    <>
        {status === "loading" &&  <NewHotScel/>}
        {status === "success" && (
            <>
                {data.filter(item=> item.releaseDate !=null && item.releaseDate == date.getFullYear()).map((item,index)=>(
                    <View key={index} className="w-full items-center">
                        <View>
                            <Image className=" w-96 h-40 rounded-md" source={{uri:item.cover}}/>
                        </View>
                        <View className="w-full px-2  flex-row space-x-2 justify-between items-center">
                            <View className=" h-auto w-40 p-1 ">
                                <Text className=" text-white rounded-md">
                                    {item.title.english ? item.title.english : item.title.romaji ? item.title.romaji : item.title.userPreferred }
                                </Text>
                            </View>
                            <Text className="text-gray-300 rounded-md">
                                {item.releaseDate ? item.releaseDate : "" }
                            </Text>
                            <Text className="text-gray-300  rounded-md">
                                {item.type}
                            </Text>
                            <Pressable onPress={()=>navigation.navigate("DetaliScreen",{id:item.id})}>
                                <InformationCircleIcon color={'white'} />
                            </Pressable>    
                        </View>
                        <Text numberOfLines={3} className="text-white h-auto w-full p-3 rounded-md">
                            {sanitizeHtml(item.description,{allowedTags: []})  }
                        </Text> 
                        <View className="w-full  p-3 flex-row space-x-3 ">
                        {item.genres.map((gener,i)=>(
                            <View className=""  key={i}>
                                <Text className="text-gray-300 text-xs   ">
                                    {gener}
                                </Text>
                            </View>
                        ))}
                        </View>
                    </View>
                ))}
            </>
        )}   
    </>
  )
}

export default EveryoneWatching