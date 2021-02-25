import React, { useState } from 'react'
import { Dimensions, Platform } from 'react-native'
import LinearGradient from 'react-native-linear-gradient'
import { createDrawerNavigator } from '@react-navigation/drawer'

import { DrawerContent, Screens } from './Drawer'

import Layout from '../Layout'
const Drawer = createDrawerNavigator()

export type RootNavigatorProps = {
    country: string,
}

const RootNavigator = (props: RootNavigatorProps) => {
  const [isLargeDevice, setIsLargeDevice] = useState<boolean>(Layout.isLargeDevice)

  if (Platform.OS === 'web') {
    Dimensions.addEventListener('change', ({ window }) => {
      if (isLargeDevice !== (window.width > Layout.largeScreenBreak)) {
        setIsLargeDevice(window.width > Layout.largeScreenBreak)
      }
    })
  }

  return (
    <LinearGradient
      colors={['#DEF7FF', '#B1ECFF']}
      style={{ flex: 1, backgroundColor: '#B1ECFF' }}>
      <Drawer.Navigator
        edgeWidth={100}
        initialRouteName="Screens"
        drawerType={isLargeDevice ? 'permanent' : 'slide'}
        overlayColor="transparent"
        drawerStyle={{
          width: isLargeDevice ? '20%' : '50%',
          backgroundColor: 'transparent'
        }}
        sceneContainerStyle={{ backgroundColor: 'transparent' }}
        drawerContent={(p) => <DrawerContent {...p} country={props.country} />}>
        <Drawer.Screen name="Screens">
          {(p) => <Screens
            {...p}
            country={props.country}
            isLargeDevice={isLargeDevice}
          />}
        </Drawer.Screen>
      </Drawer.Navigator>
    </LinearGradient>
  )
}

export default RootNavigator
