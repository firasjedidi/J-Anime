import React, { useEffect,  useState } from "react";
import { createNativeStackNavigator, } from '@react-navigation/native-stack';
import HomeScreen from '../screens/home/HomeScreen';
import Search from '../screens/search/Search'
import PlayList from '../screens/playlist/PlayList'
import Settings from '../screens/settings/Settings'
import DetailScreen from '../screens/detailScreen/DetailScreen';
import PlayerScreen from '../screens/Player/PlayerScreen';
import New from "../screens/New";
import MangaScreen from "../screens/Manga/Manga";
import MangaDetailScreen from "../screens/MangaDetailScreen/MangaDetailScreen";
import MangaReader from "../screens/MangaReader/MangaReader";
import Login from "../screens/auth/Login";
import SignUp from "../screens/auth/SignUp";
const Stack = createNativeStackNavigator();
function Auth() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        options={{ 
          headerShown:false,
        }}
        name="Login" 
        component={Login} 
      />
      <Stack.Screen 
        options={{ 
          headerShown:false,
        }}
        name="SignUp"
        component={SignUp} 
      />
    </Stack.Navigator>
  );
}
 function Home() {
  return (
    <Stack.Navigator 
    screenOptions={{
      gestureEnabled:false
    }}
    > 
      <Stack.Screen 
        options={{ 
          headerShown:false,
        }}
        name="HomeScreen"
        component={HomeScreen} 
      />
      <Stack.Screen 
        options={{ 
          headerShown:false,
          gestureDirection:"vertical",
          gesturesEnabled: true,
        }}
        name="DetaliScreen"
        component={DetailScreen} 
      />

      <Stack.Screen 
        options={{ 
          headerShown:false,
          gesturesEnabled: false,
          gestureDirection:"vertical"
        }}
        name="PlayerScreen"
        component={PlayerScreen} 
      />
      <Stack.Screen 
        options={{ 
          headerShown:false,
        }}
        name="SettingsScreen"
        component={Settings} 
      />
      <Stack.Screen
         options={{ 
           headerShown:false,
         }}
        name="PlayListStack" 
        component={PlayList} 
      />
    </Stack.Navigator>
  );
}
 function SearchStack() {
    return (
      <Stack.Navigator >
        <Stack.Screen name="SearchStack" 
          options={{ 
            headerShown:false,
          }}
          component={Search} 
        />
        <Stack.Screen 
          options={{ 
            headerShown:false,
          }}
          name="DetaliScreen"
          component={DetailScreen} 
      />
        <Stack.Screen
          options={{ 
            headerShown:false,
          }}
         name="PlayListStack" 
         component={PlayList} 
        />
      </Stack.Navigator>
    );
  }
 function MangaStack() {
    return (
      <Stack.Navigator>
        <Stack.Screen
          options={{ 
            headerShown:false,
          }}
          name="MangaStack" 
          component={MangaScreen} 
        />
        <Stack.Screen 
          options={{ 
            headerShown:false,
          }}
          name="MangaScreen"
          component={MangaDetailScreen} 
        />
        <Stack.Screen 
          options={{ 
            headerShown:false,
          }}
          name="ReaderScreen"
          component={MangaReader} 
        />
      </Stack.Navigator>
    );
}
function NewStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        options={{ 
          headerShown:false,
        }}
        name="NewScreen" 
        component={New} 
      />
      <Stack.Screen 
        options={{ 
          headerShown:false,
        }}
        name="DetaliScreen"
        component={DetailScreen} 
      />
    </Stack.Navigator>
  );
}
export {NewStack,MangaStack,SearchStack,Home,Auth}