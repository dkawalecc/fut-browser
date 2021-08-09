import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './components/auth/login/login.component';
import { UserProfileComponent } from './components/user/user-profile/user-profile.component';
import { PlayerListComponent } from './components/player/player-list/player-list.component';
import { UserEditComponent } from './components/user/user-edit/user-edit.component';
import { RegisterComponent } from './components/auth/register/register.component';
import { PlayerCreateComponent } from './components/player/player-create/player-create.component';
import { PlayerEditComponent } from './components/player/player-edit/player-edit.component';
import { TeamCreateComponent} from "./components/teams/team-create/team-create.component";
import { TeamsListComponent } from './components/teams/teams-list/teams-list.component';
import { TeamItemComponent} from "./components/teams/team-item/team-item.component";


const routes: Routes = [
  { path: '', redirectTo: '/players', pathMatch: 'full' },
  { path: 'players', component: PlayerListComponent },
  { path: 'players/new', component: PlayerCreateComponent },
  { path: 'players/:id/edit', component: PlayerEditComponent },
  { path: 'teams/new', component: TeamCreateComponent },
  { path: 'teams/:id', component: TeamItemComponent },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'me', component: UserProfileComponent },
  { path: 'me/edit', component: UserEditComponent },
  { path: 'teams', component: TeamsListComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
