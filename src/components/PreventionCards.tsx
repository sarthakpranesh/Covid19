/* eslint-disable react-native/no-inline-styles */
import React, {Component} from 'react';
import {View, StyleSheet, Image} from 'react-native';
import {Text, Subheading} from 'react-native-paper';

export interface PreventionProps {
  title: string;
  content: string;
  src: any;
}

class PreventionCards extends Component<PreventionProps> {
  render() {
    const {title, content, src} = this.props;
    return (
      <View style={styles.mainPreventionContainer}>
        <Subheading style={styles.mainPreventionTitle}>{title}</Subheading>
        <View style={styles.preventionContentContainer}>
          <Text style={styles.preventionContent}>{content}</Text>
          <Image
            style={{
              width: 100,
              height: 120,
              marginLeft: 10,
              marginBottom: 0,
              flex: 1.6,
              borderRadius: 16,
            }}
            source={src}
          />
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  mainPreventionContainer: {
    backgroundColor: '#FFC692',
    marginVertical: 10,
    paddingVertical: 20,
    paddingHorizontal: 10,
    borderRadius: 18,
  },
  mainPreventionTitle: {
    color: 'black',
    fontWeight: 'bold',
    fontFamily: '',
  },
  preventionContentContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 5,
    padding: 5,
  },
  preventionContent: {
    flex: 2,
    color: 'black',
    fontFamily: '',
    flexWrap: 'wrap',
    textAlign: 'justify',
  },
});

export default PreventionCards;
