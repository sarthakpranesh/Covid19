import { StyleSheet, Platform } from 'react-native'
import Layout from './Layout';

const Styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    paddingHorizontal: 10,
    paddingVertical: 10,
    backgroundColor: '#DEF7FF'
  },
  mainHeader: {
    flex: 1,
    left: 0,
    right: 0,
    flexDirection: 'column',
    justifyContent: 'center',
    alignContent: 'center',
    paddingVertical: 40,
    paddingTop: Platform.OS === "ios" ? 80 : 40,
    paddingBottom: 40
  },
  mainHeaderText: {
    textAlign: 'center',
    fontWeight: 'bold',
    color: '#D41D3E',
    fontSize: 24 * Layout.fontScale,
  }
})

export default Styles
