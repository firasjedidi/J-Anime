import { View, Text,ScrollView,Image } from 'react-native'
import React,{useState} from 'react'
import { ReactNativeZoomableView } from '@openspacelabs/react-native-zoomable-view';
const MangaPages = ({data}) => {
    const [scroll,setScroll] = useState(true)
    const [zoom,setzoom] = useState(0.8)
  return (
    <ScrollView className=" w-full h-full " scrollEnabled={scroll}>
        <View  className=" w-full h-full items-center mb-20 ">
            {data.map((item,index)=>( 
                <View className=" w-96 h-96  items-center flex-row justify-center flex-wrap P-4 z-10" key={index}  >   
                    <ReactNativeZoomableView 
                        onZoomBefore={() => setScroll(false)}
                        onZoomEnd={(e) => {setScroll(true);setzoom(0.8)}}
                        maxZoom={2.5}
                        minZoom={0.8}
                        zoomStep={0.8}
                        initialZoom={zoom}
                        disablePanOnInitialZoom
                        contentWidth={10}
                        doubleTapZoomToCenter
                        style={{width:300}}
                        
                    >
                        <Image 
                            className="w-full h-full rounded-md  "
                            source={{
                                uri:item.img,
                                headers: {
                                    Referer: item?.Referer,
                                },
                            }} 
                            resizeMode="contain"
                        /> 
                    
                    </ReactNativeZoomableView>  
                </View>
             ))} 
        </View>
    </ScrollView>
  )
}

export default MangaPages