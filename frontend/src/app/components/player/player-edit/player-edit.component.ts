import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Player } from 'src/app/models/player';
import { PlayerService } from 'src/app/services/player.service';
import { ActivatedRoute } from '@angular/router';
import {positions} from "src/app/models/player";

@Component({
  selector: 'app-player-edit',
  templateUrl: './player-edit.component.html',
  styleUrls: ['./player-edit.component.css'],
})
export class PlayerEditComponent implements OnInit {
  editPlayerForm = this.fb.group({
    firstName: [''],
    lastName: [''],
    age: [''],
    position: []
  });

  player: Player;
  positions: string[] = positions;

  playerId: string;

  constructor(
    private fb: FormBuilder,
    private playerService: PlayerService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.playerId = this.route.snapshot.paramMap.get('id');
    this.playerService.getPlayer(this.playerId).subscribe((players) => {
      this.player = players[0];

      this.editPlayerForm.controls['firstName'].setValue(this.player.firstName);
      this.editPlayerForm.controls['lastName'].setValue(this.player.lastName);
      this.editPlayerForm.controls['age'].setValue(this.player.age);
      this.editPlayerForm.controls['position'].setValue(this.player.position);
    });
  }

  editPlayer(): void {
    this.playerService
      .updatePlayer(this.playerId, this.editPlayerForm.value)
      .subscribe();
  }
}
