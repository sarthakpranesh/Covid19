import React from "react";
import {
    View,
    Text,
    StyleSheet,
    SafeAreaView,
    StatusBar
} from "react-native";
import { ScrollView } from "react-native-gesture-handler";

// importing components
import Drawer from '../components/Drawer';

// importing hooks
import getHealthStats from '../hooks/getStatus';

const HomeScreen = (props) => {
    const navigate = props.navigation;
    const [healthCoronaSearch, healthResults, err] = getHealthStats();

    return (
        <>
        <StatusBar backgroundColor='blue' barStyle='dark-content' hidden={true}/>
        <SafeAreaView style={styles.safeArea}>
            <Drawer navigate={navigate} title='Home'/>
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
        </SafeAreaView>
        </>
    );
}

const styles = StyleSheet.create({
    safeArea: {
        flex: 1
    },
    mainHeader: {
        flex: 1,
        left: 0,
        right: 0,
        flexDirection: 'column',
        justifyContent: 'center',
        alignContent: 'center',
        paddingTop: 20,
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
        flexDirection: 'row',
        justifyContent: 'space-evenly',
        alignContent: 'center',
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
    }
})

export default HomeScreen;