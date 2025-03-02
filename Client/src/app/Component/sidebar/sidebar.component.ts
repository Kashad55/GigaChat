import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent {
  constructor(private router: Router) { }
  logout() {
    console.log("logout");
    localStorage.removeItem('userId');
    this.router.navigate(['/login']);
  }
}
