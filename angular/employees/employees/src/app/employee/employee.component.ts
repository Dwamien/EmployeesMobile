import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { Location } from '@angular/common';
import { EmployeeService } from '../services/employee.service';
import { SharedService } from '../services/shared.service';
import { CommonService } from '../services/common.service';
import { Employee } from '../models/employee';
import { Job } from '../models/job';
import { Department } from '../models/department';

@Component({
  selector: 'app-employee',
  templateUrl: './employee.component.html'
})
export class EmployeeComponent implements OnInit {

  public employee: Employee;
  public employee_id: number;
  public title: string;
  public error: string;
  public departments: Department[];
  public jobs: Job[];

  /**
   * Les services en paramètre sont injectés dans le composant
   * @param employeeService  Accès à la base de données pour Employee
   * @param commonService Accès à la base de données pour Job et Department
   * @param router Routage
   * @param activatedRoute Route active
   * @param location Historique du navigateur
   * @param sharedService Propriétés globales
   */
  constructor(
    private employeeService: EmployeeService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private commonService: CommonService,
    private location: Location,
    private sharedService: SharedService
  ) { }

  ngOnInit() {
    this.employee = new Employee();
    this.employee_id = +this.activatedRoute.snapshot.paramMap.get('employee_id');
    if (this.employee_id > 0) {
      this.title = 'Modifier un employé';
      this.getEmployee(this.employee_id);
    } else {
      this.title = 'Ajouter un employé';
    }
  }

  /**
   * Valide l'enregistrement de l'ajout ou de la modification
   * d'un employé. Si id > 0 c'est une mise à jour sinon
   * c'est un ajout.
   * @param id Id de l'employé à modifier
   */
  validateEmployee(id: number) {
    if (id > 0) {
      if (isNaN(this.employee.job_id)) { // Vérifier qu'un Job a bien été sélectionné
        this.error = 'Vous devez sélectionner un job !';
      } else {
        if (isNaN(this.employee.department_id)) { // idem pour département
          this.error = 'Vous devez sélectionner un département !';
        } else {
          this.employeeService.updateEmployee(this.employee).
            subscribe(() => {
              // Récupérer l'url d'origine déposée lors de la demande de modification
              const originalUrl: string = this.sharedService.getOriginalUrl();
              this.router.navigate([originalUrl]);
            },
            error => { this.error = error.error.message; });
        }

      }
    } else {
      this.employeeService.addEmployee(this.employee).
        subscribe(() => { }, // L'API ne retournant rien, il n'y a rien à faire
        error => { this.error = error.error; },
        // Si tout s'est bien passé ou qu'il n'y a pas eu d'erreur
        // on redirige vers la liste des employés
        () => { this.router.navigate(['/getEmployees']); });
    }
  }

  /**
   * Gestionnaire du clic sur le bouton Annuler
   * Si l'id est > 0 c'est qu'on est dans une modification,
   * on retourne à la page précédente, sinon c'est qu'on est
   * dans un ajout, on se redirige vers la page d'accueil
   * @param id Id de l'emplyé en cours de modification
   */
  cancel(id: number) {
    if (id > 0) {
      this.location.back();
    } else {
      this.router.navigate(['/home']);
    }
  }

  /**
   * Message envoyé par JobComponent ou DepartmentComponent
   * s'il y a eu une erreur, car l'affichage des erreurs
   * se fait ici
   * @param message Message d'erreur
   */
  getError(message: string) {
    this.error = message;
  }

  /**
   * Lecture de l'employé à modifier
   * @param id Id de l'employé à lire
   */
  getEmployee(id: number) {
    this.employeeService.getEmployee(id).subscribe(
      (employee) => { this.employee = employee; },
      (error) => { this.error = error.error.message; }
    );
  }

  /**
   * La méthode reçoit job_id envoyé par l'évènement
   * onChoose de JobComponent
   * @param job_id id du job sélectionné
   */
  jobSelected(job_id: number): void {
    this.employee.job_id = job_id;
  }

  /**
   * La méthode reçoit department_id envoyé par l'évènement
   * onChoose de DepComponent
   * @param department_id id du département sélectionné
   */
  departmentSelected(department_id: number): void {
    this.employee.department_id = department_id;
  }
}
