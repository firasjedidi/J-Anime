 
 import { Text,View  } from 'react-native';
 import React,{useState,useEffect} from 'react'
 // Define an animation component
const FadeOutAlert = (props) => {
    const [show,setShow] = useState(false);
    const {message,duration} = props;
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
                <View {...props}>
                    <Text style={{ width: '100%',color:"white"}}>{message}</Text>
                </View>
            )}
      </>
   );
};
 export default FadeOutAlert;
