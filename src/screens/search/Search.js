import { View, Text,SafeAreaView ,TextInput,ScrollView,Pressable} from 'react-native'
import React, {useState} from 'react'
import { MagnifyingGlassIcon,ChevronLeftIcon} from "react-native-heroicons/mini"
import Global from '../../../Global';
import { getSearch } from '../../utlis/api';
import {CardVer }from '../../Components'
import { CardVerScel } from '../../Components/skeletens';
import { useNavigation } from '@react-navigation/native'

const Search = () => {
  const[ search,setSearch] = useState('')
  const [data,setData] = useState([])
  const[ open,setOpen] = useState(false)
  const navigation = useNavigation();

  const handelChange = (e) =>{
    setSearch(e);
    setOpen(true)
  }
  const handelSubmit = async() => {
    try {
      const res = await getSearch(search)
      setData(res)
      setOpen(false)
    } catch (error) {
      console.log(error,"Search");
    }
   
  }
  return (
    <SafeAreaView style={Global.AndroidSafeArea}>
      <View className="flex-row m-2 items-center h-10 w-screen space-x-2  ">
        <Pressable  onPress={()=>navigation.goBack()}>
          <ChevronLeftIcon size={40} color={'white'}/>
        </Pressable>
        <View className="flex-row  w-80 items-center   rounded-md   bg-white/25  ">
          <MagnifyingGlassIcon style={{marginHorizontal:7}} color={"white"}/>
          <TextInput 
            className="p-2 h-full w-7 flex-grow text-white rounded-md flex-shrink  focus:outline-none   "
            placeholderTextColor={"white"}
            placeholder='search...'
            onChangeText={handelChange}
            onSubmitEditing={handelSubmit}
            cursorColor="white"
            clearTextOnFocus={true}
          />
        </View>
        
      </View>
      {open && (
          <>
            <CardVerScel/>
          </>
        )}
      <ScrollView  vertical={true} showsVerticalScrollIndicator={false}>
        {data.length > 0 ?
            <CardVer data={data}/>
          : ""
        }
      </ScrollView>
      
    </SafeAreaView>
  )
}

export default Search