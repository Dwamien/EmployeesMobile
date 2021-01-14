import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-emp-by-job',
  templateUrl: './emp-by-job.component.html'
})
export class EmpByJobComponent implements OnInit {
  public title: string;
  public error: string;
  public job_id: number;
  constructor(private router: Router) { }

  ngOnInit() {
    this.title = 'Choix d\'un Job';
  }

  /**
   * A réception de lid du job sélectionné, on redirige
   * vers getEmployees/byJob/ avec la valeur de l'id
   * @param job_id Id du job (au format string) envoyé
   * par l'EventEmitter Choose de JobComponent
   */
  jobSelected(job_id: number): void {
    this.job_id = job_id;
    this.router.navigate(['/getEmployees/byJob/' + job_id]);
  }

  /**
   * Méthode associée à l'évènement reload qui indique
   * qu'on a supprimé un employé dans la liste des
   * employés d'un Job.
   * On recharge les données pour régénérer la vue par
   * une redirection vers le composant qui s'en chage
   */
  reload(): void {
    this.router.navigate(['/getEmployees/byJob/' + this.job_id]);
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
