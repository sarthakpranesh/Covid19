import React from 'react';
import {
    View,
    Text,
    ScrollView,
    StyleSheet,
} from 'react-native';

// importing components
import Drawer from '../components/Drawer';

const Precaution = (props) => {
    const navigate = props.navigation;

    return (
        <>
            <Drawer
                navigate={navigate}
                title='Precaution'
            />
            <ScrollView>
                <View>
                    <Text>This is Precaution Screen</Text>
                </View>
            </ScrollView>
        </>
    );
}

export default Precaution;