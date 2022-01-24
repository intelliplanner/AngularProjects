import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router, CanActivateChild } from '@angular/router';
import { Observable } from 'rxjs';
import { LoginService } from '../login/login.service';


@Injectable({
  providedIn: 'root'
})
export class IsCheckLoginGuard implements CanActivate,CanActivateChild {

  constructor( private _router: Router,private loginService:LoginService){}

  canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean  {

    if(this.loginService.isLogined()){
      return this.loginService.isLogined();
    }else{
      this._router.navigate(['/teacher/reg/login']);
      return false;
    }

  }
  canActivateChild(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): boolean {
    return this.canActivate(route, state);
  }
 
  
}
