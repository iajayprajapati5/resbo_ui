import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { HttpClient, HttpParams } from '@angular/common/http';
import { SignUpData } from '../model/SignUpData';
import { UserAuthCheckDetails } from '../model/UserAuthCheckDetails';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  constructor(private httpClient: HttpClient, private router: Router) { }

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

  generatePasswordResetToken(username: string){
    let formdata = new FormData();
    formdata.append("email", username);
    return this.httpClient.post("/api/resetPassword/generateToken", formdata);
  }

  validatePasswordResetToken(token: string){
    let params = new HttpParams().set("token", token);
    return this.httpClient.get("/api/resetPassword/validate", {params: params});
  }

  changePasswordUsingToken(token: string, password: string){
    let formdata = new FormData();
    formdata.append("token", token);
    formdata.append("password", password);
    return this.httpClient.post("/api/resetPassword/update", formdata);
  }

  changePasswordForLoggedInUser(loggedInUserId: number, currentPassword: string, newPassword: string){
    let formdata = new FormData();
    formdata.append("currentPassword", currentPassword);
    formdata.append("newPassword", newPassword);
    return this.httpClient.post(`/api/user/${loggedInUserId}/resetPassword`, formdata);
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

  redirectToLogin(){
    this.router.navigateByUrl("/login");
  }

  redirectToSingup(){
    this.router.navigateByUrl("/login/signup");
  }

  redirectToResetPass(){
    this.router.navigateByUrl("/login/resetPassword");
  }
}
