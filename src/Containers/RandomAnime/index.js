import { View,Text } from 'react-native'
import React from 'react'
import{ CardVer  }from '../../Components'
import { useQuery } from 'react-query';
import {getRandom} from '../../utlis/api'
import { CardVerScel } from '../../Components/skeletens';
const RandomAnime = () => {
    const {data,isLading,error,status}=useQuery('randomAnime',()=>getRandom())
    if (error) {
      console.log(error,'RandomAnime');
    }
    return (
      <View>
          {status === "loading" && <CardVerScel/>}
          {status === "success" && (
            <CardVer title={'Anime You Might Like'} data={data} />
          )}
      </View>
    )
}

export default RandomAnime