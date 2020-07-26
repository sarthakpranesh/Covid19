/* eslint-disable react-hooks/rules-of-hooks */
import React, {useState, useEffect} from 'react';

const getIndianTimeline = () => {
  const [indianTimeline, setIndianTimeline] = useState([]);
  const [errMessage, setErrorMesssage] = useState('');

  const fetchIndianTimeline = async () => {
    fetch('https://api.covid19api.com/total/country/india/status/confirmed')
      .then((resp) => resp.json())
      .then((respData) => {
        const filteredData = respData.map((data) => {
          return {
            date: data.Date,
            cases: data.Cases,
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
