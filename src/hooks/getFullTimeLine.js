import { useState, useEffect } from 'react';

import virusTrackerApi from  '../apis/virusTrackerApi';

const getFullTimeLine = () => {
    const [results, setResults] = useState('');
    const [isError, setError] = useState(false);

    const getTimeline = async () => {
        try {
            const resp = await virusTrackerApi.get();
            if (!resp.data.timelineitems) {
                console.log("No Data received");
                throw new Error();
            }
            const unsortedData = resp.data.timelineitems[0];
            const unsortedDataKeys = Object.keys(unsortedData);
            const sortedData = unsortedDataKeys.map((key) => {
                if (key === "stat"){
                    return false;
                }
                return unsortedData[key].total_cases;
            })
            setResults({
                labels: unsortedDataKeys.slice(0, unsortedDataKeys.length -2),
                totals: sortedData.slice(0, sortedData.length - 2)
            })
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