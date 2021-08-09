import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { User } from '../models/user';
import { Credentials } from '../models/credentials';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { Router } from '@angular/router';
import { AlertService } from './alert.service';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  authUrl: string = 'http://localhost:3000/api/users';

  constructor(
    private http: HttpClient,
    private router: Router,
    private alertService: AlertService
  ) {}

  get isLoggedIn() {
    return localStorage.getItem('isLoggedIn');
  }

  toggleStorageLogin(userId?: string) {
    if (this.isLoggedIn) {
      localStorage.removeItem('isLoggedIn');
    } else {
      localStorage.setItem('isLoggedIn', userId);
    }
  }

  logIn(credentials: Credentials): Observable<User> {
    return this.http
      .post<User>(`${this.authUrl}/login`, credentials, {
        withCredentials: true,
      })
      .pipe(
        tap(
          (user) => {
            this.toggleStorageLogin(user._id);
            this.alertService.alert('Successfully logged in');
          },
          (err) => {
            this.alertService.alert(err.error.error);
          },
          () => {
            this.router.navigate(['/me']);
          }
        )
      );
  }

  logOut(): void {
    this.http
      .post(
        `${this.authUrl}/logout`,
        {},
        {
          withCredentials: true,
        }
      )
      .subscribe(
        () => {
          this.toggleStorageLogin();
          this.alertService.alert('Successfully logged out');
        },
        (err) => console.log(err),
        () => this.router.navigate([''])
      );
  }
}
