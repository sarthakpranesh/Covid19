import { useState, useEffect } from 'react';
import healthApi from '../apis/healthApi';
import arraySort from 'array-sort';

const getCountries = () => {
    const [results, setResults] = useState('');
    const [isError, setError] = useState(false);

    const getCountryWiseData = async () => {
        try {
            const resp = await healthApi.get('countries');
            if ( resp.data.error ) {
                throw new Error();
            }
            const filteredResults = resp.data.filter((ele) => {
                return ele.confirmed !== 0;
            })
            const sortedResults = arraySort(filteredResults, 'confirmed').reverse();
            setResults(sortedResults.slice(0, 10));
        } catch (error) {
            console.log(error);
            setError(true)
        }
    }

    useEffect( ()=>{
        getCountryWiseData();
    }, [] );

    return [getCountryWiseData, results, isError];
}

export default getCountries;