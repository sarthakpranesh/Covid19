import fetch from 'node-fetch'

export type TimelineData = {
  date: String,
  active: Number,
  vaccinated: Number,
  total: Number,
  recovered: Number,
  deaths: Number,
}

export type CasesTimeline = {
  cases: any;
  deaths: any;
  recovered: any;
}

// get cases timeline
const getCasesTimeline = (country: String): Promise<CasesTimeline> => {
  return new Promise((resolve, reject) => {
    fetch(`https://disease.sh/v3/covid-19/historical/${country}?lastdays=all`)
      .then((resp) => resp.json())
      .then((data) => resolve(data.timeline))
      .catch((err) => reject(err))
  })
}

// get vaccination timeline
const getVaccinationTimeline = (country: String): Promise<any> => {
  return new Promise((resolve, reject) => {
    fetch(`https://disease.sh/v3/covid-19/vaccine/coverage/countries/${country}?lastdays=all`)
      .then((resp) => resp.json())
      .then((data) => resolve(data.timeline))
      .catch((err) => reject(err))
  })
}

export const fetchTimelineData: (country: String) => Promise<TimelineData[]> = (country) => {
  return new Promise((resolve, reject) => {
    Promise.all([
      getCasesTimeline(country),
      getVaccinationTimeline(country)
    ])
      .then(([casesTimeline, vaccineTimeline]) => {
        const dateKeys = Object.keys(casesTimeline.cases)
        let lastRecovered = 0
        const filteredData: TimelineData[] = dateKeys.map((date) => {
          // temporary check as total recovery went 0 in latest data
          // remove once APIs are fixed
          lastRecovered = lastRecovered > casesTimeline.recovered[date] ? lastRecovered : casesTimeline.recovered[date]
          const r: TimelineData = {
            date: date,
            active:
              casesTimeline.cases[date] - (lastRecovered + casesTimeline.deaths[date]),
            vaccinated: vaccineTimeline[date] || 0,
            total: casesTimeline.cases[date],
            recovered: lastRecovered,
            deaths: casesTimeline.deaths[date]
          }
          return r
        })
        console.log(filteredData[filteredData.length - 1])
        resolve(filteredData)
      })
      .catch((err) => {
        console.log('Disease API error: ', err.message)
        reject(err.message)
      })
  })
}
