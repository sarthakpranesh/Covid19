import React, {useState} from 'react';
import {View, Text, StyleSheet, ScrollView, Dimensions} from 'react-native';
import Svg, {Rect} from 'react-native-svg';

const {width} = Dimensions.get('screen');
const svgWidth = width * 2;

const CandleCharts = ({data, country}) => {
  let scrollView;
  let widthOfCandle = 10;
  let xWidth = 12;
  let heightScale = 1;
  if (data.length !== 0) {
    const max = data[data.length - 1].cases;
    data = data.filter((d) => d.cases / max > 0.001);
    xWidth = svgWidth / data.length;
    widthOfCandle = xWidth - 4;
    heightScale = width / data[data.length - 1].cases;
  }
  return (
    <View style={styles.countrySection}>
      <View style={styles.countryHeader}>
        <Text style={styles.countrySectionTitle}>
          {country ? `${country} Timeline` : ' Unknown Country '} :{' '}
        </Text>
      </View>
      <ScrollView
        ref={(ref) => {
          scrollView = ref;
        }}
        onContentSizeChange={() => scrollView.scrollToEnd({animated: true})}
        style={styles.graphContainer}
        horizontal={true}
        scrollEventThrottle={16}>
        {data.length !== 0 ? (
          <Svg width={svgWidth + 20} height={width} fill="blue">
            {data.map((d, index) => {
              return (
                <Rect
                  x={xWidth * index}
                  y={width - heightScale * d.cases}
                  width={widthOfCandle}
                  height={heightScale * d.cases}
                  fill="red"
                />
              );
            })}
          </Svg>
        ) : null}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  countrySection: {
    backgroundColor: '#FFC692',
    marginTop: 0,
    marginBottom: 20,
    paddingVertical: 20,
    paddingTop: 10,
    borderRadius: 16,
  },
  countryHeader: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
    marginHorizontal: 20,
  },
  countrySectionTitle: {
    textAlign: 'justify',
    color: 'black',
    marginTop: 0,
    fontSize: 28,
    fontWeight: 'bold',
    fontFamily: '',
  },
  graphContainer: {
    backgroundColor: '#FFC692',
    padding: 10,
  },
});

export default CandleCharts;
