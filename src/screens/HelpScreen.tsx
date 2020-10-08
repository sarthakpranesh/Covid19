import React from 'react'
import {
  View,
  StyleSheet,
  TouchableOpacity,
  Linking,
  FlatList,
  ScrollView,
  Text,
  Dimensions,
} from 'react-native'

// importing common styles
import Styles from '../Styles'

const data = [
  {
    state: 'Central Help Line Number',
    number: '91-11-23978046'
  },
  {
    state: 'Andhra Pradesh',
    number: '0866-2410978'
  },
  {
    state: 'Arunachal Pradesh',
    number: '9436055743'
  },
  {
    state: 'Assam',
    number: '6913347770'
  },
  {
    state: 'Bihar',
    number: '104'
  },
  {
    state: 'Chhattisgarh',
    number: '104'
  },
  {
    state: 'Goa',
    number: '104'
  },
  {
    state: 'Gujarat',
    number: '104'
  },
  {
    state: 'Haryana',
    number: '8558893911'
  },
  {
    state: 'Himachal Pradesh',
    number: '104'
  },
  {
    state: 'Jharkhand',
    number: '104'
  },
  {
    state: 'Karnataka',
    number: '104'
  },
  {
    state: 'Kerala',
    number: '0471-2552056'
  },
  {
    state: 'Madhya Pradesh',
    number: '0755-2527177'
  },
  {
    state: 'Maharashtra',
    number: '020-26127394'
  },
  {
    state: 'Manipur',
    number: '3852411668'
  },
  {
    state: 'Meghalaya',
    number: '108'
  },
  {
    state: 'Mizoram',
    number: '102'
  },
  {
    state: 'Nagaland',
    number: '7005539653'
  },
  {
    state: 'Odisha',
    number: '9439994859'
  },
  {
    state: 'Punjab',
    number: '104'
  },
  {
    state: 'Rajasthan',
    number: '0141-2225624'
  },
  {
    state: 'Sikkim',
    number: '104'
  },
  {
    state: 'Tamil Nadu',
    number: '044-29510500'
  },
  {
    state: 'Telangana',
    number: '104'
  },
  {
    state: 'Tripura',
    number: '0381-2315879'
  },
  {
    state: 'Uttarakhand',
    number: '104'
  },
  {
    state: 'Uttar Pradesh',
    number: '18001805145'
  },
  {
    state: 'West Bengal',
    number: '1800313444222'
  },
  {
    state: 'Andaman and Nicobar',
    number: '03192-232102'
  },
  {
    state: 'Chandigarh',
    number: '9779558282'
  },
  {
    state: 'Dadra and Nagar Haveli and Daman & Diu',
    number: '104'
  },
  {
    state: 'Delhi',
    number: '011-22307145'
  },
  {
    state: 'Jammu & Kashmir',
    number: '01912520982'
  },
  {
    state: 'Ladakh',
    number: '01982256462'
  },
  {
    state: 'Lakshadweep',
    number: '104'
  },
  {
    state: 'Puducherry',
    number: '104'
  }
]

export interface HelpProps {
  style: any;
}

const { scale } = Dimensions.get('window')

const HelpScreen = ({ style }: HelpProps) => {
  return (
    <View
      style={{
        flex: 1,
        alignItems: 'stretch',
        justifyContent: 'center',
        backgroundColor: 'pink',
        ...style
      }}>
      <ScrollView
        style={Styles.safeArea}
        alwaysBounceVertical={true}
        showsVerticalScrollIndicator={false}>
        <View style={Styles.mainHeader}>
          <Text style={Styles.mainHeaderText}>Help Line Numbers</Text>
        </View>

        <View style={styles.helpContentContainer}>
          <FlatList
            data={data}
            keyExtractor={(ele) => ele.state}
            renderItem={({ item }) => {
              return (
                <View style={styles.listItemHelp}>
                  <Text style={styles.helpLineText}>
                    {item.state}
                  </Text>
                  <TouchableOpacity
                    onPress={() => Linking.openURL(`tel:${item.number}`)}
                    style={styles.numberContainer}>
                    <Text style={styles.number}>{item.number}</Text>
                  </TouchableOpacity>
                </View>
              )
            }}
          />

          <Text
            style={{
              fontSize: 8 * scale,
              marginVertical: 20,
              marginBottom: 0,
              textAlign: 'center'
            }}>
            All data retrieved from mohfw.gov.in, click below for more
          </Text>
          <TouchableOpacity
            onPress={() => Linking.openURL('https://www.mohfw.gov.in/')}>
            <Text
              style={{
                textAlign: 'center',
                color: 'red',
                fontSize: 10 * scale
              }}>
              MOHFW
            </Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  )
}

const styles = StyleSheet.create({
  helpContentContainer: {
    marginHorizontal: 5
  },
  listItemHelp: {
    marginVertical: 10
  },
  helpLineText: {
    textAlign: 'center',
    color: 'black',
    fontSize: 12 * scale
  },
  numberContainer: {
    alignSelf: 'center',
    marginVertical: 5
  },
  number: {
    color: '#2400FF',
    textAlign: 'center',
    fontSize: 10 * scale
  }
})

export default HelpScreen
