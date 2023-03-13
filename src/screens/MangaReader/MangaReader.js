import { View, SafeAreaView } from 'react-native'
import React from 'react'
import{ MangaReaderContainer} from '../../Containers'
import Global from '../../../Global';
const MangaReader = ({route}) => {
  const {id,cp} = route.params
  return (
    <SafeAreaView style={Global.AndroidSafeArea}>
      <MangaReaderContainer param={id} cp={cp} />
    </SafeAreaView>
  )
}

export default MangaReader