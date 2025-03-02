import { Component, OnDestroy, OnInit } from '@angular/core';
import { IUser } from '../../Interface/IUser/user';
import { UserService } from '../../user.service';
import { Router } from '@angular/router';
import { Imessage } from '../../Interface/Imessage/Imessage';

@Component({

  selector: 'app-chat',

  templateUrl: './chat.component.html',

  styleUrls: ['./chat.component.css']

})

export class ChatComponent implements OnInit, OnDestroy {
  constructor(private _userService: UserService, private router: Router) { }
  ngOnDestroy() {
    if (this.refreshInterval) {
      clearInterval(this.refreshInterval);
    }
    }

  ngOnInit() {
    this.userSuggestion = this.contactList;
    this.uniqueUserId = localStorage.getItem("userId");
    if (this.uniqueUserId == null) {
      // this.router.navigate(['login']);
    }
    else {
      this.getContact(this.uniqueUserId);
    }
  }


  

  searchInput: string = "";
  searchMessage: string = "";
  userSuggestion: IUser[]=[];
  // contactList: IUser[] = [];
  contactList: IUser[] = [{
    userId: 3,
    userName: "Kashad",
    email: "kasha",
    password: "123456",
    dateOfBirth: new Date,
    blocked: true
  },
  {
    userId: 4,
    userName: "Yash",
    email: "kasha",
    password: "123456",
    dateOfBirth: new Date,
    blocked: true
  }];
  showDiv: boolean = false;
  showSuggestionDiv: boolean = false;
  msg: string = "";
  status: boolean = false;
  uniqueUserId: any = null;
  sendInput: string = "";

  messages: Imessage[] = [];

friend: any = {

  name: null,

  status: null,

  avatar: null,

  id: null,

};



friendOnChat = -1;

handleGoToChat(friendId: number) {

  this.friendOnChat = friendId;

  this.friend = this.userSuggestion.find(x => x.userId === friendId);
  this.getAllChat();
}
getAllChat() {
  this._userService.getChatMessages(this.uniqueUserId, this.friendOnChat).subscribe(
    responseSuccess => {
      console.log(responseSuccess);
      this.messages = responseSuccess;
      //this.status = true;
      //if (!this.status) {
        //this.showDiv = true;
      //  this.msg = "Friendlist is empty!";
      //}

    },
    responseError => {
      this.messages = [];
      this.msg = "Some error occured";
    }
  );
}
handleGoBack() {

  this.friendOnChat = -1;

  this.friend = {

    name: null,

    status: null,

    avatar: null,

    id: null,

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
          //this.showDiv = true;
          this.msg = "Friendlist is empty!";
        }

      },
      responseError => {
        this.contactList = [];
        this.msg = "Some error occured";
      }
    );
  }
  sendMessage() {
 
    this._userService.sendMessages(this.sendInput,this.uniqueUserId, this.friendOnChat).subscribe(
      responseSuccess => {
       
        if (responseSuccess==1) {
          //this.showDiv = true;
          this.sendInput = "";
          this.getAllChat();
        }

      },
      responseError => {
        alert("Couldn't send message");
      }
    );
  }

  filterContact(){
    if (!this.searchInput) {
      this.userSuggestion = this.contactList;
      this.showSuggestionDiv = false;
    } else {
      this.userSuggestion = this.contactList.filter(contact => contact.userName.includes(this.searchInput));
      this.showSuggestionDiv = true;

    }
  }



  filterMessages() {
    if (!this.searchMessage) {
      this.getAllChat();
      //this.messages = this.searchMessage;
      this.showSuggestionDiv = false;
    } else {
      this.messages = this.messages.filter(msg => msg.messageText.includes(this.searchMessage));
      this.showSuggestionDiv = true;

    }
  }

  removeContact(user:IUser) {
    //this._userService.removeContact(user.email, user.userId).subscribe(
    //  responseSuccess => {

    //    if (responseSuccess) {
    //      //this.showDiv = true;
    //      this.sendInput = "";
    //      this.getContact(this.uniqueUserId);
    //    }

    //  },
    //  responseError => {
    //    alert("user send message");
    //  }
    //);
  }

  autoRefresh: boolean = false;
  private refreshInterval: any;
  toggleAutoRefresh() {
    this.autoRefresh = !this.autoRefresh;
    if (this.autoRefresh) {
      this.refreshInterval = setInterval(() => {
        this.getAllChat();
      }, 3000);
    }
    else {
      clearInterval(this.refreshInterval);
    }
  }
}
