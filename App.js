import {
    createDrawerNavigator,
} from 'react-navigation-drawer';
import { createAppContainer } from 'react-navigation';

// importing Screens
import HomeScreen from "./src/screens/HomeScreen";
import AboutScreen from './src/screens/AboutScreen';
import PrecautionScreen from './src/screens/PrecautionScreen';

const Drawer = createDrawerNavigator({
    " Home ": {
        screen: HomeScreen,
    },
    " Precaution ": {
        screen: PrecautionScreen,
    },
    " About ": {
        screen: AboutScreen
    }
}, {
  initialRouteName: ' Home ',
  drawerBackgroundColor: '#dbe2ef',
  keyboardDismissMode: 'on-drag',
  backBehavior: 'initialRoute',
  drawerPosition: 'left',
  minSwipeDistance: 20,
  navigationOptions: {
  },
  contentOptions: {
  }
})

export default createAppContainer(Drawer);