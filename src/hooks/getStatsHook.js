/* eslint-disable react-hooks/rules-of-hooks */
import {useState} from 'react';

const getStatsHook = () => {
  const [results, setResults] = useState({});
  const [errMessage, setErrorMessage] = useState('');

  const getStats = async (country) => {
    fetch(
      `https://corona.lmao.ninja/v2/countries/${country}?today&strict&query%20`,
    )
      .then((resp) => resp.json())
      .then((respData) => {
        if (!respData.cases) {
          console.log('No Data received');
          throw new Error();
        }
        setResults({
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
        setResults({});
        setErrorMessage(err.message);
      });
  };

  return [getStats, results, errMessage];
};

export default getStatsHook;
