import { SafeAreaView,} from 'react-native'
import React from 'react'
import Global from '../../../Global';
import {SettingsContainer} from '../../Containers';
const Settings = () => {
  return (
    <SafeAreaView style={Global.AndroidSafeArea}> 
     <SettingsContainer />
    </SafeAreaView>
  )
}

export default Settings