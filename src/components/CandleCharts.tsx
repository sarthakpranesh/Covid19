import React, { useState } from "react";
import { View, StyleSheet, ScrollView, Text, Dimensions } from "react-native";

// importing components
import Layout from "../Layout";
import Candle from "./Candle";
import ChipList from "./ChipList/ChipList";

// importing constants
const scale = Layout.fontScale;
const width = Dimensions.get("window").width > 720 ? 300 : Layout.window.width;

export interface CandleProps {
  data: any;
  country: string;
}

export interface TimelineDataType {
  date: string;
  active: number;
}

// helper functions
const getDataKeys = (data: any[]) => {
  return Object.keys(data[0]).filter((i) => i !== "date");
};

const CandleCharts = (props: CandleProps) => {
  let { data, country } = props;

  // screen states
  const [selected, setSelected] = useState<string>(getDataKeys(data)[0]);
  const [pressedData, setPressedData] = useState<any>(data[data.length - 1]);

  // screen component references
  let scrollView: ScrollView | null = null;

  // calculations for candles
  const widthOfCandle = 4;
  const marginBetweenCandles = 2;
  let heightScale = 1;
  let svgWidth = data.for;
  if (data.length !== 0) {
    let max = 0;
    data.forEach((val: any) => {
      if (val[selected] > max) {
        max = val[selected];
      }
    });
    data = data.filter((d: any) => d[selected] / max > 0.001);
    svgWidth = (widthOfCandle + marginBetweenCandles) * data.length;
    heightScale = width / max;
  }

  const selectedText = `${selected.toUpperCase()}: ${pressedData[selected]}`;

  return (
    <View style={styles.countrySection}>
      <View style={styles.countryHeader}>
        <Text style={styles.countrySectionTitle}>
          {country ? `${country}'s Timeline` : " Unknown Country "}:{" "}
        </Text>
      </View>
      <View style={styles.animatedDataDialog}>
        <Text>{selectedText}</Text>
        <Text>DATE: {pressedData.date}</Text>
      </View>
      <ScrollView
        key={selected}
        ref={(ref) => {
          scrollView = ref;
        }}
        onContentSizeChange={() =>
          scrollView !== null
            ? scrollView.scrollToEnd({ animated: true })
            : null
        }
        style={styles.graphContainer}
        contentContainerStyle={{
          width: svgWidth + 20,
          height: width,
          display: "flex",
          flexDirection: "row",
          justifyContent: "flex-start",
          alignItems: "flex-end",
        }}
        horizontal
        scrollEventThrottle={16}
      >
        {data.map((d: any, index: any) => {
          let color;
          if (index !== 0) {
            if (d[selected] - data[index - 1][selected] < 0) {
              color = "rgba(0, 255, 0, 0.9)";
            } else if (d[selected] - data[index - 1][selected] === 0) {
              color = "rgba(255, 255, 0, 0.9)";
            } else {
              color = "rgba(255, 0, 0, 0.9)";
            }
          }
          return (
            <Candle
              key={`${index}`}
              style={{
                marginLeft: marginBetweenCandles,
                width: widthOfCandle,
                height: heightScale * d[selected],
                backgroundColor: color,
                opacity: 0.7,
                borderWidth: d.date === pressedData.date ? 2 : 0,
                borderColor:
                  d.date === pressedData.date ? "rgba(0, 0, 0, 0.4)" : null,
              }}
              onPress={() => setPressedData(d)}
            />
          );
        })}
      </ScrollView>
      <ChipList
        data={getDataKeys(data)}
        selected={selected}
        setSelected={(s: string) => setSelected(s)}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  countrySection: {
    backgroundColor: "#FFC692",
    marginTop: 0,
    marginBottom: 20,
    paddingVertical: 20,
    paddingTop: 10,
    borderRadius: 16,
  },
  countryHeader: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 10,
    marginHorizontal: 10,
  },
  countrySectionTitle: {
    textAlign: "left",
    color: "black",
    marginTop: 0,
    fontWeight: "bold",
    fontSize: 18 * scale,
    fontFamily: "Roboto",
  },
  animatedDataDialog: {
    opacity: 1,
    padding: 10,
    borderRadius: 16,
    backgroundColor: "white",
    alignSelf: "flex-start",
    left: 20,
    top: 0,
  },
  graphContainer: {
    backgroundColor: "#FFC692",
    padding: 10,
  },
});

export default CandleCharts;
