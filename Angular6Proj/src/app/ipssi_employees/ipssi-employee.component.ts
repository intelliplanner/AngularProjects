import { Component, OnInit } from '@angular/core';
import {IpssiEmployees} from './IpssiEmployees';
import {IpssiEmployeeService} from '../emp_service/ipssi_employee.service';
import {Router} from '@angular/router';
import { Observable,Subject } from "rxjs";  

@Component({
  selector: 'app-ipssi-employee',
  templateUrl: './ipssi-employee.component.html',
  styleUrls: ['./ipssi-employee.component.css']
})
export class IpssiEmployeeComponent implements OnInit {
ipssi_employees: IpssiEmployees[];

 // ipssi_employees: Observable<IpssiEmployees>;  
 // dtTrigger: Subject<any>= new Subject();  
  constructor(private _empService:IpssiEmployeeService,private _router:Router) { }

  ngOnInit() {
  /*	this._empService.getIpssiEmployees().subscribe(
  		(ipssiEmployees) => this.ipssi_employees = ipssiEmployees,
  		(err) => console.log(err),

  	);*/

  	  this._empService.getIpssiEmployees().subscribe(data =>{  
       this.ipssi_employees = data;  
 		  console.log(data)    ;
 		  //this.dtTrigger.next();  
    });

 

  }



     editIpssiEmployee(emp_id:number){
        this._router.navigate(['/edit_ipssi_employees',emp_id]);
      };


}
