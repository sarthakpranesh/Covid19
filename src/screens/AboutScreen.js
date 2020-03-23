import React from "react";
import {
    View,
    Text,
    StyleSheet,
    Image,
    Linking,
    TouchableOpacity,
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
                title=' About '
            />
            <ScrollView
                style={styles.safeArea}
                alwaysBounceVertical={true}
                showsVerticalScrollIndicator={false}
            >
                <View style={styles.mainHeader}>
                    <Text style={styles.mainHeaderText}>Corona Virus</Text>
                </View>

                <View style={styles.aboutContentContainer}>
                    <Image
                        style={{
                            marginVertical: 40,
                            height: 100,
                            width: 100,
                        }}
                        source={require('../../assets/img/v.png')}
                    />
                    <Text style={styles.aboutContent}>
                        Coronaviruses (CoV) are a large family of viruses 
                        that cause illness ranging from the common cold 
                        to more severe diseases such as Middle East 
                        Respiratory Syndrome (MERS-CoV) and Severe Acute 
                        Respiratory Syndrome (SARS-CoV).
                    </Text>
                    <Text style={styles.aboutContent}>
                        Coronavirus disease (COVID-19) is a new strain 
                        that was discovered in 2019 and has not been 
                        previously identified in humans.
                    </Text>
                    <Text style={styles.aboutContent}>
                        Coronaviruses are zoonotic, meaning they are 
                        transmitted between animals and people.  Detailed 
                        investigations found that SARS-CoV was transmitted 
                        from civet cats to humans and MERS-CoV from dromedary 
                        camels to humans. Several known coronaviruses are 
                        circulating in animals that have not yet infected 
                        humans. 
                    </Text>
                    <TouchableOpacity onPress={() => Linking.openURL('https://www.who.int/health-topics/coronavirus') }>
                        <Text 
                            style={{
                                color: 'white',
                                textDecorationLine: 'underline',
                            }}
                        >
                            Click Here to Know More
                        </Text>
                    </TouchableOpacity>
                </View>

                <View style={{
                    flex: 1,
                    padding: 20,
                    paddingHorizontal: 10,
                    backgroundColor: '#112d4e',
                    marginBottom: 20,
                    borderRadius: 5,
                    justifyContent: 'center',
                    alignItems: 'center'
                }}>
                    <Text
                        style={{
                            fontSize: 18,
                            color: "white",
                            textAlign: 'center',
                            fontFamily: '',
                        }}
                    >
                        Support Project
                    </Text>
                    <TouchableOpacity 
                        onPress={() => Linking.openURL('https://github.com/sarthakpranesh/Covid19-ReactNative')}
                    >
                        <Text
                            style={{
                                fontSize: 12,
                                color: 'white',
                                marginVertical: 20,
                                textDecorationLine: 'underline' ,
                                fontFamily: ''
                            }}
                        >
                            Github
                        </Text>
                    </TouchableOpacity>
                    <Text
                        style={{
                            color: 'white',
                            textAlign: 'center',
                            fontFamily: '',
                        }}
                    >
                        Made with Love
                    </Text>
                </View>
            </ScrollView>
        </>
    );
}

const styles = StyleSheet.create({
    safeArea: {
        flex: 1,
        paddingHorizontal: 10,
    },
    mainHeader: {
        flex: 1,
        left: 0,
        right: 0,
        flexDirection: 'column',
        justifyContent: 'center',
        alignContent: 'center',
        paddingVertical: 100,
        paddingBottom: 50,
    },
    mainHeaderText: {
        textAlign: 'center',
        fontSize: 52,
        fontWeight: 'bold',
        color: '#3f72af',
        fontFamily: ''
    }, 
    aboutContentContainer: {
        backgroundColor: '#112d4e',
        marginVertical: 10,
        paddingVertical: 20,
        paddingHorizontal: 10,
        borderRadius: 5,

        flex: 1,
        flexWrap: 'wrap',
        flexDirection: 'row',
        justifyContent: 'center'
    },
    aboutContent: {
        textAlign: 'justify',
        fontSize: 18,
        color: 'white',
        marginVertical: 10,
        fontFamily: ''
    }
})

export default HomeScreen;