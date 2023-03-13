import { View, Text ,Image,Pressable} from 'react-native'
import React from 'react'
import { useNavigation } from '@react-navigation/native'
const CardVer = ({title,data}) => {  
    const navigation = useNavigation()
    const handelNavigation =(item)=>{
        if (item.type == "MANGA") {
            navigation.navigate('MangaScreen',{id:item.id})
        } else {
            navigation.navigate('DetaliScreen',{id:item.id})
        }
    }
  return (
    <View className="my-1  " >
        <Text className="text-sm font-bold uppercase mx-4 text-white">
        {title}
        </Text>
 
        <View className="w-full h-auto flex-row p-1  flex-wrap justify-evenly ">  
            {
                 data
              ?
               (
                <> 
                    {
                        data.map((item,index)=>(
                            <Pressable key={index} onPress={()=>handelNavigation(item)}>
                                <View className="items-center  " >
                                    <Image 
                                        className=" p-1 w-28 h-44 rounded-md "
                                        source={{uri:item.image }} 
                                        resizeMode="cover"
                                    />
                                    <Text numberOfLines={3} className=" text-xs   w-28  m-1 text-center    text-white">
                                        {item.title.english ? item.title.english : item.title.romaji  ? item.title.romaji : item.title ? item.title.userPreferred : item.title.native}
                                    </Text>
                                </View>
                            </Pressable>
                        ))
                    }
                </> 
                ): ""}   
        </View>
    </View>
  )
}

export default CardVer