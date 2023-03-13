import { Text,SafeAreaView,View,Pressable,Image,TextInput,ScrollView } from 'react-native'
import React,{useState} from 'react'
import { MagnifyingGlassIcon ,XMarkIcon} from "react-native-heroicons/mini"
import Global from '../../../Global';
import {CardVer }from '../../Components'
import { getSearchManga } from '../../utlis/api';
import { Manga } from '../../Containers'
const MangaScreen = () => {
  const[ search,setSearch] = useState('')
  const [data,setData] = useState([])
  const[ open,setOpen] = useState(false)
  const handelChange = (e) =>{
    setSearch(e);
    // setOpen(true)
  }
  const handelSubmit = async() => {
    try {
       const res = await getSearchManga(search)
        setData(res)
        console.log(res,"magaser");
        // setOpen(false)
    } catch (error) {
      
    }
   
  }
  return (
    <SafeAreaView style={Global.AndroidSafeArea}>
      {!open && ( 
        <>
          <View className="flex-row items-center justify-between px-4 h-12 bg-white/10">
            <Text className="text-white font-semibold  text-xl uppercase">Manga</Text>
            <Pressable onPress={()=>setOpen(true)}>
              <MagnifyingGlassIcon size={25} color={"white"}/>
            </Pressable>
          </View>
          <Manga /> 
        </>
      )}
          
        {open && (
          <>
            <View className="flex-row mt-1 px-4 items-center h-10  space-x-3    ">
                <View className="flex-row  w-[300px] items-center h-10  bg-white/5 rounded    ">
                  <View className=" py-2  h-full border-[#3B84F6]  border-b-2 text-white rounded-l-md   ">
                    <MagnifyingGlassIcon style={{marginHorizontal:7}} color={"#3B84F6"}/>
                  </View>  
                  <TextInput 
                    className="p-2 h-full w-7 flex-grow  border-[#3B84F6]  border-b-2 text-white rounded-r-md flex-shrink  focus:outline-none   "
                    placeholderTextColor={"#3B84F6"}
                    placeholder='search...'
                    onChangeText={handelChange}
                    onSubmitEditing={handelSubmit}
                    cursorColor="white"
                    clearTextOnFocus={true}
                  />
                </View>
                <Pressable onPress={()=>{setOpen(false);setData([])}}>
                  <XMarkIcon  size={25} color={"#3B84F6"}/>                
                </Pressable> 
            </View>
            <ScrollView  vertical={true} showsVerticalScrollIndicator={false}>
              {data.length > 0 
                ?
                  <CardVer data={data}/>
                : 
                  ""
              } 
            </ScrollView>
          </>
        )}

    </SafeAreaView>
  )
}

export default MangaScreen