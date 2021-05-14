import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { SignUpData } from '../model/SignUpData';
import { UserAuthCheckDetails } from '../model/UserAuthCheckDetails';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  constructor(private httpClient: HttpClient) { }

  public loginScreenPage: BehaviorSubject<string> = new BehaviorSubject<string>("login");

  loginUser(userName: string, password: string): Observable<UserAuthCheckDetails>{
    let formdata = new FormData();
    formdata.append("username", userName);
    formdata.append("password", password);

    return this.httpClient.post<UserAuthCheckDetails>('/api/login', formdata);
  }

  signupUser(signupDetails: SignUpData){
    return this.httpClient.post('/api/signup', signupDetails);
  }

  getLoggedInUser(): Observable<UserAuthCheckDetails>{
    return this.httpClient.get<UserAuthCheckDetails>('/api/isAuthenticated');
  }

  loggedInUser: UserAuthCheckDetails = {
    id: 0,
    authorities: [],
    firstname : "",
    lastname: "",
    enabled: false,
    username: ""
  };

  logoutUser(){
    return this.httpClient.post("/api/logout", {});
  }

  clearLogoutUser(){
    this.loggedInUser = {
      id: 0,
      authorities: [],
      firstname : "",
      lastname: "",
      enabled: false,
      username: ""
    };
  }
}
