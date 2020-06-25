/* eslint-disable react-hooks/rules-of-hooks */
import React, {useState, useEffect} from 'react';

// importing api
import covid19India from '../apis/covid19India.js';

const getIndianTimeline = () => {
  const [indianTimeline, setIndianTimeline] = useState([]);
  const [errMessage, setErrorMesssage] = useState('');

  const fetchIndianTimeline = async () => {
    try {
      const r = await covid19India.get();
      const filteredData = r.data.map((data) => {
        return {
          date: data.Date,
          cases: data.Cases,
        };
      });
      setIndianTimeline(filteredData);
      setErrorMesssage('');
    } catch (e) {
      setIndianTimeline([]);
      setErrorMesssage(e.message);
    }
  };

  useEffect(() => {
    fetchIndianTimeline();
  }, []);

  return [fetchIndianTimeline, indianTimeline, errMessage];
};

export default getIndianTimeline;
