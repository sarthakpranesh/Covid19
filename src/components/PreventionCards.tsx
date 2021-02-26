import React, { Component } from 'react'
import { View, StyleSheet, Image, Text, Dimensions } from 'react-native'

import Layout from '../Layout';
const scale = Layout.fontScale

export interface PreventionProps {
  title: string;
  content: string;
  src: any;
}

class PreventionCards extends Component<PreventionProps> {
  render () {
    const { title, content, src } = this.props
    return (
      <View style={styles.mainPreventionContainer}>
        <Text style={styles.mainPreventionTitle}>{title}</Text>
        <View style={styles.preventionContentContainer}>
          <Text style={styles.preventionContent}>{content}</Text>
          <Image
            style={styles.preventionContentImage}
            source={ src }
          />
        </View>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  mainPreventionContainer: {
    backgroundColor: '#FFC692',
    marginBottom: 20,
    padding: 10,
    borderRadius: 8
  },
  mainPreventionTitle: {
    color: 'black',
    fontWeight: 'bold',
    fontSize: 18 * scale,
    fontFamily: 'Roboto'
  },
  preventionContentContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 5,
    padding: 5
  },
  preventionContent: {
    flex: 2,
    color: 'black',
    textAlign: 'left',
    fontSize: 12 * scale,
    fontFamily: 'Roboto'
  },
  preventionContentImage: {
    width: 100,
    height: 100,
    marginLeft: 2,
    flex: 1.6,
    borderRadius: 8
  }
})

export default PreventionCards
