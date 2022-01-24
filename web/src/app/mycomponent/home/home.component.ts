import { Component, OnInit } from '@angular/core';
import { UserAuthService } from 'src/app/service/user-auth.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor(public _userAuthService: UserAuthService) { }

  ngOnInit() {

    

  }

}
