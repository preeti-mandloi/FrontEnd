import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  RouterStateSnapshot,
  UrlTree,
} from '@angular/router';
import { Observable } from 'rxjs';
import { Login } from 'src/app/models/product';

const TOKEN_KEY = 'user-check';

@Injectable({
  providedIn: 'root',
})
export class AuthenticationService implements CanActivate {
  private login: boolean = false;

  constructor() {}
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ):
    | boolean
    | UrlTree
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree> {
    // throw new Error('Method not implemented.');
    if (localStorage.getItem('user-check')) {
      return true;
    }
    return false;
  }

  setlogin(user: Login): boolean {
    if (user.username === 'test' && user.password === 'test') {
      this.login = true;
      localStorage.removeItem(TOKEN_KEY);
      localStorage.setItem(TOKEN_KEY, 'logged');
    } else {
      console.error('invalid login user');
    }
    return this.login;
  }
}
