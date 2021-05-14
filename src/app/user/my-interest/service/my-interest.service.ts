import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { MyInterestDetail } from '../model/MyInterestDetails';

@Injectable({
  providedIn: 'root'
})
export class MyInterestService {

  constructor(private httpClient: HttpClient) { }

  getMyInterestList(loggedInUserId: number): Observable<MyInterestDetail[]>{
    return this.httpClient.get<MyInterestDetail[]>(`/api/user/${loggedInUserId}/my-interest`);
  }
}
