import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  loggedIn: boolean = false;

  constructor(private router: Router) { }

  isLoggedIn(): boolean {
    return this.loggedIn;
  }

  logIn(userName: string, password: string): boolean {
    if (userName === 'admin' && password === 'admin') {
      this.loggedIn = true;
      this.router.navigate(['app']);
      return true;
    }

    return false;
  }

  logout() {
    this.loggedIn = false;
    this.router.navigate(['login']);
  }
}
