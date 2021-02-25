/* eslint-disable no-undef */
export interface Coords {
    lat: number;
    long: number;
}

const getCountry: Function = async (coords: Coords) => {
  try {
    const respJson = await fetch(
      `https://api.opencagedata.com/geocode/v1/json?q=${coords.lat}+${coords.long}&key=6d17457f0da749acbd1773b04d6ababd`
    )
    const respData = await respJson.json()
    console.log(respData)
    if (respData.status.code === 200) {
      return respData.results[0].components.country
    }
    return 'India'
  } catch (err) {
    console.log('From getCountry fetch: ' + err.message)
    return 'India'
  }
}

export default getCountry
