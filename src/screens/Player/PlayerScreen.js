import { View,StatusBar} from 'react-native'
import React from 'react'
import {Player} from '../../Containers'
  const PlayerScreen = ({route}) => { 
  const {id,ep} = route.params;
  return (
    <View  >
      <StatusBar hidden={true} />
      <Player param={ep} id={id}   />
    </View>
  )
}

export default PlayerScreen


