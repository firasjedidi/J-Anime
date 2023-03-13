import {  Text,View,ImageBackground,Image,Dimensions } from 'react-native'
import React ,{useState}from 'react'
import { useQuery } from 'react-query';
import {getTopRated} from '../../utlis/api'
import TopSection from './BannerSections/TopSection';
import BottomSection from './BannerSections/BottomSection';
import { HomeScel ,} from '../skeletens';

const Hero = () => {
  const { height: DEVICE_HEIGHT } = Dimensions.get("window");
  const {data,error,status } = useQuery('topRated',()=>getTopRated())
  const random = Math.floor(Math.random()* 10)
  var newData;
  if (error) {
    console.log(error,"hero error");
  }
  if (status === "success") {
    newData=data[random]
  } 
  // newData=data[0]
  return (
    <View className="" >
       {status === "loading" && <HomeScel/>}
       {/* {status === "success" && (
        <ImageBackground className={`  aspect-auto h-[80vh]  `} style={{ height: DEVICE_HEIGHT/1.3 }} resizeMode="cover"   source={{uri:newData.image}} >
          <TopSection/>
          <View className="absolute self-center bottom-32 ">
          <Text className={` mx-auto text-center my-1 font-semibold uppercase text-xl px-1`}  style={{color:newData.color ? newData.color : "white"}}>  {newData.title.english ? newData.title.english: newData.title.romaji ? newData.title.romaji : newData.title.userPreferred }</Text>
          </View>
          <BottomSection newData={newData} />
        </ImageBackground>
      )} */}
    </View>
  )
}

export default Hero