import { Component, ChangeDetectorRef, OnInit } from '@angular/core';
import { MediaMatcher } from '@angular/cdk/layout';
import { NotificationService } from 'src/app/shared/service/notification.service';
import { AuthenticationService } from 'src/app/authentication/services/authentication.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-main-user',
  templateUrl: './main-user.component.html',
  styleUrls: ['./main-user.component.less']
})
export class MainUserComponent implements OnInit {

  mobileQuery: MediaQueryList;
  private _mobileQueryListener: () => void;
  sideNavOpenedStatus: boolean = true;

  constructor(
    private changeDetectorRef: ChangeDetectorRef,
    private media: MediaMatcher,
    private notificationServ: NotificationService,
    private authServ: AuthenticationService,
    private router: Router
  ) {
    this.mobileQuery = media.matchMedia('(max-width: 600px)');
    this._mobileQueryListener = () => changeDetectorRef.detectChanges();
    this.mobileQuery.addListener(this._mobileQueryListener);
  }

  ngOnInit(): void {
  }

  getTopGap(){
    return this.mobileQuery.matches ? "47" : "56";
  }

  getSideNavMode(){
    return this.mobileQuery.matches ? 'over' : 'side';
  }

  getNotificationMessage(){
    return this.notificationServ.message;
  }

  getNotificationSeverity(){
    return this.notificationServ.severity;
  }

  closeNotification(){
    this.notificationServ.closeNotification()
  }

  logoutUser(){
    this.authServ.logoutUser().subscribe(res => {
      this.authServ.clearLogoutUser();
      this.router.navigateByUrl("/login");
    }, err => {

    })
  }

  getLoggedInUserName(){
    return this.authServ.loggedInUser.firstname;
  }

  ngOnDestroy(): void {
    this.mobileQuery.removeListener(this._mobileQueryListener);
  }
}
