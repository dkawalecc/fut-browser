import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { PlayerService } from 'src/app/services/player.service';
import {
  Player,
  countries,
  positions,
  workRates,
} from '../../../models/player';
import { map, startWith } from 'rxjs/operators';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-player-create',
  templateUrl: './player-create.component.html',
  styleUrls: ['./player-create.component.css'],
})
export class PlayerCreateComponent implements OnInit {
  isDisabled: boolean = false;
  newPlayerForm = this.fb.group({
    firstName: ['', [Validators.required]],
    lastName: ['', [Validators.required]],
    age: ['', [Validators.required]],
    nationality: ['', [Validators.required]],
    club: ['', [Validators.required]],
    league: [{ value: '', disabled: this.isDisabled }],
    position: ['', [Validators.required]],
    height: ['', [Validators.required]],
    weight: ['', [Validators.required]],
    attributes: this.fb.group({
      skillStars: [
        '',
        [Validators.required, Validators.max(5), Validators.min(0)],
      ],
      weakFoot: [
        '',
        [Validators.required, Validators.max(5), Validators.min(0)],
      ],
      workRate: this.fb.group({
        offensive: [''],
        deffensive: [''],
      }),
      playStyle: [''],
    }),
    pace: this.fb.group({
      acceleration: [
        0,
        [Validators.required, Validators.max(100), Validators.min(0)],
      ],
      speed: [0, [Validators.required, Validators.max(100), Validators.min(0)]],
    }),
    shooting: this.fb.group({
      finishing: [
        0,
        [Validators.required, Validators.max(100), Validators.min(0)],
      ],
      power: [0, [Validators.required, Validators.max(100), Validators.min(0)]],
      freeKick: [
        0,
        [Validators.required, Validators.max(100), Validators.min(0)],
      ],
      penalties: [
        0,
        [Validators.required, Validators.max(100), Validators.min(0)],
      ],
      longShots: [
        0,
        [Validators.required, Validators.max(100), Validators.min(0)],
      ],
      heading: [
        0,
        [Validators.required, Validators.max(100), Validators.min(0)],
      ],
    }),
    passing: this.fb.group({
      accuracy: [
        0,
        [Validators.required, Validators.max(100), Validators.min(0)],
      ],
      shortPassing: [
        0,
        [Validators.required, Validators.max(100), Validators.min(0)],
      ],
      longPassing: [
        0,
        [Validators.required, Validators.max(100), Validators.min(0)],
      ],
      curl: [0, [Validators.required, Validators.max(100), Validators.min(0)]],
      crossing: [
        0,
        [Validators.required, Validators.max(100), Validators.min(0)],
      ],
    }),
    dribbling: this.fb.group({
      ballControl: [
        0,
        [Validators.required, Validators.max(100), Validators.min(0)],
      ],
      composure: [
        0,
        [Validators.required, Validators.max(100), Validators.min(0)],
      ],
      agility: [
        0,
        [Validators.required, Validators.max(100), Validators.min(0)],
      ],
      balance: [
        0,
        [Validators.required, Validators.max(100), Validators.min(0)],
      ],
    }),
    defending: this.fb.group({
      interceptions: [
        0,
        [Validators.required, Validators.max(100), Validators.min(0)],
      ],
      aggression: [
        0,
        [Validators.required, Validators.max(100), Validators.min(0)],
      ],
      clearing: [
        0,
        [Validators.required, Validators.max(100), Validators.min(0)],
      ],
      reaction: [
        0,
        [Validators.required, Validators.max(100), Validators.min(0)],
      ],
      tackle: [
        0,
        [Validators.required, Validators.max(100), Validators.min(0)],
      ],
    }),
    physical: this.fb.group({
      jumping: [
        0,
        [Validators.required, Validators.max(100), Validators.min(0)],
      ],
      stamina: [
        0,
        [Validators.required, Validators.max(100), Validators.min(0)],
      ],
      strength: [
        0,
        [Validators.required, Validators.max(100), Validators.min(0)],
      ],
    }),
  });

  positions: string[];
  workRates: string[];
  filteredCountries: Observable<string[]>;

  constructor(private fb: FormBuilder, private playerService: PlayerService) {}

  ngOnInit(): void {
    this.positions = positions;
    this.workRates = workRates;

    this.filteredCountries = this.newPlayerForm.controls.nationality.valueChanges.pipe(
      startWith(''),
      map((value) => this._filter(countries, value))
    );
  }

  private _filter(array: string[], value: string): string[] {
    const filterValue = value.toLowerCase();

    return array.filter((value) => value.toLowerCase().includes(filterValue));
  }

  clubChanged() {
    const controls = this.newPlayerForm.controls;
    this.isDisabled = controls.club.value === 'free agent';
    !this.isDisabled ? controls.league.enable() : controls.league.disable();
  }

  createPlayer(): void {
    this.playerService
      .createPlayer(this.newPlayerForm.value as Player)
      .subscribe();
  }
}
