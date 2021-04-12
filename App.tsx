import React, { useEffect } from 'react'
import { bindActionCreators } from 'redux'
import { Provider as ReduxProvider, connect } from 'react-redux'
import { PersistGate } from 'redux-persist/integration/react'
import { Platform } from 'react-native'
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

// Importing components
import GeolocationPermissions from './src/components/GeolocationPermissions/GeolocationPermissions'

// default location, if permission for location not provided
const INDIA: DefaultGeolocation.GeoCoordinates = {
  latitude: 28.644800,
  longitude: 77.216721,
  accuracy: 0,
  altitude: 0,
  altitudeAccuracy: 0,
  heading: 0,
  speed: 0
}

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
  // small helper
  const fetchAndSetCountry = async (coords: Geolocation.GeoCoordinates) => {
    const country: string = await getCountry({
      long: coords.longitude,
      lat: coords.latitude
    })
    props.setCountry(country)
  }

  // Get mobile location -> set country
  useEffect(() => {
    GeolocationPermissions()
      .then(() => {
        Geolocation.getCurrentPosition(
          (pos) => fetchAndSetCountry(pos.coords),
          (err) => {
            console.log('Error Getting Position:', err.message)
            fetchAndSetCountry(INDIA)
          },
          { enableHighAccuracy: true, timeout: 15000, maximumAge: 10000 }
        )
      })
      .catch((err) => console.log('MainApp -> UseEffect -> Location Error:', err.message))
  }, [])

  // if mobile location set -> get covid stats
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

  // hide all implementation of splash screen from native and web
  useEffect(() => {
    if (props.data?.global !== undefined) {
      hideAsync()
    }
  }, [props.data?.global])

  // expo-splash-screen not supported on web
  // therefore using a extra stack with react native component for splash on web
  if (Platform.OS === 'web') {
    if (props.data?.global === undefined) {
      return <WebSplashScreen />
    }
  }

  if (props.country === null || props.data?.global === undefined) {
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
