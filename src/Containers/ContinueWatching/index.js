import { View,  } from 'react-native'
import React,{useEffect,useState} from 'react'
import{ ContinueCard  }from '../../Components'
import { useSelector } from 'react-redux'
import { getPlayLists } from '../../utlis/graphql/querys/queryHandler'
const ContinueWatching = () => {
    const {user} = useSelector(state => state.user);
    const [watching,setWatching] = useState([])
    const fetchPlayLists = async ()=>{
        const res = await getPlayLists({user:user.id})
        if(res.playlists) setWatching(res.playlists);
    }
    useEffect(()=>{fetchPlayLists()},[])
    if (watching?.length>0) {
        return (
            <View>
                <ContinueCard title={"Continue Wathcing"} data={watching} />
            </View>
        )
    }
 
}

export default ContinueWatching