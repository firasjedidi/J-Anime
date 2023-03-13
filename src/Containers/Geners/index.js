import { View } from 'react-native'
import React from 'react'
import{ CardVer  }from '../../Components'
import { useQuery } from 'react-query';
import {getRecnetEp,getGenre} from '../../utlis/api'
import { useSelector } from 'react-redux';
import { CardVerScel } from '../../Components/skeletens';
const Geners = () => {
  const {gener} = useSelector(state => state.header)
  const {data,error,status}=useQuery('Geners',()=>getGenre(gener),{cacheTime:0})

  if (error) {
    console.log(error,'Geners');
  }
  return (
      <View>
        {status === "loading" && <CardVerScel/>}
        {status === "success" && (
          <>
            {data.length > 0 ?
              <CardVer data={data} title={`all the ${gener}`} />
              : ""
            }
        </>
        )}
        
      </View>
  )
}

export default Geners