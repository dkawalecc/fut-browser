import { Component, OnInit } from '@angular/core';
import {TeamService} from "../../../services/team.service";
import {Team} from "../../../models/team";
import {ActivatedRoute} from "@angular/router";
import {Player} from "../../../models/player";
import {AuthService} from "../../../services/auth.service";
import {FormControl} from "@angular/forms";

@Component({
  selector: 'app-team-item',
  templateUrl: './team-item.component.html',
  styleUrls: ['./team-item.component.css']
})
export class TeamItemComponent implements OnInit {
  team: Team;
  teamId: string;
  selectedPlayer: Player = undefined;
  showPlayerList: boolean = false;
  addPlayerId = new FormControl('');

  constructor(private teamService: TeamService, private route: ActivatedRoute,
              private authService: AuthService) { }

  ngOnInit(): void {
    console.log(this.route.snapshot.paramMap.get('id'));
    this.teamId = this.route.snapshot.paramMap.get('id');

    this.teamService.getTeam(this.teamId).subscribe(team => {
      this.team = team[0];
    });
  }

  playerSelected(player: Player): void {
    this.selectedPlayer = player;
  }

  isOwner(): boolean {
    return this.team.owner._id === this.authService.isLoggedIn;
  }

  addPlayer(): void {
    if (this.addPlayerId.value.length > 0) {
      this.teamService.addPlayerToTeam(this.teamId, this.addPlayerId.value).subscribe();
    }
  }
}
