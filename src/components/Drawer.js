import React from "react";
import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    SafeAreaView,
    StatusBar
} from 'react-native';
import { Feather } from '@expo/vector-icons';


const Drawer = ({ navigate, title }) => {

    onHamClick = () => {
        navigate.openDrawer();
    } 

    return (
        <>
        <View style={styles.header}>
            <TouchableOpacity style={styles.menu} onPress={onHamClick}>
                <Feather name='menu' color='#112d4e' size={32}/>
            </TouchableOpacity>
            <View style={styles.headerText}>
                <Text>{title}</Text>
            </View>
        </View>
        </>
    );
}

const styles = StyleSheet.create({
    header: {
        display: 'flex',
        top: 0,
        right: 0,
        left: 0,
        height: 40,
        padding: 5,
        backgroundColor: '#dbe2ef',
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'center',
    },
    headerText: {
        color: '#112d4e',
        fontSize: 22,
        margin: 20,
    }
})

export default Drawer;