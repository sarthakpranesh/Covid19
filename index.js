/**
 * @format
 */
import React from 'react'
import { AppRegistry, StatusBar } from 'react-native'
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
