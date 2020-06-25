/* eslint-disable react-hooks/rules-of-hooks */
import {useState, useEffect} from 'react';

import virusTrackerApi from '../apis/virusTrackerApi';

const getIndianStats = () => {
  const [indianResults, setIndianResults] = useState('');
  const [errMessage, setErrorMessage] = useState('');

  const getStats = async () => {
    try {
      const resp = await virusTrackerApi.get('/free-api?countryTotal=IN');
      if (!resp.data.countrydata) {
        console.log('No Data received');
        throw new Error();
      }
      setIndianResults({
        confirmed: resp.data.countrydata[0].total_cases,
        deaths: resp.data.countrydata[0].total_deaths,
        recovered: resp.data.countrydata[0].total_recovered,
        deathsToday: resp.data.countrydata[0].total_new_deaths_today,
        newConfirmed: resp.data.countrydata[0].total_new_cases_today,
        totalSerious: resp.data.countrydata[0].total_serious_cases,
      });
      setErrorMessage('');
    } catch (err) {
      setIndianResults({});
      setErrorMessage(err.message);
    }
  };

  useEffect(() => {
    getStats();
  }, []);

  return [getStats, indianResults, errMessage];
};

export default getIndianStats;
