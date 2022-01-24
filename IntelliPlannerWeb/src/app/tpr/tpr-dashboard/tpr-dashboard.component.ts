import { Component, OnInit } from '@angular/core';
import { UtilityService } from '../../utility/utility.service';
import { LoginService } from '../../login/login.service';

@Component({
  selector: 'app-tpr-dashboard',
  templateUrl: './tpr-dashboard.component.html',
  styleUrls: ['./tpr-dashboard.component.scss']
})
export class TprDashboardComponent implements OnInit {

  TripCompleted: any;
  TripRunning: any;
  changetext:boolean=true;
  constructor(public utilService: UtilityService, public loginService: LoginService) { }

  ngOnInit() {
    this.loginService.getCounts().subscribe((res)=>{
      //  console.log(res);
        this.TripCompleted=res.TripCompleted;
        this.TripRunning=res.TripRunning;
      })
  }
  callChangeFunc(){
    if(!this.changetext){
      document.getElementById("changebuttontext").innerHTML="View More...";
      this.changetext=true;
    }else{
      document.getElementById("changebuttontext").innerHTML="View Less...";
      this.changetext=false;
    }
    
  }
}
