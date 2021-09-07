import { fetchTimelineData, TimelineData } from "../DiseaseApi";
import {
  fetchGlobalData,
  fetchCountryData,
  GlobalCases,
  CountryCases,
} from "../NinjaApi";

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
