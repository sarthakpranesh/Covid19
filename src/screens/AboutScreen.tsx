import React from 'react'
import {
  View,
  StyleSheet,
  Image,
  Linking,
  TouchableOpacity,
  Text,
  ScrollView
} from 'react-native'

// import components
import { Github } from '../components/Svgs/index'
import SafeAreaView from '../components/SafeAreaView'

// importing common style
import Styles from '../Styles'

// importing constants
import Layout from '../Layout'
const scale = Layout.fontScale

const AboutScreen = () => {
  return (
    <SafeAreaView>
      <ScrollView
        style={Styles.scrollView}
        contentContainerStyle={Styles.scrollViewContentContainer}
        alwaysBounceVertical={true}
        showsVerticalScrollIndicator={false}>
        <View style={Styles.mainHeader}>
          <Text style={Styles.mainHeaderText}>Corona Virus</Text>
        </View>

        <View style={styles.aboutContentContainer}>
          <Image
            style={{
              marginVertical: 20,
              height: 100,
              width: 100
            }}
            source={require('../../assets/img/v.png')}
          />
          <Text style={styles.aboutContent}>
            Coronaviruses (CoV) are a large family of viruses that cause illness
            ranging from the common cold to more severe diseases such as Middle
            East Respiratory Syndrome (MERS-CoV) and Severe Acute Respiratory
            Syndrome (SARS-CoV).
          </Text>
          <Text style={styles.aboutContent}>
            Coronavirus disease (COVID-19) is a new strain that was discovered
            in 2019 and has not been previously identified in humans.
          </Text>
          <Text style={styles.aboutContent}>
            Coronaviruses are zoonotic, meaning they are transmitted between
            animals and people. Detailed investigations found that SARS-CoV was
            transmitted from civet cats to humans and MERS-CoV from dromedary
            camels to humans. Several known coronaviruses are circulating in
            animals that have not yet infected humans.
          </Text>
          <TouchableOpacity
            onPress={() =>
              Linking.openURL('https://www.who.int/health-topics/coronavirus')
            }>
            <Text
              style={{
                color: 'black',
                textDecorationLine: 'underline',
                fontWeight: 'bold',
                fontSize: 12 * scale
              }}>
              Click Here to Know More
            </Text>
          </TouchableOpacity>
        </View>

        <View
          style={{
            flex: 1,
            padding: 20,
            paddingHorizontal: 10,
            backgroundColor: '#FFC692',
            marginBottom: 20,
            borderRadius: 5,
            justifyContent: 'center',
            alignItems: 'center'
          }}>
          <Text
            style={{
              color: 'black',
              textAlign: 'center',
              fontWeight: 'bold',
              fontSize: 18 * scale
            }}>
            Support Project
          </Text>
          <TouchableOpacity
            onPress={() =>
              Linking.openURL(
                'https://github.com/sarthakpranesh/Covid19-ReactNative'
              )
            }>
            <Github style={{ marginVertical: 10 }} color="black" width={24 * scale} />
          </TouchableOpacity>
          <Text
            style={{
              color: 'black',
              textAlign: 'center',
              fontSize: 10 * scale,
              fontWeight: 'bold'
            }}>
            Made with Love
          </Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  aboutContentContainer: {
    backgroundColor: '#FFC692',
    marginVertical: 30,
    paddingVertical: 10,
    paddingHorizontal: 10,
    borderRadius: 5,
    flexWrap: 'wrap',
    flexDirection: 'row',
    justifyContent: 'center'
  },
  aboutContent: {
    textAlign: 'justify',
    color: 'black',
    marginVertical: 10,
    fontSize: 12 * scale
  }
})

export default AboutScreen
