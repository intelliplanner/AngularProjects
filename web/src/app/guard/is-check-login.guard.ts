import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { UserAuthService } from '../service/user-auth.service';

@Injectable({
  providedIn: 'root'
})
export class IsCheckLoginGuard implements CanActivate {

  constructor(private _useAuthServeice: UserAuthService, private _router: Router){}

  canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean  {

    if(this._useAuthServeice.isLogined()){
      return this._useAuthServeice.isLogined();
    }else{
      this._router.navigate(['/login']);
      return false;
    }

  }

 
  
}
