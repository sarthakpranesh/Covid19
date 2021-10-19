import {
  fetchTimelineData,
  TimelineData,
  fetchGlobalData,
  fetchCountryData,
  GlobalCases,
  CountryCases,
} from "../Disease";

export type HomeScreenData = {
  global: GlobalCases;
  country: CountryCases;
  timeline: TimelineData[];
};

const getCovidData = (country: string) => {
  return new Promise((resolve, reject) => {
    Promise.all([
      fetchGlobalData(),
      fetchCountryData(country),
      fetchTimelineData(country),
    ])
      .then(([gd, cd, tl]) => {
        const rs: HomeScreenData = {
          global: gd,
          country: cd,
          timeline: tl,
        };
        resolve(rs);
      })
      .catch((err) => {
        console.log("Error in getCovidData:", err.message);
        reject(err);
      });
  });
};

export default getCovidData;
