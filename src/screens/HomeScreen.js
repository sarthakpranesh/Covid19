/* eslint-disable react-native/no-inline-styles */
import React, {useState, useCallback} from 'react';
import {View, StyleSheet, StatusBar, Image, RefreshControl} from 'react-native';
import {ScrollView} from 'react-native-gesture-handler';

// importing components
import Drawer from '../components/Drawer';
import Country from '../components/Country';

// importing hooks
import getHealthStats from '../hooks/getGlobalTotal';
import getIndianStats from '../hooks/getIndianStats';

// import common style
import Styles from '../Styles';

const HomeScreen = (props) => {
  const navigate = props.navigation;
  const [healthCoronaSearch, healthResults, err0] = getHealthStats();
  const [getStats, indianStats, err2] = getIndianStats();

  // for pull down to refresh
  const [refreshing, setRefresh] = useState(false);
  const onRefresh = useCallback(async () => {
    setRefresh(true);
    await getStats();
    await healthCoronaSearch();
    setRefresh(false);
  }, [getStats, healthCoronaSearch]);

  return (
    <>
      <StatusBar backgroundColor="blue" barStyle="dark-content" hidden={true} />
      <Drawer navigate={navigate} title=" Home " />
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
          isError={err2}
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
      </ScrollView>
    </>
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
