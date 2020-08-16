/* eslint-disable react-native/no-inline-styles */
import React, {useState, useCallback} from 'react';
import {
  View,
  ScrollView,
  RefreshControl,
  ActivityIndicator,
} from 'react-native';
import {Headline} from 'react-native-paper';

// importing components
import NewsCards from '../components/NewsCards';

// importing common style
import Styles from '../Styles';

// importing hooks
import getTopHeadlines from '../hooks/getTopHeadlines';

export interface TopHeadlineProps {
  style: any;
  navigation: any;
}

const TopHeadlinesScreen = ({style, navigation}: TopHeadlineProps) => {
  const [fetchTopHeadlines, topHeadlines, err] = getTopHeadlines();

  // for pull down to refresh
  const [refreshing, setRefresh] = useState(false);
  const onRefresh = useCallback(async () => {
    setRefresh(true);
    await fetchTopHeadlines();
    setRefresh(false);
  }, [fetchTopHeadlines]);

  if (err !== false) {
    navigation.navigate.goBack();
  }

  return (
    <View
      style={{
        flex: 1,
        alignItems: 'stretch',
        justifyContent: 'center',
        backgroundColor: 'pink',
        ...style,
      }}>
      <ScrollView
        style={Styles.safeArea}
        alwaysBounceVertical={true}
        showsVerticalScrollIndicator={false}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }>
        <View style={Styles.mainHeader}>
          <Headline style={Styles.mainHeaderText}>Top Headlines</Headline>
        </View>

        {topHeadlines ? (
          <NewsCards topHeadlines={topHeadlines} />
        ) : (
          <ActivityIndicator size="large" color="black" />
        )}
      </ScrollView>
    </View>
  );
};

export default TopHeadlinesScreen;
