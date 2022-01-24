import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginKnowYourStatusComponent } from './login-know-your-status/login-know-your-status.component';
import { ShowKnowYourStatusComponent } from './show-know-your-status/show-know-your-status.component';


const routes: Routes = [
  {path:'',component:LoginKnowYourStatusComponent},
  {path:'status/:id',component:ShowKnowYourStatusComponent},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class KnowyourstatusRoutingModule { }
