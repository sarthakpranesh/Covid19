import React, { Component } from "react";
import { View, StyleSheet, Text } from "react-native";

// importing types
import Layout from "../Layout";
import { CountryCases } from "../services/API/NinjaApi";
// importing constants
import RowStackResult from "./RowStackResult";
const scale = Layout.fontScale;

export interface CountryProps {
  data: CountryCases | null;
  countryName: string;
  containerStyle?: any;
}

class Country extends Component<CountryProps> {
  render() {
    const { containerStyle, countryName, data } = this.props;
    return (
      <View
        style={[
          styles.countrySection,
          {
            backgroundColor: containerStyle || "#FFC692",
          },
        ]}
      >
        <View style={styles.countryHeader}>
          <Text style={styles.countrySectionTitle}>
            {countryName || "Unknown Country"}:{" "}
          </Text>
        </View>
        <RowStackResult data={data} textColor="black" />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  countrySection: {
    backgroundColor: "#FFC692",
    marginTop: 0,
    marginBottom: 20,
    paddingVertical: 20,
    paddingTop: 10,
    paddingHorizontal: 10,
    borderRadius: 16,
  },
  countryHeader: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 10,
  },
  countrySectionTitle: {
    textAlign: "left",
    color: "black",
    marginTop: 0,
    fontWeight: "bold",
    fontSize: 18 * scale,
    fontFamily: "Roboto",
  },
});

export default Country;
