import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { LoginService } from 'src/app/login/login.service';
import { MasterService } from 'src/app/master.service';
import { SharedService } from 'src/app/shared/shared.service';

@Component({
  selector: 'app-login-know-your-status',
  templateUrl: './login-know-your-status.component.html',
  styleUrls: ['./login-know-your-status.component.scss']
})
export class LoginKnowYourStatusComponent implements OnInit {
  TableFormData: FormGroup;
  submitted=false;
  totalRecordPenDetails: any;
  totalRequestReceived: any=0;
  changetext: any=true;
  constructor(private _fb:FormBuilder,private masterService: MasterService,private router: Router,private loginService:LoginService,public sharedService: SharedService) { }

  ngOnInit() {
    if(localStorage.getItem('kysemail') || localStorage.getItem('kysmobile')){
      localStorage.removeItem('kysemail');
      localStorage.removeItem('kysmobile');
    }
    this.TableFormData= this._fb.group({
      email:['',[Validators.required,Validators.email]],
      mobile:['',Validators.required],
    })


    this.loginService.getTotalRecordCountPenDetails().subscribe((res)=>{
     // console.log(res);
      this.totalRecordPenDetails=res.totalRecordPenDetails;
      this.totalRequestReceived=res.requestReceived;
    })

    
  }
  get f(){return this.TableFormData.controls;}

 onSubmit(){
   console.log(this.TableFormData.value)
   this.submitted=true;
   if(this.TableFormData.invalid){
     return;
   }else{

    // this.clearForm();
    // this.submitted=true;
    let payload={
      email:this.TableFormData.get('email').value,
      mobile:this.TableFormData.get('mobile').value
    }
    
     this.masterService.getTeacherDataByEmailAndMobile(payload).subscribe((res)=>{
       console.log(res);
       if(res){
         localStorage.setItem('kysemail',this.TableFormData.get('email').value);
         localStorage.setItem('kysmobile',this.TableFormData.get('mobile').value);
        this.router.navigate(['/teacher/reg/knowyourstatus/status/'+res.teacher_id])
       }
       if(res==null){
        this.sharedService.global_loader = false;
        this.sharedService.global_notification = [];
        this.sharedService.global_notification.push(
          { severity: 'error', detail: 'Invalid Email Id or Mobile......' }
        );
       }
     },
     err => {
       this.sharedService.global_loader = false;
       this.sharedService.global_notification = [];
       this.sharedService.global_notification.push(
         { severity: 'error', detail: 'Invalid Email Id or Mobile......' }
       );
     }
     );

   }
 }
 clearForm(){
   this.TableFormData.reset();
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
