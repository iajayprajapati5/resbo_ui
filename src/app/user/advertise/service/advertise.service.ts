import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { advertiseListData } from '../model/advertiseListData';
import { AdvertiseDetailData } from '../model/AdvertiseDetailData';

@Injectable({
  providedIn: 'root'
})
export class AdvertiseService {

  constructor(private httpClient: HttpClient) { }

  getAllAdvertise(searchKey: string): Observable<advertiseListData[]>{
    let params = new HttpParams().set('advertiseName', searchKey);
    return this.httpClient.get<advertiseListData[]>('/api/user/getFilteredAdvertise', {params : params});
  }

  getAdvertiseDetailsById(advertiseId: number): Observable<AdvertiseDetailData>{
    return this.httpClient.get<AdvertiseDetailData>('/api/user/advertise/' + advertiseId);
  }

  showInterestInAdvertise(loggedInUserId: number, advertiseId: number, price: number){
    return this.httpClient.post(`/api/user/${loggedInUserId}/advertise/${advertiseId}/bid`, {
      amount: price
    });
  }

  removeInterestFromAdvertise(loggedInUserId: number, advertiseId: number){
    return this.httpClient.delete(`/api/user/${loggedInUserId}/advertise/${advertiseId}/myBid`);
  }
}
