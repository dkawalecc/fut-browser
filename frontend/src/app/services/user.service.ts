import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { User } from '../models/user';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { AuthService } from './auth.service';
import { Router } from '@angular/router';
import { AlertService } from './alert.service';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  usersUrl: string = 'http://localhost:3000/api/users';

  constructor(
    private http: HttpClient,
    private alertService: AlertService,
    private authService: AuthService,
    private router: Router
  ) {}

  getProfile(): Observable<User> {
    return this.http.get<User>(`${this.usersUrl}/me`, {
      withCredentials: true,
    });
  }

  createUser(newUser: User): Observable<User> {
    return this.http
      .post<User>(this.usersUrl, newUser, { withCredentials: true })
      .pipe(
        tap(
          (user) => {
            this.authService.toggleStorageLogin(user._id);
            this.alertService.alert(`Successfully created user ${user.name}`);
          },
          (err) => {
            console.error(err);
            this.alertService.alert(err.error.error);
          },
          () => {
            this.router.navigate(['/me']);
          }
        )
      );
  }

  updateUser(updates: any): Observable<User> {
    return this.http
      .patch<User>(`${this.usersUrl}/me`, updates, {
        withCredentials: true,
      })
      .pipe(
        tap(
          (user) => {
            this.alertService.alert(`Successfully updated user ${user.name}`);
          },
          (err) => {
            console.error(err);
            this.alertService.alert(err.error.error);
          },
          () => {
            this.router.navigate(['/me']);
          }
        )
      );
  }

  deleteUser(): Observable<User> {
    this.authService.logOut();
    return this.http
      .delete<User>(`${this.usersUrl}/me`, {
        withCredentials: true,
      })
      .pipe(
        tap(
          (user) =>
            this.alertService.alert(`Successfully deleted user ${user.name}`),
          (err) => {
            console.error(err);
            this.alertService.alert(err.error.error);
          },
          () => this.router.navigate(['/'])
        )
      );
  }
}
