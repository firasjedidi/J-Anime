import {  Text,View,ImageBackground,Image,Dimensions } from 'react-native'
import React ,{useState}from 'react'
import { useQuery } from 'react-query';
import {getBannerAnime} from '../../utlis/api'
import TopSection from './BannerSections/TopSection';
import BottomSection from './BannerSections/BottomSection';
import { HomeScel ,} from '../skeletens';

const Hero = () => {
  const { height: DEVICE_HEIGHT } = Dimensions.get("window");
  const {data,error,status } = useQuery('bannerAnime',()=>getBannerAnime())

  if (error) {
    console.log(error,"hero error");
  }

  return (
    <View className="" >
       {status === "loading" && <HomeScel/>}
       {status === "success" && (
        <ImageBackground className={`  aspect-auto h-[80vh]  `} style={{ height: DEVICE_HEIGHT/1.3 }} resizeMode="cover"   source={{uri:data.image}} >
          <TopSection/>
          <View className="absolute self-center bottom-32 ">
          <Text className={` mx-auto text-center my-1 font-semibold uppercase text-xl px-1`}  style={{color:data.color ? data.color : "white"}}>  {data.title.english ? data.title.english: data.title.romaji ? data.title.romaji : data.title.userPreferred }</Text>
          </View>
          <BottomSection newData={data} />
        </ImageBackground>
      )}
    </View>
  )
}

export default Hero