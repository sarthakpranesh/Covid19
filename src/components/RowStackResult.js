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
                    <Text style={[ styles.subResultText, { color: this.props.textColor ? this.props.textColor : '#112d4e' } ]}>Total Cases</Text>
                    { healthResults ? <Text style={[styles.resultNumbers, { color: this.props.textColor ? this.props.textColor : '#112d4e'}]}>{healthResults.confirmed}</Text> : <Text>...</Text> }
                </View>
                <View style={styles.subResult}>
                    <Text style={[ styles.subResultText, { color: this.props.textColor ? this.props.textColor : '#112d4e' } ]}>Total Deaths</Text>
                    { healthResults ? <Text style={[styles.resultNumbers, { color: this.props.textColor ? this.props.textColor : '#112d4e'}]}>{healthResults.deaths}</Text> : <Text>...</Text> }
                </View>
                <View style={styles.subResult}>
                    <Text style={[ styles.subResultText, { color: this.props.textColor ? this.props.textColor : '#112d4e' } ]}>Total Recover</Text>
                    { healthResults ? <Text style={[styles.resultNumbers, { color: this.props.textColor ? this.props.textColor : '#112d4e'}]}>{healthResults.recovered}</Text> : <Text>...</Text> }
                </View>
            </View>
            <View style={styles.mainSubContainer}>
                <View style={styles.subResult}>
                    <Text style={[ styles.subResultText, { color: this.props.textColor ? this.props.textColor : '#112d4e' } ]}>New Cases</Text>
                    { healthResults ? <Text style={[styles.resultNumbers, { color: this.props.textColor ? this.props.textColor : '#112d4e'}]}>{healthResults.newConfirmed}</Text> : <Text>...</Text> }
                </View>
                <View style={styles.subResult}>
                    <Text style={[ styles.subResultText, { color: this.props.textColor ? this.props.textColor : '#112d4e' } ]}>Serious</Text>
                    { healthResults ? <Text style={[styles.resultNumbers, { color: this.props.textColor ? this.props.textColor : '#112d4e'}]}>{healthResults.totalSerious}</Text> : <Text>...</Text> }
                </View>
                <View style={styles.subResult}>
                    <Text style={[ styles.subResultText, { color: this.props.textColor ? this.props.textColor : '#112d4e' } ]}>Deaths Today</Text>
                    { healthResults ? <Text style={[styles.resultNumbers, { color: this.props.textColor ? this.props.textColor : '#112d4e'}]}>{healthResults.deathsToday}</Text> : <Text>...</Text> }
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
        textAlign: 'center'
    },
    resultNumbers: {
        fontSize: 24,
        fontWeight: 'bold',
        textAlign: 'center'
    },
})

export default RowStackResult;