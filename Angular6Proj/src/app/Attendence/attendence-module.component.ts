import { Component, OnInit } from '@angular/core';
import {FormGroup,FormControl,FormBuilder,FormArray,ReactiveFormsModule,Validators} from '@angular/forms'

@Component({
  selector: 'app-attendence-module',
  templateUrl: './attendence-module.component.html',
  styleUrls: ['./attendence-module.component.css']
})
export class AttendenceModuleComponent implements OnInit {

  attendenceForm:FormGroup;
  constructor(private fb:FormBuilder) { 

  }

  ngOnInit() {
  	this.attendenceForm=this.fb.group({
  		empName:['',Validators.required],
  		empEmail:['',Validators.email],
  		attendenceDate:['',Validators.required]
   	});
  }
  onSubmit():void{
  	console.log(this.attendenceForm.value);
  }
}
