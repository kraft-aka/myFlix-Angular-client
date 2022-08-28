import { Component, OnInit } from '@angular/core';
import { UserLoginFormComponent } from '../user-login-form/user-login-form.component';
import { UserRegistrationFormComponent } from '../user-registration-form/user-registration-form.component';
import { MatDialog } from '@angular/material/dialog';

import { MovieCardComponent } from '../movie-card/movie-card.component';


@Component({
  selector: 'app-welcome-page',
  templateUrl: './welcome-page.component.html',
  styleUrls: ['./welcome-page.component.scss']
})
export class WelcomePageComponent implements OnInit {

  constructor(public dialog: MatDialog) { }

  ngOnInit(): void {
  }

  /**
   * This opens the dialog when the  signup button is clicked
   * @function openUserRegistrationDialog
   */
  openUserRegistrationDialog(): void {
    this.dialog.open(UserRegistrationFormComponent, {
      // Assigning the dialog a width
      width: '280px',
    });
  }


  /**
   * This opens dialog when login button pressed
   * @function openUserLoginDialog
   */
  openUserLoginDialog(): void {
    this.dialog.open(UserLoginFormComponent, {
      width: '280px',
    });
  }

  /**
   * This is a dialog to display movies
   * @function openMoviesDialog
   */
  openMoviesDialog(): void {
    this.dialog.open(MovieCardComponent, {
      width: '500px',
    });
  }

}
