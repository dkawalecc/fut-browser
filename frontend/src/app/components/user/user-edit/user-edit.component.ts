import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { UserService } from 'src/app/services/user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-user-edit',
  templateUrl: './user-edit.component.html',
  styleUrls: ['./user-edit.component.css'],
})
export class UserEditComponent implements OnInit {
  userEditForm = this.fb.group({
    name: [''],
    email: [''],
    password: [''],
  });

  constructor(
    private userService: UserService,
    private fb: FormBuilder,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.userService.getProfile().subscribe(({ name, email }) => {
      this.userEditForm.controls.name.setValue(name);
      this.userEditForm.controls.email.setValue(email);
    });
  }

  updateUser(): void {
    let updates = this.userEditForm.value;
    if (updates.password.length === 0) {
      delete updates.password;
    }
    this.userService.updateUser(updates).subscribe();
  }

  uploadedAvatar(): void {
    this.router.navigate(['/me']);
  }
}
