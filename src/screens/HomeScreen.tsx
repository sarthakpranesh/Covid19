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
import getGlobalTotalHook from '../hooks/getGlobalTotalHook'
import getStatsHook from '../hooks/getStatsHook'
import getTimelineHook from '../hooks/getTimelineHook'

// import common style
import Styles from '../Styles'

export interface HomeProps {
  style: any;
  country: String;
}

const HomeScreen = ({ style, country }: HomeProps) => {
  const [errorShowed, setErrorShowed] = useState<boolean>(false)
  const [refreshing, setRefresh] = useState<boolean>(false)

  const [getGlobalTotal, globalTotal, err1] = getGlobalTotalHook()
  const [getStats, stats, err2] = getStatsHook()
  const [getTimeline, timeline, err3] = getTimelineHook()

  if ((err1 !== '' || err2 !== '' || err3 !== '') && !errorShowed) {
    setErrorShowed(true)
    let errMessage: any
    if (err1 !== '') {
      errMessage = err1
    } else if (err2 !== '') {
      errMessage = err2
    } else if (err3 !== '') {
      errMessage = err3
    } else {
      errMessage = 'Some unknown message occured'
    }
    Alert.alert(
      'Error',
      errMessage,
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
    SplashScreen.hide()
  }

  useEffect(() => {
    console.log('Initial data load')
    Promise.all([
      getGlobalTotal(),
      getStats(country),
      getTimeline(country)
    ]).then(() => SplashScreen.hide())
    setInterval(() => {
      Promise.all([
        getGlobalTotal(),
        getStats(country),
        getTimeline(country)
      ]).then(() => console.log('Reloaded data'))
    }, 5 * 60000)
  }, [country])

  const onRefresh = useCallback(async () => {
    setRefresh(true)
    await Promise.all([
      getGlobalTotal(),
      getStats(country),
      getTimeline(country)
    ])
    setRefresh(false)
    setErrorShowed(false)
  }, [getGlobalTotal, getStats, getTimeline])

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
        }>
        <View style={Styles.mainHeader}>
          <Image
            style={styles.mainHeaderImage}
            source={require('../../assets/img/ic1.png')}
          />
        </View>

        <Country
          data={globalTotal}
          isError={err1}
          countryName="World"
          containerStyle={'#B1ECFF'}
        />

        <Country data={stats} isError={err2} countryName={country} />
        <CandleCharts country={country} data={timeline} />
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
    fontFamily: '',
    paddingVertical: 10
  }
})

export default HomeScreen
