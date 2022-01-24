import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { HttpModule } from '@angular/http';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { LoginPageModule } from '../pages/login/login.module';
import { DriversPageModule } from '../pages/drivers/drivers.module';
import { InvoicePageModule } from '../pages/invoice/invoice.module';
import { SettingsPageModule } from '../pages/settings/settings.module';
import { TripFilterPageModule } from '../pages/trip-filter/trip-filter.module';
import { SearchLrPageModule } from '../pages/search-lr/search-lr.module';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { AuthProvider } from '../providers/auth/auth';
import { DataProvider } from '../providers/data/data';
import { ExtendMenuProvider } from '../providers/extend-menu/extend-menu';
import { ShipmentProvider } from '../providers/shipment/shipment';
import { GlobalsProvider } from '../providers/globals/globals';
import { Camera } from '@ionic-native/camera';
import { File } from '@ionic-native/file';
import { FileTransfer, FileUploadOptions, FileTransferObject } from '@ionic-native/file-transfer';
import { FilePath } from '@ionic-native/file-path';
import { IonicImageViewerModule } from 'ionic-img-viewer';
import { AgmCoreModule } from '@agm/core';
import { JWTInterceptor } from './http-interceptor';
import { AmChartsModule } from "@amcharts/amcharts3-angular";

@NgModule({
  declarations: [
    MyApp,
    HomePage,
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    HttpModule,
    HttpClientModule,
    DriversPageModule,
    InvoicePageModule,
    AmChartsModule,
    SettingsPageModule,
    TripFilterPageModule,
    LoginPageModule,
    SearchLrPageModule,
    IonicImageViewerModule,
    AgmCoreModule.forRoot({
          apiKey: 'AIzaSyDbGEF0MhXLko9X4kHr3q8r8MNNeGlG2kE'
        })
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
  ],
  providers: [
    StatusBar,
    SplashScreen,
    // {provide: ErrorHandler, useClass: IonicErrorHandler},
    { provide: HTTP_INTERCEPTORS, useClass: JWTInterceptor, multi: true },
    AuthProvider,
    DataProvider,
    ExtendMenuProvider,
    ShipmentProvider,
    GlobalsProvider,
    Camera,FileTransfer,File,FilePath
  ]
})
export class AppModule {}
