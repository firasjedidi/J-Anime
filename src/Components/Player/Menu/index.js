import { View, Text ,Pressable} from 'react-native'
import React,{useState} from 'react'
import {ChevronRightIcon,CheckIcon,ChevronLeftIcon,XCircleIcon} from 'react-native-heroicons/outline';
import { ResizeMode } from 'expo-av';
const PlayerMenu = ({setActive,data,source,setSource,resize,setResize}) => {
    const [openQuailty,setOpenQuailty] = useState(false);
    const [openResize,setOpenResize] = useState(false);
    const resizeOptions= [
        {name:"contain",mode:ResizeMode.CONTAIN},
        {name:"cover",mode:ResizeMode.COVER},
        {name:"stretch",mode:ResizeMode.STRETCH}
    ]
    const handelPress = (check,item)=>{
        if (check) {
            setSource(item.url);
            setOpenQuailty(false);
            setActive(prev => !prev);
        } else {
            setResize(item);
            setOpenResize(false);
            setActive(prev => !prev);
        }
    }
  return (
    <View className="w-56 h-full absolute duration-300  bg-[#151515]  rounded-l-xl right-8  z-20  ">
        <View className=" flex-row justify-end  my-3 mx-2" >
            <Pressable onPress={() => setActive(prev => !prev)}>
                <XCircleIcon size={35} color={"white"}/>
            </Pressable>      
        </View>
        <View className=" py-3   ">
            <View>
                <Pressable className=" flex-row  justify-between my-3  p-2 "onPress={() =>  setOpenQuailty(true)}>
                    <Text className='text-white  text-xl '>Quality</Text>
                   <ChevronRightIcon color={"white"} />  
                </Pressable>
            </View>
            <View >
                <Pressable  className="flex-row  justify-between p-2  " onPress={() =>  setOpenResize(true)}>
                    <Text className='text-white  text-xl ' >Resize</Text>
                    <ChevronRightIcon color={"white"} />
                </Pressable>  
            </View>
        </View>
        {/* quailty an rezie parm  */}
        {openQuailty &&(
            <View className="w-56 h-full absolute rounded-l-xl  bg-black bottom-0 right-0  z-50  ">
                <View className=" flex-row justify-start  my-3 mx-2" >
                    <View className="border-[1px] border-white rounded-full ">
                        <Pressable onPress={() =>  setOpenQuailty(false)}>
                            <ChevronLeftIcon color={"white"} />
                        </Pressable>
                    </View>    
                </View>
                <View className=" py-5  ">
                    {data.sources.slice(0,-1).map((item,index)=>(
                        <View key={index} className="p-2" >
                            {item.url == source ?
                                <Pressable className="flex-row  justify-between "  onPress={() => { handelPress(true,item)}}>
                                    <Text className='text-white text-lg '>{item.quality}</Text> 
                                    <CheckIcon color={"white"} />
                                </Pressable> 
                                :
                                <Pressable  onPress={() => { handelPress(true,item)}}>
                                    <Text className='text-white text-lg '>{item.quality}</Text> 
                                </Pressable>
                            }
                        </View>
                    ))}
                </View>
            </View>
        )}
        {openResize &&(
            <View className="w-56 h-full absolute rounded-l-xl  bg-black bottom-0 right-0  z-50  ">
                <View className=" flex-row justify-start  my-3 mx-2" >
                    <View className="border-[1px] border-white rounded-full ">
                        <Pressable onPress={() =>  setOpenResize(false)}>
                            <ChevronLeftIcon color={"white"} />
                        </Pressable>
                    </View>    
                </View>
                <View className=" py-5  ">
                    {resizeOptions.map((item,index)=>(
                        <View key={index} className="p-2" >
                            {item.name == resize.name ?
                                <Pressable className="flex-row  justify-between "  onPress={() => { handelPress(false,item)}}>
                                    <Text className='text-white text-lg '>{item.name}</Text> 
                                    <CheckIcon color={"white"} />
                                </Pressable> 
                                :
                                <Pressable  onPress={() => { handelPress(false,item)}}>
                                    <Text className='text-white text-lg '>{item.name}</Text> 
                                </Pressable>
                            }      
                        </View>
                    ))}
                </View>
            </View>
        )}
    </View>
  )
}

export default PlayerMenu