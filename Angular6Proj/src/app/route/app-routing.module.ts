import { NgModule } from '@angular/core';
import {RouterModule, Routes}  from '@angular/router';
import {ListEmployeeComponent} from '../employee/list-employee.component';
import {CreateEmployeeComponent} from '../employee/create-employee.component';
import {CreateStudentComponent} from '../student/create-student.component';
import {IpssiEmployeeComponent} from '../ipssi_employees/ipssi-employee.component';
import {AttendenceModuleComponent}  from '../Attendence/attendence-module.component';
import {CreateIpssiEmployeeComponent} from '../ipssi_employees/create-ipssi-employee.component';
import {CreateJavanotesComponent}  from '../javapoint/javanotes_create/create-javanotes.component';
import {ShowJavanotesComponent}  from '../javapoint/javanotes_show/show-javanotes.component';
import {ShowJavatopicsExtendedComponent}  from '../javapoint/javatopic_extended_show/show-javatopics-extended.component';
import {ShowJavatopicsComponent}  from '../javapoint/javatopic_show/show-javatopics.component';
import {CreateJavatopicsComponent}  from '../javapoint/javatopic_create/create-javatopics.component';
import {CreateJavatopicExtendedComponent}  from '../javapoint/javatopic_extended_create/create-javatopic-extended.component';
import { MobileShopCreateComponent } from '../Mobile/mobile_shop_create/mobile-shop-create.component';
import { MobileShopShowComponent } from '../Mobile/mobile_shop_show/mobile-shop-show.component';
import { MobileCreateComponent } from '../Mobile/mobile_create/mobile-create.component';

const appRoutes: Routes = [
	{path:'list', component:ListEmployeeComponent},
	{path:'create', component:CreateEmployeeComponent},
	{path:'createStudent', component:CreateStudentComponent},
	{path: 'edit/:id',   component: CreateEmployeeComponent },
	{path: 'create_ipssi_employees',   component: CreateIpssiEmployeeComponent },
	{path: 'list_ipssi_employees',   component: IpssiEmployeeComponent },
	{path: 'edit_ipssi_employees/:id',   component: CreateIpssiEmployeeComponent },
	{path: 'attendence',   component: AttendenceModuleComponent },
	
	{path: 'createJavaNotes',   component: CreateJavanotesComponent },
	{path: 'createJavaTopics',   component: CreateJavatopicsComponent },
	{path: 'createJavaTopicsExtended',   component: CreateJavatopicExtendedComponent },

	{path: 'showJavaNotes',   component: ShowJavanotesComponent },
	{path: 'showJavaTopics',   component: ShowJavatopicsComponent },
	{path: 'showJavaTopicsExtended',   component: ShowJavatopicsExtendedComponent },

	{path: 'corejava',   component: ShowJavanotesComponent },
	{path: 'servlet',   component: ShowJavanotesComponent },
	{path: 'jsp',   component: ShowJavanotesComponent },
	{path: 'hibernate',   component: ShowJavanotesComponent },
	{path: 'spring',   component: ShowJavanotesComponent },
	{path: 'springboot',   component: ShowJavanotesComponent },
	{path: 'designpatern',   component: ShowJavanotesComponent },
	
	{path: 'mobileShopCreate',   component: MobileShopCreateComponent },
	{path: 'mobileCreate',   component: MobileCreateComponent },
	{path: 'showMobileDetails',   component: MobileShopShowComponent },


	//{path: 'attendence',   loadChildren: AttendenceModuleComponent },
	{path:'', redirectTo:'/list', pathMatch:'full'}
];
@NgModule({
imports: [
	RouterModule.forRoot(appRoutes)    // for lazy root module
	// RouterModule.forChild(appRoutes)  // for lazy load mean child module
  ],
  exports :[RouterModule],
  declarations: []
})
export class AppRoutingModule { }
