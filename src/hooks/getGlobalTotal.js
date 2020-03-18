import { useState, useEffect } from 'react';
import healthApi from '../apis/healthApi';

const getHealthStats = ()=>{
    const [results, setResults] = useState('');
    const [errorMessage, setErrorMessage] = useState(false);

    const coronaSearch = async ()=>{
        try {
            const resp = await healthApi.get('total');
            if(resp.data.error){
                throw new Error();
            }
            setResults(resp.data);
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