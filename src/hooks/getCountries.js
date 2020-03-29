import { useState, useEffect } from 'react';

import virusTrackerApi from '../apis/virusTrackerApi';
import arraySort from 'array-sort';

const getCountries = () => {
    const [results, setResults] = useState([]);
    const [isError, setError] = useState(false);

    const getCountryWiseData = async () => {
        try {
            const resp = await virusTrackerApi.get('/free-api?countryTimeline=IN');
            if ( resp.data.timelineitems === undefined || null ) {
                throw new Error();
            }
            const arrayObjectKeys = Object.keys(resp.data.timelineitems[0]);
            var total_cases = [], total_deaths = [], total_recoveries = [];
            arrayObjectKeys.slice(arrayObjectKeys, arrayObjectKeys.length - 2).forEach((date) => {

                total_cases.push({
                    x: date,
                    y: resp.data.timelineitems[0][date].total_cases
                })
                total_deaths.push({
                    x: date,
                    y: resp.data.timelineitems[0][date].total_deaths
                })
                total_recoveries.push({
                    x: date,
                    y: resp.data.timelineitems[0][date].total_recoveries
                })
            })
            setResults([
                {
                    seriesName: 'Total Cases',
                    data: total_cases.reverse(),
                    color: 'yellow'
                },
                {
                    seriesName: 'Total Deaths',
                    data: total_deaths.reverse(),
                    color: 'red'
                },{
                    seriesName: 'Total Recoveries',
                    data: total_recoveries.reverse(),
                    color: 'green'
                }
            ]);
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