import { Component, OnInit } from '@angular/core';
import {Employee} from './Employee';
import {EmployeeService} from '../emp_service/employee.service';
import {Router} from '@angular/router';
import { FormsModule } from '@angular/forms';



@Component({
  selector: 'app-list-employee',
  templateUrl: './list-employee.component.html',
  styleUrls: ['./list-employee.component.css']
})
export class ListEmployeeComponent implements OnInit {
	employees: Employee[];
  constructor(private _empService:EmployeeService,private _router:Router) { }

  str:string="interpolation test";
  username:string;
  Books:any={
    "title1":"Angular",
    "title2":"JAVA",
    "title3":"HTML"
  }; 
  ngOnInit() {
  	this._empService.getEmployees().subscribe(
  		(listEmployees) => this.employees= listEmployees,
  		(err) => console.log(err)
  	);

  }


  editEmployee(id:number) :void{
	  this._router.navigate(['edit',id]);
  }
}
