import { View, Text,TextInput,TouchableOpacity } from 'react-native'
import React,{useState} from 'react'
import { useDispatch } from 'react-redux';
import { authed } from '../../Redux-Store/user';
import { login } from '../../utlis/graphql/mutaions/mutaionsHandler'
import { useNavigation } from '@react-navigation/native';

const Login = ({setAuthShow}) => {
    const [info,setInfo] = useState({email:"",password:""})
    const dispatch = useDispatch();
    const navigation  = useNavigation();
    const loginButton = async() => {
        if (info.email === "" || info.password.length <8 ) {
            alert(info.password.length <8 ? "password at least contain 8 charerter":"filed should not be empty ")
        } else {
            const res = await login(info);
            console.log(res);
            if (res.login) {
                console.log("yoooo");
                dispatch(authed(res.login));
                // navigation.navigate('HomeScreen')
            } else {
                alert(res);
            }
        }
    }

  return (
    <View className="w-72 flex-col space-y-6 m-4 justify-center items-center">
        <TextInput 
            className="p-4  w-full border border-white text-white rounded-md  focus:outline-none   "
            placeholderTextColor={"white"}
            placeholder='Email' 
            cursorColor="white"
            clearTextOnFocus={true}
            onChangeText={(e)=>setInfo(prev=>({...prev,email:e}))}
        />
        <TextInput 
            className="p-4  w-full border border-white text-white rounded-md  focus:outline-none   "
            placeholderTextColor={"white"}
            placeholder='Passsword' 
            cursorColor="white"
            clearTextOnFocus={true}
            onChangeText={(e)=>setInfo(prev=>({...prev,password:e}))}
            secureTextEntry
        />
        <TouchableOpacity className="bg-white w-20 " onPress={loginButton}>
            <Text className="p-2 text-center">Login</Text>
        </TouchableOpacity>
        <View className="flex-row justify-center items-center">
            <Text className="text-slate-100 text-xs">Don't have account ?</Text>
            <TouchableOpacity onPress={()=>setAuthShow(prev=>!prev)}>
                <Text className="p-2 text-center text-blue-400 text-xs">Singup</Text>
            </TouchableOpacity>
        </View>
    </View>
  )
}

export default Login