import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { KnowYourApplicationStatusComponent } from './teacher/know-your-application-status/know-your-application-status.component';

import { TeacherComponent } from './teacher/teacher.component';
import { VerificationSuccessComponent } from './teacher/verification-success/verification-success.component';



const routes: Routes = [
  {
    path: '', component: TeacherComponent,

    // children: [
    //   { path:'knowyourstatus',component:KnowYourApplicationStatusComponent},
    // ]
  },
  { path:'knowyourstatus',component:KnowYourApplicationStatusComponent},
  { path:'verificationstatus',component:VerificationSuccessComponent},

    // children:[
    //   {path:'verification',component:EmailmobileverificationComponent},
    // ]
  
  
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UserRoutingModule { }
