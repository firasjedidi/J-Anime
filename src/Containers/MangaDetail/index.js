import { View, Text } from 'react-native'
import React from 'react'
import { useQuery } from 'react-query'
import {getMangaInfo} from '../../utlis/api'
import { TopImage,Info,Desc,Tabs } from '../../Components'
import { InfoScel } from '../../Components/skeletens';
const MangaDetail = ({params}) => {
  console.log(params,"manga");
  const {data,status,error} = useQuery(['MangaInfo',params],()=>getMangaInfo(parseInt(params),{cacheTime:0}),{
      cacheTime: 0,
  })
  return (
    <View>
        {status === "loading" && <InfoScel/>}
        {status === "success" && (
          <>
            <TopImage cover={data.cover}/>
            <Info data={data}/>
            <Desc data={data}/>
            <Tabs data={data}/>
          </>
        )}
    </View>
  )
}

export default MangaDetail