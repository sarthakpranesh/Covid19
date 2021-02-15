/**
 * @format
 */
import React from 'react'
import {
  AppRegistry,
  StatusBar,
  Platform
} from 'react-native'
import App from './App'
import { name as appName } from './app.json'

export default function Main () {
  return (
    <>
      <StatusBar
        translucent={false}
        hidden={true}
        animated={true}
        backgroundColor="#DEF7FF"
        barStyle="dark-content"
      />
      <App />
    </>
  )
}

AppRegistry.registerComponent(appName, () => Main)

if (Platform.OS === 'web') {
  AppRegistry.runApplication(appName, {
    rootTag: document.getElementById('root')
  })
}
