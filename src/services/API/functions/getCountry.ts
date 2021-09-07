import axios from "axios";

export interface Coords {
  lat: number;
  long: number;
}

const getCountry: Function = async (coords: Coords) => {
  try {
    const response = await axios.get(
      `https://api.opencagedata.com/geocode/v1/json?q=${coords.lat}+${coords.long}&key=6d17457f0da749acbd1773b04d6ababd`
    );
    console.log(response.data);
    if (response.status === 200) {
      return response.data.results[0].components.country;
    }
    return "India";
  } catch (err: any) {
    console.log("From getCountry fetch: " + err.message);
    return "India";
  }
};

export default getCountry;
