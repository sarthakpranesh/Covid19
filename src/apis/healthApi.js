import axios from "axios"

export default axios.create({
    baseURL: "https://health-api.com/api/v1/covid-19/",
});