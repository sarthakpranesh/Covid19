/* eslint-disable react/display-name */
import React from 'react'
import { View, StyleSheet } from 'react-native'
import { createStackNavigator } from '@react-navigation/stack'
import { DrawerContentScrollView } from '@react-navigation/drawer'
import Animated from 'react-native-reanimated'
import Icon from 'react-native-vector-icons/Feather'
import { Drawer, IconButton, DefaultTheme } from 'react-native-paper'

// // importing Screens
import HomeScreen from '../../screens/HomeScreen'
import AboutScreen from '../../screens/AboutScreen'
import PrecautionScreen from '../../screens/PrecautionScreen'
import HelpScreen from '../../screens/HelpScreen'
import TopHeadlinesScreen from '../../screens/TopHeadlinesScreen'

const Stack = createStackNavigator()

export interface ScreensProps {
  navigation: any;
  style: any;
  country: String;
}

export const Screens = ({ navigation, style, country }: ScreensProps) => {
  return (
    <Animated.View style={StyleSheet.flatten([styles.stack, style])}>
      <Stack.Navigator
        initialRouteName="Home"
        screenOptions={{
          animationEnabled: false,
          headerTransparent: true,
          title: '',
          headerLeft: () => (
            <View
              style={{
                backgroundColor: '#DEF7FF',
                marginLeft: 14,
                borderRadius: 8,
                shadowColor: '#000',
                shadowOpacity: 1,
                shadowRadius: 8,
                elevation: 10
              }}>
              <IconButton
                style={{ margin: 0 }}
                icon={({ size }) => (
                  <Icon name="menu" size={size} color="black" />
                )}
                // eslint-disable-next-line react/prop-types
                onPress={() => navigation.openDrawer()}
              />
            </View>
          )
        }}>
        <Stack.Screen name="Home">
          {(p: any) => <HomeScreen {...p} country={country} />}
        </Stack.Screen>
        <Stack.Screen name="Headline">
          {(p: any) => <TopHeadlinesScreen {...p} />}
        </Stack.Screen>
        <Stack.Screen name="Precaution">
          {(p: any) => <PrecautionScreen {...p} />}
        </Stack.Screen>
        <Stack.Screen name="Help">
          {(p: any) => <HelpScreen {...p} />}
        </Stack.Screen>
        <Stack.Screen name="About">
          {(p: any) => <AboutScreen {...p} />}
        </Stack.Screen>
      </Stack.Navigator>
    </Animated.View>
  )
}

export const DrawerContent = (props: any) => {
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
        <View>
          <Drawer.Item
            label="Home"
            theme={DefaultTheme}
            style={styles.drawerItem}
            onPress={() => props.navigation.navigate('Home')}
            icon={({ size }) => <Icon name="home" size={size} color="black" />}
          />
          <Drawer.Item
            label="Headline"
            theme={DefaultTheme}
            style={styles.drawerItem}
            onPress={() => props.navigation.navigate('Headline')}
            icon={({ size }) => <Icon name="columns" size={size} color="black" />}
          />
          <Drawer.Item
            label="Precaution"
            theme={DefaultTheme}
            style={styles.drawerItem}
            onPress={() => props.navigation.navigate('Precaution')}
            icon={({ size }) => (
              <Icon name="alert-octagon" size={size} color="black" />
            )}
          />
          <Drawer.Item
            label="Help"
            theme={DefaultTheme}
            style={styles.drawerItem}
            onPress={() => props.navigation.navigate('Help')}
            icon={({ size }) => (
              <Icon name="help-circle" size={size} color="black" />
            )}
          />
          <Drawer.Item
            label="About"
            theme={DefaultTheme}
            style={styles.drawerItem}
            onPress={() => props.navigation.navigate('About')}
            icon={({ size }) => <Icon name="github" size={size} color="black" />}
          />
        </View>
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
  },
  drawerItem: {
    alignSelf: 'flex-start',
    margin: 0,
    padding: 0
  }
})
