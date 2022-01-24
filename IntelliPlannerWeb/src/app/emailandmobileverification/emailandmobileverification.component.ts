import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { LoginService } from '../login/login.service';
import { MasterService } from '../master.service';

@Component({
  selector: 'app-emailandmobileverification',
  templateUrl: './emailandmobileverification.component.html',
  styleUrls: ['./emailandmobileverification.component.scss']
})
export class EmailandmobileverificationComponent implements OnInit, AfterViewInit {
  mobileOptIsDone=false;
  emailOptIsDone=false;

  @ViewChild('emailid',{static:false}) emailid :ElementRef;
  totalRecordPenDetails: any;
  totalRequestReceived: any=0;
  changetext: any=true;

  constructor(private _fb:FormBuilder,private masterService: MasterService,private router: Router,private loginService:LoginService) { }

  TableFormData: FormGroup;
  sumitted=false;

  emailoptshow=false;
  mobileoptshow=false;

  emailOtpErrorShow=false;
  mobileOtpErrorShow=false;
  message:string;

  ngOnInit() {
    this.TableFormData= this._fb.group({
      email:['',[Validators.required,Validators.email]],
      emailopt:['',Validators.required],
      mobile:['',Validators.required],
      mobileopt:['',Validators.required],
    })

    this.loginService.getTotalRecordCountPenDetails().subscribe((res)=>{
      //  console.log(res);
        this.totalRecordPenDetails=res.totalRecordPenDetails;
        this.totalRequestReceived=res.requestReceived;
      })
  
  }
  ngAfterViewInit(){
    
  }
  get f(){return this.TableFormData.controls};
  
  onSubmit(){

   console.log(this.TableFormData)
    if(this.TableFormData.invalid){
      return
    }
    else{
          let mb=this.TableFormData.get('mobile').value;
          let email=this.TableFormData.get('email').value;
          localStorage.setItem('mb',mb);
          localStorage.setItem('email',email);
          this.router.navigate(['/teacher/reg/createlogindetail']);
    }
  }

  verifyEmail(email){
   console.log(email!='');
      
 
      let payload={
        email:email
      }
      if(email!=''){

        this.masterService.sendEmailOpt(payload).subscribe((data)=>{
          console.log("opt sent successfully to email",data);
          this.emailoptshow=true;
        })
      }
   }
  verifyEmailOtp(emailopt){
    console.log(emailopt);
    let payload={
      otpType:'email',
      emailOrMobile:this.TableFormData.get('email').value,
      otp:emailopt
    }
    if(emailopt!=''){
      this.masterService.verifyEmailOrMobileOpt(payload).subscribe((res)=>{
        console.log("Email opt is verified.",res);
        this.emailOptIsDone=true;
        this.emailoptshow=false;
        document.getElementById('emailid').innerHTML="Verified";
        document.getElementById('emailid').style.color="green";
        document.getElementById('emailid').style.fontWeight="600";
        document.getElementById('emailid').setAttribute('disabled','disabled');

      }, err => {
        console.log(err.error.message);
        this.emailOtpErrorShow=true;
        this.message=err.error.message;
        // this.sharedService.global_loader = false;
        // this.sharedService.global_notification = [];
        // this.sharedService.global_notification.push(
        //   { severity: 'error', detail: err.error.message }
        // );
      })
    }

  }


  verifyMobile(mobile){
   console.log(mobile);
   let payload={
    mobileopt:mobile
  }
  if(mobile!=''){
    this.masterService.sendMobileOpt(payload).subscribe((data)=>{
      console.log("opt sent successfully to mobile.",data);
      this.mobileoptshow=true;
      
    })
  }



  }
  verifyMobileOpt(mobileotp){
   console.log(mobileotp);
   let payload={
    otpType:'mobile',
    emailOrMobile:this.TableFormData.get('mobile').value,
    otp:mobileotp
  }
  if(mobileotp!=''){
    this.masterService.verifyEmailOrMobileOpt(payload).subscribe((res)=>{
      console.log("mobile opt is verified.",res);
      this.mobileOptIsDone=true;
      this.mobileoptshow=false;
      document.getElementById('mobileid').innerHTML="Verified";
      document.getElementById('mobileid').style.color="green";
      document.getElementById('mobileid').style.fontWeight="600";
      document.getElementById('mobileid').setAttribute('disabled','disabled');
    }, err => {
      console.log(err.error.message);
      this.mobileOtpErrorShow=true;
      this.message=err.error.message;
      // this.sharedService.global_loader = false;
      // this.sharedService.global_notification = [];
      // this.sharedService.global_notification.push(
      //   { severity: 'error', detail: err.error.message }
      // );
    })
    }
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
