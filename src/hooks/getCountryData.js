import { useState, useEffect } from 'react';

import healthApi from '../apis/healthApi';

const getCountryData = () => {
    const [results, setResults] = useState('');
    const [isError, setError] = useState('');

    const getCountry = async () => {
        try {
            const resp = await healthApi.get('in');
            if (resp.data === undefined) {
                console.log("No data Received");
                throw new Error();
            }
            setResults(resp.data)
        } catch ( err ) {
            console.log(err);
            setError(true);
        }
    }

    useEffect( () => {
        getCountry();
    },  [] );

    return [getCountry, results, isError];
}

export default getCountryData;