import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { switchMap, tap } from 'rxjs/operators';
import { AuthenticationService } from 'src/app/authentication/services/authentication.service';
import { NotificationService } from 'src/app/shared/service/notification.service';
import { AdvertiseService } from '../../advertise/service/advertise.service';
import { AddEditAdvertise } from '../model/AddEditAdvertise';
import { MyAdvertiseService } from '../service/my-advertise.service';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.less']
})
export class EditComponent implements OnInit {
  constructor(private myAdvSer: MyAdvertiseService,
    private advertiseServ: AdvertiseService,
    private authServ: AuthenticationService,
    private router: Router,
    private route: ActivatedRoute,
    private notificationServ: NotificationService
  ) { }

  ngOnInit(): void {
    this.routeParamSubscription = this.route.paramMap.pipe(
      // tap((params: ParamMap) => console.log(params.get('advertiseId'))),
      switchMap((params: ParamMap) => this.advertiseServ.getAdvertiseDetailsById(parseInt(params.get('advertiseId') || "")))
    ).subscribe((advertise: AddEditAdvertise) => {
      this.advertiseDetails = advertise;
      this.originalAdvertise = Object.assign({}, advertise);
      this.advertiseDetails.image = this.originalAdvertise.image = "";
    })
  }

  private routeParamSubscription: Subscription = new Subscription();

  advertiseDetails: AddEditAdvertise = {
    id: 0,
    name: "",
    genre: "",
    description: "",
    price: 0,
    image: ""
  }
  originalAdvertise: AddEditAdvertise | undefined;

  setImageData(event: any){
    this.advertiseDetails.image = event.target.files[0];
  }

  updateAdvertise(){
    const loggedInUserId = this.authServ.loggedInUser.id;
    this.myAdvSer.updateAdvertise(loggedInUserId, this.advertiseDetails).subscribe((res: any) => {
      this.notificationServ.setNotification(res.message, "success");
      this.goToMyAdvertiseListPage();
    }, err => {

    })
  }

  formReset(form: NgForm){
    this.advertiseDetails = Object.assign({}, this.originalAdvertise);
    this.advertiseDetails.image = null;
  }

  goToMyAdvertiseListPage(){
    this.router.navigateByUrl("/my-advertise/list");
  }
}
