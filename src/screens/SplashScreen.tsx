import React from 'react'
import {
  StyleSheet,
  Image,
  ActivityIndicator,
} from 'react-native'
import LinearGradient from 'react-native-linear-gradient'

// importing Layout
import Layout from '../Layout'

const SplashScreen = ({ style, ...props }: any) => {
  return (
    <LinearGradient
      colors={['#DEF7FF', '#B1ECFF']}
      style={styles.splashWrapper}>
      <Image
        source={require('../../assets/img/splash.png')}
        style={styles.splashImage}
      />
      <ActivityIndicator style={styles.splashActivity} />
    </LinearGradient>
  )
}

const styles = StyleSheet.create({
  splashWrapper: {
    flex: 1,
    backgroundColor: '#B1ECFF',
    justifyContent: 'center',
    alignItems: 'center'
  },
  splashImage: {
    width: Layout.isLargeDevice ? 300 : 150,
    height: Layout.isLargeDevice ? 300 : 150
  },
  splashActivity: {
    position: 'absolute',
    bottom: 60
  }
})

export default SplashScreen
