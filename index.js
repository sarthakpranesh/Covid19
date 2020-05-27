/**
 * @format
 */
import React from 'react';
import {AppRegistry, StatusBar} from 'react-native';
import {DefaultTheme, Provider as PaperProvider} from 'react-native-paper';
import App from './App';
import {name as appName} from './app.json';

export default function Main() {
  return (
    <PaperProvider theme={DefaultTheme}>
      <StatusBar
        translucent={false}
        hidden={false}
        animated={true}
        backgroundColor="#DEF7FF"
        barStyle="dark-content"
      />
      <App theme="light" />
    </PaperProvider>
  );
}

AppRegistry.registerComponent(appName, () => Main);
