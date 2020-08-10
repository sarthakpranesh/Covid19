/* eslint-disable react-hooks/rules-of-hooks */
import {useState} from 'react';

const getTimelineHook = () => {
  const [results, setResults] = useState([]);
  const [errMessage, setErrorMessage] = useState('');

  const getTimeline = async (country) => {
    fetch(`https://disease.sh/v3/covid-19/historical/${country}?lastdays=all`)
      .then((resp) => resp.json())
      .then((respData) => {
        const dateKeys = Object.keys(respData.timeline.cases);
        const filteredData = dateKeys.map((date) => {
          return {
            date: date,
            difference:
              respData.timeline.cases[date] - respData.timeline.recovered[date],
          };
        });
        setResults(filteredData);
        setErrorMessage('');
      })
      .catch((err) => {
        console.log('From Timeline: ' + err.message);
        setResults([]);
        setErrorMessage(err.message);
      });
  };

  return [getTimeline, results, errMessage];
};

export default getTimelineHook;
