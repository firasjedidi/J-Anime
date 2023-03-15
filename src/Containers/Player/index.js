import { View,ActivityIndicator,Alert} from 'react-native'
import React, {  useEffect, useRef, useState, useCallback}  from 'react'
import { useFocusEffect } from '@react-navigation/native';
import { useQuery } from 'react-query'
import { getStreaming ,getSkipTimes} from '../../utlis/api'
import  {VideoPlayer, PlayerControlers} from  '../../Components'
import { useSelector,useDispatch } from 'react-redux'
import { ResizeMode } from 'expo-av';
import {getPlayList} from '../../utlis/graphql/querys/queryHandler'
import { updatePlaylistProgress } from '../../utlis/graphql/mutaions/mutaionsHandler';
import GestureRecognizer, {swipeDirections} from 'react-native-swipe-gestures';
import { useNavigation } from '@react-navigation/native';
const Player = ({param,id}) => {
  const [ep, setEp] = useState(param);
  const {data,status} = useQuery(['stream',ep],()=> getStreaming(ep),{cacheTime:0});
  const videoRef = useRef(null);
  const [vidStatus, setStatus] = useState({});
  const [source, setSource] = useState("");
  const [loading,setLoading] = useState(false);
  const finshed = useRef();
  const [resize, setResize] = useState({name:"contain",mode:ResizeMode.CONTAIN});
  const [total,setTotal ] = useState(null);
  const navigation = useNavigation();
  const { SWIPE_RIGHT, SWIPE_LEFT} = swipeDirections;
  const [skips, setSkips] = useState({intro:0,next:92});
  const config = {
    velocityThreshold: 0.3,
    directionalOffsetThreshold: 80
  };
  console.log("///////////////////////////////////////////////////////////  ",);
  console.log("/ep:/",ep,"//");
  console.log("////////////////////////////////////////////////////////////");
  const unlaodplaybackInstance = async(stop) =>{
    try {
      if (stop) {
        await videoRef.current.unloadAsync(); 
      } 
    } catch (error) {
      Alert.alert(
        'Error',
        'Something caused this error to appear',
        [{
          text:"Ok",
          onPress:()=>{navigation.goBack()}
        }]
      )
    } 
  }
  const  HandleWatching = async(status) => {
    if (status.isLoaded) {   
      var amoutWatched = (status.positionMillis / status.durationMillis ) * 100;
      if(status.isPlaying){
       await updatePlaylistProgress({ "updatePlaylistVideoId": id,"videoId": ep,"amount": amoutWatched})
      }
    }
  } 

  const onPlaybackStatusUpdate = async(status)=> { 
    if (!status.isLoaded) {
      if (status.error) {
        Alert.alert(
          'Error',
          'Something  caused this error to appear'+status.error,
          [{
            text:"Ok",
            onPress:()=>{navigation.goBack()},
            style:"default"
          }]
        )
      }
      setLoading(true)
      console.log(status,"errrrrrrrrrrreooooooooooooooooooooooo");
    } else { 
      var amoutWatched = (status.positionMillis / status.durationMillis ) * 100; 
      if (status.isLoaded) {
        setLoading(false)
        setStatus(status);   
        HandleWatching(status); 
        console.log(amoutWatched ,"mill",status.positionMillis/1000 );
      } 
      if (status.isBuffering) {
        setLoading(true);
      } 
      if ( status.didJustFinish) {
        console.log("didJustFinish didJustFinish didJustFinish ");
        // await finshed.current.finshed();
      }
      if (amoutWatched >92) {
        console.log("skipppppppppppp butttonn appearrrrrrrrrrrrr ");
      }
    } 
  };
  const getSkips = async()=>{
    const epNum = ep.split("-").slice(-1).join("")
    const data = await getSkipTimes(21,epNum)
    console.log(data,"data skips");
    if (data.length > 0 ) {
      const intro = data.find((item) => item?.skipType.toLowerCase() === "op");
      const next = data.find((item) => item?.skipType.toLowerCase() === "ed");
      setSkips(prev=>({...prev,intro:intro?.interval?.endTime }))
      setSkips(prev=>({...prev,next:next?.interval?.startTime }))
    }
  }
  
  const  continueWatching = async() =>{
    const playList = await getPlayList(id);
    const {current,total,videos} = playList.playlist;
    setTotal(total);
    if (!videoRef.current) return false; 
    const videoIndex = videos.findIndex(vid => vid.id === ep);
    const amount = videoIndex < 0 ? current.amount : videos[videoIndex].amount > 0 && videos[videoIndex].amount >  current.amount ? videos[videoIndex].amount : current.amount ;
    console.log(current,"curnt player container",skips.intro,skips.next);
    const convertToSec = (amount* 15250 )/1000 
    if(convertToSec > skips.intro && convertToSec < skips.next){
      console.log("lena fel if ");
      await videoRef.current.playFromPositionAsync(amount * 15250);
    }else {
      let auto = false
      if (auto) await videoRef.current.playFromPositionAsync(skips.intro * 1000);
      else{ 
        console.log("lena fel else ->else");
        await videoRef.current.playFromPositionAsync(0*15250);  
      };
    }
  };
  const onSwipe = (gestureName, gestureState)  =>{
    if (gestureName===SWIPE_RIGHT) {
      console.log(gestureState.moveX,"right");
    }
    console.log(gestureName, gestureState);
  };
  useEffect(()=>{
    getSkips()
    if (status === "success" ) {
      setSource(data.sources[4].url); 
    }
  },[data]);

  useCallback(()=>{ 
    getSkips() 
    if (status === "success" ) {     
      setSource(data.sources[4].url);   
      unlaodplaybackInstance("stop");     
    }
  },[ep]);

  useFocusEffect(
    useCallback(()=>{
      continueWatching();
    },[data,ep,skips])
  );
// GestureRecognizer config={config} onSwipe={onSwipe} onTouchEndCapture={(e)=>console.log(e.nativeEvent,"test test test test test test")}
  return (
    <GestureRecognizer config={config} onSwipe={onSwipe}   >
      {status === "error" && (Alert.alert(
        "Server Error",
        "Something went down with the server try again ",
          [{
            text:"Ok",
            onPress:()=>{navigation.goBack()},
            style:"default"
          }]
        )
      )}
      {status === "loading" && ( 
        <View className=" h-full flex-row justify-center ">
          <ActivityIndicator size={"large"} />
        </View>
      )}
      {status === "success" && (
        <View className="bg-black">
          <VideoPlayer 
            videoRef={videoRef} source={source} resize={resize}
            onPlaybackStatusUpdate={onPlaybackStatusUpdate}   
          />
          <PlayerControlers 
            source={source} setSource={setSource} resize={resize} setResize={setResize} videoRef={videoRef} 
            vidStatus={vidStatus}  setEp={setEp} ep={ep} total={total} data={data} id={id}  finshed={finshed}
            unlaodplaybackInstance={unlaodplaybackInstance}  loading={loading} skips={skips}
          /> 
        </View>
      )}
    </GestureRecognizer>
  )
}

export default Player