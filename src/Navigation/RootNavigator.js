import React, { useEffect,  useState } from 'react';
import { NavigationContainer, DefaultTheme,DarkTheme,useNavigationContainerRef,  } from '@react-navigation/native';
import { useColorScheme,Platform } from 'react-native';
import {useDispatch ,useSelector} from 'react-redux';
import { openPlayer,hideStatusBar } from "../Redux-Store/PlayerChange";
import * as ScreenOrientation from 'expo-screen-orientation';
import * as NavigationBar from "expo-navigation-bar";
import BottomTabNav from './BottomTabNav';
import { Auth } from './StackNav';
const RootNavigator = () => {
  const dispatch = useDispatch()
  const scheme = useColorScheme();
  const navigationRef = useNavigationContainerRef();
  const [routeNameRef,setRouteNameRef] = useState();
  const {isAuth} = useSelector(state => state.user)

  useEffect(() => {
    const Orientation = async() =>{
      if (routeNameRef === "PlayerScreen" ) {
       
         ScreenOrientation.lockAsync(
          ScreenOrientation.OrientationLock.LANDSCAPE
        );
        return  dispatch(openPlayer(true)) && dispatch(hideStatusBar())
      } 
      if(Platform.OS === "android"){
        NavigationBar.setVisibilityAsync("hidden");
        NavigationBar.setBehaviorAsync("overlay-swipe");
      }
      // DEFAULT
      ScreenOrientation.lockAsync(ScreenOrientation.OrientationLock.DEFAULT) 
      dispatch(hideStatusBar(false))
    }
    
    Orientation()
   
  }, [routeNameRef]);
  return(
    <NavigationContainer 
      theme={scheme === 'dark' ? DarkTheme : DefaultTheme} 
      ref={navigationRef}
      onReady={() => {
        setRouteNameRef(navigationRef.getCurrentRoute().name);
      }}
      onStateChange={ () => {
        const previousRouteName = routeNameRef.current;
        const currentRouteName = navigationRef.getCurrentRoute()?.name;
        if (previousRouteName !== currentRouteName) {
          setRouteNameRef(currentRouteName);
        }
      }}
    >
      {
       isAuth
        ?
        < BottomTabNav />  
        :
        <Auth />   
      }
    </NavigationContainer>
  )
}

export default RootNavigator