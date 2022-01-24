import { Component, OnInit } from '@angular/core';
import {FormGroup,FormBuilder,Validators} from '@angular/forms'
@Component({
  selector: 'app-create-student',
  templateUrl: './create-student.component.html',
  styleUrls: ['./create-student.component.css']
})
export class CreateStudentComponent implements OnInit {
	studentNameLength = 0;
	studentForm:FormGroup;

  constructor(private fb:FormBuilder) { }

  ngOnInit() {
	this.studentForm = this.fb.group({
		studentName:['',Validators.required],
		studentEmail:['',Validators.required], 
		studentSkills:this.fb.group({
			skillsName:['',Validators.required],
			experianceInYear:['',Validators.required],
			proficiency:['']

		})
	});	

	this.studentForm.get('studentName').valueChanges.subscribe((value:any)=>{
		// this.studentNameLength = JSON.stringify(value).length;
		this.studentNameLength = value.length;
		console.log(this.studentNameLength);	
	});


  }

onSubmit():void{
  	console.log(this.studentForm.value);
  	console.log(this.studentForm.controls.studentName.value);
  	console.log(this.studentForm.controls.studentEmail.touched);
  	console.log(this.studentForm.get("studentName").value);
  }
loadDataFunc():void{
		this.studentForm.setValue({
			studentName: "dsdc",
    		studentEmail: "dsds",
    		studentSkills: {
    			skillsName: "sdds",
    			experianceInYear: "5",
    			proficiency: "beginner"
   			 }
	})	
	}


}
