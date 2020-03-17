import axios from "axios";

const instance = axios.create({
  baseURL: "https://api.untappd.com/v4"
});

instance.interceptors.request.use(
  config => {
    config.params = config.params || {};
    config.params["client_id"] = process.env.VUE_APP_UNTAPPD_CLIENT_ID;
    config.params["client_secret"] = process.env.VUE_APP_UNTAPPD_CLIENT_SECRET;
    return config;
  },
  error => {
    return Promise.reject(error);
  }
);

instance.interceptors.response.use(
  response => response,
  error => {
    if (error.response.status === 500) {
      alert("Ops! Something went wrong... Please reload and try again.");
    }

    if (error.response.status === 400) {
      alert("Ops! Something went wrong... Please reload and try again.");
    }

    console.log(error.response.status, error.response.statusText);
    return Promise.reject(error);
  }
);

export default instance;
