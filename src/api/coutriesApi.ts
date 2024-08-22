import axios from "axios";
const api_url = "https://restcountries.com/v3.1";

const api = axios.create({
  baseURL: `${api_url}`,
});

export default api;
