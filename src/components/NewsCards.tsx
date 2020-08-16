import React, {Component} from 'react';
import {Linking, FlatList, TouchableWithoutFeedback} from 'react-native';

// importing component
import Precaution from './PreventionCards';

import {News} from '../hooks/getTopHeadlines';

export interface NewsCardProps {
  topHeadlines: News[];
}

class NewsCards extends Component<NewsCardProps> {
  _renderItem = ({item}: {item: News}) => {
    if (!item.title || !item.description || !item.url) {
      return;
    }
    return (
      <TouchableWithoutFeedback onPress={() => Linking.openURL(item.url)}>
        <Precaution
          title={item.title}
          content={item.description}
          src={{uri: item.image}}
        />
      </TouchableWithoutFeedback>
    );
  };

  render() {
    const {topHeadlines} = this.props;
    return (
      <FlatList
        data={topHeadlines}
        keyExtractor={(news) => news.title}
        renderItem={this._renderItem}
      />
    );
  }
}

export default NewsCards;
