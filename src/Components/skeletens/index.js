import { useWindowDimensions } from 'react-native'
import React from 'react'
import ContentLoader, { Rect, Circle, Path } from "react-content-loader/native"
const HomeScel = () => {
    const {width,height} = useWindowDimensions()
    const arr = Array(9).fill(0)
  return (
    <ContentLoader 
        speed={1}
        width={width}
        height={height-190}
        backgroundColor="#404040"
        foregroundColor="#919191"
        style={{flexDirection:"row",flexWrap:"wrap"}}
    >
        <Rect x="" y="0" rx="8" ry="8" width="100%" height="480" />
        
    </ContentLoader>
  )
}
const CardVerScel = () => {
    const {width,height} = useWindowDimensions()
    const arr = Array(3).fill(0)
    return (
        <ContentLoader 
            speed={1}
            width={width}
            height={height}
            backgroundColor="#404040"
            foregroundColor="#919191"
        >
            {/* <Rect x="10" y="5" rx="8" ry="8" width="110" height="18" /> */}
            {arr.map((_,i)=>(
                <React.Fragment key={i}>     
                    <Rect x={i+1 === 1 ? 1 * 10 : 10 } y={i+1 === 1 ? 1 * 30 : i * 250} rx="8" ry="8" width="110" height="180" />
                    <Rect x={i+1 === 1 ? 1 * 23 : 23 } y={i+1 === 1 ? 1 * 220 : i * 445} rx="0" ry="0" width="80" height="15" />
                </React.Fragment>
            ))}       
            {arr.map((_,i)=>(
                <React.Fragment key={i}>     
                    <Rect x={i+1 === 1 ? 1 * 135 :  135}  y={i+1 === 1 ? 1 * 30 : i * 250} rx="8" ry="8" width="110" height="180" />
                    <Rect x={i+1 === 1 ? 1* 145 : 145}   y={i+1 === 1 ? 1 * 220 : i * 445} rx="0" ry="0" width="80" height="20" />
                </React.Fragment>
            ))}  
            {arr.map((_,i)=>(
                <React.Fragment key={i}>     
                    <Rect x={i+1 === 1 ? 1 * 260 :  260} y={i+1 === 1 ? 1 * 30 : i * 250} rx="8" ry="8" width="110" height="180" />
                    <Rect x={i+1 === 1 ? 1* 275 :  275}   y={i+1 === 1 ? 1 * 220 : i * 445} rx="0" ry="0" width="80" height="20" />
                </React.Fragment >
            ))}    
      </ContentLoader>
    )
}
const CardScel = () => {
    const {width,height} = useWindowDimensions()
    const arr = Array(3).fill(0)
    return (
        <ContentLoader 
            speed={1}
            width={width}
            height={height/2.5}
            backgroundColor="#404040"
            foregroundColor="#919191"
           
        >
            <Rect x="10" y="5" rx="8" ry="8" width="110" height="18" />
            {arr.map((_,i)=>(
                <React.Fragment key={i}>     
                    <Rect x={i+1 === 1 ? 1 * 10 : i* 129 } y="40" rx="8" ry="8" width="110" height="180" />
                    <Rect x={i+1 === 1 ? 1 * 23 : i * 140 } y="240" rx="0" ry="0" width="80" height="15" />
                </React.Fragment>
            ))}       
            
      </ContentLoader>
    )
}
const InfoScel = () => {
    const {width,height} = useWindowDimensions()

    return (
        <ContentLoader 
        speed={1}
        width={width}
        height={height}
        backgroundColor="#404040"
        foregroundColor="#919191"
      >
        <Rect  x="" y="0" rx="0" ry="0"  width="100%" height="180" />

        <Rect x="30"  y="185" rx="10" ry="10" width="120" height="170"  />

        <Rect x="180"  y="200" rx="0" ry="0" width="160" height="18"  />
        <Rect x="210"  y="230" rx="0" ry="0" width="100" height="18"  />

        <Rect x="180"  y="260" rx="0" ry="0" width="30" height="18"  />
        <Rect x="225"  y="260" rx="0" ry="0" width="30" height="18"  />
        <Rect x="265"  y="260" rx="0" ry="0" width="30" height="18"  />
        <Rect x="305"  y="260" rx="0" ry="0" width="30" height="18"  />

        <Rect x="180"  y="300" rx="10" ry="10" width="70" height="40"  />
        <Rect x="270"  y="300" rx="10" ry="10" width="70" height="40"  />

        <Rect x="30"  y="380" rx="0" ry="0" width="320" height="10"  />
        <Rect x="30"  y="400" rx="0" ry="0" width="320" height="10"  />
        <Rect x="30"  y="420" rx="0" ry="0" width="320" height="10"  />
        <Rect x="30"  y="440" rx="0" ry="0" width="320" height="10"  />
        <Rect x="30"  y="460" rx="0" ry="0" width="320" height="10"  />

        <Rect x="20"  y="500" rx="0" ry="0" width="70" height="10"  />
        <Rect x="100"  y="500" rx="0" ry="0" width="70" height="10"  />
        <Rect x="150"  y="500" rx="0" ry="0" width="70" height="10"  />
        <Rect x="20"  y="520" rx="0" ry="0" width="70" height="1"  />

        <Rect x="20"  y="540" rx="10" ry="10" width="60" height="30"  />
        <Rect x="100"  y="540" rx="10" ry="10" width="60" height="30"  />

        <Rect x="20"  y="590" rx="10" ry="10" width="150" height="80"  />
        <Rect x="200"  y="620" rx="10" ry="10" width="100" height="20"  />
      </ContentLoader>
    )
}


const NewHotScel = () => {
    const {width,height} = useWindowDimensions()
    const arr = Array(9).fill(0)
  return (
    <ContentLoader 
        speed={1}
        width={width}
        height={height}
        backgroundColor="#404040"
        foregroundColor="#919191"    
    >

        {/* <Rect  x="30" y="5" rx="0" ry="0"  width="100" height="25" /> */}
        <Rect x="20"  y="50" rx="10" ry="10" width="150" height="40"  />
        <Rect x="200"  y="50" rx="10" ry="10" width="150" height="40"  />
        {arr.map((_,i)=>(
        <React.Fragment key={i}>
            <Rect  x={i+1 === 1 ? 1 * 30 : 30} y={i+1 === 1 ? 1 * 110 : i * 405} rx="10" ry="10" width="320" height="150" />

            <Rect x={i+1 === 1 ? 1 * 35 : 35}  y={i+1 === 1 ? 1 * 270 : i * 560} rx="0" ry="0" width="90" height="10"  />
            <Rect x={i+1 === 1 ? 1 * 35 : 35}  y={i+1 === 1 ? 1 * 290 : i * 575} rx="0" ry="0" width="90" height="10"  />
            <Rect x={i+1 === 1 ? 1 * 200 : 200}  y={i+1 === 1 ? 1 * 280 : i * 565} width="30" height="10"  />
            <Rect x={i+1 === 1 ? 1 * 260 : 260}  y={i+1 === 1 ? 1 * 280 : i * 565} rx="0" ry="0" width="40" height="10"  />
            <Circle cx={i+1 === 1 ? 1 * 331 : 331} cy={i+1 === 1 ? 1 * 285 : i * 570} r="10" />

            <Rect x={i+1 === 1 ? 1 * 35 : 35}  y={i+1 === 1 ? 1 * 320 : i * 600}rx="0" ry="0" width="300" height="10"  />
            <Rect x={i+1 === 1 ? 1 * 35 : 35} y={i+1 === 1 ? 1 * 340 : i * 620} rx="0" ry="0" width="300" height="10"  />
            <Rect x={i+1 === 1 ? 1 * 35 : 35}  y={i+1 === 1 ? 1 * 360 : i * 640} rx="0" ry="0" width="300" height="10"  />

            <Rect x="35"  y={i+1 === 1 ? 1 * 390 : i * 660} rx="0" ry="0" width="40" height="10"  />
            <Rect x="90"  y={i+1 === 1 ? 1 * 390 : i * 660}  rx="0" ry="0" width="40" height="10"  />
            <Rect x="120"  y={i+1 === 1 ? 1 * 390 : i * 660}  rx="0" ry="0" width="40" height="10"  />
        </React.Fragment>
        ))}
    </ContentLoader>
  )
}
export {InfoScel,CardVerScel,NewHotScel,HomeScel,CardScel}

