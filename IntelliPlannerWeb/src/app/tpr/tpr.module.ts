import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ReactiveFormsModule} from '@angular/forms';
import { AngularMaterialModule } from '../angular-material.module';

import { TprRoutingModule } from './tpr-routing.module';
import { FormsModule } from '@angular/forms';
import { ListTprComponent } from './list-tpr/list-tpr.component';
import { CreateUpdateTprComponent } from './create-update-tpr/create-update-tpr.component';
import { DialogModule } from 'primeng/primeng';

@NgModule({
  declarations: [ListTprComponent,CreateUpdateTprComponent],
  imports: [
    AngularMaterialModule,
    CommonModule,
    TprRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    DialogModule
  ]
})
export class TprModule { }
