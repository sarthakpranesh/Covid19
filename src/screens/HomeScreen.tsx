import React, { useState, useCallback, useEffect } from 'react'
import {
  View,
  StyleSheet,
  Image,
  RefreshControl,
  Alert,
  BackHandler,
  ScrollView
} from 'react-native'
import SplashScreen from 'react-native-splash-screen'

// importing components
import Country from '../components/Country'
import CandleCharts from '../components/CandleCharts'

// importing hooks
import getHomeScreenData from '../hooks/getHomeScreenData'

// import common style
import Styles from '../Styles'

export interface HomeProps {
  style: any;
  country: String;
}

const HomeScreen = ({ style, country }: HomeProps) => {
  const [refreshing, setRefresh] = useState<boolean>(false)

  const [fetchHomeData, results, err] = getHomeScreenData()

  const handleError = () => {
    Alert.alert(
      'Covid 19',
      err === undefined ? 'Network Error' : err,
      [
        {
          text: 'Retry',
          onPress: () => {
            onRefresh()
          }
        },
        { text: 'Exit', onPress: () => BackHandler.exitApp() }
      ],
      { cancelable: false }
    )
  }

  useEffect(() => {
    fetchHomeData(country)
      .then(() => SplashScreen.hide())
      .catch(() => handleError())
    setInterval(() => {
      console.log('Set Interval running')
      fetchHomeData(country)
        .then(() => console.log('Data Updated'))
        .catch(() => handleError())
    }, 5 * 60000)
  }, [country])

  const onRefresh = useCallback(async () => {
    setRefresh(true)
    fetchHomeData(country)
      .then(() => {
        setRefresh(false)
      })
      .catch(() => handleError())
  }, [fetchHomeData])

  if (results === null) {
    return null
  }

  return (
    <View
      style={{
        flex: 1,
        alignItems: 'stretch',
        justifyContent: 'center',
        backgroundColor: 'pink',
        ...style
      }}>
      <ScrollView
        style={Styles.safeArea}
        alwaysBounceVertical={true}
        showsVerticalScrollIndicator={false}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      >
        <View style={Styles.mainHeader}>
          <Image
            style={styles.mainHeaderImage}
            source={require('../../assets/img/ic1.png')}
          />
        </View>

        <Country
          data={results?.global}
          countryName="World"
          containerStyle={'#B1ECFF'}
        />

        <Country data={results?.country} countryName={country} />
        <CandleCharts country={country} data={results?.timeline} />
      </ScrollView>
    </View>
  )
}

const styles = StyleSheet.create({
  mainHeaderImage: {
    width: 200,
    height: 40,
    alignSelf: 'center',
    marginBottom: 0
  },
  lineChartContainer: {
    marginVertical: -10,
    paddingVertical: 0,
    marginBottom: 0
  },
  lineChartText: {
    textAlign: 'center',
    fontSize: 28,
    fontWeight: 'bold',
    color: 'black',
    paddingVertical: 10
  }
})

export default HomeScreen
