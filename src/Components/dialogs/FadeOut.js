 
 import { Text,View,Dimensions  } from 'react-native';
 import React,{useState,useEffect} from 'react'
 // Define an animation component
const FadeOutAlert = (props) => {
    const [show,setShow] = useState(false);
    const {message,duration} = props;
    const { width: DEVICE_WIDTH,height: DEVICE_HEIGHT} = Dimensions.get("screen");
    let timeoutId = null;
    const showSnackBar = () => {
       setShow(true);
         timeoutId = setTimeout(() => {
            setShow(false);
        },duration);
      }
    useEffect(() => {
        showSnackBar()
   }, []);

    return (
        <>
            {show &&(
                <View className=  {`bg-[#212121] p-2 duration-75  absolute z-10  `} style={{top:DEVICE_HEIGHT/1.8,left:DEVICE_WIDTH/2.6}} >
                    <Text className="text-white text-center">{message}</Text>
                </View>
            )}
      </>
   );
};
 export default FadeOutAlert;
