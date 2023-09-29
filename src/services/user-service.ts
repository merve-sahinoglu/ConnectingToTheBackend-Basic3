import apiClient, { CanceledError, AxiosError } from "./services/api-client";

export interface User {
  id: number;
  name: string;
}

class UserService {
  getAllUsers() {
    const conttoller = new AbortController();

    const request = apiClient.get<User[]>("/users", {
      signal: conttoller.signal,
    });
    return { request, cancel: () => conttoller.abort() };
  }
  deleteUser = (id: number) => {
    return apiClient.delete("/users/" + id);
  };

  addUser = (user: User) => {
    return apiClient.post("/users", user);
  };

  updateUser = (user: User) => {
    return apiClient.put(
      "https://jsonplaceholder.typicode.com/users/" + user.id,
      user
    );
  };
}

export default new UserService();
export { CanceledError };
