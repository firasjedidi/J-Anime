import { View,Text } from 'react-native'
import React from 'react'
import{ Card  }from '../../Components'
import { useQuery } from 'react-query';
import {getPopular} from '../../utlis/api'
import { CardScel } from '../../Components/skeletens';
const Popular = () => {
  const {data,error,status,}=useQuery('popular',()=>getPopular(),{ cacheTime: 0,})
  if (error) {
    console.log(error,'Popular');
  }
  return (
    <View>
      {status === "loading" && <CardScel/>}
      {status === "success" && (
        <Card title={'Popular Anime'} data={data} />
      )}
    </View>
  )
}

export default Popular