import React, { useState, useCallback } from 'react'
import {
  View,
  ScrollView,
  RefreshControl,
  ActivityIndicator,
  Text,
  Platform
} from 'react-native'

// importing components
import NewsCards from '../components/NewsCards'

// importing common style
import Styles from '../Styles'

// importing hooks
import getTopHeadlines from '../hooks/getTopHeadlines'

export interface TopHeadlineProps {
  style: any;
  navigation: any;
}

const TopHeadlinesScreen = ({ style, navigation }: TopHeadlineProps) => {
  const [fetchTopHeadlines, topHeadlines, err] = getTopHeadlines()

  // for pull down to refresh
  const [refreshing, setRefresh] = useState(false)
  const onRefresh = useCallback(async () => {
    setRefresh(true)
    await fetchTopHeadlines()
    setRefresh(false)
  }, [fetchTopHeadlines])

  if (err !== false) {
    if (Platform.OS === 'web') {
      alert('Headlines are not supported yet on the Web. Tryout our app to use this feature!')
    }
    navigation.navigate('Home')
  }

  return (
    <View
      style={{
        flex: 1,
        alignItems: 'stretch',
        justifyContent: 'center',
        backgroundColor: 'pink',
        ...style
      }}>
      <ScrollView
        style={Styles.scrollView}
        contentContainerStyle={Styles.scrollViewContentContainer}
        alwaysBounceVertical={true}
        showsVerticalScrollIndicator={false}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }>
        <View style={Styles.mainHeader}>
          <Text style={Styles.mainHeaderText}>Top Headlines</Text>
        </View>

        {topHeadlines.length !== 0 ? (
          <NewsCards topHeadlines={topHeadlines} />
        ) : (
          <ActivityIndicator size="large" color="black" />
        )}
      </ScrollView>
    </View>
  )
}

export default TopHeadlinesScreen
