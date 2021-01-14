import { Component, OnInit } from '@angular/core';
import { SharedService } from '../services/shared.service';
import { LoginService } from '../services/login.service';
import { Router } from '@angular/router';
import { User } from '../models/user';

declare function replier(): any;

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html'
})
export class LoginComponent implements OnInit {
  public title: string;
  public error: string;
  public user: User;

  constructor(
    private sharedService: SharedService,
    private router: Router,
    private loginService: LoginService
    ) { }

  ngOnInit() {
    this.title = "Connexion";
    this.sharedService.isConnected = false;
    this.user = new User();
  }

  public login(): void {
    this.loginService.getUser(this.user).subscribe(
      (user) => {
        replier();
        this.user = user;
        this.sharedService.isConnected = true;
        this.sharedService.user = this.user;
        this.router.navigate(['/home']);
      },
      (error) => {
        this.error = error.error.message;
      }
    );
  }
}
