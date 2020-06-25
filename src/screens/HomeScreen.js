/* eslint-disable react-native/no-inline-styles */
import React, {useState, useCallback} from 'react';
import {
  View,
  StyleSheet,
  Image,
  RefreshControl,
  Alert,
  BackHandler,
} from 'react-native';
import {ScrollView} from 'react-native-gesture-handler';
import SplashScreen from 'react-native-splash-screen';

// importing components
import Country from '../components/Country.js';
import CandleCharts from '../components/CandleCharts.js';

// importing hooks
import getGlobalTotal from '../hooks/getGlobalTotal';
import getIndianStats from '../hooks/getIndianStats';
import getIndianTimeline from '../hooks/getIndianTimeline.js';

// import common style
import Styles from '../Styles';

const HomeScreen = ({style, navigation}) => {
  const [errorShowed, setErrorShowed] = useState(false);
  const [refreshing, setRefresh] = useState();
  const [healthCoronaSearch, healthResults, err1] = getGlobalTotal();
  const [getStats, indianStats, err2] = getIndianStats();
  const [fetchIndianTimeline, indianTimeline, err3] = getIndianTimeline();

  const onRefresh = useCallback(async () => {
    setRefresh(true);
    await Promise.all([
      fetchIndianTimeline(),
      getStats(),
      healthCoronaSearch(),
    ]);
    setRefresh(false);
    setErrorShowed(false);
  }, [fetchIndianTimeline, getStats, healthCoronaSearch]);

  if (healthResults && indianStats && indianTimeline !== []) {
    SplashScreen.hide();
  }

  if ((err1 !== '' || err2 !== '' || err3 !== '') && !errorShowed) {
    setErrorShowed(true);
    let errMessage;
    if (err1 !== '') {
      errMessage = err1;
    } else if (err2 !== '') {
      errMessage = err2;
    } else if (err3 !== '') {
      errMessage = err3;
    } else {
      errMessage = 'Some unknown message occured';
    }
    Alert.alert(
      'Error',
      errMessage,
      [
        {
          text: 'Retry',
          onPress: () => {
            onRefresh();
          },
        },
        {text: 'Exit', onPress: () => BackHandler.exitApp()},
      ],
      {cancelable: false},
    );
    SplashScreen.hide();
  }

  return (
    <View
      style={{
        flex: 1,
        alignItems: 'stretch',
        justifyContent: 'center',
        backgroundColor: 'pink',
        ...style,
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
          data={healthResults}
          isError={err1}
          countryName=" World "
          getCountry={getStats}
          containerStyle={'#B1ECFF'}
        />

        <Country
          data={indianStats}
          isError={err2}
          countryName=" India "
          getCountry={getStats}
        />
        <CandleCharts country="India" data={indianTimeline} />
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  mainHeaderImage: {
    width: 200,
    height: 40,
    alignSelf: 'center',
    marginBottom: 0,
  },
  lineChartContainer: {
    marginVertical: -10,
    paddingVertical: 0,
    marginBottom: 0,
  },
  lineChartText: {
    textAlign: 'center',
    fontSize: 28,
    fontWeight: 'bold',
    color: 'black',
    fontFamily: '',
    paddingVertical: 10,
  },
});

export default HomeScreen;
