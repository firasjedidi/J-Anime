import { View, Text,Image,ScrollView ,Pressable} from 'react-native'
import React, { useState }  from 'react';
const ChaptersCard = ({data,img}) => {

  const [selectedPage, setSelectedPage] = useState(1);
  const pageSize = 25;
  const totalPageCount = Math.ceil(data.length / pageSize);
  // Math.ceil(100 / 25) for getting the certen page 
  const pages = new Array(totalPageCount).fill(0);
 
  return (
    <View className="my-1  ">
      <ScrollView className="mb-5 ml-3" horizontal={true} showsHorizontalScrollIndicator={false} >
        {pages.map((_, i) =>(
          <Pressable key={i} onPress={()=>setSelectedPage(i+1)}>
            <View className={`rounded-md px-4 py-2  ${i === 0 ? 'ml-0' : 'ml-4'} ${i + 1 === selectedPage ? 'bg-white/40' : 'bg-white/10 ' }`}>
              <Text className="text-white text-xs">
                {i + 1 === 1 ? 1 : i * pageSize + 1} -{" "}
                {i + 1 === 1 ? i === pages.length - 1 ? data.length: pageSize : i === pages.length - 1 ? data.length : pageSize * (i + 1) + 1  }
              </Text>
            </View>
          </Pressable>
        ))}
      </ScrollView>
      {
        data.slice(
          selectedPage === 1 ? 0 : (selectedPage - 1) * pageSize,
          selectedPage === 1 ? pageSize : pageSize * selectedPage + 1
        )
        .map((ch,index)=>(
            <View className="mx-auto items-center my-1 w-full h-auto" key={index}>
                <View className="flex-row  w-full m-2 ml-10 items-center space-x-6">
                  <View className="   w-32 h-16 items-center ">
                        <Image className="w-32 h-16 rounded-sm" source={{uri:img.cover}}/>
                    </View>
                    <View  className=" w-48 h-auto">
                        <Text className="text-white  ">{ch.title ? ch.number + "." : ""} {ch.title ? ch.title : ch.id.split("-").join(" ")}</Text>
                    </View>
                </View>
            </View>
        ))
      }
    </View>
  )
}

export default ChaptersCard