import React, { useEffect } from 'react'
import { PermissionsAndroid, Platform } from 'react-native'
import Geolocation from 'react-native-geolocation-service'
import { createAppContainer, createSwitchNavigator } from 'react-navigation'

// Importing RootNavigator
import RootNavigator from './src/components/navigation/index'

// Importing Hooks
import getLocationHook from './src/hooks/getLocationHook'

const MainApp = () => {
  const [getLocation, country] = getLocationHook()

  useEffect(() => {
    // some bug in react native
    setTimeout(() => {
      switch (Platform.OS) {
        case 'web':
          getLocation({ lat: '28.644800', long: '77.216721' })
          return
        case 'ios':
          Geolocation.requestAuthorization('whenInUse')
            .then((result) => {
              console.log('IOS permission:', result)
              Geolocation.getCurrentPosition(
                async (pos) => {
                  await getLocation({
                    long: pos.coords.longitude,
                    lat: pos.coords.latitude
                  })
                },
                (err) => {
                  console.log(err.message)
                  getLocation({ lat: '28.644800', long: '77.216721' })
                },
                { enableHighAccuracy: true, timeout: 15000, maximumAge: 10000 }
              )
            })
            .catch((err) => console.log(err.message))
          return
        case 'android':
          PermissionsAndroid.request(
            PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
            {
              title: 'Covid-19 App',
              message:
                "App needs to access your phone's location to work correctly. " +
                'You can cancel this step but then app will default to Indian Stats',
              buttonNeutral: 'Ask Me Later',
              buttonNegative: 'Cancel',
              buttonPositive: 'OK'
            }
          )
            .then(() => {
              Geolocation.getCurrentPosition(
                async (pos) => {
                  await getLocation({
                    long: pos.coords.longitude,
                    lat: pos.coords.latitude
                  })
                },
                (err) => {
                  console.log(err.message)
                  getLocation({ lat: '28.644800', long: '77.216721' })
                },
                { enableHighAccuracy: true, timeout: 15000, maximumAge: 10000 }
              )
            })
            .catch((err) => console.log(err.message))
          return
        default:
          console.log('No platform matched')
      }
    }, 100)
  }, [])

  return country ? <RootNavigator country={country} /> : null
}

const UserStartingSwitch = createSwitchNavigator(
  {
    MainApp
  },
  {
    initialRouteName: 'MainApp'
  }
)

export default createAppContainer(UserStartingSwitch)
