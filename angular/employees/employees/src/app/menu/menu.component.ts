import { Component, OnInit } from '@angular/core';
import { SharedService } from '../services/shared.service';
import { Router } from '@angular/router';
import { LoginService } from '../services/login.service';
import { User } from '../models/user';


@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html'
})
export class MenuComponent implements OnInit {
  public error: string;
  public user: User;

  constructor(
    public sharedService: SharedService,
    private router: Router,
    private loginService: LoginService
    ) { }

  ngOnInit() {
    this.sharedService.isConnected = false;
    this.logout();
  }

  public logout(): void {
    this.loginService.logout().subscribe(
      (msg) => {
        this.sharedService.isConnected = false;
        this.router.navigate(['/home']);
      },
      (error) => { this.error = error.error.message; }
    );
  }

}
