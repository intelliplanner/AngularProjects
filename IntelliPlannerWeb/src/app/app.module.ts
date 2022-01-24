import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { LoginComponent } from './login/login.component';
import { AppRoutingModule } from './app-routing.module';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { DialogModule, GrowlModule } from 'primeng/primeng';
import { HeaderComponent } from './header/header.component';
import { SharedService } from './shared/shared.service';

import { ContactusComponent } from './contactus/contactus.component';
import { AppComponent } from './app.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { AngularMaterialModule } from './angular-material.module';
import { Interceptor } from './Interceptor/interceptor.interceptor';
import { ForgotPasswordComponent } from './forgot-password/forgot-password.component';
import { FlexLayoutModule } from '@angular/flex-layout';
import { NgxPaginationModule } from 'ngx-pagination';
import { DetailsComponent } from './details/details.component';
import { FooterComponent } from './footer/footer.component';
import { GlobalService } from './utility/global.serivce';
import { UtilityService } from './utility/utility.service';
import { EmailandmobileverificationComponent } from './emailandmobileverification/emailandmobileverification.component';
import { ApproveTeacherDetailComponent } from './principle/approve-teacher-detail/approve-teacher-detail.component';
import { CreateLoginDetailComponent } from './create-login-detail/create-login-detail.component';
import { HeaderMenuComponent } from './header-menu/header-menu.component';
import { AboutusComponent } from './aboutus/aboutus.component';
import { TransporterDetailsComponent } from './tpr/transporter-details/transporter-details.component';
import { CreateUpdateTransporterComponent } from './tpr/create-update-transporter/create-update-transporter.component';
import { TprDashboardComponent } from './tpr/tpr-dashboard/tpr-dashboard.component';


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    HeaderComponent,
    FooterComponent,
    AboutusComponent,
    ContactusComponent,
    PageNotFoundComponent,
    ForgotPasswordComponent,
    DetailsComponent,
    EmailandmobileverificationComponent,
    ApproveTeacherDetailComponent,
    CreateLoginDetailComponent,
    HeaderMenuComponent,
    TransporterDetailsComponent,
    CreateUpdateTransporterComponent,
    TprDashboardComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
    GrowlModule,
    AngularMaterialModule,
    NgxPaginationModule,
    DialogModule,
    FlexLayoutModule,
  ],
   exports:[AboutusComponent],
  providers: [
    SharedService,
    UtilityService,
    GlobalService,
    HeaderComponent,
    FooterComponent,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: Interceptor,
      multi: true
    },
  
  ],
  bootstrap: [AppComponent],
 
})
export class AppModule { }
