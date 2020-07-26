/* eslint-disable react-hooks/rules-of-hooks */
import React, {useState, useEffect} from 'react';

const getTopHeadlines = () => {
  const [results, setResults] = useState('');
  const [isErr, setIsError] = useState(false);

  const fetchTopHeadlines = async () => {
    fetch('https://some-news-api.herokuapp.com')
      .then((resp) => resp.json())
      .then((respData) => {
        if (respData === undefined) {
          throw new Error('No data received');
        }
        const arrayOfNews = respData.map((news) => {
          const result = {
            author: news.author,
            title: news.title,
            description: news.description,
            name: news.source.name,
            url: news.url,
            image: news.urlToImage,
          };
          return result;
        });
        setResults(arrayOfNews);
        setIsError(false);
      })
      .catch((err) => {
        console.log('From news api: ' + err.message);
        setIsError(true);
      });
  };

  useEffect(() => {
    fetchTopHeadlines();
  }, []);

  return [fetchTopHeadlines, results, isErr];
};

export default getTopHeadlines;
