import React from 'react'
import {
  StyleSheet,
  Image,
  ActivityIndicator
} from 'react-native'

// importing components
import SafeAreaView from '../components/SafeAreaView'

// importing Layout
import Layout from '../Layout'

const SplashScreen = () => {
  return (
    <SafeAreaView style={{
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center'
    }}>
      <Image
        source={require('../../assets/img/splash.png')}
        style={styles.splashImage}
      />
      <ActivityIndicator style={styles.splashActivity} />
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  splashImage: {
    width: Layout.isLargeDevice ? 300 : 200,
    height: Layout.isLargeDevice ? 300 : 200
  },
  splashActivity: {
    position: 'absolute',
    bottom: 60
  }
})

export default SplashScreen
