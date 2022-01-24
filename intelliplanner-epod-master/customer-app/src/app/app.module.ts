import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { HttpModule } from '@angular/http';
import { IonicStorageModule } from '@ionic/storage';
import { IonicImageViewerModule } from 'ionic-img-viewer';
import { Storage } from "@ionic/storage";
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { AppRate } from '@ionic-native/app-rate';
import { MyApp } from './app.component';
import { UniqueDeviceID } from '@ionic-native/unique-device-id';
import { LocationStrategy, PathLocationStrategy } from '@angular/common';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { GlobalsProvider } from '../providers/globals/globals';
import { ThemeableBrowser } from '@ionic-native/themeable-browser';
import { HomePageModule } from '../pages/home/home.module';
import { InvoicePageModule } from '../pages/invoice/invoice.module';
import { AgmCoreModule } from '@agm/core';


let pages = [
    MyApp
]

@NgModule({
    declarations: pages,
    imports: [
        BrowserModule,
        HttpModule,
        HomePageModule,
        InvoicePageModule,
        IonicModule.forRoot(MyApp),
        AgmCoreModule.forRoot({
          apiKey: 'AIzaSyDbGEF0MhXLko9X4kHr3q8r8MNNeGlG2kE'
        })
    ],
    bootstrap: [IonicApp],
    entryComponents: pages,
    providers: [
        StatusBar,
        SplashScreen,
        IonicErrorHandler,      
        { provide: ErrorHandler, useClass: IonicErrorHandler },
        GlobalsProvider,
        ]
})
export class AppModule {}