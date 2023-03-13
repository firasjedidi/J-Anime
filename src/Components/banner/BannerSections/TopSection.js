import { View, Text,Pressable ,FlatList} from 'react-native'
import React from 'react'
import {LinearGradient} from 'expo-linear-gradient';
import { ChevronDownIcon} from "react-native-heroicons/mini";
import { useDispatch ,useSelector} from 'react-redux';
import { ChangeView, toggleCategories , toggleView } from '../../../Redux-Store/HeaderChange';
const TopSection = () => {
  const {gener,view}=useSelector(state => state.header)
  const dispatch=useDispatch()
  return (
    <View className=" ">
       <LinearGradient  
          colors={[
            'black', 'transparent'
          ]}
          locations={[0,1]}
        >         
          {
            view ==="Home" && !gener  && (
             <View   className='flex flex-row space-x-6  items-center justify-center w-full  h-36  '>
               <Text className="text-white text-base " onPress={()=>dispatch(ChangeView("Anime"))}>Anime</Text>
               <Pressable underlayColor={"transperent"} activeOpacity={0.5}  onPress={()=>dispatch(toggleCategories())}>
                 <View className="flex-row items-center "   >
                   <Text className="text-white text-base "> Categories</Text>
                   <ChevronDownIcon color={"#fff"} size={16} />
                 </View>
               </Pressable>
             </View>
            )
          }
          { 
            view === "Anime" && (
              <View   className='flex flex-row space-x-8 items-center justify-center w-full  h-36  '>
                 <Pressable underlayColor={"transperent"} activeOpacity={0.5}  onPress={()=>dispatch(toggleView())}>
                  <View className="flex-row items-center"   >
                    <Text className="text-white text-base ">Anime</Text>
                    <ChevronDownIcon color={"#fff"} size={16} />
                  </View>
                </Pressable>
                <Pressable underlayColor={"transperent"} activeOpacity={0.5}  onPress={()=>dispatch(toggleCategories())}>
                  <View className="flex-row items-center"   >
                    <Text className="text-white text-base ">{gener ? gener : 'Categories'}</Text>
                    <ChevronDownIcon color={"#fff"} size={16} />
                  </View>
                </Pressable>
              </View>
            )
          }
         
          {
            view ==="Home" && gener  && (
              <View   className='flex flex-row space-x-8 items-center justify-center w-full  h-36  translate-x-2.5  delay-150 '>
                <Pressable underlayColor={"transperent"} activeOpacity={0.5}  onPress={()=>dispatch(toggleCategories())}>
                  <View className="flex-row items-center"   >
                    <Text className="text-white text-base ">{gener ? gener : 'Categories'}</Text>
                    <ChevronDownIcon color={"#fff"} size={16} />
                  </View>
                </Pressable>
               
              </View>
            )
          }
        </LinearGradient>
    </View>
  )
}

export default TopSection