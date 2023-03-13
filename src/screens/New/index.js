import { View, Text,SafeAreaView,Pressable,Image,ScrollView} from 'react-native'
import React, {useState}  from 'react'
import Global from '../../../Global';
import { useQuery } from 'react-query';
import { getAiring } from '../../utlis/api';
import sanitizeHtml from 'sanitize-html';
import { InformationCircleIcon} from "react-native-heroicons/outline";
import { useNavigation } from '@react-navigation/native';
import { NewContainer } from '../../Containers';
const New = () => {
    const navigation = useNavigation()
    const {data,error,status} = useQuery(['airing'],()=>getAiring())
  
  return (
    <SafeAreaView style={Global.AndroidSafeArea}>
       <NewContainer/>
    </SafeAreaView>
  )
}

export default New