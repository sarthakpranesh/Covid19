import axios from "axios";

export type GlobalCases = {
  confirmed: number;
  deaths: number;
  recovered: number;
  deathsToday: number;
  newConfirmed: number;
  totalSerious: number;
};

export type CountryCases = GlobalCases;

export type TimelineData = {
  date: string;
  active: number;
  vaccinated: number;
  total: number;
  recovered: number;
  deaths: number;
};

export type CasesTimeline = {
  cases: any;
  deaths: any;
  recovered: any;
};

export const fetchGlobalData: () => Promise<GlobalCases> = () => {
  return new Promise((resolve, reject) => {
    axios
      .get("https://disease.sh/v3/covid-19/all")
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

export const fetchCountryData: (country: string) => Promise<CountryCases> = (
  country
) => {
  return new Promise((resolve, reject) => {
    axios
      .get(`https://disease.sh/v3/covid-19/countries/${country}?strict=true`)
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

// get cases timeline
const getCasesTimeline = (country: string): Promise<CasesTimeline> => {
  return new Promise((resolve, reject) => {
    axios
      .get(`https://disease.sh/v3/covid-19/historical/${country}?lastdays=all`)
      .then((response) => resolve(response.data.timeline))
      .catch((err) => reject(err));
  });
};

// get vaccination timeline
const getVaccinationTimeline = (country: string): Promise<any> => {
  return new Promise((resolve, reject) => {
    axios
      .get(
        `https://disease.sh/v3/covid-19/vaccine/coverage/countries/${country}?lastdays=all`
      )
      .then((response) => resolve(response.data.timeline))
      .catch((err) => reject(err));
  });
};

export const fetchTimelineData: (country: string) => Promise<TimelineData[]> = (
  country
) => {
  return new Promise((resolve, reject) => {
    Promise.all([getCasesTimeline(country), getVaccinationTimeline(country)])
      .then(([casesTimeline, vaccineTimeline]) => {
        const dateKeys = Object.keys(casesTimeline.cases);
        let lastRecovered = 0;
        const filteredData: TimelineData[] = dateKeys.map((date) => {
          // temporary check as total recovery went 0 in latest data
          // remove once APIs are fixed
          lastRecovered =
            lastRecovered > casesTimeline.recovered[date]
              ? lastRecovered
              : casesTimeline.recovered[date];
          const r: TimelineData = {
            date,
            active:
              casesTimeline.cases[date] -
              (lastRecovered + casesTimeline.deaths[date]),
            vaccinated: vaccineTimeline[date] || 0,
            total: casesTimeline.cases[date],
            recovered: lastRecovered,
            deaths: casesTimeline.deaths[date],
          };
          return r;
        });
        console.log(filteredData[filteredData.length - 1]);
        resolve(filteredData);
      })
      .catch((err) => {
        console.log("Disease API error: ", err.message);
        reject(err.message);
      });
  });
};
