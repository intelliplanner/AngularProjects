import { Component, ViewChild,OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { MatTableDataSource } from '@angular/material';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { MasterService } from 'src/app/master.service';
import { MatPaginator, MatSort } from '@angular/material';

@Component({
  selector: 'app-transporter-details',
  templateUrl: './transporter-details.component.html',
  styleUrls: ['./transporter-details.component.scss']
})
export class TransporterDetailsComponent implements OnInit {

  displayedColumns: string[] = ['Transporter Name', 'Created Date', 'Status', 'Actions'];
  dataSource: any;
  @ViewChild(MatPaginator, { static: false }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: false }) sort: MatSort;
  length = 100;
  pageSize = 25;
  pageSizeOptions: number[] = [10, 50, 100];
  transporterList: any = [];
  noRecords: boolean;
  constructor(private masterService: MasterService,
    private _fb: FormBuilder, private route: ActivatedRoute, private router: Router) {
  }

  ngOnInit() {
  
    this.masterService.getTransporterList().subscribe((res) => {
      console.log(res);
      debugger

      this.transporterList = res.serviceResponse;
      if (this.transporterList.length == 0) {
        this.noRecords = true;
      }
      else {
        this.noRecords = false;
      }

      this.dataSource = new MatTableDataSource(this.transporterList.data);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;


    })
  }

}
