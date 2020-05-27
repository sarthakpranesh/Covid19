import axios from 'axios';

export default axios.create({
  baseURL: 'https://some-news-api.herokuapp.com',
});
