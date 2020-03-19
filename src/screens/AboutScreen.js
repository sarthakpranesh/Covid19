import React from "react";
import {
    View,
    Text,
    StyleSheet,
    SafeAreaView
} from "react-native";
import { ScrollView } from 'react-native-gesture-handler';

// importing Components
import Drawer from '../components/Drawer';

const HomeScreen = (props) => {
    const navigate = props.navigation;
    return (
        <>
            <Drawer 
                navigate={navigate} 
                title='About'
            />
            <ScrollView>
                <View>
                    <Text>About the Team</Text>
                </View>
            </ScrollView>
        </>
    );
}

export default HomeScreen;