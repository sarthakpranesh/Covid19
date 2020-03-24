import React, { Component } from 'react';
import {
    View,
    Text,
    StyleSheet
} from 'react-native';

// importing components
import RowStackResult from './RowStackResult';

class Country extends Component {
    constructor(props) {
        super(props)
    }

    componentDidMount() {
        this.interval = setInterval(() => {
            this.props.getCountry();
        }, 5*60000);
    }

    componentWillUnmount() {
        clearInterval(this.interval);
    }

    render () {
        const country = this.props.countryName;
        const data = this.props.data
        return (
            <View style={styles.countrySection}>
                <View style={styles.countryHeader}>
                    <Text style={styles.countrySectionTitle}>{ country ? country : " Unknown Country "} : </Text>
                </View>
                <RowStackResult 
                    data={data}
                    textColor="#112d4e"
                />
            </View>
        );
    }
}

const styles = StyleSheet.create({
    countrySection: {
        backgroundColor: '#FFC692',
        marginBottom: 10,
        marginTop: 10,
        paddingVertical: 20,
        paddingTop: 10,
        paddingHorizontal: 10,
        borderRadius: 5,
    },
    countryHeader: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    countrySectionTitle: {
        textAlign: 'justify',
        color: '#112d4e',
        marginTop: 0,
        fontSize: 28,
        fontWeight: 'bold',
        fontFamily: '',
    },
})

export default Country;