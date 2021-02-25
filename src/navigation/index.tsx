import React, { useState } from 'react'
import { Dimensions, Platform, TouchableOpacity } from 'react-native'
import LinearGradient from 'react-native-linear-gradient'
import { createDrawerNavigator } from '@react-navigation/drawer'

import DrawerContent from './DrawerContent'

// importing Screens
import HomeScreen from '../screens/HomeScreen'
import AboutScreen from '../screens/AboutScreen'
import PrecautionScreen from '../screens/PrecautionScreen'
import HelpScreen from '../screens/HelpScreen'
import TopHeadlinesScreen from '../screens/TopHeadlinesScreen'

import {
  Menu
} from '../components/Svgs/index'

import Layout from '../Layout'
const scale = Layout.fontScale

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
    <LinearGradient
      colors={['#DEF7FF', '#B1ECFF']}
      style={{ flex: 1, backgroundColor: '#B1ECFF' }}>
      <Drawer.Navigator
        edgeWidth={100}
        lazy={false}
        initialRouteName="Home"
        drawerType={isLargeDevice ? 'permanent' : 'slide'}
        overlayColor="transparent"
        drawerStyle={{
          width: isLargeDevice ? '20%' : '50%',
          backgroundColor: 'transparent'
        }}
        sceneContainerStyle={{ backgroundColor: 'transparent' }}
        screenOptions={{
          headerShown: !isLargeDevice,
          // eslint-disable-next-line react/display-name
          header: (p) => {
            const navigation = p.scene.descriptor.navigation
            return (
              <TouchableOpacity
                style={{
                  backgroundColor: 'white',
                  position: 'absolute',
                  top: 10,
                  left: 10,
                  borderRadius: 8,
                  elevation: 8,
                  zIndex: 100
                }}
                onPress={() => navigation.toggleDrawer()}
              >
                <Menu
                  style={{
                    margin: 8,
                    scaleX: scale,
                    scaleY: scale
                  }}
                  color="black"
                />
              </TouchableOpacity>
            )
          }
        }}
        drawerContent={(p) => <DrawerContent {...p} country={props.country} />}
      >
        <Drawer.Screen name="Home" component={HomeScreen} />
        {
          Platform.OS !== 'web' ? (
            <Drawer.Screen name="Headline" component={TopHeadlinesScreen} />
          ) : null
        }
        <Drawer.Screen name="Precaution" component={PrecautionScreen} />
        {
          country.trim() === 'India' ? (
            <Drawer.Screen name="Help" component={HelpScreen} />
          ) : null
        }
        <Drawer.Screen name="About" component={AboutScreen} />
      </Drawer.Navigator>
    </LinearGradient>
  )
}

export default RootNavigator
