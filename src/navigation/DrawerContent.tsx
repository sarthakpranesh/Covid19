import React from 'react'
import { View } from 'react-native'
import { DrawerContentScrollView } from '@react-navigation/drawer'

// Importing drawer components
import DrawerItem from './DrawerItem'
import {
  Home,
  AlertOctagon,
  Columns,
  Github,
  HelpCircle
} from '../components/Svgs/index'

const DrawerContent = (props: any) => {
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

export default DrawerContent
