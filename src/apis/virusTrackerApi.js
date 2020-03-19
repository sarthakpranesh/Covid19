import axios from 'axios';

export default axios.create({
    baseURL: 'https://thevirustracker.com/free-api?countryTimeline=US'
})