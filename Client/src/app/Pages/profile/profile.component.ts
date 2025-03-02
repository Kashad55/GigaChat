import {
  Component
}

  from '@angular/core';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent {
  userName: string = "John Doe";
  isEditing: boolean = false;
  images = '../../../assets/Icons/ProfilePictures/Men/man (2).png'
  enableEdit() {
    this.isEditing = true;
  }

  avatarOptions: any = [
    '../../../assets/Icons/ProfilePictures/Men/gamer.png',

    '../../../assets/Icons/ProfilePictures/Men/man (1).png',

    '../../../assets/Icons/ProfilePictures/Men/man (2).png',

    '../../../assets/Icons/ProfilePictures/Men/man (3).png',

    '../../../assets/Icons/ProfilePictures/Men/man.png',
  ];

  statusOptions = [
    { label: 'Avilable', id: 1 },
    { label: 'Busy', id: 2 },
    { label: 'Do not Disturb', id: 3 },
    { label: 'Be right Back', id: 4 },
    { label: 'Appear Offline', id: 5 },
  ]

  updateAvatar(newAvatar: string) {
    this.images = newAvatar;
  }

  saveEdit(username: string) {
    this.userName = username;
    this.isEditing = false;
  }

  cancelEdit() {
    this.isEditing = false;
  }
}
