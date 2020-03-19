import React,  { Component } from 'react';
import {
    View,
    Text,
    StyleSheet
} from 'react-native';

class RowStackResult extends Component {

    renderTotalData = (healthResults) => {
        return (
            <View style={styles.mainSubContainer}>
                <View style={styles.subResult}>
                    <Text style={[ styles.subResultText, { color: this.props.textColor ? this.props.textColor : '#112d4e' } ]}>Confirmed</Text>
                    { healthResults ? <Text style={styles.resultNumbers}>{healthResults.total_confirmed}</Text> : <Text>...</Text> }
                </View>
                <View style={styles.subResult}>
                    <Text style={[ styles.subResultText, { color: this.props.textColor ? this.props.textColor : '#112d4e' } ]}>Deaths</Text>
                    { healthResults ? <Text style={styles.resultNumbers}>{healthResults.total_deaths}</Text> : <Text>...</Text> }
                </View>
                <View style={styles.subResult}>
                    <Text style={[ styles.subResultText, { color: this.props.textColor ? this.props.textColor : '#112d4e' } ]}>Recovered</Text>
                    { healthResults ? <Text style={styles.resultNumbers}>{healthResults.total_recovered}</Text> : <Text>...</Text> }
                </View>
            </View>
        );
    }

    renderCountry = (healthResults) => {
        return (
            <View style={styles.mainSubContainer}>
                <View style={styles.subResult}>
                    <Text style={[ styles.subResultText, { color: this.props.textColor ? this.props.textColor : '#112d4e' } ]}>Confirmed</Text>
                    { healthResults ? <Text style={[styles.resultNumbers, { color: this.props.textColor ? this.props.textColor : '#112d4e'}]}>{healthResults.confirmed}</Text> : <Text>...</Text> }
                </View>
                <View style={styles.subResult}>
                    <Text style={[ styles.subResultText, { color: this.props.textColor ? this.props.textColor : '#112d4e' } ]}>Deaths</Text>
                    { healthResults ? <Text style={[styles.resultNumbers, { color: this.props.textColor ? this.props.textColor : '#112d4e'}]}>{healthResults.deaths}</Text> : <Text>...</Text> }
                </View>
                <View style={styles.subResult}>
                    <Text style={[ styles.subResultText, { color: this.props.textColor ? this.props.textColor : '#112d4e' } ]}>Recovered</Text>
                    { healthResults ? <Text style={[styles.resultNumbers, { color: this.props.textColor ? this.props.textColor : '#112d4e'}]}>{healthResults.recovered}</Text> : <Text>...</Text> }
                </View>
            </View>
        );
    }

    render () {
        const healthResults = this.props.data;

        if (healthResults) {
            if ( Object.keys(healthResults)[0].includes('total')) {
                return this.renderTotalData(healthResults);
            } else {
                return this.renderCountry(healthResults);
            }
        }
        return this.renderCountry(healthResults);
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
    },
    resultNumbers: {
        fontSize: 24,
        fontWeight: 'bold',
    },
})

export default RowStackResult;