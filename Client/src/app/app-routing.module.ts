import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { UserLoginComponent } from './Pages/userlogin/userlogin.component';
import { SignupComponent } from './Pages/signup/signup.component';
import { HomeComponent } from './Pages/home/home.component';
import { UserHomeComponent } from './Pages/user-home/user-home.component';
import { ContactComponent } from './Pages/contact/contact.component';
import { ChatComponent } from './Pages/chat/chat.component';
import { ProfileComponent } from './Pages/profile/profile.component';


const routes: Routes = [
  { path:'',component:HomeComponent},
  { path: 'signup', component: SignupComponent },
  { path: 'login', component:UserLoginComponent},
  { path: 'addContacts', component: ContactComponent },
  { path: 'chat', component: ChatComponent },
  {path:'Profile',component:ProfileComponent} ,
  {path:'userhome',component:UserHomeComponent} 

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
