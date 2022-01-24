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
  selector: 'app-create-update-transporter',
  templateUrl: './create-update-transporter.component.html',
  styleUrls: ['./create-update-transporter.component.scss']
})
export class CreateUpdateTransporterComponent implements OnInit {


  constructor(private masterService: MasterService,
    private _fb: FormBuilder, private route: ActivatedRoute, private router: Router, public sharedService: SharedService) { }


  TableFormData: FormGroup;
  sumitted = false;
  flag = false;
  imagedata: File = null;
  genderList: any = [];
  classList: any = [];
  natureOfAppointmentList: any = [];
  teacherTypeList: any = [];
  academicQualificaiton: any;
  professionalQualification: any;
  id: any;
  status: any;
  name: any;
  date: any;
  payloaddata: any = {};

  ngOnInit() {

    this.route.params.forEach((params: Params) => {
      this.id = params['id'];
    });

    this.TableFormData = this._fb.group({
      name: ['', Validators.required],
      status: ['', Validators.required],
      date: ['', Validators.required],
    })

    let payload = {
      id: this.id,
    }
    this.masterService.getTransporterById(payload).subscribe((res) => {
      console.log(res);
      this.payloaddata = res.serviceResponse;
      this.TableFormData.patchValue({
        id: this.payloaddata.data[0].id,
        status: this.payloaddata.data[0].status,
        name: this.payloaddata.data[0].name,
        date: this.payloaddata.data[0].created_on,
      })
    },
      err => {
        console.log(err)
      })

  }

  onSubmit() {

  }
}
