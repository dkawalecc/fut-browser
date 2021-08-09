import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Team } from "../models/team";
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { AlertService } from './alert.service';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class TeamService {
  teamsUrl: string = 'http://localhost:3000/api/teams';

  constructor(private http: HttpClient, private alertService: AlertService, private router: Router) { }

  getTeams(): Observable<Team[]> {
    return this.http.get<Team[]>(this.teamsUrl);
  }

  getTeam(teamId: string): Observable<Team> {
    return this.http.get<Team>(`${this.teamsUrl}/${teamId}`);
  }

  createTeam(team: Team): Observable<Team> {
    return this.http.post<Team>(this.teamsUrl, team, { withCredentials: true }).pipe(
      tap(
        () => this.alertService.alert('Successfully added new team'),
        (err) => this.alertService.alert(err.error.error),
        () => this.router.navigate(['/teams'])
      )
    );
  }

  updateTeam(teamId: string, team: Team): Observable<Team> {
    return this.http.patch<Team>(`${this.teamsUrl}/${teamId}`, team, { withCredentials: true }).pipe(
      tap(
        () => this.alertService.alert('Successfully updated the team'),
        (err) => this.alertService.alert(err.error.error),
      () => this.router.navigate([`/teams/${teamId}`])
      )
    );
  }

  deleteTeam(teamId: string): Observable<Team> {
    return this.http.delete<Team>(`${this.teamsUrl}/${teamId}`, { withCredentials: true })
      .pipe(tap(
        () => this.alertService.alert('Successfully delete the team'),
        (err) => this.alertService.alert(err.error.error),
        () => this.router.navigate([''])
      ))
  }

  addPlayerToTeam(teamId: string, playerId: string): Observable<Team> {
    return this.http.post<Team>(`${this.teamsUrl}/${teamId}/players`, { playerId },
      { withCredentials: true }).pipe(tap(
        () => this.alertService.alert('Successfully added the player to the team'),
        (err) => this.alertService.alert(err.error.error),
        () => this.router.navigate([`teams/${teamId}`])
    ))
  }
}
