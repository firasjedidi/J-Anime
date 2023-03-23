import { View, Text, Animated ,Pressable,Image,Dimensions,Easing} from 'react-native'
import React,{useState} from 'react'
import {SettingNavigation,VideoSettings,Profile} from '../../Components';
const SettingsContainer = () => {
    const screenHeight = Dimensions.get('screen').height;
    const top = new Animated.Value(screenHeight);
    const scale = new Animated.Value(1);
    const top2 = new Animated.Value(screenHeight);
    const scale2 = new Animated.Value(1);
    const  toggleModal = () => {
        Animated.timing(scale, {
          toValue: 0.9,
          duration: 300,
          useNativeDriver:false,
          easing: Easing.in()
        }).start()
        Animated.spring(top, {
          toValue: 85,
          useNativeDriver:false,
        }).start();
      };
      const  closeModal = () => {
        Animated.timing(scale, {
          toValue:1,
          duration: 300,
          useNativeDriver:false,
          easing: Easing.in()
        }).start()
        Animated.spring(top, {
          toValue: screenHeight,
          useNativeDriver:false,
          duration: 300,
          easing: Easing.out()
        },).start();
      };
      const  toggleModalProfile = () => {
        Animated.timing(scale2, {
          toValue: 0.9,
          duration: 300,
          useNativeDriver:false,
          easing: Easing.in()
        }).start()
        Animated.spring(top2, {
          toValue: 85,
          useNativeDriver:false,
        }).start();
      };
      const  closeModalProfile = () => {
        Animated.timing(scale2, {
          toValue:1,
          duration: 300,
          useNativeDriver:false,
          easing: Easing.in()
        }).start()
        Animated.spring(top2, {
          toValue: screenHeight,
          useNativeDriver:false,
          duration: 300,
          easing: Easing.out()
        },).start();
      };
  return (
    <View>
      <Profile closeModal={closeModalProfile}   top={top2}  /> 
      <SettingNavigation toggleModal={toggleModal} toggleModalProfile={toggleModalProfile}  />
      <VideoSettings closeModal={closeModal}   top={top}  />
    </View>
  )
}

export default SettingsContainer