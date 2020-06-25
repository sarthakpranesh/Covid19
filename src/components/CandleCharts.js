import React, {useState, useEffect} from 'react';
import {View, Text, StyleSheet, ScrollView, Dimensions} from 'react-native';
import Svg, {Rect} from 'react-native-svg';
import Animated from 'react-native-reanimated';

const {width} = Dimensions.get('screen');
const svgWidth = width * 3;

const CandleCharts = ({data, country}) => {
  const [pressedData, setPressedData] = useState({});
  const [animatedOpacity, setAnimatedOpacity] = useState(0);
  let scrollView;
  let widthOfCandle = 10;
  let xWidth = 12;
  let heightScale = 1;
  if (data.length !== 0) {
    const max = data[data.length - 1].cases;
    data = data.filter((d) => d.cases / max > 0.001);
    xWidth = svgWidth / data.length;
    widthOfCandle = xWidth - 1;
    heightScale = width / data[data.length - 1].cases;
  }
  return (
    <View style={styles.countrySection}>
      <View style={styles.countryHeader}>
        <Text style={styles.countrySectionTitle}>
          {country ? `${country}'s Timeline` : ' Unknown Country '} :{' '}
        </Text>
      </View>
      <Animated.View
        style={[styles.animatedDataDialog, {opacity: animatedOpacity}]}>
        <Text>Total Cases: {pressedData.cases ? pressedData.cases : 0}</Text>
        <Text>
          Date:{' '}
          {pressedData.date ? new Date(pressedData.date).toDateString() : 0}
        </Text>
      </Animated.View>
      <ScrollView
        ref={(ref) => {
          scrollView = ref;
        }}
        onContentSizeChange={() => scrollView.scrollToEnd({animated: true})}
        style={styles.graphContainer}
        horizontal={true}
        scrollEventThrottle={16}>
        {data.length !== 0 ? (
          <Svg width={svgWidth + 20} height={width}>
            {data.map((d, index) => {
              return (
                <Rect
                  x={xWidth * index}
                  y={width - heightScale * d.cases}
                  width={widthOfCandle}
                  height={heightScale * d.cases}
                  fill="red"
                  stroke={d.date === pressedData.date ? 'black' : null}
                  onPress={() => {
                    setPressedData(d);
                    setAnimatedOpacity(1);
                  }}
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
  animatedDataDialog: {
    color: 'black',
    padding: 10,
    borderRadius: 16,
    backgroundColor: 'white',
    alignSelf: 'flex-start',
    left: 20,
    top: 0,
  },
  graphContainer: {
    backgroundColor: '#FFC692',
    padding: 10,
  },
});

export default CandleCharts;
