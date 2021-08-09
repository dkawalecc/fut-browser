import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { FormBuilder } from '@angular/forms';
import { Credentials } from '../../../models/credentials';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  loginForm = this.fb.group({
    email: [''],
    password: [''],
  });

  constructor(public authService: AuthService, private fb: FormBuilder) {}

  ngOnInit(): void {}

  logIn(): void {
    this.authService.logIn(this.loginForm.value as Credentials).subscribe();
  }
}
