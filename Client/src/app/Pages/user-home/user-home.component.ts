import { Component, OnInit } from '@angular/core';
import { UserService } from '../../user.service';
import { IUser } from '../../Interface/IUser/user';
import { Router } from '@angular/router';

@Component({
  selector: 'app-user-home',
  templateUrl: './user-home.component.html',
  styleUrls: ['./user-home.component.css']
})
export class UserHomeComponent implements OnInit {
  isAutoRefresh = true;
  searchInput:string = "";
  userSuggestion: IUser[] = [];
  contactList: IUser[] = [];
  showDiv: boolean = false;
  showSuggestionDiv: boolean = false;
  msg: string = "";
  status: boolean = false;
  uniqueUserId: any = null;

  constructor(private _userService: UserService, private router: Router) { }
  ngOnInit(): void {
    this.uniqueUserId = localStorage.getItem("userId");
    if (this.uniqueUserId == null) {
      // this.router.navigate(['login']);
    }
    else {
      this.getContact(this.uniqueUserId);
    }
  }
  searchContact(){
    //console.log(this.searchInput);
    //console.log(this.userSuggestion);
    if (!this.searchInput) {
      this.userSuggestion = this.contactList;
      this.showSuggestionDiv = false;
    } else {
      this.userSuggestion = this.contactList.filter(contact => contact.userName.includes(this.searchInput));
      this.showSuggestionDiv = true;

    }
  }
  getContact(userId: number) {
    this._userService.getUserContacts(userId).subscribe(
      responseSuccess => {
        console.log(responseSuccess[0]);
        this.contactList = responseSuccess;
        this.userSuggestion = responseSuccess;
        this.status = true;
        if (!this.status) {
          this.showDiv = true;
          this.msg = "Friendlist is empty!";
        }
        
      },
      responseError => {
        this.contactList = [];
        this.msg = "Some error occured";
      }
    );
  }
  userSelected(user: IUser) {
    //this.userSuggestion = [user];
    this.searchInput = user.userName;

    this.showSuggestionDiv = false;
  }
  toggleRefresh() {
    this.isAutoRefresh = !this.isAutoRefresh;
  }

  refreshChats() {
    // Logic to manually refresh chats
  }

  //filterContacts() {
  //  this.filteredContacts = this.contacts.filter(contact =>
  //    contact.name.toLowerCase().includes(this.searchInput.toLowerCase())
  //  );
  //}

  openChat(contact:object) {
    // Logic to open chat window
  }
}
