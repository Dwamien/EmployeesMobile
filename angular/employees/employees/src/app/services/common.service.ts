import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { SharedService } from '../services/shared.service';

@Injectable({
  providedIn: 'root'
})
export class CommonService {

  private employeeAPI = 'http://192.168.0.122/employeeAPI/public/api/';
  public headers = new HttpHeaders({ 'Content-Type': 'application/json' });
  constructor(
      private httpClient: HttpClient,
      private sharedService: SharedService
    ) { }

  getJobs(): Observable<any> {
    this.headers = this.headers.set('Authorization', 'Bearer ' + this.sharedService.user.api_token);
    return this.httpClient.get(this.employeeAPI + 'job', { headers: this.headers });
  }

  getDepartments(): Observable<any> {
    this.headers = this.headers.set('Authorization', 'Bearer ' + this.sharedService.user.api_token);
    return this.httpClient.get(this.employeeAPI + 'department', { headers: this.headers });
  }
}

