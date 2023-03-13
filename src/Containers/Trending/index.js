import { View,Text } from 'react-native'
import React from 'react'
import{ Card  }from '../../Components'
import { useQuery } from 'react-query';
import {getTrending} from '../../utlis/api'
import { CardScel } from '../../Components/skeletens';
const Trending = () => {
    const {data,isLading,error,status} = useQuery('trending',()=>getTrending())
    if (error) {
      console.log(error,"Trending");
    }
    return (
      <View>
        {status === "loading" && <CardScel/>}
        {status === "success" && (
          <Card title={'Trending Anime'} data={data} />
        )}
      </View>
    )
}

export default Trending