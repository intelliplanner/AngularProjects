import { Component, OnInit } from '@angular/core';
import { UrlCallService } from 'src/app/service/url-call.service';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.css']
})
export class TableComponent implements OnInit {

  tableData: any;
  dataLoaded: boolean = false;
  constructor(public _urlService:UrlCallService) { }

  ngOnInit() {

    this._urlService.getTable().subscribe((data)=>{
      this.tableData = data;
      this.dataLoaded = true;
    });



  }

}
