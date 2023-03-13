import { View, Text,ScrollView,Pressable } from 'react-native'
import React from 'react'
import { XMarkIcon} from "react-native-heroicons/mini";
import { getGenres } from '../../utlis/api';
import { useDispatch, useSelector } from 'react-redux';
import { toggleCategories , ChangeView , ChangeGener} from '../../Redux-Store/HeaderChange';

const Categories = () => {
    const {openCategories,gener,view}=useSelector(state => state.header)
    const dispatch = useDispatch()
    const onPress=(view)=>{
      return view === 'Home' ?
      dispatch(ChangeView(view)) && dispatch(toggleCategories()) && dispatch(ChangeGener(''))
      : 
      dispatch(ChangeGener(view)) && dispatch(toggleCategories())
    }
  return (
    <>
      {openCategories && (
        <View className=" bg-black/[0.9] collapse h-full w-full  z-50 items-center justify-center    " > 
          <ScrollView showsVerticalScrollIndicator={false}>
            <View className=' mt-20 items-center  space-y-8'>
              {
                getGenres.map((item,index)=>(
                  <Pressable underlayColor={"transparent"} key={index} activeOpacity={0.5}    onPress={()=>onPress(item)}>
                    <Text className={`${item === gener || item === view && !gener ? 'text-white text-xl ': 'text-gray-400 text-lg ' } `} > {item}</Text>
                  </Pressable> 
               ))
              } 
            </View> 
          </ScrollView> 
          <Pressable underlayColor={"transperent"} activeOpacity={0.5} onPress={()=>dispatch(toggleCategories())} >
            <View className="bg-white  w-14 h-14 my-6 justify-center items-center rounded-full ">
                <XMarkIcon  size={26} color="black"  />
            </View> 
          </Pressable>    
        </View>
      )}
    </>
  )
}

export default Categories