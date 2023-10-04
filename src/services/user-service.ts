import create from "./hhtp.service";

export interface User {
  id: number;
  name: string;
}

export default create("/users");
