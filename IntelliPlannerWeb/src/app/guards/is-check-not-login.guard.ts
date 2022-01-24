import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { LoginService } from '../login/login.service';


@Injectable({
  providedIn: 'root'
})
export class IsCheckNotLoginGuard implements CanActivate {

  constructor( private _router: Router,private loginService:LoginService){}

  canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
   console.log(this.loginService.isLogined())
      if(!this.loginService.isLogined()){
        return !this.loginService.isLogined();
      }else{
        this._router.navigate(['/teacher/reg/teacheredit']);
        return true;
      }

  }

  
  
}
