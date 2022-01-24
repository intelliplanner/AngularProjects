import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { HttpModule } from '@angular/http';

import { MyApp } from './app.component';

import { TransporterPageModule } from '../pages/transporter/transporter.module';
import { AllDataPageModule } from '../pages/all-data/all-data.module';
import { AllInvoicePageModule } from '../pages/all-invoice/all-invoice.module';
import { AllPurchaseOrderPageModule } from '../pages/all-purchase-order/all-purchase-order.module';
import { LoginPageModule } from '../pages/login/login.module';

import { ProfilePageModule } from '../pages/profile/profile.module';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { AuthProvider } from '../providers/auth/auth';

import { GlobalsProvider } from '../providers/globals/globals';
import { UsersProvider } from '../providers/users/users';
import { PagerService } from '../_services/index';


@NgModule({
  declarations: [
    MyApp,
  ],
  imports: [
    BrowserModule,
 
    TransporterPageModule,
    AllDataPageModule,
    AllInvoicePageModule,
    AllPurchaseOrderPageModule,
    LoginPageModule,
    ProfilePageModule,
    
    HttpModule,
    IonicModule.forRoot(MyApp),
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
  ],
  providers: [
    StatusBar,
    SplashScreen,
    PagerService,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    AuthProvider,
  
    GlobalsProvider,
    UsersProvider
  ]
})
export class AppModule {}
