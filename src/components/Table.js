import React, { Component } from 'react';
import {
    View,
    Text,
    StyleSheet,
} from "react-native";
import { FlatList, TouchableOpacity } from "react-native-gesture-handler";
import { Col, Row, Grid} from 'react-native-easy-grid';

class Table extends Component {
    constructor(props) {
        super(props)
    }

    componentDidMount() {
        this.interval = setInterval( () => {
            this.props.getCountryWiseData();
            console.log("@@@@@@@@@@@ Updated @@@@@@@@@@");
        }, 5*60000);
    }

    componentWillUnmount() {
        clearInterval(this.interval);
    }
    
    render () {
        const countryWiseData = this.props.data;
        return (
            <View>
                {
                    countryWiseData
                    ?
                    <View style={styles.subContainer}>
                        <FlatList
                            ListHeaderComponent={() => {
                                return <Text style={styles.subHeading}>Top Affected Countries: </Text>
                            }}
                            data={countryWiseData}
                            keyExtractor={ ele => ele.country }
                            renderItem={({ item }) => {
                                return (
                                <TouchableOpacity style={styles.listItem}>
                                    <Grid>
                                        <Row>
                                            <Col><Text>{item.country.toUpperCase()}</Text></Col>
                                            <Col><Text style={[{ textAlign: 'right' }]}>{item.confirmed}</Text></Col>
                                            <Col><Text style={[{ textAlign: 'right' }]}>{item.deaths}</Text></Col>
                                            <Col><Text style={[{ textAlign: 'right' }]}>{item.recovered}</Text></Col>
                                        </Row>
                                    </Grid>
                                </TouchableOpacity>
                                );
                            }}
                        />
                    </View>
                    :
                    null
                }
            </View>
        );
    }
}

const styles = StyleSheet.create({
    listItem: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-evenly',
        alignItems: 'center',
        alignContent: 'center',
        paddingVertical: 5,
        paddingHorizontal: 5,
    },
    subContainer: {
        flex: 1,
    },
    subHeading: {
        fontSize: 22,
        color: '#112d4e',
        fontWeight: 'bold',
    },
});

export default Table;