import { Component, OnInit } from '@angular/core';
import { Employee } from '../models/employee';
import { EmployeeService } from '../services/employee.service';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { SharedService } from '../services/shared.service';

@Component({
  selector: 'app-employees',
  templateUrl: './employees.component.html'
})
export class EmployeesComponent implements OnInit {
  public employees: Employee[];
  private job_id: number;
  public title: string;
  public error: string;
  constructor(
    private employeeService: EmployeeService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private sharedService: SharedService
  ) { }

  /**
   * Si employees est appelé avec le paramètre job_id
   * c'est qu'on demande la liste des employés par Job
   * sinon, c'est qu'on demande la liste de tous les employés
   */
  ngOnInit() {
    this.job_id = +this.activatedRoute.snapshot.paramMap.get('job_id');
    if (this.job_id > 0) {
      this.getEmployeesByJob(this.job_id);
    } else {
      this.getEmployees();
    }
  }

  /**
   * Récupère la liste des employés ayant le job en paramètre.
   * @param job_id Id du Job auquel sont reliés les employés à lister
   */
  getEmployeesByJob(job_id: number): void {
    // On enregistre l'url qui nous amené ici de manière à pouvoir retourner
    // a la page après une suppression ou une modification
    this.sharedService.setOriginalUrl('/getEmployees/byJob/' + job_id);
    this.title = 'Liste des employés d\'un Job';
    // Appel à la méthode getEmployeesByJob du service EmployeeService
    this.employeeService.getEmployeesByJob(job_id).subscribe(
      (employees) => { this.employees = employees; },
      (error) => { this.error = error.error.message; }
    );
  }

  /**
   * Récupère la liste de tous les employés
   */
  getEmployees(): void {
    // On enregistre l'url qui nous amené ici de manière à pouvoir retourner
    // a la page après une suppression ou une modification
    this.sharedService.setOriginalUrl('/getEmployees');
    this.title = 'Liste de tous les employés';
    this.employeeService.getEmployees().subscribe(
      (employees) => { this.employees = employees; },
      (error) => { this.error = error.error.message; }
    );
  }

  /**
   * Recharge la liste des employés de manière à refléter les
   * modifications faites sur un delete
   * Cette méthode est déclenchée par l'EventEmitter (reload) de
   * EmpListComponent qui est appelé dans EmployeesComponent.HTML
   * (voir la vue associée)
   */
  reload(): void {
    if (this.job_id > 0) { // Si on a un job_id c'est qu'on vient de EmpByJobComponent
      this.getEmployeesByJob(this.job_id);
    } else {
      this.getEmployees();
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
}
