import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Player } from '../models/player';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { AlertService } from './alert.service';
import { Router } from '@angular/router';
import {AvgStats} from "../models/avg-stats";

@Injectable({
  providedIn: 'root',
})
export class PlayerService {
  playersUrl: string = 'http://localhost:3000/api/players';

  constructor(
    private http: HttpClient,
    private alertService: AlertService,
    private router: Router
  ) {}

  getPlayers(): Observable<Player[]> {
    return this.http.get<Player[]>(this.playersUrl);
  }

  getPlayer(playerId: string): Observable<Player> {
    return this.http.get<Player>(`${this.playersUrl}/${playerId}`);
  }

  createPlayer(player: Player): Observable<Player> {
    return this.http.post<Player>(this.playersUrl, player).pipe(
      tap(
        () => this.alertService.alert('Successfully added a new player'),
        (err) => this.alertService.alert(err.error.error),
        () => this.router.navigate([''])
      )
    );
  }

  updatePlayer(playerId: string, player: Player): Observable<Player> {
    return this.http
      .patch<Player>(`${this.playersUrl}/${playerId}`, player)
      .pipe(
        tap(
          () => this.alertService.alert('Successfully updated the player'),
          (err) => this.alertService.alert(err.error.error),
          () => this.router.navigate(['/players'])
        )
      );
  }

  // deletePlayer(playerId: string): Observable<Player> {
  //   return this.http.delete<Player>(`${this.playersUrl}/${playerId}`, { withCredentials: true })
  //     .pipe(tap(
  //       () => this.alertService.alert('Successfully delete the player'),
  //       (err) => this.alertService.alert(err.error.error),
  //       () => this.router.navigate([''])
  //     ))
  // }
}
