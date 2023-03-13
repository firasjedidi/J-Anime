import { View, Text,Pressable } from 'react-native'
import React from 'react'
import { XMarkIcon} from "react-native-heroicons/mini";
import { useSelector,useDispatch } from 'react-redux'
import { toggleView, ChangeView ,ChangeGener} from '../../Redux-Store/HeaderChange';
const Views = () => {
    const {openView , view } = useSelector(state=>state.header)
    const views = ['Home','Anime','Movies'] 
    const dispatch = useDispatch()
    const onPress=(view)=>{
        dispatch(ChangeView(view)) 
        dispatch(toggleView())
        dispatch(ChangeGener(''))
    }
  return (
    <>
      {
        openView && (
            <View className=" bg-black/[0.9] collapse h-full w-full  z-50 items-center justify-center    " > 
                <View className=' mt-20 items-center  space-y-8'>
                    {views.map((item,index)=>(
                        <Pressable underlayColor={"transparent"} key={index} activeOpacity={0.5}    onPress={()=>onPress(item)}>
                        <Text className={`${item ===  view ? 'text-white text-xl ': 'text-gray-400 text-lg ' } `} > {item}</Text>
                        </Pressable> 
                    ))}
                </View> 
                <Pressable underlayColor={"transperent"} activeOpacity={0.5} onPress={()=>dispatch(toggleView())} >
                    <View className="bg-white  w-14 h-14 my-6 justify-center items-center rounded-full ">
                        <XMarkIcon  size={26} color="black"  />
                    </View> 
                </Pressable>    
          </View>
        )
      }
    </>
  )
}

export default Views