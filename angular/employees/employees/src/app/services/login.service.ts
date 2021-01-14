import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { User } from '../models/user';
import { SharedService } from './shared.service';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  private employeeAPI: string = 'http://192.168.0.122/employeeAPI/public/api/';
  public headers = new HttpHeaders({ 'Content-Type': 'application/json'});
  constructor(
      private httpClient: HttpClient,
      private sharedService: SharedService
      ) { }

  public getUser(user: User): Observable<any> {
     return this.httpClient.post(this.employeeAPI + 'login', JSON.stringify(user), { headers: this.headers });
   }

  public logout(): Observable<any> {
    let api_token = this.sharedService.user.api_token;
    this.headers = this.headers.set('Authorization', 'Bearer ' + api_token);
    return this.httpClient.get(this.employeeAPI + 'logout', { headers: this.headers });
  }
}
