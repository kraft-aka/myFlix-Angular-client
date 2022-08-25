import { Component, OnInit, Input } from '@angular/core';

import { FetchApiDataService } from '../fetch-api-data.service';
import { MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';

@Component({
  selector: 'app-edit-profile',
  templateUrl: './edit-profile.component.html',
  styleUrls: ['./edit-profile.component.scss']
})
export class EditProfileComponent implements OnInit {
  @Input() userData: any = {};


  constructor(
    public fetchApiDataService: FetchApiDataService,
    public dialogRef: MatDialogRef<EditProfileComponent>,
    public snackBar: MatSnackBar,
    public router: Router
  ) { }

  ngOnInit(): void {
  }

  editUserProfile(): any {
    this.fetchApiDataService.editUser(this.userData).subscribe((response)=>{
      this.dialogRef.close();
      console.log(response);
      this.snackBar.open('Profile has been successfully updated', ' OK', {
        duration: 2000,
      });

      if (this.userData.Username | this.userData.Password) {
        localStorage.clear();
        this.router.navigate(['welcome']);
        this.snackBar.open('Username or Password has been changed, please login again', 'OK', {
          duration: 2000,
        })
      }
    })
  }

}
