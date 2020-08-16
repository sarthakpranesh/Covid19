/* eslint-disable react-native/no-inline-styles */
import React, { Component } from 'react'
import { View, StyleSheet } from 'react-native'
import { Title } from 'react-native-paper'

// importing components
import RowStackResult from './RowStackResult'

export interface CountryProps {
  data: any;
  isError: String;
  countryName: String;
  containerStyle?: any;
}

class Country extends Component<CountryProps> {
  render () {
    const { containerStyle, countryName, data } = this.props
    return (
      <View
        style={[
          styles.countrySection,
          {
            backgroundColor: containerStyle || '#FFC692'
          }
        ]}>
        <View style={styles.countryHeader}>
          <Title style={styles.countrySectionTitle}>
            {countryName || 'Unknown Country'}:{' '}
          </Title>
        </View>
        <RowStackResult data={data} textColor="black" />
      </View>
    )
  }
}

const styles = StyleSheet.create({
  countrySection: {
    backgroundColor: '#FFC692',
    marginTop: 0,
    marginBottom: 20,
    paddingVertical: 20,
    paddingTop: 10,
    paddingHorizontal: 10,
    borderRadius: 16
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
    fontWeight: 'bold',
    fontFamily: ''
  }
})

export default Country
