import { useState, useEffect } from 'react';

import covid19India from '../apis/covid19India';

const getCountries = () => {
    const [results, setResults] = useState([]);
    const [isError, setError] = useState(false);

    const getCountryWiseData = async () => {
        try {
            const resp = await covid19India.get('data.json');
            if ( resp.data.cases_time_series === undefined || null ) {
                throw new Error();
            }
            var total_cases = [], total_deaths = [], total_recoveries = [];
            var months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'October', 'September', 'November', 'December']
            const regDate = new RegExp(`[0-9]{2}`, 'g');
            const regMonth = new RegExp(`[a-zA-Z]+`, 'g');
            resp.data.cases_time_series.slice( 0, resp.data.cases_time_series.length).forEach((date) => {
                var d = date.date;
                d = `${ months.findIndex((ele) => ele === d.match(regMonth)[0]) + 1 }/${ d.match(regDate) }/${ Math.floor(new Date().getFullYear()/100) }`
                // total_cases.push({
                //     x: d,
                //     y: date.totalconfirmed
                // })
                // total_deaths.push({
                //     x: d,
                //     y: date.totaldeceased
                // })
                // total_recoveries.push({
                //     x: d,
                //     y: date.totalrecovered
                // })
                total_cases.push(Number(date.totalconfirmed))
                total_deaths.push(Number(date.totaldeceased))
                total_recoveries.push(Number(date.totalrecovered))
            })
            setResults(total_cases);
            // setResults([
            //     {
            //         seriesName: 'Total Cases',
            //         data: total_cases.reverse(),
            //         color: 'yellow'
            //     },
            //     {
            //         seriesName: 'Total Deaths',
            //         data: total_deaths.reverse(),
            //         color: 'red'
            //     },{
            //         seriesName: 'Total Recoveries',
            //         data: total_recoveries.reverse(),
            //         color: 'green'
            //     }
            // ]);
        } catch (error) {
            console.log(error);
            setError(true)
        }
    }

    useEffect(() => {
        getCountryWiseData();
    }, [] );

    return [getCountryWiseData, results, isError];
}

export default getCountries;