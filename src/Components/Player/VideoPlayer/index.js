import React,{useState} from 'react'
import { View,Dimensions } from 'react-native'
import { Video, ResizeMode } from 'expo-av';
const USER_AGENT = "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/83.0.4103.116 Safari/537.36";
const VideoPlayer = ({videoRef,source,resize,onPlaybackStatusUpdate}) => {
  const { width: DEVICE_WIDTH, height: DEVICE_HEIGHT } = Dimensions.get("screen");
  const defaultScreenRatio = DEVICE_WIDTH / DEVICE_HEIGHT;
  // //  style={{maxHeight:VIDEO_CONTAINER_HEIGHT}}

  return (
    <View style={{ width: DEVICE_WIDTH,height: DEVICE_HEIGHT }}>
      <Video
        ref={videoRef}
        style={{
          width: '100%',
          height: '100%',
        }}
        source={{
          uri:source,
          headers: {
            "User-Agent": USER_AGENT,
          },
        }}
        resizeMode={resize.mode}
        // isLooping
        onPlaybackStatusUpdate={(e)=>{onPlaybackStatusUpdate(e);}}   
        useNativeControls={false}   
      />
    </View>
  )
}

export default VideoPlayer