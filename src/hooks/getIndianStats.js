/* eslint-disable react-hooks/rules-of-hooks */
import {useState, useEffect} from 'react';

const getIndianStats = () => {
  const [indianResults, setIndianResults] = useState('');
  const [errMessage, setErrorMessage] = useState('');

  const getStats = async () => {
    fetch('https://corona.lmao.ninja/v2/countries/India?today&strict&query%20')
      .then((resp) => resp.json())
      .then((respData) => {
        if (!respData.cases) {
          console.log('No Data received');
          throw new Error();
        }
        setIndianResults({
          confirmed: respData.cases,
          deaths: respData.deaths,
          recovered: respData.recovered,
          deathsToday: respData.todayDeaths,
          newConfirmed: respData.todayCases,
          totalSerious: respData.critical,
        });
        setErrorMessage('');
      })
      .catch((err) => {
        console.log(err.message);
        setIndianResults({});
        setErrorMessage(err.message);
      });
  };

  useEffect(() => {
    getStats();
  }, []);

  return [getStats, indianResults, errMessage];
};

export default getIndianStats;
