import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http'
import { Observable, catchError, throwError } from 'rxjs';
import { IUser } from './Interface/IUser/user';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  users: IUser[] = [];
  constructor(private http: HttpClient) { }

  createAccount(user: IUser): Observable<number> {
    return this.http.post<number>('https://localhost:50987/api/User/AccountCreation', user).pipe(catchError(this.errorHandler));
  }

  userLogin(emailId: string, password: string): Observable<number> {

    var loginObj: IUser = { userId: 0, email: emailId, password: password, userName: "", dateOfBirth: new Date(), blocked:false };
    return this.http.post<number>("https://localhost:50987/api/User/UserLogin", loginObj).pipe(catchError(this.errorHandler));
  }

  addContact(userBId:number, userId: number): Observable<number> {
    var addObj = { };
    return this.http.post<number>(`https://localhost:50987/api/User/AddContact?userBid=${userBId}&userId=${userId}`, addObj).pipe(catchError(this.errorHandler));

  }

  getUserContacts(userId: number): Observable<IUser[]> {
    var params = "?userId=" + userId;
    return this.http.get<IUser[]>('https://localhost:50987/api/User/GetUserContacts' + params).pipe(catchError(this.errorHandler));
  }

  searchUsers(pattern: string): Observable<IUser[]> {
    var params = "?pattern=" + pattern;
    return this.http.get<IUser[]>('https://localhost:50987/api/User/searchUser' + params).pipe(catchError(this.errorHandler));
  }

  removeContact(emailId: string, userId: number): Observable<number> {
    var delObj = { emailId, userId };
    let httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json' }), body: delObj };
    return this.http.delete<number>('https://localhost:54781/api/User/BlockUnBlock', httpOptions).pipe(catchError(this.errorHandler));
  }
  getChatMessages(userAId: number, userBId: number): Observable<any> {
    var params = "?userAId=" + userAId + "&userBId=" + userBId;
    return this.http.get<any>('https://localhost:51023/api/Chat/GetAllMessages' + params).pipe(catchError(this.errorHandler));
  }
  sendMessages(message:string,userAId: number, userBId: number): Observable<number> {
    let payload = {
      //messageSent: message,
      //userAId: userAId,
      //userBId: userBId

      //messageSent: message,
      //senderId: userAId,
      //user2Id:userBId
    }
    return this.http.post<number>(`https://localhost:51023/api/Chat/AddMessage?messageSent=${message}&senderId=${userAId}&user2Id=${userBId}`, payload).pipe(catchError(this.errorHandler));
  }
  errorHandler(error: HttpErrorResponse) {
    console.error(error);
    return throwError(error.message || "Server Error");
  }
  blockUnblock(user: IUser): Observable<boolean> {
    console.log("service");
    return this.http.put<boolean>('https://localhost:50987/api/User/BlockUnblock', user).pipe(catchError(this.errorHandler));
    console.log("service after");
  }
}
