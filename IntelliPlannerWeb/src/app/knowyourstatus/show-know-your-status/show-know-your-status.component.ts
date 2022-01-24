import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { MatTableDataSource } from '@angular/material';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { MasterService } from 'src/app/master.service';
import { SharedService } from 'src/app/shared/shared.service';

export interface PeriodicElement {
  Name: any;
  ApplicationNo: any;
  Status: any;
  Pen: any;
}
const ELEMENT_DATA: PeriodicElement[] = [
  {Name: 'John Greg', ApplicationNo: '11223321',  Status: 'Pending',Pen:'Pen no.' ,},

];
@Component({
  selector: 'app-show-know-your-status',
  templateUrl: './show-know-your-status.component.html',
  styleUrls: ['./show-know-your-status.component.scss']
})
export class ShowKnowYourStatusComponent implements OnInit {
  displayedColumns: string[] = ['Name', 'ApplicationNo', 'Status', 'Pen','Submission Date','Reminder'];
  dataSource = new MatTableDataSource<any>();
  teacherId: any;

  constructor(private masterService: MasterService,
    private _fb:FormBuilder,private route:ActivatedRoute,private router: Router, public sharedService: SharedService) { }

    ngOnInit() {
      this.route.params.forEach((params:Params)=>{
        this.teacherId = params['id'];
      });

      let payload={
        mobile:localStorage.getItem('kysmobile'),
        teacherId:this.teacherId,
        email:localStorage.getItem('kysemail'),
      }
      this.masterService.getTeacherPenDetailsStatus(payload).subscribe((res)=>{
        console.log(res);
        this.dataSource.data=[{'Name':res.name,'ApplicationNo':res.applicationNo,'Status':res.status,'Pen':res.pen,'submissionDate':res.submitionDate,'reminder':'check'}]
      })
    }

}
