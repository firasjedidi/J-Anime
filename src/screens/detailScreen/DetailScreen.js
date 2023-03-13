import { ScrollView} from 'react-native'
import React from 'react'
import { Details } from '../../Containers';
const DetailScreen = ({route}) => {
// detais ->  cached images and screen animation and navigation 
  const {id}=route.params
 
  return (
    <ScrollView >
      <Details params={id} />
    </ScrollView>
  )
}

export default DetailScreen



