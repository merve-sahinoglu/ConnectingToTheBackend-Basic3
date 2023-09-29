import axios, { AxiosError, CanceledError } from "axios";

export default axios.create({
  baseURL: "https://jsonplaceholder.typicode.com/users",
  //   headers:{
  //     'api-key':""
  //   }
});

export { CanceledError };

export { AxiosError };
