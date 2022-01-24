import { Component, OnInit } from '@angular/core';
import { UserAuthService } from 'src/app/service/user-auth.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {

  constructor(public _userAuthService: UserAuthService) { }

  ngOnInit() {
  }

  logout(){
    this._userAuthService.logout();
  }

}
