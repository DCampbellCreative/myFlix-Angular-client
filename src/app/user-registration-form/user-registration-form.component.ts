/**
 * Renders dialog fields where users can enter their info to register for a user account
 * @module UserUpdateFromComponent
*/

import { Component, OnInit, Input } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
// import API call
import { FetchApiDataService } from '../fetch-api-data.service';
import { MatSnackBar } from '@angular/material/snack-bar';

// @Component decorator tells Angular this class is the component
@Component({
  // defines HTML component where component will render
  selector: 'app-user-registration-form',
  templateUrl: './user-registration-form.component.html',
  styleUrls: ['./user-registration-form.component.scss']
})

export class UserRegistrationFormComponent implements OnInit {

  @Input() userDetails = { Username: '', Password: '', Email: '', Birthday: '' };

  constructor(
    public fetchApiData: FetchApiDataService,
    public dialogRef: MatDialogRef<UserRegistrationFormComponent>,
    public snackBar: MatSnackBar
  ) { }

  ngOnInit(): void {
  }

  /**
   * Sends newly entered user info to database
   * Opens snackBar showing status
   * @function registerUser
   */
  registerUser(): void {
    this.fetchApiData.userRegistration(this.userDetails).subscribe((response) => {
      // successful user registration logic
      this.dialogRef.close();
      console.log(response)
      this.snackBar.open('Registration Successful!', 'OK', {
        duration: 2000
      });
    }, (response) => {
      this.snackBar.open(response, 'OK', {
        duration: 2000
      });
    });
  }

}
