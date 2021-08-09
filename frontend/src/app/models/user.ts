import {Team} from "./team";

export interface User {
  _id: string;
  name: string;
  email: string;
  hasAvatar: boolean;
  teams: Team[];
}
