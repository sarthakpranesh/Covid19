import React, { Component } from "react";
import { View, StyleSheet, Text } from "react-native";

// importing services
import Layout from "../Layout";
import numberFormatter from "../services/numberFormatter";
const scale = Layout.fontScale;

export interface RowStackProps {
  data: any;
  textColor?: string;
}

class RowStackResult extends Component<RowStackProps> {
  render() {
    const { data, textColor } = this.props;

    return (
      <>
        <View style={styles.mainSubContainer}>
          <View style={styles.subResult}>
            <Text
              style={[styles.subResultText, { color: textColor || "black" }]}
            >
              Total Cases
            </Text>
            {data ? (
              <Text
                style={[
                  styles.resultNumbers,
                  {
                    color: textColor || "black",
                  },
                ]}
              >
                {numberFormatter(data.confirmed)}
              </Text>
            ) : (
              <Text>...</Text>
            )}
          </View>
          <View style={styles.subResult}>
            <Text
              style={[
                styles.subResultText,
                {
                  color: this.props.textColor ? this.props.textColor : "black",
                },
              ]}
            >
              Total Deaths
            </Text>
            {data ? (
              <Text
                style={[
                  styles.resultNumbers,
                  {
                    color: this.props.textColor
                      ? this.props.textColor
                      : "black",
                  },
                ]}
              >
                {numberFormatter(data.deaths)}
              </Text>
            ) : (
              <Text>...</Text>
            )}
          </View>
          <View style={styles.subResult}>
            <Text
              style={[
                styles.subResultText,
                {
                  color: this.props.textColor ? this.props.textColor : "black",
                },
              ]}
            >
              Total Recover
            </Text>
            {data ? (
              <Text
                style={[
                  styles.resultNumbers,
                  {
                    color: this.props.textColor
                      ? this.props.textColor
                      : "black",
                  },
                ]}
              >
                {numberFormatter(data.recovered)}
              </Text>
            ) : (
              <Text>...</Text>
            )}
          </View>
        </View>
        <View style={styles.mainSubContainer}>
          <View style={styles.subResult}>
            <Text
              style={[
                styles.subResultText,
                {
                  color: this.props.textColor ? this.props.textColor : "black",
                },
              ]}
            >
              New Cases
            </Text>
            {data ? (
              <Text
                style={[
                  styles.resultNumbers,
                  {
                    color: this.props.textColor
                      ? this.props.textColor
                      : "black",
                  },
                ]}
              >
                {numberFormatter(data.newConfirmed)}
              </Text>
            ) : (
              <Text>...</Text>
            )}
          </View>
          <View style={styles.subResult}>
            <Text
              style={[
                styles.subResultText,
                {
                  color: this.props.textColor ? this.props.textColor : "black",
                },
              ]}
            >
              Serious
            </Text>
            {data ? (
              <Text
                style={[
                  styles.resultNumbers,
                  {
                    color: this.props.textColor
                      ? this.props.textColor
                      : "black",
                  },
                ]}
              >
                {numberFormatter(data.totalSerious)}
              </Text>
            ) : (
              <Text>...</Text>
            )}
          </View>
          <View style={styles.subResult}>
            <Text
              style={[
                styles.subResultText,
                {
                  color: this.props.textColor ? this.props.textColor : "black",
                },
              ]}
            >
              Deaths Today
            </Text>
            {data ? (
              <Text
                style={[
                  styles.resultNumbers,
                  {
                    color: this.props.textColor
                      ? this.props.textColor
                      : "black",
                  },
                ]}
              >
                {numberFormatter(data.deathsToday)}
              </Text>
            ) : (
              <Text>...</Text>
            )}
          </View>
        </View>
      </>
    );
  }
}

const styles = StyleSheet.create({
  mainSubContainer: {
    flex: 1,
    left: 0,
    right: 0,
    marginTop: 0,
    flexDirection: "row",
    justifyContent: "space-evenly",
    paddingTop: 10,
  },
  subResult: {
    flex: 1,
    flexDirection: "column",
    alignItems: "center",
    textAlign: "center",
  },
  subResultText: {
    textAlign: "center",
    fontFamily: "Roboto",
  },
  resultNumbers: {
    fontWeight: "bold",
    textAlign: "center",
    fontSize: 14 * scale,
    fontFamily: "Roboto",
  },
});

export default RowStackResult;
