import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RegistrationRoutingModule } from './registration-routing.module';
import { RegistrationComponent } from './registration.component';
import { AngularMaterialModule } from '../angular-material.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SignupComponent } from './signup/signup.component';
import { SignupVerificationComponent } from './signup-verification/signup-verification.component';


@NgModule({
  declarations: [RegistrationComponent,SignupVerificationComponent,SignupComponent],
  imports: [
    CommonModule,
    RegistrationRoutingModule,
    AngularMaterialModule,
    ReactiveFormsModule,FormsModule
  ]
})
export class RegistrationModule { }
