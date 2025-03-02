import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { UserLoginComponent } from './Pages/userlogin/userlogin.component';
import { SignupComponent } from './Pages/signup/signup.component';
import { NavbarComponent } from './Component/navbar/navbar.component';
import { HomeComponent } from './Pages/home/home.component';
import { UserHomeComponent } from './Pages/user-home/user-home.component';
import { ContactComponent } from './Pages/contact/contact.component';
import { SidebarComponent } from './Component/sidebar/sidebar.component';
import { HttpClientModule } from '@angular/common/http';
import { ChatComponent } from './Pages/chat/chat.component';
import { ProfileComponent } from './Pages/profile/profile.component';


@NgModule({
  declarations: [
    AppComponent,
    UserLoginComponent,
    SignupComponent,
    NavbarComponent,
    HomeComponent,
    UserHomeComponent, 
    ContactComponent,
    SidebarComponent,
    ChatComponent,
    ProfileComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule, ReactiveFormsModule,
    HttpClientModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
