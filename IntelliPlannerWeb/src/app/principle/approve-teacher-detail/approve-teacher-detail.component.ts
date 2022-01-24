import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { MasterService } from 'src/app/master.service';
import { SharedService } from 'src/app/shared/shared.service';
import { MatCheckboxChange, DateAdapter, MAT_DATE_FORMATS } from '@angular/material';
import { AppDateAdapter, APP_DATE_FORMATS  } from '../../shared/format-datepicker';

@Component({
  selector: 'app-approve-teacher-detail',
  templateUrl: './approve-teacher-detail.component.html',
  styleUrls: ['./approve-teacher-detail.component.scss'],
  providers: [
    { provide: DateAdapter, useClass: AppDateAdapter },
    { provide: MAT_DATE_FORMATS, useValue: APP_DATE_FORMATS }
  ]
})
export class ApproveTeacherDetailComponent implements OnInit {
  TeacherUdiseFormTable: FormGroup;
  sumitted=false;
  flag=false;
  imagedata:File=null;

  genderList: any=[];
  classList: any=[];
  natureOfAppointmentList: any=[];
  teacherTypeList: any=[];

  academicQualificaiton: any;
  professionalQualification: any;
  teacherProfileHistroyId: any;
  loginid: any;
  teacherProfileHistoryId: any;
  updateteacherProfileHistoryId: any;
  disabledButton: boolean=false;

  
  constructor(private masterService: MasterService,
    private _fb:FormBuilder,private route:ActivatedRoute,private router: Router,public sharedService: SharedService) { }

  ngOnInit() {

    this.route.params.forEach((params:Params)=>{
      this.teacherProfileHistroyId = params['id'];
    });
    console.log(this.teacherProfileHistroyId);
    let payloadid={
      id:this.teacherProfileHistroyId
    }
    this.masterService.getTeacherProfileHistory(payloadid).subscribe((res)=>{
      console.log(res);
      if(res==null){
        this.disabledButton=true;
        console.log("already processed");
        this.sharedService.global_loader = false;
        this.sharedService.global_notification = [];
        this.sharedService.global_notification.push(
          { severity: 'error', detail: 'This profile has already processed.' }
        );

      }else{
        console.log(res.id);
        this.loginid=res.loginId;
        this.updateteacherProfileHistoryId=res.id;
  
        let dd= res.dob.split('T');
  
        this.TeacherUdiseFormTable.patchValue({
          uname: res.name,
          uGender:res.gender.toString(),
          udate:dd[0],
          utypeofteacher:res.tch_type.toString(),
          // highestQualification:'',
          // professinalQualification:'',
          unatureofAppointment:res.nature_of_appt.toString(),
          uclassesTaught:res.class_taught.toString(),
          uemailid:res.email,
          umobileNo:res.mobile,
          upresentSchool:res.udise_sch_code,
          
        })
        this.getUpdateAcademicQualificationName(res.qual_acad);
        this.getUpdateProfessionalQualificationName(res.qual_prof);
  
        let payload={
          id:res.loginId
        }
        console.log(payload)
        this.masterService.getTeacherDataById(payload).subscribe((data)=>{
          console.log(data);
       
          this.academicQualificaiton=data.qual_acad;
          this.professionalQualification=data.qual_prof;
          let dd= data.dob.split('T');
          console.log(dd[0]);
          this.TeacherUdiseFormTable.patchValue({
            name: data.name,
            Gender:data.gender.toString(),
            date:new Date(dd[0]),
            typeofteacher:data.tch_type.toString(),
            // highestQualification:'',
            // professinalQualification:'',
            natureofAppointment:data.nature_of_appt.toString(),
            classesTaught:data.class_taught.toString(),
            emailid:data.email,
            mobileNo:data.mobile,
            presentSchool:data.udise_sch_code,
  
  
  
  
          })
    
          this.getAcademicQualificationName(data.qual_acad);
          this.getProfessionalQualificationName(data.qual_prof);
        },
        err => {
           console.log(err)
        });
      }

    })
    
    this.TeacherUdiseFormTable= this._fb.group({
      name:['',Validators.required],
      Gender:['',Validators.required],
      date:['',Validators.required],
      typeofteacher:['',Validators.required],
      highestQualification:['',Validators.required],
      professinalQualification:['',Validators.required],
      natureofAppointment:['',Validators.required],
      classesTaught:['',Validators.required],
      emailid:['',Validators.required],
      mobileNo:['',Validators.required],
      presentSchool:['',Validators.required],
      
      uname:['',Validators.required],
      uGender:['',Validators.required],
      udate:['',Validators.required],
      utypeofteacher:['',Validators.required],
      uhighestQualification:['',Validators.required],
      uprofessinalQualification:['',Validators.required],
      unatureofAppointment:['',Validators.required],
      uclassesTaught:['',Validators.required],
      uemailid:['',Validators.required],
      umobileNo:['',Validators.required],
      upresentSchool:['',Validators.required],

      remark:['',]
    })

    this.getGenderList();
    this.getClasslist();
    this.getNatureOfAppointmentList();
    this.getTeachersTypeList();
  
  }
  getAcademicQualificationName(id){
    let payload={
      id:id
    }
    this.masterService.getAcademicQualificationName(payload).subscribe((res)=>{
     // console.log(res)
   
      this.TeacherUdiseFormTable.patchValue({
        highestQualification:res.value,
      })
    })
  }
  getUpdateAcademicQualificationName(id){
    let payload={
      id:id
    }
    this.masterService.getAcademicQualificationName(payload).subscribe((res)=>{
     // console.log(res)
   
      this.TeacherUdiseFormTable.patchValue({
        uhighestQualification:res.value,
      })
    })
  }
  getProfessionalQualificationName(id){
    let payload={
      id:id
    }
    this.masterService.getProfessionalQualificationName(payload).subscribe((res)=>{
     // console.log(res)
    
      this.TeacherUdiseFormTable.patchValue({
        professinalQualification:res.value,
      })
    })
  }
  getUpdateProfessionalQualificationName(id){
    let payload={
      id:id
    }
    this.masterService.getProfessionalQualificationName(payload).subscribe((res)=>{
     // console.log(res)
    
      this.TeacherUdiseFormTable.patchValue({
        uprofessinalQualification:res.value,
      })
    })
  }
  getGenderList(){
    this.masterService.getGenderList().subscribe((res)=>{
      console.log(res);
      this.genderList=res.data.result;
      // for (const key in res) {
      //   this.genderList.push({'id':key,'name':res[key]});
      // }

     // console.log(this.genderList);

    });
  }
  getClasslist(){
    this.masterService.getClassList().subscribe((res)=>{
     // console.log(res);
     this.classList=res.data.result;
      // for (const key in res) {
      //   this.classList.push({'id':key,'name':res[key]});
      // }
    //  console.log(this.classList);
    });
  }
  getNatureOfAppointmentList(){
    this.masterService.getNatureOfAppointmentList().subscribe((res)=>{
     // console.log(res);
     this.natureOfAppointmentList=res.data.result;
      // for (const key in res) {
      //   this.natureOfAppointmentList.push({'id':key,'name':res[key]});
      // }
    //  console.log(this.natureOfAppointmentList);
    });
  }
  getTeachersTypeList(){
    this.masterService.getTeachersTypeList().subscribe((res)=>{
     // console.log(res)
     this.teacherTypeList=res.data.result;
      // for (const key in res) {
      //   this.teacherTypeList.push({'id':key,'name':res[key]});
      // }
    //  console.log(this.teacherTypeList);
    
    
    });
  }

onSubmit(){

}

approvOrRejctFunc(value){
//console.log(value);
let payload={
  "loginId": this.loginid,
  "remarks": this.TeacherUdiseFormTable.get('remark').value,
  "status": "string",
  "teacherProfileHistoryId": this.updateteacherProfileHistoryId
}
if(value==1){
  //approve
  payload.status='approved'
  console.log(payload);
   this.masterService.updateTeacherProfileHistoryStatus(payload).subscribe((res)=>{
     console.log(res);
     this.sharedService.global_loader = false;
     this.sharedService.global_notification = [];
     this.sharedService.global_notification.push(
       { severity: 'success', detail: 'This profile has been approved successfully.' }
     );
     document.getElementById('approvebutton')
     this.disabledButton=true;
   },
   err => {
     console.log(err);
     this.sharedService.global_loader = false;
     this.sharedService.global_notification = [];
     this.sharedService.global_notification.push(
       { severity: 'error', detail: err.error.message }
     );
   })

}
if(value==2){
  //reject
  payload.status='rejected';
  console.log(payload);
  this.masterService.updateTeacherProfileHistoryStatus(payload).subscribe((res)=>{
    console.log(res);
    this.sharedService.global_loader = false;
    this.sharedService.global_notification = [];
    this.sharedService.global_notification.push(
      { severity: 'success', detail: "This profile has been rejected successfully."}
    );
    this.disabledButton=true;
  },
  err => {
    console.log(err);
    this.sharedService.global_loader = false;
    this.sharedService.global_notification = [];
    this.sharedService.global_notification.push(
      { severity: 'error', detail: err.error.message }
    );
  })
}
}
  

}
