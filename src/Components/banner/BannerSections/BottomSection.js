import {  Text, View ,Pressable,} from 'react-native'
import React from 'react'
import {LinearGradient} from 'expo-linear-gradient';
import { InformationCircleIcon} from "react-native-heroicons/outline";
import { PlayIcon,PlusIcon,ChevronDownIcon} from "react-native-heroicons/mini";
import { useNavigation } from '@react-navigation/native';
import { useDispatch ,useSelector} from 'react-redux';
import { addToList } from '../../../Redux-Store/playList';
import { getInfo } from '../../../utlis/api';
import { animeNameConverter, covertToDub, covertToSub, customAlert } from '../../../utlis/helpers/helper';
import {checkPlaylist} from '../../../utlis/graphql/querys/queryHandler';
import {createPlaylist,updatePlaylist} from '../../../utlis/graphql/mutaions/mutaionsHandler'
const BottomSection = ({newData}) => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const {user} = useSelector(state => state.user);
  const player = async() => {
    const res = await getInfo(parseInt(newData.id));
    if (res) {
      const {image,episodes,id} = res
      const animeName = animeNameConverter(episodes[0].id);
      const playlist = await checkPlaylist({user:user.id,videoId:animeName});
      if ( playlist.checkPlayList ) {
        const { current, subordub ,_id} = playlist.checkPlayList;
        const ep = current.id
        const update = { current: { id:ep}, subordub, updatePlaylistId:_id, videos:false,total:episodes.length };
        const playListId = await updatePlaylist(update);
        if(playListId.updatePlaylist)navigation.navigate('PlayerScreen', {ep,id:playListId.updatePlaylist._id});
        else alert("somthing went wrong try again"+playListId)
      } else {
        const subordub = "sub";
        const ep = data.episodes[0].id;
        const creation = {
          name:animeName,current:{id:ep},subordub,
          total:episodes.length,image:image,info:id,
          userId:user.id
        };
        const playListId = await createPlaylist(creation);
        if(playListId.createPlaylist)navigation.navigate('PlayerScreen', {ep,id:playListId.createPlaylist._id});
        else alert("somthing went wrong try again"+playListId)
      }
    } else {
      navigation.navigate('DetaliScreen',{id:newData.id})
    }
  }
 
  return (
    <View className='absolute left-0 right-0 bottom-0 '>
      <LinearGradient 
        colors={[
          'rgba(0,0,0,.9)','transparent'
        ]}
        start={{x: 1, y: 1}}
        end={{x: 1, y: 0}}
        locations={[0.4,1]}
        className=' h-32'
      >
        <View >
          <View className="flex-row justify-center items-center mt-5">
            {newData?.genres[0] &&(
              <>
                <Text className='text-white py-0 px-2 '>
                  {newData?.genres[0]}
                </Text>
              </>
            )}   
            {newData?.genres[1] &&(
              <>
                <View className='w-1 h-1 mx-2 my-0 bg-white rounded-full'></View>
                <Text className='text-white py-0 px-2 '>
                  {newData?.genres[1]}
                </Text>
              </>
            )}
            {newData?.genres[2] &&(
              <>
                <View className='w-1 h-1 mx-2 my-0 bg-white rounded-full'></View>
                <Text className='text-white py-0 px-2 '>
                  {newData.genres[2]}
                </Text>
              </>
            )}
          </View>
          <View className="flex-row w-full items-center justify-around mt-4  ">
            <Pressable activeOpacity={0.5 } className="items-center" onPress={()=>dispatch(addToList(newData))}>
              <View className="items-center">
                <PlusIcon size={28} color="#fff"/>
                <Text className="text-white text-sm mt-1"  >My List</Text>
              </View>
            </Pressable>
            <Pressable activeOpacity={0.5} className="items-center" onPress={()=>player(newData.id)}>
              <View className="flex-row bg-white w-24 rounded-md h-8 items-center justify-center" >
                <PlayIcon  size={26} color="black"/>
                <Text className=" text-sm ml-1 font-bold ">Play</Text>
              </View>
            </Pressable>
            <Pressable activeOpacity={0.5} className="items-center" onPress={()=>navigation.navigate('DetaliScreen',{id:newData.id})}>
              <View className="items-center">
                <InformationCircleIcon  size={28} color="#fff"/>
                <Text className="text-white text-sm mt-1">Info</Text>
              </View>
            </Pressable>
          </View>
        </View>
      </LinearGradient>
    </View>
  )
}

export default BottomSection

