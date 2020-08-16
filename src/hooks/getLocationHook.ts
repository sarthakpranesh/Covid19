import { useState } from 'react'

export interface Coords {
  lat: number;
  long: number;
}

const getLocationHook = (): [Function, String] => {
  const [results, setResults] = useState('')

  const getLocation: Function = async (coords: Coords) => {
    // eslint-disable-next-line no-undef
    fetch(
      `https://api.opencagedata.com/geocode/v1/json?q=${coords.lat}+${coords.long}&key=6d17457f0da749acbd1773b04d6ababd`
    )
      .then((resp) => resp.json())
      .then((respData) => {
        if (respData.status.code === 200) {
          return setResults(respData.results[0].components.country)
        }
        setResults('India')
      })
      .catch((err) => {
        console.log('From location fetch: ' + err.message)
        setResults('India')
      })
  }

  return [getLocation, results]
}

export default getLocationHook
