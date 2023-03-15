import { View, Text,Pressable } from 'react-native'
import React, {  useEffect, useState}  from 'react'

const Skips = ({skips,vidStatus,finshed,videoRef}) => {
    const [skipIntro, setSkipIntro] = useState(false);
    const [skipNext, setSkipNext] = useState(false);
    const positionMillis = vidStatus.positionMillis;
  
    const handleSkiping = async (skipType) => {
      if (skipType === "intro") { 
        await videoRef.current.playFromPositionAsync(skips.intro * 1100);
        setSkipIntro(false);
      } else {
        await finshed.current.finshed();
        setSkipNext(false);
      }
    };
    console.log("skip  button ",skips);
    useEffect(() => {
      if (!skipIntro && positionMillis / 1000 < skips.intro) {
         console.log("reste of skipIntro ");
         if(skipIntro && positionMillis / 1000 > skips.intro) setSkipIntro(false);
        setSkipIntro(true);
      } else if (!skipNext && positionMillis / 1000 >= skips.next-10) {
        setSkipNext(true);
      }
    }, [positionMillis,skipIntro,skipNext ]);
  
    if (skipIntro) {
       
      return (
        <Pressable
          className="absolute left-5 bottom-24   p-2  bg-white/20 rounded "
          onPress={() => handleSkiping("intro")}
        >
          <Text className="text-white text-center">Skip Intro</Text>
        </Pressable>
      );
    } 
    if (skipNext) {
        console.log("skip next button appears",positionMillis / 1000 ,skipNext);
      return (
        <Pressable 
            className="absolute right-14 bottom-24  p-2  bg-white/20 rounded "
            onPress={() => handleSkiping("next")}
        >
          <Text className="text-white text-center">Skip Next</Text>
        </Pressable>
      );
    }
    
}

export default Skips