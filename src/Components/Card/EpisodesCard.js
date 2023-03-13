import { View, Text,Image,ScrollView ,Pressable} from 'react-native'
import React, { useState }  from 'react'
import sanitizeHtml from 'sanitize-html';
import { PlayIcon} from "react-native-heroicons/mini";
import { useSelector } from 'react-redux';
const EpisodesCard = ({data}) => {
  const {watching} = useSelector(state => state.player);
  var t = data[0]?.id.split('-').indexOf('episode');
  var y = data[0]?.id.split('-').slice(0,t).join(" ");
  var  index ;
  var  id;  
  if (watching?.length > 0 ) {
    index = watching.findIndex((watch)=> watch?.id === y);
    id = watching[index]?.current.id;
  }else{
    index =-1;
    id = ""; 
  }
  const current = index >= 0 && id ? id.split('-').slice(-1) :  data[0]?.id ?  data[0]?.id.split('-').slice(-1) : 1 ;
  const pageSize = 25;
  const [selectedPage, setSelectedPage] = useState(Math.ceil(current / pageSize));
  const totalPageCount = Math.ceil(data.length / pageSize);
  const pages = new Array(totalPageCount).fill(0);
  return (
    <View className="my-1 ">
      <ScrollView className="mb-5 ml-3" horizontal={true} showsHorizontalScrollIndicator={false} >
        {pages.map((_, i) =>(
          <Pressable key={i} onPress={()=>setSelectedPage(i+1)}>
            <View className={`rounded-md px-4 py-2  ${i === 0 ? 'ml-0' : 'ml-4'} ${i + 1 === selectedPage ? 'bg-white/25' : 'bg-white/10 ' }`}>
              <Text className="text-white text-xs">
                {i + 1 === 1 ? 1 : i * pageSize + 1} - {""}
                {i + 1 === 1 ? i === pages.length - 1 ? data.length : pageSize : i === pages.length - 1 ? data.length : pageSize * (i + 1) + 1  }
              </Text>
            </View>
          </Pressable>
        ))}
      </ScrollView>
      <View className="h-auto">
      {
        data.slice(
          selectedPage === 1 ? 0 : (selectedPage - 1) * pageSize,
          selectedPage === 1 ? pageSize : pageSize * selectedPage + 1
        )
        .map((ep,index)=>(
            <View className="max-auto  items-center my-1  w-full mb-2 " key={index}>
                <View className="flex-row  w-full m-2 ml-10 items-center space-x-6">
                    <View className=" relative  w-32 h-16 items-center ">
                      <Image className="w-32 h-16 rounded-md" source={{uri:ep.image}}/>
                      <View className="absolute self-center w-7 h-7 bottom-5 border-2 rounded-full bg-black/60  border-white items-center   ">
                        <PlayIcon  style={{position:"absolute",alignSelf:"center",top:4}}  size={16} color="white"/>
                      </View>
                      {watching.map((item )=> 
                        item?.id === y ?
                          item?.current.id  === ep.id ?   
                            <View key={item?.id} className=" bg-blue-500 h-1 absolute left-0  bottom-0"  style={{width: item?.current.amount+"%"}}   />
                          :
                          item?.list &&  item?.list.map(it=>
                            it?.id === ep.id ?
                              <View key={it?.id} className=" bg-blue-500 h-1 absolute left-0  bottom-0"  style={{width: it?.amount+"%"}}   />
                            : 
                              null 
                          ) 
                        :
                        null 
                      )}
                      
                    </View>
                    <View  className=" w-48 h-auto">
                      <Text className="text-white  ">{ep.title ? ep.number + "." : ""} {ep.title ? ep.title : ep.id.split("-").join(" ")}</Text>
                    </View>
                </View>
                <View className="px-3">
                    <Text numberOfLines={3} className="text-gray-400 text-xs  ">{sanitizeHtml(ep.description,{allowedTags: [],})}</Text>
                </View>
            </View>
        ))
      }
      </View>
    </View>
  )
}

export default EpisodesCard