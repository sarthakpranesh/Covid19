import React, { useEffect } from 'react'
import { bindActionCreators } from 'redux'
import { Provider as ReduxProvider, connect } from 'react-redux'
import { PersistGate } from 'redux-persist/integration/react'
import { PermissionsAndroid, Platform } from 'react-native'
import Geolocation from 'react-native-geolocation-service'
import { SafeAreaProvider } from 'react-native-safe-area-context'
import { preventAutoHideAsync, hideAsync } from 'expo-splash-screen'

// importing redux persist stores
import { store, persister } from './src/stores/stores'

// Importing reducer functions
import { setCountry, updateData } from './src/reducers/DataReducer'

// Importing API functions
import getCountry from './src/API/functions/getCountry'
import getCovidData from './src/API/functions/getCovidData'

// Importing splash screen
import WebSplashScreen from './src/screens/SplashScreen'
import HomeScreen from './src/screens/HomeScreen'

const mapStateToProps = (state: any) => {
  const data = state.dataReducer.data
  return data
}

const mapDispatchToProps = (dispatch: any) =>
  bindActionCreators(
    {
      setCountry,
      updateData
    },
    dispatch
  )

const MainApp = connect(mapStateToProps, mapDispatchToProps)((props: any) => {
  const fetchAndSetCountry = async (coords: any) => {
    const country = await getCountry({
      long: coords.longitude,
      lat: coords.latitude
    })
    props.setCountry(country)
  }

  useEffect(() => {
    // some bug in react native
    setTimeout(() => {
      switch (Platform.OS) {
        case 'web':
          Geolocation.getCurrentPosition(
            (pos) => fetchAndSetCountry(pos.coords),
            (err) => {
              console.log(err.message)
              fetchAndSetCountry({ latitude: '28.644800', longitude: '77.216721' })
            },
            { enableHighAccuracy: true, timeout: 15000, maximumAge: 10000 }
          )
          return
        case 'ios':
          Geolocation.requestAuthorization('whenInUse')
            .then((result) => {
              console.log('IOS permission:', result)
              Geolocation.getCurrentPosition(
                (pos) => fetchAndSetCountry(pos.coords),
                (err) => {
                  console.log(err.message)
                  fetchAndSetCountry({ latitude: '28.644800', longitude: '77.216721' })
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
                (pos) => fetchAndSetCountry(pos.coords),
                (err) => {
                  console.log('Geolocation Error:', err.message)
                  fetchAndSetCountry({ latitude: '28.644800', longitude: '77.216721' })
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

  useEffect(() => {
    if (props.country !== null) {
      getCovidData(props.country)
        .then((data) => {
          props.updateData(data)
        })
        .catch((err) => {
          console.log(err)
        })
    }
  }, [props.country])

  // this useEffect should hide all implementation of splash screen from native and web
  useEffect(() => {
    if (props.data.global !== undefined) {
      hideAsync()
    }
  }, [props.data.global])

  // expo-splash-screen not supported on web
  // therefore using a extra stack with react native component for splash on web
  if (Platform.OS === 'web') {
    if (props.data.global === undefined) {
      return <WebSplashScreen />
    }
  }

  if (props.country === null || props.data.global === undefined) {
    return null
  }

  return <HomeScreen />
})

const App = () => {
  useEffect(() => {
    preventAutoHideAsync()
  }, [])
  return (
    <ReduxProvider store={store}>
      <PersistGate loading={false} persistor={persister}>
        <SafeAreaProvider>
          <MainApp />
        </SafeAreaProvider>
      </PersistGate>
    </ReduxProvider>
  )
}

export default App
