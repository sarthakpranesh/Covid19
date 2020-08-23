import React, { useState, useEffect } from 'react'
import { View, StyleSheet, ScrollView, Dimensions, Text, Animated } from 'react-native'
import { TouchableOpacity } from 'react-native-gesture-handler'

const { width, scale } = Dimensions.get('screen')

export interface CandleProps {
  data: any;
  country: String;
}

export interface TimelineDataType {
  date: String;
  difference: number;
}

const CandleCharts = (props: CandleProps) => {
  const startAnimation = new Animated.Value(0)
  const animatedHeight = startAnimation.interpolate({
    inputRange: [0, 1],
    outputRange: [0, -width],
    extrapolate: 'clamp'
  })
  let { data, country } = props
  const [pressedData, setPressedData] = useState<TimelineDataType>({
    date: '',
    difference: -1
  })
  const [animatedOpacity, setAnimatedOpacity] = useState(0)
  let scrollView: ScrollView | null
  const widthOfCandle = 4
  const marginBetweenCandles = 2
  let heightScale = 1
  let svgWidth = 0
  useEffect(() => {
    Animated.timing(startAnimation, {
      toValue: 1,
      duration: 1000,
      useNativeDriver: true
    }).start()
  }, [data, pressedData])
  if (data.length !== 0) {
    const max = data[data.length - 1].difference
    data = data.filter((d: any) => d.difference / max > 0.001)
    svgWidth = (widthOfCandle + marginBetweenCandles) * data.length
    heightScale = width / data[data.length - 1].difference
  }
  let color = 'red'
  return (
    <View style={styles.countrySection}>
      <View style={styles.countryHeader}>
        <Text style={styles.countrySectionTitle}>
          {country ? `${country}'s Timeline` : ' Unknown Country '}:{' '}
        </Text>
      </View>
      <Animated.View
        style={[styles.animatedDataDialog, { opacity: animatedOpacity }]}>
        <Text>
          Active Cases: {pressedData.difference ? pressedData.difference : 0}
        </Text>
        <Text>Date: {pressedData.date ? pressedData.date : 0}</Text>
      </Animated.View>
      <ScrollView
        ref={(ref) => {
          scrollView = ref
        }}
        onContentSizeChange={() =>
          scrollView !== null ? scrollView.scrollToEnd({ animated: true }) : null
        }
        style={styles.graphContainer}
        horizontal={true}
        scrollEventThrottle={16}>
        {data.length !== 0 ? (
          <View style={{
            width: svgWidth + 20,
            height: width,
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'flex-start',
            alignItems: 'flex-end'
          }}
          >
            {data.map((d: any, index: any) => {
              if (index !== 0) {
                if (d.difference - data[index - 1].difference < 0) {
                  color = 'rgba(0, 255, 0, 0.9)'
                } else if (d.difference - data[index - 1].difference === 0) {
                  color = 'rgba(255, 255, 0, 0.9)'
                } else {
                  color = 'rgba(255, 0, 0, 0.9)'
                }
              }
              return (
                <TouchableOpacity key={`case${index}`} onPress={() => {
                  setPressedData(d)
                  setAnimatedOpacity(1)
                }}>
                  <Animated.View style={{
                    marginLeft: marginBetweenCandles,
                    width: widthOfCandle,
                    height: widthOfCandle,
                    backgroundColor: 'black',
                    top: widthOfCandle
                  }}/>
                  <Animated.View
                    style={{
                      top: width + widthOfCandle,
                      marginLeft: marginBetweenCandles,
                      width: widthOfCandle,
                      height: heightScale * d.difference,
                      transform: [{ translateY: animatedHeight }],
                      backgroundColor: color,
                      opacity: 0.6,
                      borderWidth: d.date === pressedData.date ? 2 : 0,
                      borderColor: d.date === pressedData.date ? 'black' : null
                    }}
                  >
                  </Animated.View>
                </TouchableOpacity>
              )
            })}
          </View>
        ) : null}
      </ScrollView>
    </View>
  )
}

const styles = StyleSheet.create({
  countrySection: {
    backgroundColor: '#FFC692',
    marginTop: 0,
    marginBottom: 20,
    paddingVertical: 20,
    paddingTop: 10,
    borderRadius: 16
  },
  countryHeader: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
    marginHorizontal: 10
  },
  countrySectionTitle: {
    textAlign: 'left',
    color: 'black',
    marginTop: 0,
    fontWeight: 'bold',
    fontFamily: '',
    fontSize: 12 * scale
  },
  animatedDataDialog: {
    color: 'black',
    padding: 10,
    borderRadius: 16,
    backgroundColor: 'white',
    alignSelf: 'flex-start',
    left: 20,
    top: 0
  },
  graphContainer: {
    backgroundColor: '#FFC692',
    padding: 10
  }
})

export default CandleCharts
