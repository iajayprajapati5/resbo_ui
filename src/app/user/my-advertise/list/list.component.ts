import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NotificationService } from 'src/app/shared/service/notification.service';
import { AuthenticationService } from '../../../authentication/services/authentication.service';
import { MyAdvertiseDetailHome } from '../model/MyAdvertiseDetailHome';
import { MyAdvertiseService } from '../service/my-advertise.service';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.less']
})
export class ListComponent implements OnInit {

  constructor(private myAdvSer: MyAdvertiseService,
      private authServ: AuthenticationService,
      private router: Router,
      private notificationServ: NotificationService
    ) { }

  ngOnInit(): void {
    this.getMyAdvertise();
  }

  getLoggedInUser(){
    return this.authServ.loggedInUser.id;
  }

  myAdvertiseList: MyAdvertiseDetailHome[] = [];
  getMyAdvertise(){
    const loggedInUserId = this.getLoggedInUser();

    this.myAdvSer.getMyAdvertise(loggedInUserId).subscribe(res => {
      this.myAdvertiseList = res;
    }, err => {

    })
  }

  goToAddNewAdvertise(){
    const loggedInUserId = this.authServ.loggedInUser.id;
    this.router.navigateByUrl("/my-advertise/add");
  }

  goToUpdateForm(advertiseId: number){
    this.router.navigateByUrl(`/my-advertise/edit/${advertiseId}`);
  }

  showDeleteWarning: string = "none";
  itemToDeleteId: number = 0;
  displayDeleteWarning(advertise: MyAdvertiseDetailHome){
    this.itemToDeleteId = advertise.id;
    this.showDeleteWarning = "block";
  }

  hideDeleteWarning(){
    this.itemToDeleteId = 0;
    this.showDeleteWarning = "none";
  }

  submitDeleteItem(){
    const loggedInUserId = this.getLoggedInUser();

    this.myAdvSer.deleteAdvertise(loggedInUserId, this.itemToDeleteId).subscribe((res: any) => {
      this.notificationServ.setNotification(res.message, "success");
      this.getMyAdvertise();
      this.hideDeleteWarning();
    }, err =>{
      this.hideDeleteWarning();
    })
  }

  viewAdvertiseDetails(advertiseId: number){
    this.router.navigateByUrl(`/my-advertise/view/${advertiseId}`);
  }
}
