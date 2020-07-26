/* eslint-disable react-hooks/rules-of-hooks */
import {useState, useEffect} from 'react';

const getIndianTimeline = () => {
  const [indianTimeline, setIndianTimeline] = useState([]);
  const [errMessage, setErrorMesssage] = useState('');

  const fetchIndianTimeline = async () => {
    fetch('https://api.covid19india.org/data.json')
      .then((resp) => resp.json())
      .then((respData) => {
        const filteredData = respData.cases_time_series.map((data) => {
          return {
            date: data.date,
            difference: data.totalconfirmed - data.totalrecovered,
          };
        });
        setIndianTimeline(filteredData);
        setErrorMesssage('');
      })
      .catch((err) => {
        console.log('From Timeline: ' + err.message);
        setIndianTimeline([]);
        setErrorMesssage(err.message);
      });
  };

  useEffect(() => {
    fetchIndianTimeline();
  }, []);

  return [fetchIndianTimeline, indianTimeline, errMessage];
};

export default getIndianTimeline;
