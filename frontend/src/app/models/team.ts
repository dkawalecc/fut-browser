import {TeamAvgStats} from "./team-avg-stats"
import {Player} from "./player";
import {User} from "./user";

export interface Team {
  _id: string;
  name: string;
  owner: User;
  players: Player[];
  avgStats: TeamAvgStats;
}
