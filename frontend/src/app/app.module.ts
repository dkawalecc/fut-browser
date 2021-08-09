import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ReactiveFormsModule } from '@angular/forms';

import { MatSliderModule } from '@angular/material/slider';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { LoginComponent } from './components/auth/login/login.component';
import { UserProfileComponent } from './components/user/user-profile/user-profile.component';
import { MatCardModule } from '@angular/material/card';
import { NavbarComponent } from './components/partials/navbar/navbar.component';
import { FooterComponent } from './components/partials/footer/footer.component';
import { PlayerListComponent } from './components/player/player-list/player-list.component';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatDividerModule } from '@angular/material/divider';
import { MatListModule } from '@angular/material/list';
import { UserEditComponent } from './components/user/user-edit/user-edit.component';
import { RegisterComponent } from './components/auth/register/register.component';
import { AvatarUploadComponent } from './components/avatar-upload/avatar-upload.component';
import { PlayerCreateComponent } from './components/player/player-create/player-create.component';
import { PlayerEditComponent } from './components/player/player-edit/player-edit.component';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatSelectModule } from '@angular/material/select';
import { PlayerCardComponent } from './components/player/player-card/player-card.component';
import { TeamsListComponent } from './components/teams/teams-list/teams-list.component';
import { TeamItemComponent } from './components/teams/team-item/team-item.component';
import { TeamService } from './services/team.service';
import { TeamCreateComponent } from './components/teams/team-create/team-create.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    UserProfileComponent,
    NavbarComponent,
    FooterComponent,
    PlayerListComponent,
    UserEditComponent,
    RegisterComponent,
    AvatarUploadComponent,
    PlayerCreateComponent,
    PlayerEditComponent,
    PlayerCardComponent,
    TeamsListComponent,
    TeamItemComponent,
    TeamCreateComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
    MatSliderModule,
    MatButtonModule,
    MatInputModule,
    MatFormFieldModule,
    ReactiveFormsModule,
    MatCardModule,
    MatSnackBarModule,
    MatDividerModule,
    MatListModule,
    MatAutocompleteModule,
    MatSelectModule,
  ],
  providers: [TeamService],
  bootstrap: [AppComponent],
})
export class AppModule {}
