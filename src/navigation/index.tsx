import { NavigationContainer } from "@react-navigation/native";
import {
  createStackNavigator,
  TransitionSpecs,
  CardStyleInterpolators,
} from "@react-navigation/stack";
import * as React from "react";

// import screens
import HomeScreen from "../screens/HomeScreen";
// importing services
import { CombinedDarkTheme } from "../services/themes";

const Stack = createStackNavigator();

const RootNavigator = () => {
  return (
    <NavigationContainer theme={CombinedDarkTheme}>
      <Stack.Navigator
        screenOptions={{
          headerShown: false,
          gestureDirection: "horizontal",
          cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
          transitionSpec: {
            open: TransitionSpecs.TransitionIOSSpec,
            close: TransitionSpecs.TransitionIOSSpec,
          },
        }}
      >
        <Stack.Screen name="Home" component={HomeScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default RootNavigator;
