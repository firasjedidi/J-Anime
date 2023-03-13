import { View, Text,SafeAreaView ,Image,TouchableOpacity} from 'react-native'
import React  from 'react'
import Global from '../../../Global';
import { AuthContainer } from '../../Containers';
const Login = () => {
 

  return (
    <SafeAreaView style={Global.AndroidSafeArea} >
     <AuthContainer/>
    </SafeAreaView>
  )
}

export default Login