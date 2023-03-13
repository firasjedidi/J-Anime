import { View, Text,SafeAreaView ,TextInput,ScrollView} from 'react-native'
import React, {useState} from 'react'
import { MagnifyingGlassIcon} from "react-native-heroicons/mini"
import Global from '../../../Global';
import { getSearch } from '../../utlis/api';
import {CardVer }from '../../Components'
import { CardVerScel } from '../../Components/skeletens';
const Search = () => {
  const[ search,setSearch] = useState('')
  const [data,setData] = useState([])
  const[ open,setOpen] = useState(false)
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
      
    }
   
  }
  return (
    <SafeAreaView style={Global.AndroidSafeArea}>
      <View className="flex-row mx-5 my-3 items-center h-10  rounded-md   bg-white/25  ">
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