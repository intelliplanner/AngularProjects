import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { StandaloneRoutingModule } from './standalone-routing.module';
import { StandaloneComponent } from './standalone.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AngularMaterialModule } from 'src/app/angular-material.module';
import { NgxPaginationModule } from 'ngx-pagination';


@NgModule({
  declarations: [StandaloneComponent],
  imports: [
    CommonModule,
    StandaloneRoutingModule,
    AngularMaterialModule,FormsModule,ReactiveFormsModule,NgxPaginationModule
  ]
})
export class StandaloneModule { }
