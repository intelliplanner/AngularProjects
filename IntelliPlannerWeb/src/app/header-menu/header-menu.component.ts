import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoginService } from '../login/login.service';
import { SharedService } from '../shared/shared.service';

@Component({
  selector: 'app-header-menu',
  templateUrl: './header-menu.component.html',
  styleUrls: ['./header-menu.component.scss']
})
export class HeaderMenuComponent implements OnInit {
  showLogout: boolean=false;
  showLoginButton: any=false;

  constructor(public router: Router, public sharedService: SharedService,public loginService:LoginService) { }

  ngOnInit() {
    console.log(this.showLogout)
    console.log(this.showLoginButton)
  }
  ngDoCheck() {
    if(sessionStorage.getItem('Token')){
      this.showLogout=true;
    }

    this.sharedService.getLoginButton.subscribe(res => {
     // console.log(res);
      if (res != 0) {
        this.showLoginButton = res;
      } else {
        this.showLoginButton = false;
      }
    })
  }
  Logout(){
    this.showLogout=false;
    sessionStorage.clear();
     this.router.navigate(['/login']);
  }
  login() {
    this.sharedService.setLoginButton(false);
    this.router.navigateByUrl('/login');
  }
}
