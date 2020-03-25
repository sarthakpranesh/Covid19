import React from "react";
import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    Image
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
                <Feather name='menu' color='black' size={28}/>
            </TouchableOpacity>
            <View style={styles.titleContainer}>
                <Text style={styles.headerText}>{title}</Text>
            </View>
            <Image 
                style={styles.drawerIcon}
                source={require("../../assets/C19.png")}
            />
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
        backgroundColor: '#B5ECFD',
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'center',
        zIndex: 100
    },
    headerText: {
        color: 'black',
        fontSize: 18,
        margin: 20,
        marginLeft: 0,
        fontWeight: 'bold',
        fontFamily: '',
    },
    titleContainer: {
        padding: 2,
        margin: 2,
    },
    drawerIcon: {
        position: 'absolute',
        width: 30,
        height: 30,
        right: 12,
    }
})

export default Drawer;