import React from "react";
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Home,MangaStack,NewStack} from './StackNav';
import { HomeIcon,BookmarkIcon,FireIcon} from "react-native-heroicons/outline";
import { useColorScheme } from 'react-native'
import { Colors } from 'react-native/Libraries/NewAppScreen';
import { useSelector } from 'react-redux';
const Tab = createBottomTabNavigator();
export default function BottomTabNav() {
  const scheme = useColorScheme();
  const {openCategories} = useSelector(state=> state.header)
  const {hideTab} = useSelector(state=> state.player)
  return (
    <Tab.Navigator 
       initialRouteName={'Home'}
       screenOptions={{
         tabBarActiveTintColor:Colors[scheme].tint,
         tabBarStyle:{
           display:openCategories || hideTab ? "none" : "flex",
         },   
       }} 
     >
       <Tab.Screen  name="Home"  
         options={{
           headerShown:false,
           tabBarIcon: ({ focused,color}) => {
             return ( 
               <HomeIcon  size={24} color={focused ? color : 'gray'} />
             )
           },   
         }} 
         component={Home} 
       />
       <Tab.Screen  
         name="New & Hot"  
         options={{
           headerShown:false,
           tabBarIcon: ({ focused,color}) => {
             return ( 
               <FireIcon  size={24} color={focused ? color : 'gray'} />
             )
           },
           
         }} 
         component={NewStack} 
     
       />
     
      <Tab.Screen 
        name="Manga" 
        options={{
          headerShown:false,
          tabBarIcon: ({ focused,color}) => {
            return ( 
              <BookmarkIcon  size={24} color={focused ? color : 'gray'}/>
            )
          },
               
        }} 
        component={MangaStack} 
      />
        
    </Tab.Navigator>
  );
}

