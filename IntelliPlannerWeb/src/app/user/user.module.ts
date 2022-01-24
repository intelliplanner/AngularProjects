import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserRoutingModule } from './user-routing.module';
import { TeacherComponent } from './teacher/teacher.component';

import { AngularMaterialModule } from '../angular-material.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { KnowYourApplicationStatusComponent } from './teacher/know-your-application-status/know-your-application-status.component';
import { VerificationSuccessComponent } from './teacher/verification-success/verification-success.component';


@NgModule({
  declarations: [TeacherComponent, KnowYourApplicationStatusComponent, VerificationSuccessComponent],
  imports: [
    AngularMaterialModule,
    CommonModule,
    UserRoutingModule,
    ReactiveFormsModule,
    FormsModule
  ]
})
export class UserModule { }
