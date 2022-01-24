import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ListTprComponent } from './list-tpr/list-tpr.component';
import { CreateUpdateTprComponent } from './create-update-tpr/create-update-tpr.component';
import { TransporterDetailsComponent } from './transporter-details/transporter-details.component';
import { CreateUpdateTransporterComponent } from './create-update-transporter/create-update-transporter.component';

const routes: Routes = [
  {path:'/tpr/tprDetails',component:ListTprComponent},
  {path:'/tpr/createUpdateTpr:id',component:CreateUpdateTprComponent},

  {path:'/tpr/transporterDetails',component:TransporterDetailsComponent},
  {path:'/tpr/createUpdateTransporter:id',component:CreateUpdateTransporterComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TprRoutingModule { }
