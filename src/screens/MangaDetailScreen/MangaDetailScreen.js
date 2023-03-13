import { ScrollView } from 'react-native'
import React from 'react'
import { MangaDetail } from '../../Containers';
const MangaDetailScreen = ({route}) => {
    const {id} = route.params
    return (
      <ScrollView >
        <MangaDetail params={id} />
      </ScrollView>
    )
}

export default MangaDetailScreen