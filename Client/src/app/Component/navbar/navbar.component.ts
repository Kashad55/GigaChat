import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  loggedIn: boolean = false;
  userId: number = 0;
    
  ngOnInit() {
    this.userId = Number(localStorage.getItem('userId'))
    if (this.userId != 0) {
      this.loggedIn = true;
    }
        
  }
  logout() {
    localStorage.removeItem('userId')
  }


}
