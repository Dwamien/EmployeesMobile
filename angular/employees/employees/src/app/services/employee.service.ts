import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import { Observable } from 'rxjs';
import { Employee } from '../models/employee';
import { User } from '../models/user';
import { SharedService } from '../services/shared.service';

// ?XDEBUG_SESSION_START=netbeans-xdebug
@Injectable({
  providedIn: 'root'
})
export class EmployeeService {
  private employeeAPI: string = 'http://192.168.0.122/employeeAPI/public/api/';
  public headers = new HttpHeaders({ 'Content-Type': 'application/json' });
  constructor(
      private httpClient: HttpClient,
      private sharedService: SharedService
    ) { }

 getEmployees(): Observable<any> {
    this.headers = this.headers.set('Authorization', 'Bearer ' + this.sharedService.user.api_token);
    return this.httpClient.get(this.employeeAPI + 'employee', { headers: this.headers });
  }


  getEmployee(id: number): Observable<any>{
    this.headers = this.headers.set('Authorization', 'Bearer ' + this.sharedService.user.api_token);
    return this.httpClient.get(this.employeeAPI + 'employee/' + id, { headers: this.headers });
  }

  addEmployee(employee: Employee): Observable<any>{
    this.headers = this.headers.set('Authorization', 'Bearer ' + this.sharedService.user.api_token);
    return this.httpClient.post(this.employeeAPI + 'employee', JSON.stringify(employee), { headers: this.headers });
  }

  updateEmployee(employee: Employee): Observable<any>{
    var emp = JSON.stringify(employee);
    this.headers = this.headers.set('Authorization', 'Bearer ' + this.sharedService.user.api_token);
    this.headers = this.headers.set('XDEBUG_SESSION_START', 'netbeans-xdebug');
    return this.httpClient.put(this.employeeAPI + 'employee', emp, { headers: this.headers });
  }

  deleteEmployee(employee_id: number): Observable<any>{
    this.headers = this.headers.set('Authorization', 'Bearer ' + this.sharedService.user.api_token);
    return this.httpClient.delete(this.employeeAPI + "employee/" + employee_id, { headers: this.headers });
  }

  getEmployeesByJob(job_id: number): Observable<any> {
    this.headers = this.headers.set('Authorization', 'Bearer ' + this.sharedService.user.api_token);
    return this.httpClient.get(this.employeeAPI + 'employee/job/' + job_id, { headers: this.headers });
  }

  getEmployeesByDep(dep_id: number): Observable<any> {
    this.headers = this.headers.set('Authorization', 'Bearer ' + this.sharedService.user.api_token);
    return this.httpClient.get(this.employeeAPI + 'employee/department/' + dep_id, { headers: this.headers });
  }

}
