import React, { Component } from 'react'
import { Linking, FlatList, TouchableOpacity } from 'react-native'
import { View as MotiView } from 'moti'

// importing component
import PreventionCards from './PreventionCards'

export interface NewsCardProps {
  topHeadlines: any[];
}

class NewsCards extends Component<NewsCardProps> {
  _renderItem = ({ item, index }: {item: any}) => {
    return (
      <MotiView
        from={{
          translateX: 50,
          opacity: 0
        }}
        animate={{
          translateX: 0,
          opacity: 1
        }}
        transition={{
          type: 'timing',
          duration: 200,
          delay: 200 * index
        }}
      >
        <TouchableOpacity onPress={() => {
          console.log('item.url')
          Linking.openURL(item.url)
        }}>
          <PreventionCards
            title={item.title}
            content={item.description}
            src={{ uri: item.urlToImage }}
          />
        </TouchableOpacity>
      </MotiView>
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
