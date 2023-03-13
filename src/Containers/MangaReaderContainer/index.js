import { View, Text,ScrollView } from 'react-native'
import React,{useState} from 'react'
import { useQuery } from 'react-query'
import { getMangaChapter } from '../../utlis/api'
import { MangaHeader,MangaPages } from '../../Components'
const MangaReaderContainer = ({param,cp}) => {
  const [p,setP] = useState(param)
  const [ chp,setChp ]= useState(cp)
    const {data,status} = useQuery(['MangaReade',p],()=>getMangaChapter(p),{
        cacheTime: 0,
    })
  return (
    <View>
        {status === "loading" && <Text>loading...</Text>}
        {status === "success" && (
          <>
            < MangaHeader header={p} setP={setP} cp={chp} />
            < MangaPages data={data} />
          </>
        )}
      
    </View>
  )
}

export default MangaReaderContainer