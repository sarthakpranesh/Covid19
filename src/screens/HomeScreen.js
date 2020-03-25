import React from "react";
import {
    View,
    Text,
    StyleSheet,
    StatusBar,
    Image,
} from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import PureChart from 'react-native-pure-chart';

// importing components
import Drawer from '../components/Drawer';
import RowStackResult from "../components/RowStackResult";
import Country from '../components/Country';

// importing hooks
import getHealthStats from '../hooks/getGlobalTotal';
import getCountries from '../hooks/getCountries';
import getIndianStats from '../hooks/getIndianStats';

// import common style
import Style from '../Styles';
import Styles from "../Styles";

const HomeScreen = (props) => {
    const navigate = props.navigation;
    const [healthCoronaSearch, healthResults, err0] = getHealthStats();
    const [getCountryWiseData, countryWiseData, err1] = getCountries();
    const [getStats, indianStats, err2] = getIndianStats();

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
            >

                <View style={Styles.mainHeader}>
                    <Image 
                        style={styles.mainHeaderImage}
                        source={require('../../assets/img/ic1.png')}
                    />
                    <RowStackResult 
                        data={healthResults}
                    />
                </View>

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
                    <Text   style={{color: 'yellow', textAlign: 'justify', fontSize: 12, paddingLeft: 10, fontFamily: ''}}>
                        Yellow: <Text style={{color: 'black'}}>Total Cases</Text>
                    </Text>
                    <Text   style={{color: 'red', textAlign: 'justify', fontSize: 12, paddingLeft: 10, fontFamily: ''}}>
                        Red:    <Text style={{color: 'black'}}>Deaths</Text>
                    </Text>
                    <Text   style={{color: 'green', textAlign: 'justify', fontSize: 12, paddingLeft: 10, fontFamily: ''}}>
                        Green:  <Text style={{color: 'black'}}>Recovered</Text>
                    </Text>
                    <Text   style={{color: 'black', textAlign: 'justify', fontSize: 12, paddingLeft: 10, fontFamily: ''}}>
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
        width: 250,
        height: 50,
        alignSelf: 'center',
        marginBottom: 40,
    },
    lineChartContainer: {
        marginVertical: 20,
        paddingVertical: 10,
        marginBottom: 0
    },
    lineChartText: {
        textAlign: 'justify',
        fontSize: 22,
        fontWeight: 'bold',
        color: 'black',
        fontFamily: '',
        paddingVertical: 10
    }
})

export default HomeScreen;