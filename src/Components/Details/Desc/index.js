import { View, Text,Pressable, } from 'react-native'
import React, {useState} from 'react'
import sanitizeHtml from 'sanitize-html';
const Desc = ({data}) => {
  const [expand,setExpand] = useState(false)
  return (
    <View className="m-auto mt-8 px-6 justify-center items-center" >
      <Pressable onPress={()=>setExpand(prev => !prev)} className={`${expand ? "h-auto": "h-auto"}`}>
        <Text numberOfLines={expand === false ? 5 : 0} className="text-gray-200">
          {sanitizeHtml(data.description,{allowedTags: [],})}
        </Text>
      </Pressable>
     
    </View> 
  )
}

export default Desc