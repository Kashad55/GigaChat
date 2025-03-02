import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserService } from '../../user.service';
import { Router } from '@angular/router';


@Component({

  selector: 'app-userlogin',

  templateUrl: './userlogin.component.html', 

  styleUrls: ['./userlogin.component.css']

})



export class UserLoginComponent {
  uniqueUserId: number = 0;
  loginForm: FormGroup;

  currentTheme = "night-mode";

  constructor(private _userService: UserService, private fb: FormBuilder, private router: Router) {

    this.loginForm = this.fb.group({

      email: ['', [Validators.required, Validators.email]],

      password: [

        '',

        [Validators.required, Validators.minLength(8), Validators.maxLength(16)]

      ]

    });

  }

  get email() {

    return this.loginForm.get('email');

  }

  get password() {

    return this.loginForm.get('password');

  }

  onSubmit() {

    if (this.loginForm.valid) {

      //console.log('Login Successful', this.loginForm.value.email);
      //console.log('Login Successful', this.loginForm.value.password);


      // Add login logic here
      this._userService.userLogin(this.loginForm.value.email, this.loginForm.value.password).subscribe(
        res => {
         
          if (res == -1) {
            alert("Something went wrong")
          }
          else if (res == -99) {
            alert("exception Please try again!!!")
          } else {
            this.uniqueUserId = res;
            localStorage.removeItem("userId");
            localStorage.setItem("userId", this.uniqueUserId.toString());
            this.router.navigate(['userHome']);
          }

        },
        err => {
          console.log(err);
        }
      )

    }

  }

  resetForm() {

    this.loginForm.reset();

  }

}

