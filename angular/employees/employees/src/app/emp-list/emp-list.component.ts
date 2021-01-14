import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Employee } from '../models/employee';
import { EmployeeService } from '../services/employee.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-emp-list',
  templateUrl: './emp-list.component.html'
})
export class EmpListComponent implements OnInit {
  // Pour avertir les composants parents que la suppression
  // a été effectuée et qu'il faut recharger la liste
  @Output() public reload = new EventEmitter();
  // Collection des employee fournie par les composants appelants
  @Input() public employees: Employee[];
  // Pour faire remonter l'erreur au composants appelants
  @Output() public error = new EventEmitter();

  constructor(
    private employeeService: EmployeeService,
    private router: Router
  ) { }

  ngOnInit() {
  }
  /**
   * Appel le composant qui affichera le détail de
   * l'employé dont l'Id est passé en paramètre
   * @param employee_id Id de l'employé sur lequel on a cliqué
   */
  detail(employee_id: number) {
    this.router.navigate(['/detailEmployee/' + employee_id]);
  }

  /**
   * Suppression d'un employé
   * @param id Id de l'employé à supprimer
   */
  delete(id: number) {
    this.employeeService.deleteEmployee(id).
      subscribe(() => { }, // l'API ne retourne rien, il n'a donc rien à faire
      (error) => { this.error = error.error.message; alert(this.error);},
      // Action à réaliser après succes ou erreur
      () => {
        this.reload.emit(); // On indique au composant appelant qu'il faut recharger la liste
      });
  }

}
