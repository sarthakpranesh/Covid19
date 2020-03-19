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
import LineChart from '../components/LineChart';
import Table from '../components/Table';

// importing hooks
import getHealthStats from '../hooks/getGlobalTotal';
import getCountries from '../hooks/getCountries';
import getFullTimeLine from "../hooks/getFullTimeLine";

const HomeScreen = (props) => {
    const navigate = props.navigation;
    const [healthCoronaSearch, healthResults, err0] = getHealthStats();
    const [getCountryWiseData, countryWiseData, err1] = getCountries();
    const [getTimeLine, timeLineData, err2] = getFullTimeLine();

    return (
        <>
        <StatusBar backgroundColor='blue' barStyle='dark-content' hidden={true}/>
        <Drawer navigate={navigate} title=''/>
        <ScrollView style={styles.safeArea}>

            <View style={styles.mainHeader}>
                <Text style={styles.mainHeaderText}>Covid 19</Text>
                <View style={styles.mainSubContainer}>
                    <View style={styles.subResult}>
                        <Text style={styles.subResultText}>Confirmed</Text>
                        { healthResults ? <Text style={styles.resultNumbers}>{healthResults.total_confirmed}</Text> : <Text>...</Text> }
                    </View>
                    <View style={styles.subResult}>
                        <Text style={styles.subResultText}>Deaths</Text>
                        { healthResults ? <Text style={styles.resultNumbers}>{healthResults.total_deaths}</Text> : <Text>...</Text> }
                    </View>
                    <View style={styles.subResult}>
                        <Text style={styles.subResultText}>Recovered</Text>
                        { healthResults ? <Text style={styles.resultNumbers}>{healthResults.total_recovered}</Text> : <Text>...</Text> }
                    </View>
                </View>
            </View>

            <Table 
                data={countryWiseData}
                isError={err1}
            />
            
            <LineChart 
                title="TimeLine"
                data={timeLineData}
                isError={err2}
            />

        </ScrollView>
        </>
    );
}

const styles = StyleSheet.create({
    safeArea: {
        flex: 1,
        paddingHorizontal: 10,
        marginVertical: 20,
    },
    mainHeader: {
        flex: 1,
        left: 0,
        right: 0,
        flexDirection: 'column',
        justifyContent: 'center',
        alignContent: 'center',
        paddingVertical: 100,
    },
    mainHeaderText: {
        textAlign: 'center',
        fontSize: 52,
        fontWeight: 'bold',
        color: '#3f72af',
    }, 
    mainSubContainer: {
        flex: 1,
        left: 0,
        right: 0,
        marginTop: 0,
        flexDirection: 'row',
        justifyContent: 'space-evenly',
        paddingTop: 40,
    },
    subResult: {
        flex: 1,
        flexDirection: 'column',
        alignItems: 'center',
        textAlign: 'center',
    },
    subResultText: {
        fontSize: 16,
        color: '#112d4e',
    },
    resultNumbers: {
        fontSize: 24,
        fontWeight: 'bold',
    },
})

export default HomeScreen;