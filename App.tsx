import "react-native-gesture-handler";
import * as Location from "expo-location";
import * as SplashScreen from "expo-splash-screen";
import { StatusBar } from "expo-status-bar";
import React, { useState, useEffect, useCallback } from "react";
import { View, Platform } from "react-native";
import { Provider as ReduxProvider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";

// import root navigator
import RootNavigator from "./src/navigation";
// importing screens
import SplashScreenWeb from "./src/screens/SplashScreen.web";
// importing services
import getCountry from "./src/services/API/functions/getCountry";
import getCovidData from "./src/services/API/functions/getCovidData";
import {
  store,
  persister,
  useAppDispatch,
  useAppSelector,
} from "./src/services/redux/index";
import {
  setCountry,
  updateData,
} from "./src/services/redux/reducers/DefaultReducer";

// default location, if permission for location not provided
const INDIA: Location.LocationObject | null = {
  timestamp: 0,
  coords: {
    latitude: 28.6448,
    longitude: 77.216721,
    accuracy: 0,
    altitude: 0,
    altitudeAccuracy: 0,
    heading: 0,
    speed: 0,
  },
};

const MainApp = () => {
  const dispatch = useAppDispatch();
  const defaultState = useAppSelector((state) => state.root.default);
  const [isAppReady, setIsAppReady] = useState<boolean>(false);

  // small helper
  const fetchAndSetCountry = async (coords: any) => {
    const country: string = await getCountry({
      long: coords.longitude,
      lat: coords.latitude,
    });
    dispatch(setCountry(country));
  };

  useEffect(() => {
    (async () => {
      const { status } = await Location.requestForegroundPermissionsAsync();
      let location: any = INDIA;
      if (status === "granted") {
        const locationFetched = await Location.getLastKnownPositionAsync({});
        if (locationFetched) {
          location = locationFetched;
        }
      }
      await fetchAndSetCountry(location.coords);
    })();
  }, []);

  // if mobile location set -> get covid stats
  useEffect(() => {
    if (defaultState.country !== null) {
      getCovidData(defaultState.country)
        .then((data) => {
          console.log(data);
          dispatch(updateData(data));
        })
        .finally(() => {
          setIsAppReady(true);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }, [defaultState.country]);

  // use a onLayout callback to avoid flicker when transitioning from splash to rendered app
  const onLayout = useCallback(async () => {
    if (isAppReady) {
      await SplashScreen.hideAsync();
    }
  }, [isAppReady]);

  if (
    !isAppReady ||
    defaultState.country === null ||
    defaultState.data === {}
  ) {
    if (Platform.OS === "web") {
      return <SplashScreenWeb />;
    }
    return null;
  }

  return (
    <View onLayout={onLayout} style={{ flex: 1 }}>
      <StatusBar style="auto" hidden />
      <RootNavigator />
    </View>
  );
};

export default function App() {
  // make sure the splash screen doesn't auto hide
  // also remember `expo-splash-screen` is not supported by web
  useEffect(() => {
    (async () => {
      try {
        await SplashScreen.preventAutoHideAsync();
      } catch (err) {
        console.log(err);
      }
    })();
  }, []);

  return (
    <ReduxProvider store={store}>
      <PersistGate loading={false} persistor={persister}>
        <MainApp />
      </PersistGate>
    </ReduxProvider>
  );
}
