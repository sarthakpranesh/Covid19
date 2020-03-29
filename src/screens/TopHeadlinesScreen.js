import React, { useState, useCallback } from 'react';
import {
    View,
    Text,
    ScrollView,
    StatusBar,
    RefreshControl
} from 'react-native';

// importing components
import Drawer from '../components/Drawer';
import NewsCards from '../components/NewsCards';

// importing common style
import Styles from '../Styles';

// importing hooks
import getTopHeadlines from '../hooks/getTopHeadlines';

const TopHeadlinesScreen = (props) => {
    const navigate = props.navigate
    const [fetchTopHeadlines, topHeadlines, err] = getTopHeadlines();

    // for pull down to refresh
    const [refreshing, setRefresh] = useState(false);
    const onRefresh = useCallback(async () => {
        setRefresh(true);
        await fetchTopHeadlines();
        setRefresh(false);
    }, [refreshing]);

    return (
        <>
            <StatusBar backgroundColor='blue' barStyle='dark-content' hidden={true}/>
            <Drawer
                navigate={navigate}
                title=' Top Headlines '
            />
            <ScrollView
                style={Styles.safeArea}
                alwaysBounceVertical={true}
                showsVerticalScrollIndicator={false}
                refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
            >
                <View style={Styles.mainHeader}>
                    <Text style={Styles.mainHeaderText}>Top Headlines</Text>
                </View>

                {
                    topHeadlines
                    ?
                    <NewsCards 
                        topHeadlines={topHeadlines}
                    />
                    :
                    null
                }
            </ScrollView>
        </>
    );
}

export default TopHeadlinesScreen;