import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Job } from '../models/job';
import { CommonService } from '../services/common.service';

@Component({
  selector: 'app-job',
  templateUrl: './job.component.html'
})
export class JobComponent implements OnInit {
  // Emetteur d'évènement exporté vers les
  // components qui utiliseront JobComponent
  @Output() private onChoose = new EventEmitter();
  // On exporte error car ce n'est JobComponent qui affiche les erreurs
  @Output() private error = new EventEmitter();
  // Propriété exportée par les components
  // qui appeleront JobComponent
  @Input() public job_id: number;

  public jobs: Job[];

  constructor(private commonService: CommonService) { }
  ngOnInit() {
    this.getJobs();
  }
  /**
   * Récupérer auprès du service Common la
   * liste des jobs
   */
  getJobs() {
    this.commonService.getJobs().subscribe(
      (jobs) => { this.jobs = jobs },
      (error) => { this.error.emit(error.error.message); }
    );
  }
  /**
   * Gestionnaire de l'évènement change de la liste déroulante
   * jobs. On récupère l'id du job sélectionné et Choose émet
   * un évènement avec cet id en paramètre
   * @param value l'id du job sélectionné au format string
   */
  onChange(value: string) {
    this.job_id = +value;
    this.onChoose.emit(this.job_id);
  }
}
