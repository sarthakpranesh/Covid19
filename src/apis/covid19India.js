import axios from 'axios';

export default axios.create({
  baseURL: 'https://api.covid19api.com/total/country/india/status/confirmed',
});
