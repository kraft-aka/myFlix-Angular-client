import { Component, OnInit } from '@angular/core';
import { FetchApiDataService } from '../fetch-api-data.service';

import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { EditProfileComponent } from '../edit-profile/edit-profile.component';

import { Router } from '@angular/router';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.scss'],
})
export class UserProfileComponent implements OnInit {
  user: any = {};

  constructor(
    public fetchApiDataService: FetchApiDataService,
    public snackBar: MatSnackBar,
    public dialog: MatDialog,
    public router: Router
  ) {}

  ngOnInit(): void {
    this.getUser();
  }

  getUser(): void {
    this.fetchApiDataService.getUser().subscribe((resp: any) => {
      this.user = resp;
      console.log(this.user);
      return this.user;
    });
  }

  deleteProfile(): void {
    if (confirm('Do you want to delete your account?')) {
      this.router.navigate(['welcome']).then(() => {
        this.snackBar.open('Profile has been deleted', ' OK', {
          duration: 2000,
        }),
          this.fetchApiDataService.deleteUser().subscribe((resp) => {
            console.log(resp);
            localStorage.clear();
          });
      });
    }
  }

  openEditUserProfileDialog(): void {
    this.dialog.open(EditProfileComponent, {
      width: '280px',
    });
  }
}
