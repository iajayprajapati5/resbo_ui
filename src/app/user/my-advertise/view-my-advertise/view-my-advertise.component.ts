import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { Subscription } from 'rxjs';
import { switchMap, tap } from 'rxjs/operators';
import { AuthenticationService } from 'src/app/authentication/services/authentication.service';
import { NotificationService } from 'src/app/shared/service/notification.service';
import { AdvertiseDetailData } from '../../advertise/model/AdvertiseDetailData';
import { AdvertiseService } from '../../advertise/service/advertise.service';
import { InterestedPeopleDetail } from '../model/InterestedPeopleDetails';
import { MyAdvertiseService } from '../service/my-advertise.service';

@Component({
  selector: 'app-view-my-advertise',
  templateUrl: './view-my-advertise.component.html',
  styleUrls: ['./view-my-advertise.component.less']
})
export class ViewMyAdvertiseComponent implements OnInit {

  constructor(
    private route: ActivatedRoute,
    private advertiseServ: AdvertiseService,
    private myAdvServ: MyAdvertiseService,
    private notificationServ: NotificationService,
    private authService: AuthenticationService) { }

  ngOnInit(): void {
    this.getAdvertiseDetails();
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

  getAdvertiseDetails(){
    this.routeParamSubscription = this.route.paramMap.pipe(
      tap((params: ParamMap) => console.log(params.get('advertiseId'))),
      switchMap((params: ParamMap) => this.advertiseServ.getAdvertiseDetailsById(parseInt(params.get('advertiseId') || "")))
    ).subscribe((advertise: AdvertiseDetailData) => {
      this.advertiseDetails = advertise;
      this.getInterestedPeople();
    })
  }

  interestedPeopleList: InterestedPeopleDetail[] = [];
  getInterestedPeople(){
    const loggedInUserId = this.authService.loggedInUser.id;
    const advertiseId = this.advertiseDetails.id;
    this.myAdvServ.listInterestedInMyAdvertise(loggedInUserId, advertiseId).subscribe(res => {
      this.interestedPeopleList = res;
    }, err => {

    })
  }

  finaliseAdvertiseInterest(finaliseUserId: number){
    const advertiseId = this.advertiseDetails.id;
    this.myAdvServ.finaliseInterest(finaliseUserId, advertiseId).subscribe(res => {
      this.getAdvertiseDetails();
      this.getInterestedPeople();
      this.notificationServ.setNotification("Advertise finalised.", "success");
    }, err => {

    })
  }

  products: any[] = [];

  ngOnDestroy(){
    this.routeParamSubscription.unsubscribe();
  }
}
