import { Component, OnInit } from '@angular/core';
import { User } from '../../../models/user';
import { UserService } from 'src/app/services/user.service';
import {Team} from "../../../models/team";
import {TeamService} from "../../../services/team.service";

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css'],
})
export class UserProfileComponent implements OnInit {
  user: User;

  constructor(private userService: UserService, private teamService: TeamService) {}

  ngOnInit(): void {
    this.userService.getProfile().subscribe(
      (user) => {
        this.user = user;
      },
    );
  }

  deleteUser(): void {
    this.userService.deleteUser().subscribe();
  }
}
