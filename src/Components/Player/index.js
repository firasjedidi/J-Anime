import { View, Dimensions ,Pressable,ActivityIndicator} from 'react-native'
import React, { useState}  from 'react'
import PlayerMenu from './Menu';
import VideoBanner from './VideoBanner';
import SliderBar from './Slider';
import PlayPause from './PlayPause';
const PlayerControlers = (props) => {
    const {
        source,setSource,resize,setResize,
        videoRef,vidStatus,ep,setEp,total,data,
        id,unlaodplaybackInstance,finshed,loading
    } = props;
    const [active, setActive] = useState(false);
    const [toggleControllers, setToggleControllers] = useState(false);
    const [lastPress,setlastPress  ] = useState(0);
    const { width: DEVICE_WIDTH, height: DEVICE_HEIGHT } = Dimensions.get("screen");
    const handlePress = async() => {
        var delta = new Date().getTime() - lastPress;
        if (delta < 250) {
          if (!vidStatus.isLoaded) return false;
          vidStatus.isPlaying
          ? await videoRef.current.pauseAsync()
          : await  videoRef.current.playAsync();
        }else{   
          setToggleControllers(prev =>!prev); 
         active ? setActive(prev =>!prev) : null;
        }  
        setlastPress(new Date().getTime()); 
      };
  return (
    <Pressable onPress={handlePress} className={`absolute ${toggleControllers ? ' opacity-0  ':'opacity-1 '}  bg-black/50`}  style={{ width: DEVICE_WIDTH,height: DEVICE_HEIGHT }} >
        {active && (
            <PlayerMenu 
                setActive={setActive} data={data}
                source={source} setSource={setSource}  
                resize={resize} setResize={setResize} 
            />
        )}
        <VideoBanner 
            setActive={setActive} ep={ep}
            unlaodplaybackInstance={unlaodplaybackInstance}
        />
        <SliderBar   
            videoRef={videoRef} vidStatus={vidStatus}
        />
        {loading && (
            <View className=" h-full flex-row justify-center ">
                <ActivityIndicator size={"large"} />
            </View>
        )}         
        
        <PlayPause 
            videoRef={videoRef} vidStatus={vidStatus}
            setEp={setEp} ep={ep} total={total} 
            ref={finshed} id={id}
        />    
    </Pressable> 
  )
}

export default PlayerControlers