import axios from "axios";

export interface GlobalCases {
  confirmed: number;
  deaths: number;
  recovered: number;
  deathsToday: number;
  newConfirmed: number;
  totalSerious: number;
}

export const fetchGlobalData: () => Promise<GlobalCases> = () => {
  return new Promise((resolve, reject) => {
    axios
      .get("https://corona.lmao.ninja/v2/all")
      .then((response) => {
        if (response.data.cases) {
          const results: GlobalCases = {
            confirmed: response.data.cases,
            deaths: response.data.deaths,
            recovered: response.data.recovered,
            deathsToday: response.data.todayDeaths,
            newConfirmed: response.data.todayCases,
            totalSerious: response.data.critical,
          };
          return resolve(results);
        }
        reject(new Error("Ninja API returned no data"));
      })
      .catch((err) => {
        console.log("Ninja API error (Global): ", err.message);
        reject(err.message);
      });
  });
};

export interface CountryCases extends GlobalCases {}

export const fetchCountryData: (country: string) => Promise<CountryCases> = (
  country
) => {
  return new Promise((resolve, reject) => {
    axios
      .get(
        `https://corona.lmao.ninja/v2/countries/${country}?today&strict&query%20`
      )
      .then((response) => {
        if (response.data.cases) {
          const results: CountryCases = {
            confirmed: response.data.cases,
            deaths: response.data.deaths,
            recovered: response.data.recovered,
            deathsToday: response.data.todayDeaths,
            newConfirmed: response.data.todayCases,
            totalSerious: response.data.critical,
          };
          return resolve(results);
        }
        reject(new Error("Ninja API returned no data!"));
      })
      .catch((err) => {
        console.log("Ninja API error (Country): ", err.message);
        reject(err.message);
      });
  });
};
