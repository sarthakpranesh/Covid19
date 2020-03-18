import React from "react";
import {
    View,
    Text,
    StyleSheet,
    SafeAreaView,
    StatusBar
} from "react-native";
import { FlatList, TouchableOpacity, ScrollView } from "react-native-gesture-handler";
import { Col, Row, Grid} from 'react-native-easy-grid';

// importing components
import Drawer from '../components/Drawer';

// importing hooks
import getHealthStats from '../hooks/getGlobalTotal';
import getCountries from '../hooks/getCountries';

const HomeScreen = (props) => {
    const navigate = props.navigation;
    const [healthCoronaSearch, healthResults, err] = getHealthStats();
    const [getCountryWiseData, countryWiseData, isError] = getCountries();

    return (
        <>
        <StatusBar backgroundColor='blue' barStyle='dark-content' hidden={true}/>
        <Drawer navigate={navigate} title='Home'/>
        <SafeAreaView style={styles.safeArea}>
            <ScrollView>
                <View style={styles.mainHeader}>
                    <Text style={styles.mainHeaderText}>Covid 19</Text>
                    <View style={styles.mainSubContainer}>
                        <View style={styles.subResult}>
                            <Text style={styles.subResultText}>Confirmed</Text>
                            { healthResults ? <Text>{healthResults.total_confirmed}</Text> : <Text>...</Text> }
                        </View>
                        <View style={styles.subResult}>
                            <Text style={styles.subResultText}>Deaths</Text>
                            { healthResults ? <Text>{healthResults.total_deaths}</Text> : <Text>...</Text> }
                        </View>
                        <View style={styles.subResult}>
                            <Text style={styles.subResultText}>Recovered</Text>
                            { healthResults ? <Text>{healthResults.total_recovered}</Text> : <Text>...</Text> }
                        </View>
                    </View>
                </View>

                <View style={styles.subContainer}>
                    <FlatList
                        ListHeaderComponent={() => {
                            return <Text style={styles.subHeading}>Top Affected Countries: </Text>
                        }}
                        data={countryWiseData}
                        keyExtractor={ ele => ele.country }
                        renderItem={({ item }) => {
                            return (
                            <TouchableOpacity style={styles.listItem}>
                                <Grid>
                                    <Row>
                                        <Col><Text>{item.country.toUpperCase()}</Text></Col>
                                        <Col><Text>{item.confirmed}</Text></Col>
                                        <Col><Text>{item.deaths}</Text></Col>
                                        <Col><Text>{item.recovered}</Text></Col>
                                    </Row>
                                </Grid>
                            </TouchableOpacity>
                            );
                        }}
                    />
                </View>
            </ScrollView>
        </SafeAreaView>
        </>
    );
}

const styles = StyleSheet.create({
    safeArea: {
        flex: 1,
        paddingHorizontal: 5,
    },
    mainHeader: {
        flex: 1,
        left: 0,
        right: 0,
        flexDirection: 'column',
        justifyContent: 'center',
        alignContent: 'center',
        paddingVertical: 20,
    },
    mainHeaderText: {
        textAlign: 'center',
        fontSize: 48,
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
        paddingTop: 20,
    },
    subResult: {
        flex: 1,
        flexDirection: 'column',
        alignItems: 'center',
        textAlign: 'center',
    },
    subResultText: {
        fontSize: 18,
        color: '#112d4e',
        fontWeight: 'bold'
    },
    listItem: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-evenly',
        alignItems: 'center',
        alignContent: 'center',
        paddingVertical: 5,
        paddingHorizontal: 5,
    },
    subContainer: {
        flex: 1,
    },
    subHeading: {
        fontSize: 28,
        color: '#112d4e'
    }
})

export default HomeScreen;