import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationService } from './authentication/services/authentication.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.less']
})
export class AppComponent {

  constructor(private router: Router) {}

  patternLogin = new RegExp("^\/login");
  getRoleUrl(){
    if (this.patternLogin.test(this.router.url)){
      return 'login';
    } else {
      return 'user';
    }
  }
}
