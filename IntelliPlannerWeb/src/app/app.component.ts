import { Component, ChangeDetectorRef, OnInit } from '@angular/core';
import { SharedService } from './shared/shared.service';
import { NavigationEnd, Router, Event  } from '@angular/router';
import { HeaderComponent } from './header/header.component';



@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'PPGCL Trip';
  descriptionConfig: any
  showSidebar: boolean;
  show: boolean;
  config: boolean;

  currentUrl: string;
  paymenturl:string;
  myvar:any;
  pstatus:any;
  constructor(public sharedService: SharedService, public _router: Router,
    public header: HeaderComponent, public cdRef: ChangeDetectorRef) {

      _router.events.subscribe((event: Event) => {
        if (event instanceof NavigationEnd ) {
          this.currentUrl = event.url;
          console.log(this.currentUrl);
         // console.log(this.currentUrl);
          this.myvar = this.currentUrl.split("test/");
         //  console.log(this.myvar);
           this.myvar = '/test/'+this.myvar[1];
        
        //  if(this.currentUrl==='/paymentstatus')
        //  {
        //    this.pstatus='/paymentstatus';
        //    // this.pstatus = this.currentUrl.split("paymentstatus");
        //    // if(this.pstatus[0]=='paymentstatus')
        //    // {
        //    //   this.pstatus ='/paymentstatus';
        //    // }
        //  } 
        //  if(this.currentUrl==='admin/paymentstatus'){
        //    //console.log("hello");
        //    this.pstatus=this.currentUrl.split("admin/");
        //    this.pstatus='/paymentstsatus';
        //   // console.log(this.pstatus);
        //  }
        //  if(this.currentUrl==='/paymentfail')
        //  {
        //    this.pstatus='/paymentfail';
        //  }
        }
      })
  }

  ngOnInit() {
  }
  ngAfterViewChecked() {
    this.cdRef.detectChanges();
  }
 
}
