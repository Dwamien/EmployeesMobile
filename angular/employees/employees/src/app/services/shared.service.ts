import { Injectable } from '@angular/core';
import { User } from '../models/user';

@Injectable({
  providedIn: 'root'
})
export class SharedService {
  public isConnected: boolean;
  private originalUrl: string;
  public user: User;

  public setOriginalUrl(url: string) :void {this.originalUrl=url;}
  public getOriginalUrl() {
    let url: string = this.originalUrl;
    if (url === '')
      url = '/home';
    this.originalUrl = ''; // Effacer l'url que l'on vient d'utiliser
    return url;
  }

  constructor() { }
}
