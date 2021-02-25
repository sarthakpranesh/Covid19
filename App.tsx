import React, { useEffect } from 'react'
import { bindActionCreators } from 'redux'
import { Provider as ReduxProvider, connect } from 'react-redux'
import { PersistGate } from 'redux-persist/integration/react'
import { PermissionsAndroid, Platform } from 'react-native'
import { NavigationContainer } from '@react-navigation/native'
import Geolocation from 'react-native-geolocation-service'

// Importing RootNavigator
import RootNavigator from './src/navigation/index'

// importing redux persist stores
import { store, persister } from './src/stores/stores'

// Importing reducer functions
import { setCountry, setLoaded } from './src/reducers/DataReducer'

// Importing API functions
import getCountry from './src/API/functions/getCountry'

const mapStateToProps = (state: any) => {
  const data = state.dataReducer.data
  return data
}

const mapDispatchToProps = (dispatch: any) =>
  bindActionCreators(
    {
      setCountry,
      setLoaded
    },
    dispatch
  )

const MainApp = connect(mapStateToProps, mapDispatchToProps)((props: any) => {
  const country = props.country

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
          fetchAndSetCountry({ latitude: '28.644800', longitude: '77.216721' })
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

  return <RootNavigator country={country} />
})

const App = () => {
  return (
    <ReduxProvider store={store}>
      <PersistGate loading={null} persistor={persister}>
        <NavigationContainer>
          <MainApp />
        </NavigationContainer>
      </PersistGate>
    </ReduxProvider>
  )
}

export default App
