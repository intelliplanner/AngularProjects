import { Component, ViewChild,Inject, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { MatTableDataSource } from '@angular/material';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { MasterService } from 'src/app/master.service';
import { MatPaginator, MatSort } from '@angular/material';
import { AbstractControl, FormGroup,  Validators } from '@angular/forms';


import { RegistrationService } from '../../registration/registration.service';
import { DomSanitizer } from '@angular/platform-browser';

import { DOCUMENT } from '@angular/common';

import { GlobalService } from '../../utility/global.serivce';
import { UtilityService } from '../../utility/utility.service';
import { environment } from 'src/environments/environment';


export interface PeriodicElement {
  Name: any;
  ApplicationNo: any;
  Status: any;
  Pen: any;
}
const ELEMENT_DATA: PeriodicElement[] = [
  { Name: 'John Greg', ApplicationNo: '11223321', Status: 'Pending', Pen: 'Pen no.', },

];
@Component({
  selector: 'app-list-tpr',
  templateUrl: './list-tpr.component.html',
  styleUrls: ['./list-tpr.component.scss']
})
export class ListTprComponent implements  OnInit, OnDestroy  {
  displayedColumns: string[] = ['Tpr Id', 'Vehicle', 'TPR Status', 'Customer', 'Line No', 'Transporter', 'Load Tare', 'Load Gross', 'Net Wt','Invoice No' ,'Gate In','Tare','Gross','Gate Out', 'Actions'];

  // <!-- SELECT tpr.tpr_id,tpr.vehicle_id,tpr.tpr_status,tpr.material_code_id,tpr.reporting_status,"
  // + "tpr.ex_invoice,tpr.consignee_name,tpr.do_number, tpr.product_code,tpr.load_tare, tpr.load_gross,"
  // + "tpr.earliest_load_gate_in_in, tpr.latest_load_gate_in_out,"
  // + "tpr.earliest_load_wb_in_in,tpr.latest_load_wb_in_out,"
  // + "tpr.earliest_load_wb_out_in tpr.latest_load_wb_out_out,"
  // + "tpr.earliest_load_gate_out_in, tpr.latest_load_gate_out_out " -->

  searchText:any;
  dataSource: any;
  // emailForm: FormGroup;

  @ViewChild(MatPaginator, { static: false }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: false }) sort: MatSort;
  length = 100;
  pageSize = 25;
  pageSizeOptions: number[] = [10, 50, 100];
  tprList: any = [];
  tprForm: FormGroup;
  salesOrderForm: FormGroup;
  display: boolean;
  backdrop: boolean;
  noRecords: boolean;

  constructor(@Inject(DOCUMENT) private document: Document,private masterService: MasterService,
    private _fb: FormBuilder, private route: ActivatedRoute, private router: Router) {
      this.tprForm = this._fb.group({
        searchText: ['', []]
      });
  }

  openDialog() {
    this.display = true;
    this.backdrop = true;
  }
  hideDialog() {
    this.display = false;
    this.backdrop = false;
    this.salesOrderForm.reset();
  }
  getTprDataList(){
    debugger
    if (this.tprForm.controls['searchText'].value) {
      this.searchText = this.tprForm.controls['searchText'].value
      this.masterService.getTprById(this.searchText).subscribe((res) => {
        console.log(res);
        this.initializeData(res.serviceResponse);
      })

    } else {
      this.searchText = '';
      this.masterService.getTprList().subscribe((res) => {
        console.log(res);
        this.initializeData(res.serviceResponse);
      })
    }

  }

initializeData(resData:any){
  this.tprList = resData;
  if (this.tprList.length == 0) {
    this.noRecords = true;
  }
  else {
    this.noRecords = false;
  }
  this.dataSource = new MatTableDataSource(this.tprList.data);
  this.dataSource.paginator = this.paginator;
  this.dataSource.sort = this.sort;
}

  ngOnInit() {
    this.masterService.getTprList().subscribe((res) => {
      console.log(res);
      debugger
      this.initializeData(res.serviceResponse);
    })
  }
  ngOnDestroy() {
   
  }

  submit(){

  }
}
