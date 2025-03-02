import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../../user.service';
import { IUser } from '../../Interface/IUser/user';

@Component({

 selector: 'app-signup',

 templateUrl: './signup.component.html',

 styleUrls: ['./signup.component.css']

})

export class SignupComponent {
  constructor(private userService: UserService, private router: Router) { }

 currentTheme = 'night-mode';

  user: IUser = {
    userId : 0,
    userName: '',
    dateOfBirth: new Date,
    email: '',
    password: '',
    blocked: false
  };
  confirmPassword: string = '';
  userId: number = 0;

 isAgeValid: boolean = true;

 validateAge() {

   if (this.user.dateOfBirth) {

     const birthDate = new Date(this.user.dateOfBirth);

     const today = new Date();

     const age = today.getFullYear() - birthDate.getFullYear();

     const monthDifference = today.getMonth() - birthDate.getMonth();

     if (monthDifference < 0 || (monthDifference === 0 && today.getDate() < birthDate.getDate())) {

       this.isAgeValid = age > 13;

     }

     else {

       this.isAgeValid = age >= 13;

     }

   }

 }

 onSubmit() {

   if (this.isAgeValid) {

     this.userService.createAccount(this.user).subscribe(
       res => {
         this.userId = res;
         if (res == 1) {
           alert("New registration done successfully!");
           this.router.navigate(['/login']);
         }
         else if (res == -1) {
           alert("User already exists!");
           this.router.navigate(['/login']);
         }
         else if (res == - 2) {
           alert("Invalid Credentials, Try again!");
         }
         else {
           alert("Some exception occured, Try again!");
         }
       },
       err => {
         console.log(err);
         alert("Some error occured");
       },
       () => console.log("User registered successfully")
     );

   }

   else {

     alert("Invalid form submission")

   }

 }

}

