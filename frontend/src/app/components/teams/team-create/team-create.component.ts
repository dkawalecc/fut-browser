import { Component, OnInit } from '@angular/core';
import {TeamService} from "../../../services/team.service";
import {FormBuilder, Validators} from "@angular/forms";
import {Team} from "../../../models/team";

@Component({
  selector: 'app-team-create',
  templateUrl: './team-create.component.html',
  styleUrls: ['./team-create.component.css']
})
export class TeamCreateComponent implements OnInit {
  teamForm = this.fb.group({
    name: ['', Validators.required]
  })

  constructor(private teamService: TeamService, private fb: FormBuilder) { }

  ngOnInit(): void {
  }

  createTeam(): void {
    this.teamService.createTeam(this.teamForm.value as Team).subscribe();
  }
}
