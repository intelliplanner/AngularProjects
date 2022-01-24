import { Component, OnInit } from '@angular/core'; 
import {FormGroup,FormControl,ReactiveFormsModule} from '@angular/forms'
import {ActivatedRoute} from '@angular/router'
import {EmployeeService} from '../emp_service/employee.service';
import {Employee} from './Employee';
import {Skills} from './Skills';

@Component({
  selector: 'app-create-employee',
  templateUrl: './create-employee.component.html',
  styleUrls: ['./create-employee.component.css']
})
export class CreateEmployeeComponent implements OnInit {
	empForm:FormGroup;
  	constructor(private activateRoute:ActivatedRoute, private empService:EmployeeService) { }

  ngOnInit() {
  	this.empForm = new FormGroup({
	  empName: new FormControl(),
    empEmail: new FormControl(),
    empSkills: new FormGroup({
    	skillsName: new FormControl(),
    	experianceInYear: new FormControl(),
    	proficiency: new FormControl()
    })
  		});

    this.empForm.valueChanges.subscribe(params=>{
      const empId = +params.get('id');
      if(empId){
        this.getEmployee(empId);
      }
    });
  }


  getEmployee(empId:number){
      this.empService.getEmployee(empId).subscribe( 
          (employee:Employee)=>this.editEmployee(employee),
          (err:any)=> console.log(err)
        );
  }

  editEmployee(employee:Employee){
    this.empForm.patchValue({
      empName:employee.fullName,
        empEmail: employee.email,
        empSkills: {
          skillsName: "",
          experianceInYear:"" ,
          proficiency: "beginner"
          }
  });
  }

  onSubmit():void{
  	console.log(this.empForm.value);
  	console.log(this.empForm.controls.empName.value);
  	console.log(this.empForm.controls.empEmail.touched);
  	console.log(this.empForm.get("empName").value);
  }
	loadDataFunc():void{
		this.empForm.setValue({
			empName: "dsdc",
    		empEmail: "dsds",
    		empSkills: {
    			skillsName: "sdds",
    			experianceInYear: "5",
    			proficiency: "beginner"
   			 }
	})	
	}


}
