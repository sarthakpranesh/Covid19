import React, { Component } from 'react';
import {
    View,
    Text,
    StyleSheet,
    Image,
} from 'react-native';

class PreventionCards extends Component {

    render () {
        const title = this.props.title ? this.props.title : "Precaution";
        const content = this.props.content ? this.props.content : "Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum"
        const src = this.props.src ? this.props.src : require('../../assets/img/wh.png');
        return (
            <View style={styles.mainPreventionContainer}>
                <Text style={styles.mainPreventionTitle}>{title}</Text>
                <View style={styles.preventionContentContainer}>
                    <Text style={styles.preventionContent}>{content}</Text>
                    <Image 
                        style={{
                            width: 100,
                            height: 100,
                            margin: 10,
                            marginBottom: 0,
                        }}
                        source={src}
                    />
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    mainPreventionContainer: {
        backgroundColor: '#112d4e',
        marginVertical: 10,
        paddingVertical: 20,
        paddingHorizontal: 10,
        borderRadius: 5,
    },
    mainPreventionTitle: {
        color: 'white',
        fontSize: 18,
        fontWeight: 'bold',
        fontFamily: ''
    },
    preventionContentContainer: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-evenly',
        marginTop: 5,
        padding: 5,
        flexWrap: 'wrap'
    },
    preventionContent: {
        color: 'white',
        fontSize: 12,
        fontFamily: ''
    }
})

export default PreventionCards;