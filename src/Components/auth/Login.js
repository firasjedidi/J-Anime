import { View, Text,TextInput,TouchableOpacity } from 'react-native'
import React from 'react'
import auth from '@react-native-firebase/auth';
const Login = () => {
    const loginButton = ()=>{
        auth()
        .createUserWithEmailAndPassword('jane.doe@example.com', 'SuperSecretPassword!')
        .then(() => {
            console.log('User account created & signed in!');
        })
        .catch(error => {
            if (error.code === 'auth/email-already-in-use') {
            console.log('That email address is already in use!');
            }

            if (error.code === 'auth/invalid-email') {
            console.log('That email address is invalid!');
            }

            console.error(error);
        });
    }
  return (
    <View className="w-72 flex-col space-y-6 m-4 justify-center items-center">
        <TextInput 
            className="p-4  w-full border border-white text-white rounded-md  focus:outline-none   "
            placeholderTextColor={"white"}
            placeholder='Email' 
            cursorColor="white"
            clearTextOnFocus={true}
        />
        <TextInput 
            className="p-4  w-full border border-white text-white rounded-md  focus:outline-none   "
            placeholderTextColor={"white"}
            placeholder='Passsword' 
            cursorColor="white"
            clearTextOnFocus={true}
            secureTextEntry
        />
        <TouchableOpacity className="bg-white w-20 " onPress={loginButton}>
            <Text className="p-2 text-center">Login</Text>
        </TouchableOpacity>
        <View className="flex-row justify-center items-center">
            <Text className="text-slate-100 text-xs">Don't have account ?</Text>
            <TouchableOpacity >
                <Text className="p-2 text-center text-blue-400 text-xs">Singup</Text>
            </TouchableOpacity>
        </View>
    </View>
  )
}

export default Login