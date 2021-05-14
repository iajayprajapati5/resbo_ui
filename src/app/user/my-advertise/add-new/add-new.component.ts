import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthenticationService } from 'src/app/authentication/services/authentication.service';
import { NotificationService } from 'src/app/shared/service/notification.service';
import { AddEditAdvertise } from '../model/AddEditAdvertise';
import { MyAdvertiseService } from '../service/my-advertise.service';

@Component({
  selector: 'app-add-new',
  templateUrl: './add-new.component.html',
  styleUrls: ['./add-new.component.less']
})
export class AddNewComponent implements OnInit {

  constructor(private myAdvSer: MyAdvertiseService,
      private authServ: AuthenticationService,
      private router: Router,
      private notificationServ: NotificationService
    ) { }

  ngOnInit(): void {
  }

  advertiseDetails: AddEditAdvertise = {
    name: "",
	  genre: "",
    description: "",
    price: 0,
    image: ""
  }

  setImageData(event: any){
    this.advertiseDetails.image = event.target.files[0];
  }

  addNewAdvertise(){
    const loggedInUserId = this.authServ.loggedInUser.id;
    this.myAdvSer.addNewAdvertise(loggedInUserId, this.advertiseDetails).subscribe((res: any) => {
      this.notificationServ.setNotification(res.message, "success");
      this.goToMyAdvertiseListPage();
    }, err => {

    })
  }

  formReset(form: NgForm){
    form.reset();
    this.advertiseDetails.image = null;
  }

  goToMyAdvertiseListPage(){
    this.router.navigateByUrl("/my-advertise/list");
  }
}
