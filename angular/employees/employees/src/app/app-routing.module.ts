import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { HomeComponent } from './home/home.component';
import { MenuComponent } from './menu/menu.component';
import { EmployeesComponent } from './employees/employees.component';
import { EmployeeComponent } from './employee/employee.component';
import { EmpByJobComponent } from './emp-by-job/emp-by-job.component';
import { EmpByDepComponent } from './emp-by-dep/emp-by-dep.component';

const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'logout', component: MenuComponent },
  { path: 'home', component: HomeComponent },
  { path: 'getEmployees',
    children: [
        { path: '', component: EmployeesComponent },
        { path: 'byJob', component: EmpByJobComponent },
        { path: 'byJob/:job_id', component: EmployeesComponent },
        { path: 'byDep', component: EmpByDepComponent },
        { path: 'byDep/:department_id', component: EmpByDepComponent }
      ],
  },
  { path: 'detailEmployee/:employee_id', component: EmployeeComponent },
  { path: 'addEmployee', component: EmployeeComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
