import React,  { Component } from 'react';
import {
    View,
    Text,
    StyleSheet
} from 'react-native';

class RowStackResult extends Component {

    render () {
        const healthResults = this.props.data;

        return (
            <>
            <View style={styles.mainSubContainer}>
                <View style={styles.subResult}>
                    <Text style={[ styles.subResultText, { color: this.props.textColor ? this.props.textColor : 'black' } ]}>Total Cases</Text>
                    { healthResults ? <Text style={[styles.resultNumbers, { color: this.props.textColor ? this.props.textColor : 'black'}]}>{healthResults.confirmed}</Text> : <Text>...</Text> }
                </View>
                <View style={styles.subResult}>
                    <Text style={[ styles.subResultText, { color: this.props.textColor ? this.props.textColor : 'black' } ]}>Total Deaths</Text>
                    { healthResults ? <Text style={[styles.resultNumbers, { color: this.props.textColor ? this.props.textColor : 'black'}]}>{healthResults.deaths}</Text> : <Text>...</Text> }
                </View>
                <View style={styles.subResult}>
                    <Text style={[ styles.subResultText, { color: this.props.textColor ? this.props.textColor : 'black' } ]}>Total Recover</Text>
                    { healthResults ? <Text style={[styles.resultNumbers, { color: this.props.textColor ? this.props.textColor : 'black'}]}>{healthResults.recovered}</Text> : <Text>...</Text> }
                </View>
            </View>
            <View style={styles.mainSubContainer}>
                <View style={styles.subResult}>
                    <Text style={[ styles.subResultText, { color: this.props.textColor ? this.props.textColor : 'black' } ]}>New Cases</Text>
                    { healthResults ? <Text style={[styles.resultNumbers, { color: this.props.textColor ? this.props.textColor : 'black'}]}>{healthResults.newConfirmed}</Text> : <Text>...</Text> }
                </View>
                <View style={styles.subResult}>
                    <Text style={[ styles.subResultText, { color: this.props.textColor ? this.props.textColor : 'black' } ]}>Serious</Text>
                    { healthResults ? <Text style={[styles.resultNumbers, { color: this.props.textColor ? this.props.textColor : 'black'}]}>{healthResults.totalSerious}</Text> : <Text>...</Text> }
                </View>
                <View style={styles.subResult}>
                    <Text style={[ styles.subResultText, { color: this.props.textColor ? this.props.textColor : 'black' } ]}>Deaths Today</Text>
                    { healthResults ? <Text style={[styles.resultNumbers, { color: this.props.textColor ? this.props.textColor : 'black'}]}>{healthResults.deathsToday}</Text> : <Text>...</Text> }
                </View>
            </View>
            </>
        );
    }
}

const styles = StyleSheet.create({
    mainSubContainer: {
        flex: 1,
        left: 0,
        right: 0,
        marginTop: 0,
        flexDirection: 'row',
        justifyContent: 'space-evenly',
        paddingTop: 10,
    },
    subResult: {
        flex: 1,
        flexDirection: 'column',
        alignItems: 'center',
        textAlign: 'center',
    },
    subResultText: {
        fontSize: 16,
        textAlign: 'center',
        fontFamily: ''
    },
    resultNumbers: {
        fontSize: 24,
        fontWeight: 'bold',
        textAlign: 'center',
        fontFamily: ''
    },
})

export default RowStackResult;