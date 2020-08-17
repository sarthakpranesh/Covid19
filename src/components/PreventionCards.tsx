import React, { Component } from 'react'
import { View, StyleSheet, Image, Text, Dimensions } from 'react-native'

export interface PreventionProps {
  title: string;
  content: string;
  src: any;
}

const { scale } = Dimensions.get('window')

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
    marginVertical: 10,
    padding: 10,
    borderRadius: 8
  },
  mainPreventionTitle: {
    color: 'black',
    fontWeight: 'bold',
    fontFamily: '',
    fontSize: 10 * scale
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
    fontFamily: '',
    textAlign: 'left',
    fontSize: 8 * scale
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
