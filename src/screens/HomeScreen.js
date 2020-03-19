import React from "react";
import {
    View,
    Text,
    StyleSheet,
    StatusBar,
} from "react-native";
import { ScrollView } from "react-native-gesture-handler";

// importing components
import Drawer from '../components/Drawer';
import RowStackResult from "../components/RowStackResult";
import LineChart from '../components/LineChart';
import Table from '../components/Table';
import Country from '../components/Country';

// importing hooks
import getHealthStats from '../hooks/getGlobalTotal';
import getCountries from '../hooks/getCountries';
import getFullTimeLine from '../hooks/getFullTimeLine';
import getCountryData from '../hooks/getCountryData'

const HomeScreen = (props) => {
    const navigate = props.navigation;
    const [healthCoronaSearch, healthResults, err0] = getHealthStats();
    const [getCountryWiseData, countryWiseData, err1] = getCountries();
    const [getTimeLine, timeLineData, err2] = getFullTimeLine();
    const [getCountry, countryData, err3] = getCountryData();

    return (
        <>
            <StatusBar backgroundColor='blue' barStyle='dark-content' hidden={true}/>
            <Drawer
                navigate={navigate}
                title=''
            />
            <ScrollView 
                style={styles.safeArea}
                alwaysBounceVertical={true}
                showsVerticalScrollIndicator={false}
            >

                <View style={styles.mainHeader}>
                    <Text style={styles.mainHeaderText}>Covid 19</Text>
                    <RowStackResult 
                        data={healthResults}
                    />
                </View>

                <Table 
                    data={countryWiseData}
                    isError={err1}
                    getCountryWiseData={getCountryWiseData}
                />
                
                <LineChart 
                    title="TimeLine"
                    data={timeLineData}
                    isError={err2}
                />

                <Country
                    data={countryData}
                    isError={err3}
                    countryName="India"
                    getCountry={getCountry}
                />

            </ScrollView>
        </>
    );
}

const styles = StyleSheet.create({
    safeArea: {
        flex: 1,
        paddingHorizontal: 10,
    },
    mainHeader: {
        flex: 1,
        left: 0,
        right: 0,
        flexDirection: 'column',
        justifyContent: 'center',
        alignContent: 'center',
        paddingVertical: 100,
        paddingBottom: 50,
    },
    mainHeaderText: {
        textAlign: 'center',
        fontSize: 52,
        fontWeight: 'bold',
        color: '#3f72af',
    }, 
})

export default HomeScreen;