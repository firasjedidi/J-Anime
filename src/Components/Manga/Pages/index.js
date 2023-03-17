import { View,Image,Pressable,Text} from 'react-native'
import React,{useState} from 'react'
import { ReactNativeZoomableView } from '@openspacelabs/react-native-zoomable-view';
import { ChevronDoubleRightIcon,ChevronDoubleLeftIcon } from 'react-native-heroicons/mini'
const MangaPages = ({data}) => {
    const [zoom,setzoom] = useState(1);
    const [page,setPage] = useState(0);
    const [chapter,setChapter] =  useState(data);
    const next = ()=>{
        if (page >= data.length - 1 ) return;
        setPage(page + 1)
    }
    const prev = ()=>{
        if (page<=0) return;
        setPage(page-1)
    } 
    console.log(chapter);
  return (
    <View   className="flex-1  items-center" >
        <View className={`  w-screen  absolute left-0  right-0 z-20 flex-row items-center justify-between `}>
            <Pressable onPress={prev} className="bg-black/20  ">
                <ChevronDoubleLeftIcon size={40} color={'white'}/>
            </Pressable>
            <Text  className=" text-white "> {page+"/"+(data.length- 1)} </Text>
            <Pressable onPress={next} className="bg-black/20 ">
                <ChevronDoubleRightIcon size={40} color={'white'}/>
            </Pressable>
        </View>
       
        <View   style={{   height: 700, width: '100%' }}>  
            <ReactNativeZoomableView 
                onZoomEnd={(e) => {setzoom(1)}}
                maxZoom={2.5}
                minZoom={1}
                zoomStep={0.8}
                initialZoom={zoom}
                disablePanOnInitialZoom
                contentWidth={10}
                doubleTapZoomToCenter   
            >
                <Image 
                  style={{ width: '100%', height: '100%', resizeMode: 'contain', }}
                    source={{
                        uri:chapter[page].img,
                        headers: {
                            Referer: chapter[page]?.headerForImage?.Referer,
                        }
                    }} 
                  
                /> 
            </ReactNativeZoomableView>  
        </View>
        
    </View>
   
  )
}

export default MangaPages
    // <ScrollView className=" w-screen h-screen " scrollEnabled={scroll}  horizontal={true}   >
    //     <View  className=" w-screen h-screen ">
    //         {data.map((item,index)=>( 
    //             <View className=" w-screen h-screen  items-center flex-row justify-center flex-wrap  z-10" key={index}  >   
    //                 <ReactNativeZoomableView 
    //                     onZoomBefore={() => setScroll(false)}
    //                     onZoomEnd={(e) => {setScroll(true);setzoom(0.8)}}
    //                     maxZoom={2.5}
    //                     minZoom={0.8}
    //                     zoomStep={0.8}
    //                     initialZoom={zoom}
    //                     disablePanOnInitialZoom
    //                     contentWidth={10}
    //                     doubleTapZoomToCenter
    //                     style={{width:300}}
                        
    //                 >
    //                     <Image 
    //                         className="w-full h-full rounded-md  "
    //                         source={{
    //                             uri:item.img,
    //                             headers: {
    //                                 Referer: item?.headerForImage?.Referer,
    //                             },
    //                         }} 
    //                         resizeMode="contain"
    //                     /> 
                    
    //                 </ReactNativeZoomableView>  
    //             </View>
    //          ))} 
    //     </View>
    // </ScrollView>