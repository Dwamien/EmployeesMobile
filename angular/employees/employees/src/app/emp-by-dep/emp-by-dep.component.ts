import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { CommonService } from '../services/common.service';
import { EmployeeService } from '../services/employee.service';
import { SharedService } from '../services/shared.service';
import { Employee } from '../models/employee';

@Component({
  selector: 'app-emp-by-dep',
  templateUrl: './emp-by-dep.component.html'
})
export class EmpByDepComponent implements OnInit {
  public department_id: number;
  public employees: Employee[];
  public title: string;
  public error: string;

  constructor(
    private employeeService: EmployeeService,
    private commonService: CommonService,
    private activatedRoute: ActivatedRoute,
    private sharedService: SharedService
  ) { }

  /**
   * Si on arrive avec un dep_id en paramètre c'est que
   * l'on veut réafficher la liste des employés d'un
   * département après une suppression d'un employé
   * Sinon c'est qu'on veut simplement afficher la
   * liste déroulante des départements.
   * Remarque : c'est DepartmentComponent qui charge cette liste
   */
  ngOnInit() {
    this.title = 'Liste des employés d\'un Département';
    const dep_id: number = +this.activatedRoute.snapshot.paramMap.get('department_id');
    if (dep_id > 0) {
      this.depSelected(dep_id);
    }
  }

  /**
   * Méthode associée à l'évènement généré par
   * la sélection d'un département dans la liste déroulante.
   * On appelle la méthode qui charge les employés du département
   * @param dep_id Id du département sélectionné
   */
  depSelected(dep_id: number): void {
    this.department_id = dep_id;
    this.getEmployeesByDep(dep_id);
  }

  /**
   * Chargement de la liste des employés rattachés au
   * département passé en paramètre
   * @param dep_id Id du département
   */
  getEmployeesByDep(dep_id: number): void {
    this.sharedService.setOriginalUrl('/getEmployees/byDep/' + this.department_id);
    this.employeeService.getEmployeesByDep(dep_id).subscribe(
      (employees) => { this.employees = employees; },
      (error) => { this.error = error.error.message; }
    );
  }

  /**
   * Méthode associée à l'évènement reload qui indique
   * qu'on a supprimé un employé dans la liste des
   * employés d'un département.
   * On recharge les données pour régénérer la vue
   */
  reload(): void {
    this.getEmployeesByDep(this.department_id);
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
