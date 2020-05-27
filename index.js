/**
 * @format
 */
import React from 'react';
import {AppRegistry, StatusBar} from 'react-native';
import {DarkTheme, Provider as PaperProvider} from 'react-native-paper';
import App from './App';
import {name as appName} from './app.json';

export default function Main() {
  return (
    <PaperProvider theme={DarkTheme}>
      <StatusBar
        translucent={false}
        hidden={false}
        animated={true}
        backgroundColor="black"
        barStyle="light-content"
      />
      <App theme="dark" />
    </PaperProvider>
  );
}

AppRegistry.registerComponent(appName, () => Main);
