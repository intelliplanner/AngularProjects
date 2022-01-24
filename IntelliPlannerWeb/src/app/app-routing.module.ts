import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './login/login.component';
// import { AboutusComponent } from './aboutus/aboutus.component';
import { ContactusComponent } from './contactus/contactus.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { ForgotPasswordComponent } from './forgot-password/forgot-password.component';
import { DetailsComponent } from './details/details.component';

import { IsCheckLoginGuard } from './guards/is-check-login.guard';
import { CreateLoginDetailComponent } from './create-login-detail/create-login-detail.component';
import { EmailandmobileverificationComponent } from './emailandmobileverification/emailandmobileverification.component';
import { ApproveTeacherDetailComponent } from './principle/approve-teacher-detail/approve-teacher-detail.component';
import { IsCheckNotLoginGuard } from './guards/is-check-not-login.guard';
import { CreateUpdateTprComponent } from './tpr/create-update-tpr/create-update-tpr.component';
import { CreateUpdateTransporterComponent } from './tpr/create-update-transporter/create-update-transporter.component';
import { ListTprComponent } from './tpr/list-tpr/list-tpr.component';
import { TransporterDetailsComponent } from './tpr/transporter-details/transporter-details.component';
import { TprDashboardComponent } from './tpr/tpr-dashboard/tpr-dashboard.component';



const appRoutes: Routes = [
  { path: '', redirectTo: 'intelli/ppgcl/login', pathMatch: 'full' },
  { path: 'login', redirectTo: 'intelli/ppgcl/login', pathMatch: 'full' },
  { path: 'intelli/ppgcl/login', component: LoginComponent, canActivate: [IsCheckNotLoginGuard] },
  { path: 'tpr/transporterDetails', component: TransporterDetailsComponent },
  { path: 'tpr/createUpdateTransporter/:id', component: CreateUpdateTransporterComponent },
  { path: 'tpr/tprDetails', component: ListTprComponent },
  { path: 'tpr/createUpdateTpr/:id', component: CreateUpdateTprComponent },
  { path: 'tpr/tprDashBoard', component: TprDashboardComponent },
  // { path: 'forgot-password', component: ForgotPasswordComponent },
  // { path: 'aboutus', component: AboutusComponent },
  // { path: 'details', component: DetailsComponent },

  // { path: 'contactus', component: ContactusComponent, },

  // { path: 'teacher/reg/createlogindetail', component: CreateLoginDetailComponent},
  // { path: 'teacher/reg/emailandmobileverification', component: EmailandmobileverificationComponent },
  // { path: 'teacher/reg/approveteacherdetail', component: ApproveTeacherDetailComponent },

  // { path: 'teacher/reg/teacheredit',canActivate:[IsCheckLoginGuard],loadChildren:()=>import('./user/user.module').then(m=>m.UserModule)},
  // { path: 'teacher/reg/knowyourstatus',loadChildren:()=>import('./knowyourstatus/knowyourstatus.module').then(m=>m.KnowyourstatusModule)},

  // {path: 'tpr/transporterDetails',loadChildren:()=>import('./tpr/tpr.module').then(m=>m.TprModule)}, 



  // { path: 'tpr/tprDetails',loadChildren:()=>import('./tpr/tpr.module').then(m=>m.TprModule)}, 



  // { path: 'signup', loadChildren: () => import('./registration/registration.module').then(m => m.RegistrationModule) },
  // { path: 'university', loadChildren: () => import('./Pages/university/university.module').then(m => m.UniversityModule) },
  // { path: 'standalone', loadChildren: () => import('./Pages/standalone/standalone.module').then(m => m.StandaloneModule) },
  // { path: 'college', loadChildren: () => import('./Pages/college/college.module').then(m => m.CollegeModule) },
  // { path: 'course', loadChildren: () => import('./Pages/course/course.module').then(m => m.CourseModule) },
  // { path: 'school', loadChildren: () => import('./Pages/school/school.module').then(m => m.SchoolModule) },
  // { path: 'iti', loadChildren: () => import('./Pages/iti/iti.module').then(m => m.ItiModule) },
  // { path: 'subcategory', loadChildren: () => import('./Pages/subcategory/subcategory.module').then(m => m.SubcategoryModule) }

  // {path:'teacher/reg/teacherProfileHistory/:id',component:ApproveTeacherDetailComponent},

  { path: '**', component: PageNotFoundComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(appRoutes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

