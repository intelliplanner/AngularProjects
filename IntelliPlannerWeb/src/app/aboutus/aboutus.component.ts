import { Component, OnInit } from '@angular/core';
import { LoginService } from 'src/app/login/login.service';
import { UtilityService } from 'src/app/utility/utility.service';

@Component({
  selector: 'app-aboutus',
  templateUrl: './aboutus.component.html',
  styleUrls: ['./aboutus.component.scss']
})
export class AboutusComponent implements OnInit {
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
