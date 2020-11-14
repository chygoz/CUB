import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthGuardService implements CanActivate{
  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean | Observable<boolean> | Promise<boolean> {
    let token = localStorage.getItem('token');
    console.log(token);
    if(token == ''){
      this.router.navigateByUrl('/login');
      return false;
    } 
    return true;
  }

  constructor(private router: Router) { }
}
