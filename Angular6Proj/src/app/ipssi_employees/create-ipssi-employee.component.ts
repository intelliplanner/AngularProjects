 import { Component, OnInit } from '@angular/core';
import { ActivatedRoute,Router } from '@angular/router';
import {FormGroup,FormControl,FormBuilder,ReactiveFormsModule,Validators} from '@angular/forms'
import {IpssiEmployeeService} from '../emp_service/ipssi_employee.service';
import {IpssiEmployees} from './IpssiEmployees';
@Component({
  selector: 'app-create-ipssi-employee',
  templateUrl: './create-ipssi-employee.component.html',
  styleUrls: ['./create-ipssi-employee.component.css'],
})
export class CreateIpssiEmployeeComponent implements OnInit {

	testEmpForm:FormGroup;
	ipssiEmp:IpssiEmployees;
	// fullNameLength=0;

	validatorMessages={
			'firstName':{
				'required':"Must be required",
				'minLength':"min lenth 2",
				'maxLength':"max length 10"	
			
			},
			'lastName':{
				'required':"Must be required",
				'minLength':"min lenth 2",
				'maxLength':"max length 10"	
			},
			'email':{
				'required':"Must be required"
			},
			'phoneNo':{
				'required':"Must be required"
			},
			
			'jobId':{
				'required':"Must be required"
			},
			'salary':{
				'required':"Must be required"
			},
			'managerId':{
				'required':"Must be required"
			},
			'departmentId':{
				'required':"Must be required"
			}
	};


	formErrors:{
			id:'',
			firstName:'',
			lastName:'',
			email:'',
			phoneNo:'',
			hireDate:'',
			jobId:'',
			salary:'',
			managerId:'',
			departmentId:''
	};
  
  constructor(private fb:FormBuilder ,  private route:ActivatedRoute ,private ipssiService:IpssiEmployeeService,private router:Router) { }

  ngOnInit() {
   	this.testEmpForm= this.fb.group({
  			firstName:['',[Validators.required,Validators.minLength(2),Validators.maxLength(10)]],
			lastName:['',[Validators.required,Validators.minLength(2),Validators.maxLength(10)]],
			email:['',Validators.required],
			phoneNo:['',Validators.required],
			hireDate:['',Validators.required],
			jobId:['',Validators.required],
			salary:['',Validators.required],
			managerId:['',Validators.required],
			departmentId:['',Validators.required]
  	});

 // this.testEmpForm.get("firstName").valueChanges.subscribe(value =>{
 //  	console.log(value);
 //  	this.fullNameLength=value.length;
 //  });

 // this.testEmpForm.valueChanges.subscribe((value:any )=>{
 //  	console.log(JSON.stringify(value));
 //  });


  	 this.route.paramMap.subscribe(params=>{
  	  	const emp_id= +params.get('id');
  	  	if(emp_id){ 
  	  		 this.getEmployee(emp_id);
  	  	}
  	  });
  }


onSubmit():void{
	//this.mapFormValuesToEmployeeModel();
	if(this.testEmpForm.value.id){
	this.ipssiService.updateIpssiEmployee(this.testEmpForm.value).subscribe(
		() => this.router.navigate(['list']),
		(err:any)=>console.log(err)
	);
	}else {
		this.ipssiService.addIpssiEmployee(this.testEmpForm.value).subscribe(
		() => this.router.navigate(['list']),
		(err:any)=>console.log(err)
	);
	}
	this.testEmpForm.reset();
}


loadDataFunc():void {
	this.logKeyValuePair(this.testEmpForm);
}

logKeyValuePair(grouping:FormGroup):void{
	Object.keys(grouping.controls).forEach((key:string)=>{
		const abstarctControl=grouping.get(key);
		if(abstarctControl instanceof FormGroup){
			this.logKeyValuePair(abstarctControl);
		}else{
			// console.log("key:"+key +" value:"+   abstarctControl.value);
		
				// abstarctControl.disable();
			abstarctControl.markAsDirty();
		}
	});

}

mapFormValuesToEmployeeModel():void{
	this.ipssiEmp.id=this.testEmpForm.value.id;
	this.ipssiEmp.firstName=this.testEmpForm.value.firstName;
	this.ipssiEmp.lastName=this.testEmpForm.value.lastName;
	this.ipssiEmp.email=this.testEmpForm.value.email;
	this.ipssiEmp.jobId=this.testEmpForm.value.jobId;
	this.ipssiEmp.departmentId=this.testEmpForm.value.departmentId;
	this.ipssiEmp.salary=this.testEmpForm.value.salary;
	this.ipssiEmp.phoneNo=this.testEmpForm.value.phoneNo;
	// this.ipssiEmp.hireDate=this.testEmpForm.value.hireDate;
	this.ipssiEmp.managerId=this.testEmpForm.value.managerId;
}

getEmployee(id:number){
 this.ipssiService.getIpssiEmployeeById(id).subscribe(
 	(employee:IpssiEmployees) => {
 		this.editEmployees(employee)
 		this.ipssiEmp=employee;
 	},
 	(err:any) => console.log(err)
 );
}

editEmployees(employee:IpssiEmployees){
	this.testEmpForm.patchValue({
		    firstName:employee.firstName,
			lastName:employee.lastName,
			email:employee.email,
			phoneNo:employee.phoneNo,
			// hireDate:employee.hireDate,
			jobId:employee.jobId,
			salary:employee.salary,
			managerId:employee.managerId,
			departmentId:employee.departmentId
	}); 

}




}
