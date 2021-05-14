import { Component, OnInit } from '@angular/core';
import { advertiseListData } from '../model/advertiseListData';
import { AdvertiseService } from '../service/advertise.service';
import { Router } from '@angular/router';
import { Location } from '@angular/common';

@Component({
  selector: 'app-advertise-home',
  templateUrl: './advertise-home.component.html',
  styleUrls: ['./advertise-home.component.less']
})
export class AdvertiseHomeComponent implements OnInit {

  constructor(private advertiseServ: AdvertiseService, private router: Router, private _location: Location) { }

  ngOnInit(): void {
    this.fetchAdvertiseList()
  }

  advertiseList: advertiseListData[] = [];
  searchkey: string = "";
  fetchAdvertiseList(){
    this.advertiseServ.getAllAdvertise(this.searchkey).subscribe(res => {
      this.advertiseList = res;
    }, err => {

    })
  }

  viewDetailAdvertiseData(advertiseId: number){
    this.router.navigateByUrl(`/advertise/detail/${advertiseId}`);
  }

  goBackToPreviousPage(){
    this._location.back();
  }
}
