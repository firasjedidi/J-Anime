import { View, Text,TextInput,TouchableOpacity } from 'react-native'
import React,{useState} from 'react'
import { useDispatch } from 'react-redux';
import { authed } from '../../Redux-Store/user';
import { register } from '../../utlis/graphql/mutaions/mutaionsHandler'
import { rGI } from '../../utlis/helpers/helper';
import { useNavigation } from '@react-navigation/native';
const intailState = {email:"",password:"",image:"",username:""}
const Register = ({setAuthShow}) => {
  const [info,setInfo] = useState(intailState);
  const dispatch = useDispatch();
  const registerButton = async() => {
   setInfo(prev=>({...prev,image:rGI()}))
    if (info.email === "" || info.username === "" || info.password.length <8 ) {
      alert(info.password.length <8 ? "password at least contain 8 charerter":"filed should not be empty ")
    } else {
      const res = await register(info);
      console.log(res,'elhone');
      if (res.createUser) {
      dispatch(authed(res.register))
    } else {
      alert(res);
    }
    }
  }
  console.log(info);
  return (
    <View className="w-72 flex-col space-y-6 m-4 justify-center items-center">
      <TextInput 
        className="p-4  w-full border border-white text-white rounded-md  focus:outline-none   "
        placeholderTextColor={"white"}
        placeholder='user Name' 
        cursorColor="white"
        clearTextOnFocus={true}
        onChangeText={(e)=>setInfo(prev=>({...prev,username:e}))}

      />
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
      <TouchableOpacity className="bg-white w-20 " onPress={registerButton}>
        <Text className="p-2 text-center">register</Text>
      </TouchableOpacity>
      <View className="flex-row justify-center items-center">
        <Text className="text-slate-100 text-xs">Already have account ?</Text>
        <TouchableOpacity onPress={()=>setAuthShow(prev=>!prev)}>
          <Text className="p-2 text-center text-blue-400 text-xs">SingIn</Text>
        </TouchableOpacity>
      </View>
    </View>
  )
}

export default Register