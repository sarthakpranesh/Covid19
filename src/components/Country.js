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
            <View style={[ styles.countrySection, { backgroundColor: this.props.containerStyle ? this.props.containerStyle : '#FFC692' } ]}>
                <View style={styles.countryHeader}>
                    <Text style={styles.countrySectionTitle}>{ country ? country : " Unknown Country "} : </Text>
                </View>
                <RowStackResult 
                    data={data}
                    textColor='black'
                />
            </View>
        );
    }
}

const styles = StyleSheet.create({
    countrySection: {
        backgroundColor: '#FFC692',
        margin: 10,
        marginTop: 0,
        marginBottom: 20,
        paddingVertical: 20,
        paddingTop: 10,
        paddingHorizontal: 10,
        borderRadius: 16,
    },
    countryHeader: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 10
    },
    countrySectionTitle: {
        textAlign: 'justify',
        color: 'black',
        marginTop: 0,
        fontSize: 28,
        fontWeight: 'bold',
        fontFamily: '',
    },
})

export default Country;