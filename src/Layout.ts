import { Dimensions } from 'react-native'

const width = Dimensions.get('window').width
const height = Dimensions.get('window').height

export default {
  window: {
    width,
    height
  },
  largeScreenBreak: 720,
  smallScreenBreak: 375,
  fontScale: width >= 720 ? width / 720 : width / 375,
  isSmallDevice: width < 375,
  isLargeDevice: width > 720
}
