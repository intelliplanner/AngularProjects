import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { MatTableDataSource } from '@angular/material';
import { ActivatedRoute, Router } from '@angular/router';
import { MasterService } from 'src/app/master.service';
import { SharedService } from 'src/app/shared/shared.service';

export interface PeriodicElement {
  Name: any;
  ApplicationNo: any;
  Status: any;
  Pen: any;
}
const ELEMENT_DATA: PeriodicElement[] = [
  {Name: 'John Greg', ApplicationNo: '11223321',  Status: 'Pending',Pen:'Pen no.' },

];

@Component({
  selector: 'app-know-your-application-status',
  templateUrl: './know-your-application-status.component.html',
  styleUrls: ['./know-your-application-status.component.scss']
})
export class KnowYourApplicationStatusComponent implements OnInit {
  displayedColumns: string[] = ['Name', 'ApplicationNo', 'Status', 'Pen','Submission Date','Reminder'];
  dataSource = new MatTableDataSource<any>();

  constructor(private masterService: MasterService,
    private _fb:FormBuilder,private route:ActivatedRoute,private router: Router, public sharedService: SharedService) { }

  ngOnInit() {
    let payload={
      mobile:localStorage.getItem('mobile'),
      teacherId:localStorage.getItem('teacherId'),
      email:localStorage.getItem('emailid'),
    }
    this.masterService.getTeacherPenDetailsStatus(payload).subscribe((res)=>{
      console.log(res);
      this.dataSource.data=[{'Name':res.name,'ApplicationNo':res.applicationNo,'Status':res.status,'Pen':res.pen,'submissionDate':res.submitionDate,'reminder':'check'}]
    })
  }

}
