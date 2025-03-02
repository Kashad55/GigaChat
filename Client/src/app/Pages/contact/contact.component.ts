import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../../user.service';
import { IUser } from '../../Interface/IUser/user';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css']
})
export class ContactComponent {

  userList: IUser[] = []
  status: boolean = false;
  msg: string = "Search to Add Contact";
  showDiv: boolean = true;
  searchInput: string = "";
  blocked: boolean = false;
  userAid: number = 0;
  addStatus: number = -1;
  
  constructor(private _userService: UserService, private router: Router) { }
  getAllUser() {
    if (this.searchInput) {
      this._userService.searchUsers(this.searchInput).subscribe(
        responseSuccess => {
          //console.log(responseSuccess[0]);
          this.userList = responseSuccess;
          this.blocked = this.userList[0].blocked;
          this.status = true;
          if (this.userList.length == 0) {
            this.msg = "No user Found";
            this.showDiv = true;
          }

        },
        responseError => {
          this.userList = [];
          this.msg = "Some error occured";
          this.showDiv = true;
        }
      );

    } else {
      this.userList = [];
    }
    this.userAid = Number(localStorage.getItem('userId'));

  }
  blockUnblock(user: IUser) {
    console.log("Blocked Unblocked Done");
    this._userService.blockUnblock(user).subscribe(
      res => {
        if (res) {
          this.blocked = !this.blocked;
          if (this.blocked) {
            alert("User Blocked!");
          }
          else {
            alert("User Unblocked!");
          }
        }
      },
      err => {
        console.log(err);
        alert("Some error occured")
      }
    );
  }
  addContact(userBid: number) {
    this._userService.addContact(userBid,this.userAid).subscribe(
      responseSuccess => {
        //console.log(responseSuccess[0]);
      
        this.addStatus = responseSuccess;
        if (this.addStatus === 1) {
          alert("user added to your contact");
        }

      },
      responseError => {
        this.userList = [];
        alert("user added to your contact");
      }
    );
  }

}
