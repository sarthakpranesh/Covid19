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
import Table from '../components/Table';
import Country from '../components/Country';

// importing hooks
import getHealthStats from '../hooks/getGlobalTotal';
import getCountries from '../hooks/getCountries';
import getIndianStats from '../hooks/getIndianStats';

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
                title='Home'
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

                <Country
                    data={indianStats}
                    isError={err2}
                    countryName="India"
                    getCountry={getStats}
                />

                <Table 
                    data={countryWiseData}
                    isError={err1}
                    getCountryWiseData={getCountryWiseData}
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