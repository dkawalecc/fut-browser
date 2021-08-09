import { Component, OnInit } from '@angular/core';
import { PlayerService } from 'src/app/services/player.service';
import { Player } from '../../../models/player';

@Component({
  selector: 'app-player-list',
  templateUrl: './player-list.component.html',
  styleUrls: ['./player-list.component.css'],
})
export class PlayerListComponent implements OnInit {
  players: Player[];

  constructor(private playerService: PlayerService) {}

  ngOnInit(): void {
    this.playerService
      .getPlayers()
      .subscribe((players) => {
        this.players = players;
      });
  }
}
