import axios from "axios";

const api = axios.create({
  baseURL: "https://dedteapi.adaptable.app/api",
  //baseURL: "http://localhost:3000/api",
  headers: {
    Accept: "application/json",
    "Content-Type": "application/json",
  },
});

export const convertToJSONString = (obj) => {
  return JSON.stringify(obj);
};

export default api;
