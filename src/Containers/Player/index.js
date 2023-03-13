import { View, Text,Pressable,Dimensions ,ActivityIndicator,Alert} from 'react-native'
import React, {  useEffect, useRef, useState, useCallback}  from 'react'
import { useFocusEffect } from '@react-navigation/native';
import { useQuery } from 'react-query'
import { getStreaming } from '../../utlis/api'
import  {PlayPause,VideoBanner,VideoPlayer,SliderBar,PlayerMenu} from  '../../Components'
import { useSelector,useDispatch } from 'react-redux'
import { ResizeMode } from 'expo-av';
import { deletewatching,updateWatching,checkvideo} from '../../Redux-Store/PlayerChange'
import {getPlayList} from '../../utlis/graphql/querys/queryHandler'
import { updatePlaylistProgress } from '../../utlis/graphql/mutaions/mutaionsHandler';
import GestureRecognizer, {swipeDirections} from 'react-native-swipe-gestures';
import { useNavigation } from '@react-navigation/native';
const Player = ({param,id}) => {
  const [ep, setEp] = useState(param);
  const {data,status} = useQuery(['stream',ep],()=> getStreaming(ep),{cacheTime:0});
  const videoRef = useRef(null);
  const [vidStatus, setStatus] = useState({});
  const [active, setActive] = useState(false);
  const [toggleControllers, setToggleControllers] = useState(false);
  const [source, setSource] = useState("");
  const [lastPress,setlastPress  ] = useState(0);
  const [loading,setLoading] = useState(false);
  const finshed = useRef();
  const [resize, setResize] = useState({name:"contain",mode:ResizeMode.CONTAIN});
  const dispatch = useDispatch();
   const [total,setTotal  ] = useState(null);
  const {watching} = useSelector(state => state.player);
  const navigation = useNavigation()
  const { width: DEVICE_WIDTH, height: DEVICE_HEIGHT } = Dimensions.get("window");
  const { SWIPE_RIGHT, SWIPE_LEFT} = swipeDirections;
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
    var dub = ep.split('-').includes('dub');  
    var t = dub ? ep.split('-').indexOf('dub') : ep.split('-').indexOf('episode');
    var y = dub ? ep.split('-').slice(0,t).join(" ") : ep.split('-').slice(0,t).join(" ");
    if (status.isLoaded) {   
      var amoutWatched = (status.positionMillis / status.durationMillis ) * 100;
      if(status.isPlaying){
        const updated = await updatePlaylistProgress({ "updatePlaylistVideoId": id,"videoId": ep,"amount": amoutWatched})
      }
    }
  } 

  const onPlaybackStatusUpdate = async(status)=> { 
    if (!status.isLoaded) {
      if (status.error) {
        Alert.alert(
          'Error',
          'Something  caused this error to appear',
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
        console.log(amoutWatched ,"mill");
      } 
      if (status.isBuffering) {
        setLoading(true)
      } 
      if ( status.didJustFinish) {
        await finshed.current.finshed();
      }
      if (amoutWatched >92) {
        console.log("skipppppppppppp butttonn appearrrrrrrrrrrrr ");
      }
    } 
  };

  const  continueWatching = async() =>{
    const playList = await getPlayList(id);
    const {current,total,videos} = playList.playlist;
    setTotal(total);
    if (!videoRef.current) return false; 
    const videoIndex = videos.findIndex(vid => vid.id === ep);
    const amount = videoIndex < 0 ? current?.amount : videos[videoIndex].amount;
    console.log(current,"curnt player container",amount);
    if(amount>0 && amount < 92){
      await videoRef.current.playFromPositionAsync(amount * 15250) ;
    }else {
      await videoRef.current.playFromPositionAsync(0* 15250);
    }
  }
  const handlePress = async() => {
    var delta = new Date().getTime() - lastPress;
    if (delta < 250) {
      if (!vidStatus.isLoaded) return false;
      vidStatus.isPlaying
      ?await videoRef.current.pauseAsync()
      :await  videoRef.current.playAsync();
    }else{
      setToggleControllers(prev =>!prev) 
    }  
    setlastPress(new Date().getTime()) 
}
  const onSwipe = (gestureName, gestureState)  =>{
    // if (gestureName===SWIPE_LEFT) {
    //   navigation.goBack()
    // }
    if (gestureName===SWIPE_RIGHT) {
      console.log(gestureState.moveX,"right");
    }
    console.log(gestureName, gestureState);
  }
  useEffect(()=>{
    if (status === "success" ) {
      setSource(data.sources[4].url); 
      // continueWatching()  
    }
  },[data])

  useCallback(()=>{  
    if (status === "success" ) {
      setSource(data.sources[4].url);   
      unlaodplaybackInstance("stop");     
    }
  },[ep])

  useFocusEffect(
    useCallback(()=>{
      continueWatching();
    },[data,ep])
  )
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
        <>
          <VideoPlayer 
            videoRef={videoRef} source={source} resize={resize}
            onPlaybackStatusUpdate={onPlaybackStatusUpdate}   
          />
          <View  className=" absolute"  style={{ width: DEVICE_WIDTH,height: DEVICE_HEIGHT }} >
            {active && (
              <PlayerMenu 
                setActive={setActive} data={data}
                source={source}setSource={setSource}  
                resize={resize} setResize={setResize} 
              />
            )}
            <VideoBanner 
              setActive={setActive} ep={ep}
              toggleControllers={toggleControllers} 
              unlaodplaybackInstance={unlaodplaybackInstance}
            />
            <SliderBar   
              videoRef={videoRef} vidStatus={vidStatus}
              toggleControllers={toggleControllers} 
            />
            {loading && (
              <View className=" h-full flex-row justify-center ">
                <ActivityIndicator size={"large"} />
              </View>
            )}         
            {/*press to show or hide controles   */}
            <View className="h-[19rem] w-full   absolute flex-row justify-center "  >
            <View className="   absolute flex-row justify-center"  >
              {/* <Pressable className=" w-44 h-72   bg-gray-500/25"></Pressable> */}
              <Pressable className=" h-72  w-96 bg-gray-500/20" onPress={handlePress}></Pressable>
              {/* <Pressable className=" w-44 h-72   bg-gray-500/25"></Pressable> */} 
            </View>
          </View>
            <PlayPause 
              videoRef={videoRef} vidStatus={vidStatus}
              setEp={setEp} ep={ep} total={total}
              toggleControllers={toggleControllers}  
              ref={finshed} id={id}
            />    
          </View> 
        </>
      )}
    </GestureRecognizer>
  )
}

export default Player