import { StyleSheet } from "react-native";

import Layout from "./Layout";

const Styles = StyleSheet.create({
  scrollView: {
    flex: 1,
  },
  scrollViewContentContainer: {
    width: Layout.isLargeDevice ? Layout.window.width / 2 : Layout.window.width,
    marginVertical: 10,
    paddingHorizontal: 10,
    alignSelf: "center",
  },
  mainHeader: {
    flex: 1,
    left: 0,
    right: 0,
    flexDirection: "column",
    justifyContent: "center",
    alignContent: "center",
    paddingVertical: 40,
    paddingTop: 80,
    paddingBottom: 40,
  },
  mainHeaderText: {
    textAlign: "center",
    fontWeight: "bold",
    color: "#D41D3E",
    fontSize: 24 * Layout.fontScale,
    fontFamily: "Roboto",
  },
});

export default Styles;
