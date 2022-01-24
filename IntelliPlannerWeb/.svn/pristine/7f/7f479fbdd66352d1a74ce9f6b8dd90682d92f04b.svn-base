import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { RegistrationComponent } from './registration.component';
import { SignupComponent } from './signup/signup.component';
import { SignupVerificationComponent } from './signup-verification/signup-verification.component';


const routes: Routes = [
  {
    path: '', component: RegistrationComponent,
    children: [
      { path: '', component: SignupComponent },
      { path: 'signup_verification', component: SignupVerificationComponent },
    ]
  }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class RegistrationRoutingModule { }
