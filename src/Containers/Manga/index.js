import { View, Text } from 'react-native'
import React from 'react'
import{ CardVer  }from '../../Components'
import { CardVerScel } from '../../Components/skeletens';
import { manga } from '../../utlis/api'
const Manga = () => {
    
  return (
    <View className="mt-2">
      <CardVer data={manga} />
    </View>
  )
}

export default Manga