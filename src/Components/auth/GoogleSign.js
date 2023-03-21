import { TouchableOpacity,Image, Text,Alert } from 'react-native'
import React, {useState,useEffect}  from 'react'
import * as WebBrowser from 'expo-web-browser'
import * as Google from 'expo-auth-session/providers/google'
import {WEB_CLIENT_ID,IOS_CLIENT_ID ,ANDROID_CLIENT_ID } from '@env'
import * as AuthSession from 'expo-auth-session';
import { useDispatch } from 'react-redux';
import { authed } from '../../Redux-Store/user';
import axios from 'axios';
import { rGI } from '../../utlis/helpers/helper';
import { socialAuth } from '../../utlis/graphql/mutaions/mutaionsHandler'
WebBrowser.maybeCompleteAuthSession();
const GoogleSign = () => {
    const dispatch = useDispatch()
    const [accessToken,setAccessToken] = useState(null);
    const [user,setUser] = useState(null);
    const [request, response, promptAsync] = Google.useAuthRequest({
      clientId:WEB_CLIENT_ID,
      iosClientId:IOS_CLIENT_ID,
      androidClientId:ANDROID_CLIENT_ID,
      // redirectUri: AuthSession.makeRedirectUri({ useProxy: true }), 
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
        let res = await axios.get("https://www.googleapis.com/oauth2/v1/userinfo",{
          headers:{
            Authorization:`Bearer ${accessToken}`
          }
        });
        if (res.data) {
          setUser( {email:res.data.email,password:res.data.id,image:rGI(),username:res.data.name});
          auth()
        }
          
      } catch (error) {
       console.log(error);
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
      promptAsync()
      }}
      className='bg-white shadow rounded flex-row justify-center items-center space-x-3 p-3 m-2 w-64'
    >
      <Image  resizeMode='contain' source={require("../../assets/google.png")}/>
      <Text className="font-semibold text-base ">Log in with Google</Text>
    </TouchableOpacity>
  )
}

export default GoogleSign