import { View, Text } from 'react-native'
import React from 'react'
import Slider from '@react-native-community/slider';
const format = require('format-duration')
const SliderBar = ({vidStatus,videoRef,toggleControllers}) => {
  const onSlideStart = async() => {
    await videoRef.current.pauseAsync()
  }
  const onSlideComplete = async(slideTime) => {
    if (!vidStatus.isLoaded) return false;
    await videoRef.current.setPositionAsync(slideTime)
    await videoRef.current.playAsync()
  }
  const current = format(parseInt(vidStatus.positionMillis));
  const duration = format(parseInt(vidStatus.durationMillis));
  return (
    <View className={`w-full flex-row justify-between items-center absolute  px-3 bottom-10 left-0 right-0 ${toggleControllers ? ' opacity-0 ':'opacity-1'}`}>
      <View  > 
        <Text className='text-white w-full text-sm  '>{vidStatus.isLoaded ? current : '00:00'}</Text>
      </View>
      <Slider   
        style={{width:"80%"}}
        disabled={!vidStatus.isLoaded}
        value={vidStatus.isLoaded ? vidStatus.positionMillis : 0}
        maximumValue={vidStatus.isLoaded ? vidStatus.durationMillis : 0}
        onSlidingStart={onSlideStart}
        onSlidingComplete={onSlideComplete}   
        minimumTrackTintColor="#FFFFFFF"
        maximumTrackTintColor="#FFFFFFF"
      />
      <View  > 
        <Text className='text-white w-full text-sm  '>{vidStatus.isLoaded ? duration : '00:00'}</Text>
      </View>
    </View>

  )
}

export default SliderBar