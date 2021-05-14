import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../services/authentication.service';

@Component({
  selector: 'app-main-login',
  templateUrl: './main-login.component.html',
  styleUrls: ['./main-login.component.less']
})
export class MainLoginComponent implements OnInit {

  constructor(private authService: AuthenticationService) { }

  ngOnInit(): void {
    this.authService.loginScreenPage.next("login");
    this.getLoginScreenFormName();
  }

  loginScreenForm: string = "login";
  getLoginScreenFormName(){
    this.authService.loginScreenPage.subscribe(screen => {
      this.loginScreenForm = screen;
    });
  }
}
