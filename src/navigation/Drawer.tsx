/* eslint-disable react/prop-types */
/* eslint-disable react/display-name */
import React from 'react'
import { View, StyleSheet, TouchableOpacity } from 'react-native'
import { createStackNavigator } from '@react-navigation/stack'
import { DrawerContentScrollView } from '@react-navigation/drawer'
import Animated from 'react-native-reanimated'

// importing Screens
import HomeScreen from '../screens/HomeScreen'
import AboutScreen from '../screens/AboutScreen'
import PrecautionScreen from '../screens/PrecautionScreen'
import HelpScreen from '../screens/HelpScreen'
import TopHeadlinesScreen from '../screens/TopHeadlinesScreen'

// Importing drawer components
import DrawerItem from './DrawerItem'
import {
  Menu,
  Home,
  AlertOctagon,
  Columns,
  Github,
  HelpCircle
} from '../components/Svgs/index'

// importing constants
import Layout from '../Layout'
const scale = Layout.fontScale

const Stack = createStackNavigator()

export interface ScreensProps {
  navigation: any;
  country: string;
  isLargeDevice: boolean;
}

export const Screens = ({ navigation, country, isLargeDevice }: ScreensProps) => {
  const stylesForAnimatedView = Layout.isLargeDevice ? [{ flex: 1 }] : [styles.stack]

  return (
    <Animated.View
      style={stylesForAnimatedView}
    >
      <Stack.Navigator
        initialRouteName="Home"
        screenOptions={{
          animationEnabled: true,
          headerTransparent: true,
          title: '',
          headerShown: !isLargeDevice,
          headerLeft: () => (
            <TouchableOpacity
              style={{
                marginLeft: 14,
                borderRadius: 8,
                elevation: 2,
                backgroundColor: 'white'
              }}
              onPress={() => navigation.openDrawer()}
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
        }}>
        <Stack.Screen name="Home">
          {(p: any) => <HomeScreen {...p} />}
        </Stack.Screen>
        <Stack.Screen name="Headline">
          {(p: any) => <TopHeadlinesScreen {...p} />}
        </Stack.Screen>
        <Stack.Screen name="Precaution">
          {(p: any) => <PrecautionScreen {...p} />}
        </Stack.Screen>
        {
          country.trim() === 'India' ? (
            <Stack.Screen name="Help">
              {(p: any) => <HelpScreen {...p} />}
            </Stack.Screen>
          ) : null
        }
        <Stack.Screen name="About">
          {(p: any) => <AboutScreen {...p} />}
        </Stack.Screen>
      </Stack.Navigator>
    </Animated.View>
  )
}

export const DrawerContent = (props: any) => {
  const country = props.country
  return (
    <DrawerContentScrollView
      {...props}
      scrollEnabled={true}
      contentContainerStyle={{ flex: 1 }}>
      <View
        style={{
          flex: 1,
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'flex-start'
        }}>
        <DrawerItem
          label="Home"
          onPress={() => props.navigation.navigate('Home')}
          Icon={(p) => <Home {...p}/>}
        />
        <DrawerItem
          label="Headline"
          onPress={() => props.navigation.navigate('Headline')}
          Icon={(p) => <Columns {...p}/>}
        />
        <DrawerItem
          label="Precaution"
          onPress={() => props.navigation.navigate('Precaution')}
          Icon={(p) => <AlertOctagon {...p}/>}
        />
        {
          country === 'India' ? (
            <DrawerItem
              label="Help"
              onPress={() => props.navigation.navigate('Help')}
              Icon={(p) => <HelpCircle {...p}/>}
            />
          ) : null
        }
        <DrawerItem
          label="About"
          onPress={() => props.navigation.navigate('About')}
          Icon={(p) => <Github {...p}/>}
        />
      </View>
    </DrawerContentScrollView>
  )
}

const styles = StyleSheet.create({
  stack: {
    flex: 1,
    shadowColor: '#000',
    shadowOffset: {
      width: 2,
      height: 8
    },
    shadowOpacity: 0.44,
    shadowRadius: 10.32,
    elevation: 10
  }
})
