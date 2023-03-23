import { View, Text, Animated,Pressable,TextInput,TouchableOpacity,Image } from 'react-native'
import React,{useState,useEffect} from 'react'
import { XCircleIcon,} from 'react-native-heroicons/outline';
import { images } from '../../../utlis/helpers/helper';
import { useDispatch,useSelector } from 'react-redux';
import { updateProfile } from '../../../utlis/graphql/mutaions/mutaionsHandler';
import { authed } from '../../../Redux-Store/user';

const intailState = {email:"",password:"",image:"",username:"",id:""}
const Profile = ({top,closeModal}) => {
  const [info,setInfo] = useState(intailState);
  const {user} = useSelector(state=>state.user);
  const select = (e) => setInfo(prev=>({...prev,image:e}))
  const dispatch = useDispatch()
  const updateButton = async ()=>{
    console.log(info);
    if (info.email === "" || info.username === "" || info.password.length <8 ) {
      alert(info?.password.length <8 ? "password at least contain 8 charerter":"filed should not be empty ")
    } else {
      const res = await updateProfile({  "updateUserId": info.id,
      "username":  info.username,  "email": info.email,
      "password": info?.password,
      "image": info.image
    }); 
      console.log(res,'elhone');
      if (res.updateUser) {
      dispatch(authed(res.updateUser));
      closeModal()
    } else {
      alert(res);
    }
    }
  }
 
  useEffect(()=>{
    const { __typename, ...userRest } = user;
    setInfo(userRest);
  },[])
  return (
    <Animated.ScrollView className="absolute bg-[#171717]  w-full h-screen rounded-t-3xl z-10" style={{ top:top }}>
      <View className="flex-row mt-4 px-4  justify-between items-center">
        <Text className="text-gray-300  text-lg ">Update Profile</Text>
        <Pressable  onPress={closeModal}>
          <XCircleIcon size={30} color={"white"}/>
        </Pressable>
      </View>
      <View className="w-screen flex-col space-y-6 mt-4 justify-center items-center">
        <View className="flex-row space-x-2 ">
          {images.map((elem,index)=>(
            <Pressable key={index} onPress={()=>select(elem)} className={`${ elem ===  info.image ?  "border-2 border-white" : ""}`}  >
              <Image className="w-16 h-16 " source={{uri:elem}}  />
            </Pressable>
          ))}
        </View>
        <TextInput 
          className="p-4  w-72 border border-white text-white rounded-md  focus:outline-none   "
          placeholderTextColor={"white"}
          placeholder='user Name' 
          cursorColor="white"
          clearTextOnFocus={true}
          onChangeText={(e)=>setInfo(prev=>({...prev,username:e}))}
          defaultValue={info?.username ? info?.username : ""}
          
        />
        <TextInput 
          className="p-4  w-72 border border-white text-white rounded-md  focus:outline-none   "
          placeholderTextColor={"white"}
          placeholder='Email' 
          cursorColor="white"
          clearTextOnFocus={true}
          onChangeText={(e)=>setInfo(prev=>({...prev,email:e}))}
          defaultValue={info?.email ? info?.email: ""}
        />
        <TextInput 
          className="p-4  w-72 border border-white text-white rounded-md  focus:outline-none   "
          placeholderTextColor={"white"}
          placeholder='Passsword' 
          cursorColor="white"
          clearTextOnFocus={true}
          onChangeText={(e)=>setInfo(prev=>({...prev,password:e}))}
          secureTextEntry
        />
        <TouchableOpacity className="bg-white w-20 rounded-sm " onPress={updateButton} >
          <Text className="p-2 text-center">update</Text>
        </TouchableOpacity>
      </View>
    </Animated.ScrollView>
  )
}

export default Profile