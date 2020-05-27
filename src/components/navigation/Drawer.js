/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {View, StyleSheet, Alert} from 'react-native';
import {createStackNavigator} from '@react-navigation/stack';
import {DrawerContentScrollView} from '@react-navigation/drawer';
import Animated from 'react-native-reanimated';
import Icon from 'react-native-vector-icons/Feather';
import {Drawer, IconButton} from 'react-native-paper';

// // importing Screens
import HomeScreen from '../../screens/HomeScreen';
import AboutScreen from '../../screens/AboutScreen';
import PrecautionScreen from '../../screens/PrecautionScreen';
import HelpScreen from '../../screens/HelpScreen';
import TopHeadlinesScreen from '../../screens/TopHeadlinesScreen';

const Stack = createStackNavigator();

export const Screens = ({navigation, style}) => {
  return (
    <Animated.View style={StyleSheet.flatten([styles.stack, style])}>
      <Stack.Navigator
        initialRouteName="Home"
        screenOptions={{
          animationEnabled: false,
          headerTransparent: true,
          headerTitle: null,
          headerLeft: () => (
            <IconButton
              icon={({size, color}) => (
                <Icon name="menu" size={size} color={color} />
              )}
              onPress={() => navigation.openDrawer()}
            />
          ),
        }}>
        <Stack.Screen name="Home">
          {(props) => <HomeScreen {...props} />}
        </Stack.Screen>
        <Stack.Screen name="Headline">
          {(props) => <TopHeadlinesScreen {...props} />}
        </Stack.Screen>
        <Stack.Screen name="Precaution">
          {(props) => <PrecautionScreen {...props} />}
        </Stack.Screen>
        <Stack.Screen name="Help">
          {(props) => <HelpScreen {...props} />}
        </Stack.Screen>
        <Stack.Screen name="About">
          {(props) => <AboutScreen {...props} />}
        </Stack.Screen>
      </Stack.Navigator>
    </Animated.View>
  );
};

export const DrawerContent = (props) => {
  return (
    <DrawerContentScrollView
      {...props}
      scrollEnabled={true}
      contentContainerStyle={{flex: 1}}>
      <View
        style={{
          flex: 1,
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'flex-start',
        }}>
        <View>
          <Drawer.Item
            label="Home"
            labelStyle={{color: 'white'}}
            style={{alignItems: 'flex-start', marginVertical: 0}}
            onPress={() => props.navigation.navigate('Home')}
            icon={({size}) => <Icon name="home" size={size} color="white" />}
          />
          <Drawer.Item
            label="Headline"
            labelStyle={{color: 'white'}}
            style={{alignItems: 'flex-start', marginVertical: 0}}
            onPress={() => props.navigation.navigate('Headline')}
            icon={({size}) => <Icon name="columns" size={size} color="white" />}
          />
          <Drawer.Item
            label="Precaution"
            labelStyle={{color: 'white'}}
            style={{alignItems: 'flex-start', marginVertical: 0}}
            onPress={() => props.navigation.navigate('Precaution')}
            icon={({size}) => (
              <Icon name="alert-octagon" size={size} color="white" />
            )}
          />
          <Drawer.Item
            label="Help"
            labelStyle={{color: 'white'}}
            style={{alignItems: 'flex-start', marginVertical: 0}}
            onPress={() => props.navigation.navigate('Help')}
            icon={({size}) => (
              <Icon name="help-circle" size={size} color="white" />
            )}
          />
          <Drawer.Item
            label="About"
            labelStyle={{color: 'white'}}
            style={{alignItems: 'flex-start', marginVertical: 0}}
            onPress={() => props.navigation.navigate('About')}
            icon={({size}) => <Icon name="github" size={size} color="white" />}
          />
        </View>
        <View style={{position: 'absolute', bottom: 10}}>
          <Drawer.Item
            label="Logout"
            labelStyle={{color: 'white'}}
            icon={({size}) => <Icon name="log-out" size={size} color="white" />}
            onPress={() =>
              Alert.alert(
                'Log Out',
                'Are you sure you want to log out?',
                [{text: 'Cancel'}, {text: 'OK'}],
                {cancelable: false},
              )
            }
          />
        </View>
      </View>
    </DrawerContentScrollView>
  );
};

const styles = StyleSheet.create({
  stack: {
    flex: 1,
    shadowColor: '#FFF',
    shadowOffset: {
      width: 0,
      height: 8,
    },
    shadowOpacity: 0.44,
    shadowRadius: 10.32,
    elevation: 5,
  },
  drawerItem: {alignItems: 'flex-start', marginVertical: 0},
  drawerLabel: {color: 'white', marginLeft: -16},
  avatar: {
    borderRadius: 60,
    marginBottom: 16,
    borderColor: 'white',
    borderWidth: StyleSheet.hairlineWidth,
  },
});
