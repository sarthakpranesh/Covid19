import { useState, useEffect } from 'react';
import healthApi from '../apis/healthApi';
import virusTrackerApi from '../apis/virusTrackerApi';

const getHealthStats = ()=>{
    const [results, setResults] = useState('');
    const [errorMessage, setErrorMessage] = useState(false);

    const coronaSearch = async ()=>{
        try {
            const resp = await virusTrackerApi.get('/free-api?global=stats');
            if(!resp.data.results){
                console.log("No data retrieved");
                throw new Error();
            }
            setResults({
                total_confirmed: resp.data.results[0].total_cases,
                total_deaths: resp.data.results[0].total_deaths,
                total_recovered: resp.data.results[0].total_recovered,
            });
        } catch (err) {
            setErrorMessage(true);
        }
    };

    useEffect( ()=>{
        coronaSearch();
    }, [] );

    return [coronaSearch, results, errorMessage];
};

export default getHealthStats;