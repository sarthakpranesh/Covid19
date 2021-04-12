import { Platform, PermissionsAndroid } from 'react-native'
import * as DefaultGeolocation from 'react-native-geolocation-service'

// Permission Helper
const GeolocationPermissions = async () => {
  switch (Platform.OS) {
    case 'web':
      break
    case 'ios':
      try {
        const resultIOS = await DefaultGeolocation.requestAuthorization('whenInUse')
        console.log('iOS Permission:', resultIOS)
      } catch (err) {
        console.log('Permission Error on iOS:', err.message)
      }
      break
    case 'android':
      try {
        const resultAndroid = await PermissionsAndroid.request(
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
        console.log('Android Permission:', resultAndroid)
      } catch (err) {
        console.log('Permission Error on Android:', err.message)
      }
      break
    default:
      console.log('No platform matched')
  }
}

export default GeolocationPermissions
