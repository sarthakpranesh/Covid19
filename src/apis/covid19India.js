import axios from 'axios';

export default axios.create({
  baseURL: 'https://api.covid19india.org/',
});
