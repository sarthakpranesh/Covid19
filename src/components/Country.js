import React, { Component } from 'react';
import {
    View,
    Text,
    StyleSheet
} from 'react-native';

// importing components
import RowStackResult from './RowStackResult';

class Country extends Component {
    setTime = (time) => {
        const hours = new Date(time).getHours();
        const min = new Date(time).getMinutes();
        if ( hours > new Date().getHours() ) {
            if ( min < new Date().getMinutes() ) {
                return `${ 24 - (hours - new Date().getHours()) + 1 }h ${ 60 - min }m`
            }
            return `${ 24 - (hours - new Date().getHours()) }h ${ new Date().getMinutes() + (60 - min) }m`
        }
        return `${hours - new Date().getHours() }h ${ min - new Date().getMinutes() }m`
    }

    render () {
        const country = this.props.countryName;
        const data = this.props.data
        return (
            <View style={styles.countrySection}>
                <View style={styles.countryHeader}>
                    <Text style={styles.countrySectionTitle}>{ country ? country : "Unknown Country"} : </Text>
                    <Text style={styles.date}>Updated: { data.last_update ? this.setTime(data.last_update) : null } ago</Text>
                </View>
                <RowStackResult 
                    data={data}
                    textColor="white"
                />
            </View>
        );
    }
}

const styles = StyleSheet.create({
    countrySection: {
        backgroundColor: '#112d4e',
        marginTop: 50,
        paddingVertical: 40,
        paddingTop: 10,
        paddingHorizontal: 10,
        borderRadius: 10,
    },
    countryHeader: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center'
    },
    countrySectionTitle: {
        textAlign: 'justify',
        color: 'white',
        marginTop: 0,
        fontSize: 22,
        fontWeight: 'bold',
    },
    date: {
        fontSize: 12,
        textAlign: 'right',
        color: 'white',
    }
})

export default Country;