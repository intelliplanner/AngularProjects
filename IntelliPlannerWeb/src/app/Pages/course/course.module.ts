import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AngularMaterialModule } from 'src/app/angular-material.module';
import { NgxPaginationModule } from 'ngx-pagination';
import { CourseComponent } from './course.component';
import { CourseRoutingModule } from './course-routing.module';


@NgModule({
  declarations: [CourseComponent],
  imports: [
    CommonModule,
    CourseRoutingModule,
    AngularMaterialModule,FormsModule,ReactiveFormsModule,NgxPaginationModule
  ]
})
export class CourseModule { }
