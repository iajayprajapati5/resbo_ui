import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { MyAdvertiseDetailHome } from '../model/MyAdvertiseDetailHome';
import { AddEditAdvertise } from '../model/AddEditAdvertise';
import { InterestedPeopleDetail } from '../model/InterestedPeopleDetails';

@Injectable({
  providedIn: 'root'
})
export class MyAdvertiseService {

  constructor(private httpClient: HttpClient) { }

  getMyAdvertise(loggedInUserId: number): Observable<MyAdvertiseDetailHome[]> {
    return this.httpClient.get<MyAdvertiseDetailHome[]>(`/api/user/${loggedInUserId}/my-advertise`);
  }

  addNewAdvertise(loggedInUserId: number, advertiseDetail: AddEditAdvertise): Observable<any> {
    let formData: FormData = this.createFormData(advertiseDetail);
    let options = this.createHeaders();
    return this.httpClient.post(`/api/user/${loggedInUserId}/advertise`, formData, options);
  }

  updateAdvertise(loggedInUserId: number, advertiseDetail: AddEditAdvertise){
    let formData: FormData = this.createFormData(advertiseDetail);
    let options = this.createHeaders();
    return this.httpClient.put(`/api/user/${loggedInUserId}/advertise/${advertiseDetail.id}`, formData, options);
  }

  deleteAdvertise(loggedInUserId: number, itemToDeleteId: number){
    return this.httpClient.delete(`/api/user/${loggedInUserId}/advertise/${itemToDeleteId}`);
  }

  listInterestedInMyAdvertise(loggedInUserId: number, advertiseId: number): Observable<InterestedPeopleDetail[]>{
    return this.httpClient.get<InterestedPeopleDetail[]>(`/api/user/${loggedInUserId}/advertise/${advertiseId}/bidList`);
  }

  finaliseInterest(finaliseUserId: number, advertiseId: number): Observable<any>{
    return this.httpClient.post<any>(`/api/user/${finaliseUserId}/advertise/${advertiseId}/finaliseBid`, {});
  }

  private createFormData(advertiseDetail: AddEditAdvertise): FormData{
    let formData = new FormData();

    formData.append("name", advertiseDetail.name);
    formData.append("description", advertiseDetail.description);
    formData.append("price", advertiseDetail.price.toString());
    formData.append("genre", advertiseDetail.genre);
    if(advertiseDetail.image) formData.append("imageFile", advertiseDetail.image);

    return formData;
  }

  private createHeaders(){
    const headers = new HttpHeaders();

    headers.append('Content-Type', 'multipart/form-data');
    headers.append('Accept', 'application/json');

    let options = { headers: headers };
    return options;
  }
}
