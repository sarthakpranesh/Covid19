import { useState, useEffect } from 'react';

import virusTrackerApi from  '../apis/virusTrackerApi';

const getFullTimeLine = () => {
    const [results, setResults] = useState('');
    const [isError, setError] = useState(false);

    const getTimeline = async () => {
        try {
            const resp = await virusTrackerApi.get();
            const unsortedData = resp.data.timelineitems[0];
            if (unsortedData === undefined) {
                console.log("No Data received");
                throw new Error();
            }
            const unsortedDataKeys = Object.keys(unsortedData);
            const sortedData = unsortedDataKeys.map((key) => {
                if (key === "stat"){
                    return false;
                }
                return { date: key, total: unsortedData[key].total_cases };
            })
            setResults(sortedData.slice(0, sortedData.length - 2))
        } catch (err) {
            console.log(err);
            setError(true);
        }
    }

    useEffect(() => {
        getTimeline();
    }, [] );

    return [getTimeline, results, isError];
}

export default getFullTimeLine;