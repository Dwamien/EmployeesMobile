import { Component, OnInit, Input, Output, EventEmitter  } from '@angular/core';
import { Department } from '../models/department';
import { CommonService } from '../services/common.service';

@Component({
  selector: 'app-department',
  templateUrl: './department.component.html'
})
export class DepartmentComponent implements OnInit {
  // Emetteur d'évènement exporté vers les
  // components qui utiliseront JobComponent
  @Output() private onChoose = new EventEmitter();
  // On exporte error car ce n'est JobComponent qui affiche les erreurs
  @Output() private error = new EventEmitter();
  // Propriété exportée par les components
  // qui appeleront DepartComponent
  @Input() public department_id: number;

  // Collection de départements qui seront
  // affichés dans la liste déroulante
  public departments: Department[];

  constructor(private commonService: CommonService) { }

  ngOnInit() {
    this.getDepartments();
  }

  /**
   * Récupérer auprès du service Common la
   * liste des departments
   */
  getDepartments() {
    this.commonService.getDepartments().subscribe(
      (departments) => { this.departments = departments; },
      (error) => { this.error.emit(error.error.message); }
    );
  }

  /**
   * Gestionnaire de l'évènement change de la liste déroulante
   * departments. On récupère l'id du département sélectionné et
   * Choose émet un évènement avec cet id en paramètre
   * @param value l'id du département sélectionné au format string
   */
  onChange(value: string) {
    this.department_id = +value;
    this.onChoose.emit(this.department_id);
  }

}
