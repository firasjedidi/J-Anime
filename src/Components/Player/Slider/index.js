import { View, Text,Dimensions } from 'react-native'
import React from 'react'
import Slider from '@react-native-community/slider';
const format = require('format-duration')
const SliderBar = ({vidStatus,videoRef,}) => {
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
  const { width: DEVICE_WIDTH} = Dimensions.get("window");
  return (
    <View className={` flex-row justify-around items-center absolute  px-1 bottom-12 left-0 right-0 duration-300 `} style={{width:DEVICE_WIDTH}}>
      <View  > 
        <Text className='text-white w-full text-sm  '>{vidStatus.isLoaded ? current : '00:00'}</Text>
      </View>
      <Slider   
        style={{width:"80%"}}
        disabled={!vidStatus.isLoaded}
        value={!vidStatus.isLoaded ? 0: vidStatus.positionMillis }
        maximumValue={!vidStatus.isLoaded ? 0:  vidStatus.durationMillis}
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