import { View, Text ,Image,FlatList,Pressable } from 'react-native'
import React from 'react'
import { useNavigation } from '@react-navigation/native'
const Card = ({title,data}) => {
  const navigation = useNavigation();
  const renderItem = ({item,index})=>(
    <Pressable key={index} onPress={()=>navigation.navigate('DetaliScreen',{id:item.id})}>
     <View className="items-center "  >
       <Image 
         key={index}
         className="m-2 w-28 h-44 rounded-md "
         source={{uri:item.image}} 
         resizeMode="cover"
       />
         <Text numberOfLines={3}  className=" text-xs  h-16 w-28  m-1 text-center    text-white">
           {item.title.english ? item.title.english : item.title.romaji ? item.title.romaji : item.title.userPreferred }
         </Text>
     </View>
     </Pressable>
   );
  return (
    <View className="my-1">
      <Text className="text-sm font-bold uppercase mx-4 text-white">
       {title}
      </Text>
      <FlatList
        className="mt-1"
        nestedScrollEnabled={true} 
        data={data}
        renderItem={renderItem}
        horizontal
        showsHorizontalScrollIndicator={false}
      />
        
    </View>
  )
}

export default Card