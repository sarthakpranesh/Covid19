import React, { Component } from 'react'
import { Linking, FlatList, TouchableNativeFeedback } from 'react-native'

// importing component
import PreventionCards from './PreventionCards'

export interface NewsCardProps {
  topHeadlines: any[];
}

class NewsCards extends Component<NewsCardProps> {
  _renderItem = ({ item }: {item: any}) => {
    if (!item.title || !item.description || !item.url) {
      return null
    }
    return (
      <TouchableNativeFeedback onPress={() => {
        console.log('item.url')
        Linking.openURL(item.url)
      }}>
        <PreventionCards
          title={item.title}
          content={item.description}
          src={{ uri: item.urlToImage }}
        />
      </TouchableNativeFeedback>
    )
  };

  render () {
    const { topHeadlines } = this.props
    return (
      <FlatList
        data={topHeadlines}
        keyExtractor={(news) => news.title}
        renderItem={this._renderItem}
      />
    )
  }
}

export default NewsCards
