import React, { useState } from 'react'
import { View, TouchableOpacity, Dimensions, Platform } from 'react-native'

// importing components
import {
  Menu
} from './Svgs/index'

// importing layout
import Layout from '../Layout'

const MainHeader = (props: any) => {
  const [isLargeDevice, setIsLargeDevice] = useState<boolean>(Layout.isLargeDevice)

  if (Platform.OS === 'web') {
    Dimensions.addEventListener('change', ({ window }) => {
      if (isLargeDevice !== (window.width > Layout.largeScreenBreak)) {
        setIsLargeDevice(window.width > Layout.largeScreenBreak)
      }
    })
  }

  const navigation = props.navigation

  if (isLargeDevice) {
    return null
  }

  return (
    <View
      style={{
        backgroundColor: 'transparent',
        position: 'absolute',
        top: 10,
        left: 10,
        zIndex: 9999
      }}
    >
      <TouchableOpacity
        style={{
          backgroundColor: 'white',
          borderRadius: 8,
          elevation: 8
        }}
        onPress={() => { navigation.toggleDrawer() }}
      >
        <Menu
          style={{
            margin: 8
          }}
          color="black"
        />
      </TouchableOpacity>
    </View>
  )
}

export default MainHeader
