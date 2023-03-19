import { Dimensions } from 'react-native'
import React from 'react'
import { useQuery } from 'react-query'
import {getInfo} from '../../utlis/api'
import { TopImage,Info,Desc,Tabs } from '../../Components'
import { InfoScel } from '../../Components/skeletens';
import GestureRecognizer, {swipeDirections} from 'react-native-swipe-gestures';
import { useDispatch,useSelector } from 'react-redux'
import { openPlayer } from '../../Redux-Store/PlayerChange'
import { useNavigation } from '@react-navigation/native';
import FadeOutAlert from '../../Components/dialogs/FadeOut'
const Details = ({params}) => {
  const {data,status} = useQuery(['info',params],()=>getInfo(parseInt(params)),{
    cacheTime: 0,
  })
  const { SWIPE_DOWN} = swipeDirections;
  const navigation = useNavigation();
  const{fade} = useSelector(state => state.playList)
  const dispatch = useDispatch()
  const config = {
    velocityThreshold: 0.3,
    directionalOffsetThreshold: 80
  };
  const onSwipe = (gestureName, gestureState)  =>{
    if (gestureName===SWIPE_DOWN && gestureState.dx <0) {
      dispatch(openPlayer(false))
      navigation.goBack()
    }
  }
  console.log(fade,"fade");
  return (
    <GestureRecognizer config={config} onSwipe={onSwipe} className=' h-full' >
        {status === "loading" && <InfoScel/>}
        {status === "success" && (
          <>
            <TopImage cover={data.cover}/>
            <Info data={data}/>
            {fade && (
              <FadeOutAlert duration={3000} message={'already added'}  />
            )}
            <Desc data={data}/>
            <Tabs data={data}/>
          </>
        )}
      
    </GestureRecognizer>
  )
}

export default Details