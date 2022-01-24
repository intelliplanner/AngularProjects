import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import {HttpClientModule} from '@angular/common/http';
import { FormsModule,ReactiveFormsModule } from '@angular/forms';

import { AppRoutingModule } from './route/app-routing.module';
import { EmployeeService } from './emp_service/employee.service';

import { Vehicle } from './Vehicle';
import { CreateStudentComponent } from './student/create-student.component';
import { CreateEmployeeComponent } from './employee/create-employee.component';
import { ListEmployeeComponent } from './employee/list-employee.component';
import { IpssiEmployeeComponent } from './ipssi_employees/ipssi-employee.component';
import { IpssiEmployeeService } from './emp_service/ipssi_employee.service';
import { AttendenceModuleComponent } from './Attendence/attendence-module.component';
import { CreateIpssiEmployeeComponent } from './ipssi_employees/create-ipssi-employee.component';
import { RedblackDirectiveDirective } from './redblack-directive.directive';
import { CreateJavanotesComponent } from './javapoint/javanotes_create/create-javanotes.component';
import { ShowJavanotesComponent } from './javapoint/javanotes_show/show-javanotes.component';
import { CreateJavatopicsComponent } from './javapoint/javatopic_create/create-javatopics.component';
import { CreateJavatopicExtendedComponent } from './javapoint/javatopic_extended_create/create-javatopic-extended.component';
import {JavaNotesServiceService} from './javapoint_service/java-notes-service.service';
import { ShowJavatopicsComponent } from './javapoint/javatopic_show/show-javatopics.component';
import { ShowJavatopicsExtendedComponent } from './javapoint/javatopic_extended_show/show-javatopics-extended.component';
import { MobileShopCreateComponent } from './Mobile/mobile_shop_create/mobile-shop-create.component';
import { MobileShopShowComponent } from './Mobile/mobile_shop_show/mobile-shop-show.component';
import { MobileCreateComponent } from './Mobile/mobile_create/mobile-create.component';



@NgModule({
  declarations: [
    AppComponent,
    CreateEmployeeComponent,
    ListEmployeeComponent,
    CreateStudentComponent,
    IpssiEmployeeComponent,
    AttendenceModuleComponent,
    CreateIpssiEmployeeComponent,
    RedblackDirectiveDirective,

    CreateJavanotesComponent,
    ShowJavanotesComponent,
    CreateJavatopicsComponent,
    CreateJavatopicExtendedComponent,
    ShowJavatopicsComponent,
    ShowJavatopicsExtendedComponent,
    MobileShopCreateComponent,
    MobileShopShowComponent,
    MobileCreateComponent  
  ],
  imports: [
    BrowserModule,
      FormsModule,
      HttpClientModule,
      AppRoutingModule,
      ReactiveFormsModule
  ],
  
  providers: [EmployeeService,IpssiEmployeeService,JavaNotesServiceService],  
  bootstrap: [AppComponent]
})

export class AppModule {
    
 }







