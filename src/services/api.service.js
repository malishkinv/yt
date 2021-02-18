import axios from "axios";
import router from "@/router";

const ApiService = {
  init(baseURL) {
    axios.defaults.baseURL = baseURL;
  },

  get(resource, data) {
    return axios.request({ url: resource, params: data });
  },

  post(resource, data) {
    return axios.post(resource, data);
  },

  put(resource, data) {
    return axios.put(resource, data);
  },

  delete(resource) {
    return axios.delete(resource);
  },

  mountErrorsInterceptor() {
    axios.interceptors.response.use(res => {
      return res;
    }, error => {

      let respCode = error.response && error.response.status || error.code;

      if (respCode === 404) {
        router.push({ path: "/404" });
      }

      if (respCode === 500) {
        router.push({ path: "/500"});
      }

      return Promise.reject(error);
    });
  }
};

export default ApiService;