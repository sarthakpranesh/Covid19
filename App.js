import { createDrawerNavigator } from 'react-navigation-drawer';
import { createAppContainer } from 'react-navigation';

// importing Screens
import HomeScreen from "./src/screens/HomeScreen";
import AboutScreen from './src/screens/AboutScreen';

const Drawer = createDrawerNavigator({
    Home: {
        screen: HomeScreen,
    },
    About: {
        screen: AboutScreen
    }
}, {
  initialRouteName: 'Home',
  drawerBackgroundColor: '#dbe2ef',
  keyboardDismissMode: 'on-drag',
})

export default createAppContainer(Drawer);