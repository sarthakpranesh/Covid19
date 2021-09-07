import { Dimensions } from "react-native";

const width = Dimensions.get("window").width;
const height = Dimensions.get("window").height;

export default {
  window: {
    width,
    height,
  },
  largeScreenBreak: 992, // large screen devices like laptops or desktops
  smallScreenBreak: 375,
  fontScale: width > 992 ? 1.8 : width / 375 + 0.2,
  isSmallDevice: width < 375,
  isLargeDevice: width > 992,
};
