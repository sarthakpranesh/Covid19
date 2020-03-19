import React from "react";
import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity
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
                <Feather name='menu' color='#112d4e' size={28}/>
            </TouchableOpacity>
            <View>
                <Text style={styles.headerText}>{title}</Text>
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
        height: 48,
        padding: 10,
        backgroundColor: '#dbe2ef',
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'center',
    },
    headerText: {
        color: '#112d4e',
        fontSize: 18,
        margin: 20,
        fontWeight: 'bold',
    }
})

export default Drawer;