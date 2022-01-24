import { Component, OnInit } from '@angular/core';
import { NgModule } from '@angular/core';
import { Routes, Params, RouterModule } from '@angular/router';


import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { MasterService } from 'src/app/master.service';
import { SharedService } from 'src/app/shared/shared.service';
import { MatCheckboxChange, DateAdapter, MAT_DATE_FORMATS } from '@angular/material';
import { AppDateAdapter, APP_DATE_FORMATS } from '../../shared/format-datepicker';

@Component({
  selector: 'app-create-update-tpr',
  templateUrl: './create-update-tpr.component.html',
  styleUrls: ['./create-update-tpr.component.scss']
})
export class CreateUpdateTprComponent implements OnInit {


  TableFormData: FormGroup;
  sumitted = false;
  flag = false;
  // imagedata: File = null;
  // genderList: any = [];
  // classList: any = [];
  // natureOfAppointmentList: any = [];
  // teacherTypeList: any = [];
  // academicQualificaiton: any;
  // professionalQualification: any;
  tprId: any;
  vehicle: any;
  customer: any;
  tare: any;
  gross: any;
  transporter: any;
  payloaddata: any = {};


  constructor(private masterService: MasterService,
    private _fb: FormBuilder, private route: ActivatedRoute, private router: Router, public sharedService: SharedService) { }

  ngOnInit() {

    this.route.params.forEach((params: Params) => {
      this.tprId = params['id'];
    });

    this.TableFormData = this._fb.group({
      tprId: ['', Validators.required],
      vehicle: ['', Validators.required],
      customer: ['', Validators.required],
      tare: ['', Validators.required],
      gross: ['', Validators.required],
      transporter: ['', Validators.required],
    })

    let payload = {
      id: this.tprId,
    }
    this.masterService.getTprById(payload.id).subscribe((res) => {
      console.log(res);
      debugger
      this.payloaddata = res.serviceResponse;

      this.TableFormData.patchValue({
        tprId: this.payloaddata.data[0].tpr_id,
        vehicle: this.payloaddata.data[0].vehicle_name,
        customer: this.payloaddata.data[0].consignee_name,
        gross: this.payloaddata.data[0].load_gross,
        tare: this.payloaddata.data[0].load_tare,
        transporter: this.payloaddata.data[0].transporter_code
      })

    },
      err => {
        console.log(err)
      })



  }

  onSubmit() {

  }
}
