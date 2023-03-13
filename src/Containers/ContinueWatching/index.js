import { View, Text } from 'react-native'
import React from 'react'
import{ ContinueCard  }from '../../Components'
import { useSelector } from 'react-redux'
const ContinueWatching = () => {
    const {watching} = useSelector(state => state.player);
    if (watching.length>0) {
        return (
            <View>
                <ContinueCard title={"Continue Wathcing"} data={watching} />
            </View>
        )
    }
 
}

export default ContinueWatching