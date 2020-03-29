import React, { useState, useEffect } from 'react';

// importing API
import newsApi from '../apis/newApi';
import arraySort from 'array-sort';

const getTopHeadlines = () => {
    const [results, setResults] = useState('');
    const [isErr, setIsError] = useState(false);

    const fetchTopHeadlines = async () => {
        try {
            const r = await newsApi.get('/articles');
            if (r.data == undefined) {
                throw new Error("No data received")
            }
            const arrayOfNews = r.data.map((news) => {
                const result = {
                    author: news.author,
                    title: news.title,
                    description: news.description,
                    name: news.source.name,
                    url: news.url,
                    image: news.urlToImage
                }
                return result
            })
            setResults(arrayOfNews)
        } catch (err) {
            console.log(err);
            setIsError(true);
        }
    }

    useEffect(() => {
        fetchTopHeadlines();
    }, [] )

    return [fetchTopHeadlines, results, isErr];
}

export default getTopHeadlines;