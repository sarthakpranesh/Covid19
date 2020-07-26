import React, {useState} from 'react';
import {View, StyleSheet, ScrollView, Dimensions} from 'react-native';
import {Title, Text} from 'react-native-paper';
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
    const max = data[data.length - 1].totalCases;
    data = data.filter((d) => d.totalCases / max > 0.001);
    xWidth = svgWidth / data.length;
    widthOfCandle = xWidth - 1;
    heightScale = width / data[data.length - 1].totalCases;
  }
  return (
    <View style={styles.countrySection}>
      <View style={styles.countryHeader}>
        <Title style={styles.countrySectionTitle}>
          {country ? `${country}'s Timeline` : ' Unknown Country '}:{' '}
        </Title>
      </View>
      <Animated.View
        style={[styles.animatedDataDialog, {opacity: animatedOpacity}]}>
        <Text>
          Total Cases: {pressedData.totalCases ? pressedData.totalCases : 0}
        </Text>
        <Text>Date: {pressedData.date ? pressedData.date : 0}</Text>
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
                  key={`${index}`}
                  x={xWidth * index}
                  y={width - heightScale * d.totalCases}
                  width={widthOfCandle}
                  height={heightScale * d.totalCases}
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
    marginHorizontal: 10,
  },
  countrySectionTitle: {
    textAlign: 'justify',
    color: 'black',
    marginTop: 0,
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
