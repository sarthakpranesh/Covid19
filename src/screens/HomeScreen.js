import React from "react";
import {
    View,
    Text,
    StyleSheet,
    SafeAreaView,
    StatusBar
} from "react-native";
import { ScrollView } from "react-native-gesture-handler";

// importing components
import Drawer from '../components/Drawer';

const HomeScreen = (props) => {
    const navigate = props.navigation;
    return (
        <>
        <SafeAreaView>
            <StatusBar backgroundColor='blue' barStyle='dark-content' hidden={true}/>
            <Drawer navigate={navigate} title='Home'/>
        </SafeAreaView>
        </>
    );
}

export default HomeScreen;