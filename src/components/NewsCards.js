import React, { Component } from 'react';
import {
    View,
    Text,
    Linking,
    Image,
    FlatList,
    TouchableOpacity
} from 'react-native';

// importing component
import Precaution from './PreventionCards';

class PreventionCards extends Component {

    render () {
        const { topHeadlines } = this.props;
        return (
            <>
                <FlatList 
                    data={topHeadlines}
                    keyExtractor={(news) => news.title}
                    renderItem={({item}) => {
                        if (!item.title || !item.description || !item.url) {
                            return;
                        }
                        return (
                            <TouchableOpacity
                                onPress={() => Linking.openURL(item.url)}
                            >
                                <Precaution 
                                    title={item.title}
                                    content={item.description}
                                    src={{ uri: item.image }}
                                />
                            </TouchableOpacity>
                        );
                    }}
                />
            </>
        );
    }
}

export default PreventionCards;