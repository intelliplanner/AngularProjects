
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { MasterService } from 'src/app/master.service';
import { SharedService } from 'src/app/shared/shared.service';
import { MatCheckboxChange, DateAdapter, MAT_DATE_FORMATS } from '@angular/material';
import { AppDateAdapter, APP_DATE_FORMATS  } from '../../shared/format-datepicker';


@Component({
  selector: 'app-teacher',
  templateUrl: './teacher.component.html',
  styleUrls: ['./teacher.component.scss'],
  providers: [
    { provide: DateAdapter, useClass: AppDateAdapter },
    { provide: MAT_DATE_FORMATS, useValue: APP_DATE_FORMATS }
  ]
})
export class TeacherComponent implements OnInit {
  TableFormData: FormGroup;
  sumitted=false;
  flag=false;
  imagedata:File=null;
  genderList: any=[];
  classList: any=[];
  natureOfAppointmentList: any=[];
  teacherTypeList: any=[];
  academicQualificaiton: any;
  professionalQualification: any;

  payloaddata:any={};

  constructor(private masterService: MasterService,
    private _fb:FormBuilder,private route:ActivatedRoute,private router: Router, public sharedService: SharedService) { }

  ngOnInit() {
    this.TableFormData= this._fb.group({
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
    })

   let payload={
     
      id:localStorage.getItem('useridd'),
    }
    this.masterService.getTeacherDataById(payload).subscribe((data)=>{
      console.log(data);
      
      this.payloaddata=data;
      this.academicQualificaiton=data.qual_acad;
      this.professionalQualification=data.qual_prof;
      let dd= data.dob.split('T');
      localStorage.setItem('emailid',data.email);
      localStorage.setItem('mobile',data.mobile);
      localStorage.setItem('teacherId',data.teacher_id);
      console.log(dd[0]);

      this.TableFormData.patchValue({
        name: data.name,
        Gender:data.gender.toString(),
        date:dd[0],
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
    })
    
    this.TableFormData.controls['emailid'].disable();
    this.TableFormData.controls['mobileNo'].disable();

    this.getGenderList();
    this.getClasslist();
    this.getNatureOfAppointmentList();
    this.getTeachersTypeList();
  
  }

  onSubmit(){
    //console.log(this.TableFormData.value);
    if(this.TableFormData.invalid){
      return
    }
    else{

      this.academicQualificaiton;
      this.professionalQualification;

      let payload={
        id:'13951069',
        name:this.TableFormData.get('name').value,
        Gender:this.TableFormData.get('Gender').value,
        date:this.TableFormData.get('date').value,
        typeofteacher:this.TableFormData.get('typeofteacher').value,
        highestQualification:this.academicQualificaiton,
        professinalQualification:this.professionalQualification,
        natureofAppointment:this.TableFormData.get('natureofAppointment').value,
        classesTaught:this.TableFormData.get('classesTaught').value,
        emailid:this.TableFormData.get('emailid').value,
        mobileNo:this.TableFormData.get('mobileNo').value,
        presentSchool:this.TableFormData.get('presentSchool').value,
      }
     this.payloaddata.name=this.TableFormData.get('name').value;
     this.payloaddata.gender=this.TableFormData.get('Gender').value;
     this.payloaddata.dob=this.TableFormData.get('date').value;
     this.payloaddata.tch_type=this.TableFormData.get('typeofteacher').value;
     this.payloaddata.nature_of_appt=this.TableFormData.get('natureofAppointment').value;
     this.payloaddata.class_taught=this.TableFormData.get('classesTaught').value;
     this.payloaddata.email=this.TableFormData.get('emailid').value;
     this.payloaddata.mobile=this.TableFormData.get('mobileNo').value;
     this.payloaddata.udise_sch_code=this.TableFormData.get('presentSchool').value;
 
      console.log(this.payloaddata);
    
     this.masterService.saveTeacherProfileHistory(this.payloaddata).subscribe((res)=>{
       console.log(res);
       if(res.status==200){
        this.sharedService.global_loader = false;
        this.sharedService.global_notification = [];
        this.sharedService.global_notification.push(
          { severity: 'success', detail: res.message }
        );
        this.router.navigate(['teacher/reg/teacheredit/verificationstatus']);
        this.TableFormData.reset();
       }

     },
   err => {
     console.log(err.error.message);
     this.sharedService.global_loader = false;
     this.sharedService.global_notification = [];
     this.sharedService.global_notification.push(
       { severity: 'error', detail: err.error.message }
     );
   });

    }

  }

  getGenderList(){
    this.masterService.getGenderList().subscribe((res)=>{
     // console.log(res)
      this.genderList=res.data.result;
    //  console.log(this.genderList)
      // for (const key in res.data.result) {
      //   this.genderList.push({'id':key,'name':res[key]});
      // }

     // console.log(this.genderList);

    });
  }
  getClasslist(){
    this.masterService.getClassList().subscribe((res)=>{
    //  console.log(res);
      this.classList=res.data.result;
      // for (const key in res) {
      //   this.classList.push({'id':key,'name':res[key]});
      // }
    // console.log(this.classList);
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
      console.log(res)
      this.teacherTypeList=res.data.result;
      // for (const key in res) {
      //   this.teacherTypeList.push({'id':key,'name':res[key]});
      // }
      console.log(this.teacherTypeList);
    
    
    });
  }
  getAcademicQualificationName(id){
    let payload={
      id:id
    }
    this.masterService.getAcademicQualificationName(payload).subscribe((res)=>{
     // console.log(res)
   
      this.TableFormData.patchValue({
        highestQualification:res.value,
      })
    })
  }
  getProfessionalQualificationName(id){
    let payload={
      id:id
    }
    this.masterService.getProfessionalQualificationName(payload).subscribe((res)=>{
     // console.log(res)
    
      this.TableFormData.patchValue({
        professinalQualification:res.value,
      })
    })
  }




}
