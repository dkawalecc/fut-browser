import { Component, OnInit } from '@angular/core';
import { TeamService } from 'src/app/services/team.service';
import { Team } from '../../../models/team';

@Component({
  selector: 'app-teams-list',
  templateUrl: './teams-list.component.html',
  styleUrls: ['./teams-list.component.css']
})
export class TeamsListComponent implements OnInit {
  teams: Team[];

  constructor(private teamService: TeamService) { }

  ngOnInit(): void {
    this.teamService
      .getTeams()
      .subscribe((teams) => {
        this.teams = teams;
      });
  };

  getOverallStats(team: Team): number {
    let overall = team.avgStats.pace.overall 
    + team.avgStats.pace.overall
    + team.avgStats.shooting.overall
    + team.avgStats.passing.overall
    + team.avgStats.dribbling.overall
    + team.avgStats.defending.overall
    + team.avgStats.physical.overall;

    overall /= 6;
    
    return Math.floor(overall);
  }

}
