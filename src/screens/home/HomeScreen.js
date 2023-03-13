import {  Text, SafeAreaView ,View,ScrollView,Animated,Pressable,} from 'react-native'
import React, { useLayoutEffect,useEffect,useState } from 'react'
import Global from '../../../Global';
import{  Header,Hero ,Categories,Views}from '../../Components'
import {Trending,Popular,RecentEP,RandomAnime,Geners,ContinueWatching} from '../../Containers'
import { StatusBar } from 'expo-status-bar';
import { useSelector } from 'react-redux';

const HomeScreen = () => {
  
  const {view,gener}=useSelector(state=>state.header)
  const [animationValue] = useState(new Animated.Value(0));
  const backgroundInterpolate = animationValue.interpolate({
    inputRange : [0, 570],
    outputRange : ["rgba(0,0,0,.0)" , "rgba(0,0,0,.4)"]
  })
  const backgroundStyle = {
    backgroundColor : backgroundInterpolate
  }

  //check cached images
  return (
    <SafeAreaView style={Global.AndroidSafeArea}  >
      <Header backgroundStyle={backgroundStyle} />
      <ScrollView    
        scrollEventThrottle={16} 
        nestedScrollEnabled = {true}
        onScroll={Animated.event([{ nativeEvent : { contentOffset: { y : animationValue } }}],{useNativeDriver: false} )}     
      >
        <Hero/> 
        <StatusBar  />
          { 
            view === "Home" && gener  && (
              <Geners/>
            )
          }

         {
          view === "Home" && (
            <>
              <RecentEP />
              <ContinueWatching />
              <Trending />
              <Popular/>
              <RandomAnime />
            </>
          )
        }
        {
          view === "Anime" && (
            <>
              {
                gener 
                  ? 
                  <Geners/>
                :
                <>
                  <Trending />
                  <Popular/>
                  <RandomAnime />
                </>
              }
            </>
          )
        }

       
      </ScrollView>   
      <Views/>
      <Categories/>
    </SafeAreaView>
  )
}

export default HomeScreen