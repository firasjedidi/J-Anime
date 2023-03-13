import { View,Text } from 'react-native'
import React from 'react'
import{ Card  }from '../../Components'
import { useQuery } from 'react-query';
import {getRecnetEp} from '../../utlis/api'
import { CardScel } from '../../Components/skeletens';
const RecentEP = () => {
    const {data,isLading,error,status}=useQuery('recentEP',()=>getRecnetEp())
    if (error) {
      console.log(error,'RecentEP');
    }
    return (
      <View>
        {status === "loading" && <CardScel/>}
        {status === "success" && (
         <Card title={'Recent Anime Episodes'} data={data} />
        )}
      </View>
    )
}

export default RecentEP