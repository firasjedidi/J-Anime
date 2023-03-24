import { View, Text ,Image,FlatList,Pressable } from 'react-native';
import { EllipsisVerticalIcon,InformationCircleIcon,TrashIcon} from "react-native-heroicons/outline";
import React,{useState} from 'react';
import { useNavigation } from '@react-navigation/native'
const ContinueCard = ({title,data}) => {
    const navigation = useNavigation();

    const renderItem = ({item,index})=>(
       <>
            <Pressable className="  m-1" key={index} onPress={()=>navigation.navigate('PlayerScreen',{ep:item.current.id,id:item._id})}>
                <View className="items-center bg-white/10   rounded-sm "  >
                    <Image 
                        key={index}
                        className="m-2 w-40	h-44 rounded-md "
                        source={{uri:item.image}} 
                        resizeMode="cover"
                    />
                    <View className="flex-row justify-between  h-12 w-40 items-center">
                        <Text numberOfLines={3}  className=" text-xs  text-center    text-white">
                            {item.name }
                        </Text> 
                        <Pressable onPress={()=>navigation.navigate('DetaliScreen',{id:item.info})}>
                            <InformationCircleIcon size={24} color={"white"} />
                        </Pressable>
                    </View>  
                </View>
               
            </Pressable>
       </> 
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

export default ContinueCard