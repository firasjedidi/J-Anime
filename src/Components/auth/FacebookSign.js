import { TouchableOpacity,Image, Text,Alert } from 'react-native'
import React, {useState,useEffect}  from 'react'
import * as WebBrowser from 'expo-web-browser'
import {FB_APP_ID } from '@env'
import * as AuthSession from 'expo-auth-session';
import * as Facebook from 'expo-auth-session/providers/facebook';
import { useDispatch } from 'react-redux';
import axios from 'axios';
import { authed } from '../../Redux-Store/user';
import { socialAuth } from '../../utlis/graphql/mutaions/mutaionsHandler'
import { rGI } from '../../utlis/helpers/helper';
WebBrowser.maybeCompleteAuthSession();
const FacebookSign = () => {
    const dispatch = useDispatch()
    const [accessToken,setAccessToken] = useState(null);
    const [user,setUser] = useState(null);
    const [request, response, promptAsync] = Facebook.useAuthRequest({
      clientId: FB_APP_ID,
    //   redirectUri: AuthSession.makeRedirectUri({ useProxy: true }), 
    },
    // { useProxy: true }
    );
    useEffect(()=>{
      if (response?.type === "success") {
        setAccessToken(response?.authentication?.accessToken);
        console.log(response?.authentication?.accessToken,"su");
        accessToken && fetchUserInfo()
      }
    },[response, accessToken]);
    const fetchUserInfo = async()=>{
      try {
        let res = await axios.get (`https://graph.facebook.com/me?access_token=${accessToken}&fields=id,name,email,picture.type(large)`);
        if (res.data) {
          setUser({email:res.data.email,password:res.data.id,image:rGI(),username:res.data.name});
          auth();
        }
      } catch (error) {
        Alert.alert(error);
      }
    }
    const auth = async()=>{
      const res = await socialAuth(user);
      if (res.socailAuth) {
        dispatch(authed(res.socailAuth))
      } else {
        alert(res);
      }
    }
  return (
    <TouchableOpacity 
      disabled={!request}
      onPress={()=>{
          promptAsync();
      }}
      className='bg-[#3C5898] shadow rounded flex-row justify-center items-center space-x-3 p-3 m-2 w-64 '
    >
      <Image  resizeMode='contain' source={require("../../assets/facebook.png")}/>
      <Text className="font-semibold text-white text-base ">Log in with Facebook</Text>
    </TouchableOpacity>
  )
}

export default FacebookSign