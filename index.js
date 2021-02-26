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

  // trying to load fonts on web directly from Google Fonts
  const link = document.createElement('link')
  link.id = 'id2'
  link.rel = 'preconnect'
  link.href = 'https://fonts.gstatic.com'
  document.head.appendChild(link)
  const link2 = document.createElement('link')
  link2.id = 'id3'
  link2.rel = 'stylesheet'
  link2.href = 'https://fonts.googleapis.com/css2?family=Roboto&display=swap'
  document.head.appendChild(link2)
}
