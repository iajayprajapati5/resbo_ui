import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { Subscription } from 'rxjs';
import { switchMap, tap } from 'rxjs/operators';
import { AuthenticationService } from 'src/app/authentication/services/authentication.service';
import { NotificationService } from 'src/app/shared/service/notification.service';
import { AdvertiseDetailData } from '../model/AdvertiseDetailData';
import { AdvertiseService } from '../service/advertise.service';

@Component({
  selector: 'app-advertise-detail',
  templateUrl: './advertise-detail.component.html',
  styleUrls: ['./advertise-detail.component.less']
})
export class AdvertiseDetailComponent implements OnInit {

  constructor(
    private route: ActivatedRoute,
    private advertiseServ: AdvertiseService,
    private notificationServ: NotificationService,
    private authService: AuthenticationService) { }

  ngOnInit(): void {
    this.routeParamSubscription = this.route.paramMap.pipe(
      tap((params: ParamMap) => console.log(params.get('advertiseId'))),
      switchMap((params: ParamMap) => this.advertiseServ.getAdvertiseDetailsById(parseInt(params.get('advertiseId') || "")))
    ).subscribe((advertise: AdvertiseDetailData) => {
      this.advertiseDetails = advertise;
    })
  }

  private routeParamSubscription: Subscription = new Subscription();

  advertiseDetails: AdvertiseDetailData = {
    id: 0,
    name: "",
    address: "",
    description: "",
    price: 0,
    genre: "",
    created_at: "",
    user_fullname: "",
    user_id: 0,
    finalised: false,
    image: "",
    user_interested: 0
  }

  showIntersetInAdvertise(){
    let loggedInUserId = this.authService.loggedInUser.id;
    let advertiseId = this.advertiseDetails.id;
    let advertisePrice = this.advertiseDetails.price;

    this.advertiseServ.showInterestInAdvertise(loggedInUserId, advertiseId, advertisePrice).subscribe(res => {
      this.notificationServ.setNotification("Interest added successfully.", "success");
      this.getAdvertiseDetails();
    }, err => {
      this.notificationServ.setNotification("Interest addition failed.", "danger");
    })
  }

  removeIntersetInAdvertise(){
    let loggedInUserId = this.authService.loggedInUser.id;
    let advertiseId = this.advertiseDetails.id;

    this.advertiseServ.removeInterestFromAdvertise(loggedInUserId, advertiseId).subscribe(res => {
      this.notificationServ.setNotification("Interest removed successfully.", "success");
      this.getAdvertiseDetails();
    }, err => {
      this.notificationServ.setNotification("Interest removal failed.", "danger");
    })
  }

  getAdvertiseDetails(){
    this.routeParamSubscription = this.route.paramMap.pipe(
      tap((params: ParamMap) => console.log(params.get('advertiseId'))),
      switchMap((params: ParamMap) => this.advertiseServ.getAdvertiseDetailsById(parseInt(params.get('advertiseId') || "")))
    ).subscribe((advertise: AdvertiseDetailData) => {
      this.advertiseDetails = advertise;
    })
  }

  getLoggedInUser(){
    return this.authService.loggedInUser.id;
  }

  ngOnDestroy(){
    this.routeParamSubscription.unsubscribe();
  }
}
