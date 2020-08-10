/* eslint-disable react-native/no-inline-styles */
import React, {useEffect} from 'react';
import {PermissionsAndroid} from 'react-native';
import Geolocation from '@react-native-community/geolocation';
import LinearGradient from 'react-native-linear-gradient';
import {NavigationContainer} from '@react-navigation/native';
import {createAppContainer, createSwitchNavigator} from 'react-navigation';
import {createDrawerNavigator} from '@react-navigation/drawer';

import Animated from 'react-native-reanimated';

import {DrawerContent, Screens} from './src/components/navigation/Drawer.js';

import getLocationHook from './src/hooks/getLocationHook.js';

const Drawer = createDrawerNavigator();

const MainApp = () => {
  const [getLocation, country] = getLocationHook();
  const [progress, setProgress] = React.useState(new Animated.Value(0));
  const scale = Animated.interpolate(progress, {
    inputRange: [0, 1],
    outputRange: [1, 0.8],
  });
  const borderRadius = Animated.interpolate(progress, {
    inputRange: [0, 1],
    outputRange: [0, 16],
  });

  const animatedStyle = {borderRadius, transform: [{scale}]};

  useEffect(() => {
    console.log('App.js use effect called');
    PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
      {
        title: 'Covid-19 App',
        message:
          'We need to access your phones location ' +
          'to setup the app. You can cancel this step ' +
          'but then the app will use India as default',
        buttonNeutral: 'Ask Me Later',
        buttonNegative: 'Cancel',
        buttonPositive: 'OK',
      },
    );
    Geolocation.getCurrentPosition(async (pos) => {
      await getLocation({long: pos.coords.longitude, lat: pos.coords.latitude});
    });
  });

  console.log('App.js country: ', country);

  return ![undefined, false].includes(country) ? (
    <NavigationContainer>
      <LinearGradient
        colors={['#DEF7FF', '#B1ECFF']}
        style={{flex: 1, backgroundColor: 'white'}}>
        <Drawer.Navigator
          headerMode="none"
          edgeWidth={100}
          initialRouteName="Screens"
          drawerType="slide"
          overlayColor="transparent"
          drawerStyle={{flex: 1, width: '50%', backgroundColor: 'transparent'}}
          contentContainerStyle={{flex: 1}}
          drawerContentOptions={{
            activeBackgroundColor: 'transparent',
            activeTintColor: 'black',
            inactiveTintColor: 'black',
          }}
          sceneContainerStyle={{backgroundColor: 'transparent'}}
          drawerContent={(p) => {
            setProgress(p.progress);
            return <DrawerContent {...p} />;
          }}>
          <Drawer.Screen name="Screens">
            {(p) => <Screens {...p} style={animatedStyle} country={country} />}
          </Drawer.Screen>
        </Drawer.Navigator>
      </LinearGradient>
    </NavigationContainer>
  ) : null;
};

const UserStartingSwitch = createSwitchNavigator(
  {
    MainApp,
  },
  {
    initialRouteName: 'MainApp',
  },
);

export default createAppContainer(UserStartingSwitch);
