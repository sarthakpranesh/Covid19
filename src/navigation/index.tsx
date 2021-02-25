import React, { useState } from 'react'
import { Dimensions, Platform } from 'react-native'
import LinearGradient from 'react-native-linear-gradient'
import { createDrawerNavigator } from '@react-navigation/drawer'
import Animated from 'react-native-reanimated'

import { DrawerContent, Screens } from './Drawer'

import Layout from '../Layout'
const Drawer = createDrawerNavigator()

export type RootNavigatorProps = {
    country: string,
}

const RootNavigator = (props: RootNavigatorProps) => {
  const [isLargeDevice, setIsLargeDevice] = useState<boolean>(Layout.isLargeDevice)
  const [progress, setProgress] = useState<Animated.Node<number>>(
    new Animated.Value(0)
  )
  const scale = Animated.interpolate(progress, {
    inputRange: [0, 1],
    outputRange: [1, 0.8]
  })
  const borderRadius = Animated.interpolate(progress, {
    inputRange: [0, 1],
    outputRange: [0, 16]
  })

  const animatedStyle = { borderRadius, transform: [{ scale }] }
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
        drawerContent={(p) => {
          setProgress(p.progress)
          return <DrawerContent {...p} country={props.country} />
        }}>
        <Drawer.Screen name="Screens">
          {(p) => <Screens
            {...p}
            style={animatedStyle}
            country={props.country}
            isLargeDevice={isLargeDevice}
          />}
        </Drawer.Screen>
      </Drawer.Navigator>
    </LinearGradient>
  )
}

export default RootNavigator
