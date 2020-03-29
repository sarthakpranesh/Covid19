import React, { useState, useCallback } from "react";
import {
    View,
    Text,
    StyleSheet,
    StatusBar,
    Image,
    RefreshControl
} from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import PureChart from 'react-native-pure-chart';

// importing components
import Drawer from '../components/Drawer';
import Country from '../components/Country';

// importing hooks
import getHealthStats from '../hooks/getGlobalTotal';
import getCountries from '../hooks/getCountries';
import getIndianStats from '../hooks/getIndianStats';

// import common style
import Styles from "../Styles";

function wait(timeout) {
    return new Promise(resolve => {
      setTimeout(resolve, timeout);
    });
  }

const HomeScreen = (props) => {
    const navigate = props.navigation;
    const [healthCoronaSearch, healthResults, err0] = getHealthStats();
    const [getCountryWiseData, countryWiseData, err1] = getCountries();
    const [getStats, indianStats, err2] = getIndianStats();

    // for pull down to refresh
    const [refreshing, setRefresh] = useState(false);
    const onRefresh = useCallback(async () => {
        setRefresh(true);
        await getStats();
        await getCountryWiseData();
        await healthCoronaSearch();
        setRefresh(false);
    }, [refreshing]);

    return (
        <>
            <StatusBar backgroundColor='blue' barStyle='dark-content' hidden={true}/>
            <Drawer
                navigate={navigate}
                title=' Home '
            />
            <ScrollView 
                style={Styles.safeArea}
                alwaysBounceVertical={true}
                showsVerticalScrollIndicator={false}
                refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
            >

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

                <View
                    style={styles.lineChartContainer}
                >
                    <Text
                        style={styles.lineChartText}
                    >
                        India's Timeline
                    </Text>
                    <Text   style={{color: 'yellow', textAlign: 'justify', fontSize: 12, paddingLeft: 10, fontFamily: '', fontWeight: 'bold'}}>
                        Yellow: <Text style={{color: 'black'}}>Total Cases</Text>
                    </Text>
                    <Text   style={{color: 'red', textAlign: 'justify', fontSize: 12, paddingLeft: 10, fontFamily: '', fontWeight: 'bold'}}>
                        Red:    <Text style={{color: 'black'}}>Deaths</Text>
                    </Text>
                    <Text   style={{color: 'green', textAlign: 'justify', fontSize: 12, paddingLeft: 10, fontFamily: '', fontWeight: 'bold'}}>
                        Green:  <Text style={{color: 'black'}}>Recovered</Text>
                    </Text>
                    <Text   style={{color: 'black', textAlign: 'justify', fontSize: 12, paddingLeft: 10, fontFamily: '', fontWeight: 'bold'}}>
                        *Scroll horizontally to see latest trends
                    </Text>
                    {
                        countryWiseData
                        ?
                        <View
                            style={{
                                paddingVertical: 20
                            }}
                        >
                            <PureChart
                                data={countryWiseData}
                                type='line'
                                height={200}
                                width={'100%'}
                                numberOfYAxisGuideLine={10}
                                numberOfXAxisGuideLine={10}
                            />
                        </View>
                        :
                        null
                    }
                </View>

            </ScrollView>
        </>
    );
}

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

export default HomeScreen;