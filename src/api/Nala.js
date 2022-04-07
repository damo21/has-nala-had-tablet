import axios from "axios";

const productionDomain = "https://nala-backend-tablet.herokuapp.com";

const developmentDomain = "http://localhost:3333";

const environment =  "production"; // production | development

const backendDomain = environment === "development" ? developmentDomain : productionDomain;

const AxiosInstance = () => {
  let url = backendDomain;

  url += "/api/v1"

  console.log("====================================");
  console.log(`USING BACKEND URL: ${url}`);
  console.log("====================================");
  const instance = axios.create({
    baseURL: url,
    timeout: 10000,
  });

  delete instance.defaults.headers.common["Accept"];

  return instance;
};

export default AxiosInstance();