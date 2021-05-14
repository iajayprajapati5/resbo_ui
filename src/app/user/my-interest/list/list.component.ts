import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationService } from 'src/app/authentication/services/authentication.service';
import { MyInterestDetail } from '../model/MyInterestDetails';
import { MyInterestService } from '../service/my-interest.service';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.less']
})
export class ListComponent implements OnInit {

  constructor(private myInterestServ: MyInterestService,
    private authServ: AuthenticationService,
    private router: Router
    ) { }

  ngOnInit(): void {
    this.getMyInterestAdvertiseList();
  }

  myInterestAdvertiseList: MyInterestDetail[] = []
  getMyInterestAdvertiseList(){
    const loggedInUserId = this.authServ.loggedInUser.id;
    this.myInterestServ.getMyInterestList(loggedInUserId).subscribe(res => {
      this.myInterestAdvertiseList = res;
      console.log(this.myInterestAdvertiseList);
    }, err => {

    })
  }

  viewAdvertiseDetails(advertiseId: number){
    this.router.navigateByUrl(`/advertise/detail/${advertiseId}`);
  }
}
