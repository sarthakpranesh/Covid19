/* eslint-disable react-hooks/rules-of-hooks */
import {useState, useEffect} from 'react';
import virusTrackerApi from '../apis/virusTrackerApi';

const getGlobalTotal = () => {
  const [results, setResults] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const coronaSearch = async () => {
    try {
      const resp = await virusTrackerApi.get('/free-api?global=stats');
      if (!resp.data.results[0]) {
        console.log('No data retrieved');
        throw new Error();
      }
      setResults({
        confirmed: resp.data.results[0].total_cases,
        deaths: resp.data.results[0].total_deaths,
        recovered: resp.data.results[0].total_recovered,
        newConfirmed: resp.data.results[0].total_new_cases_today,
        totalSerious: resp.data.results[0].total_serious_cases,
        deathsToday: resp.data.results[0].total_new_deaths_today,
      });
      setErrorMessage('');
    } catch (err) {
      setResults({});
      setErrorMessage(err.message);
    }
  };

  useEffect(() => {
    coronaSearch();
  }, []);

  return [coronaSearch, results, errorMessage];
};

export default getGlobalTotal;
