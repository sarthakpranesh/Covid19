import React, { useState } from 'react'
import { Dimensions, Platform } from 'react-native'
import { createDrawerNavigator } from '@react-navigation/drawer'

import DrawerContent from './DrawerContent'

// importing Screens
import HomeScreen from '../screens/HomeScreen'
import AboutScreen from '../screens/AboutScreen'
import PrecautionScreen from '../screens/PrecautionScreen'
import HelpScreen from '../screens/HelpScreen'
import TopHeadlinesScreen from '../screens/TopHeadlinesScreen'

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

  const country = props.country

  return (
    <Drawer.Navigator
      edgeWidth={100}
      lazy={true}
      initialRouteName="Home"
      drawerType={isLargeDevice ? 'permanent' : 'front'}
      drawerStyle={{
        width: isLargeDevice ? '20%' : '50%',
        backgroundColor: '#B1ECFF'
      }}
      drawerContent={(p) => <DrawerContent {...p} country={props.country} />}
    >
      {
        Platform.OS !== 'web' ? (
          <Drawer.Screen name="Headline" component={TopHeadlinesScreen} />
        ) : null
      }
      {
        country.trim() === 'India' ? (
          <Drawer.Screen name="Help" component={HelpScreen} />
        ) : null
      }
      <Drawer.Screen name="Home" component={HomeScreen} />
      <Drawer.Screen name="Precaution" component={PrecautionScreen} />
      <Drawer.Screen name="About" component={AboutScreen} />
    </Drawer.Navigator>
  )
}

export default RootNavigator
