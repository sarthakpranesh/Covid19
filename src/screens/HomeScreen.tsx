import React, { useState, useCallback } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import {
  View,
  StyleSheet,
  Image,
  RefreshControl,
  ScrollView
} from 'react-native'
import { View as MotiView } from 'moti'

// importing components
import SafeAreaView from '../components/SafeAreaView'
import MainHeader from '../components/MainHeader'
import Country from '../components/Country'
import CandleCharts from '../components/CandleCharts'

// importing reducers
import { updateData } from '../reducers/DataReducer'

// importing API functions
import getCovidData from '../API/functions/getCovidData'

// import common style
import Styles from '../Styles'

const HomeScreen = (props: any) => {
  const [refreshing, setRefresh] = useState<boolean>(false)

  const onRefresh = useCallback(async () => {
    setRefresh(true)
    const data = await getCovidData(props.country)
    props.updateData(data)
    setRefresh(false)
  }, [])

  const results = props.data
  const country = props.country

  return (
    <SafeAreaView>
      <MainHeader {...props} />
      <ScrollView
        style={Styles.scrollView}
        contentContainerStyle={Styles.scrollViewContentContainer}
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

        <MotiView
          from={{
            translateX: 50,
            opacity: 0
          }}
          animate={{
            translateX: 0,
            opacity: 1
          }}
          transition={{
            type: 'timing',
            duration: 200
          }}
        >
          <Country
            data={results?.global}
            countryName="World"
            containerStyle={'#B1ECFF'}
          />
        </MotiView>

        <MotiView
          from={{
            translateX: 50,
            opacity: 0
          }}
          animate={{
            translateX: 0,
            opacity: 1
          }}
          transition={{
            type: 'timing',
            duration: 200,
            delay: 200
          }}
        >
          <Country data={results?.country} countryName={country} />
        </MotiView>

        <MotiView
          from={{
            translateX: 50,
            opacity: 0
          }}
          animate={{
            translateX: 0,
            opacity: 1
          }}
          transition={{
            type: 'timing',
            duration: 200,
            delay: 400
          }}
        >
          <CandleCharts country={country} data={results?.timeline} />
        </MotiView>
      </ScrollView>
    </SafeAreaView>
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
  }
})

const mapStateToProps = (state: any) => {
  const data = state.dataReducer.data
  return data
}

const mapDispatchToProps = (dispatch: any) => {
  return bindActionCreators(
    {
      updateData
    },
    dispatch
  )
}

export default connect(mapStateToProps, mapDispatchToProps)(HomeScreen)
