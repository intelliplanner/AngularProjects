import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';
import { HttpModule } from '@angular/http';
import { Sim } from '@ionic-native/sim';
import { MyApp } from './app.component';
import { Geolocation } from '@ionic-native/geolocation';
import { Diagnostic } from '@ionic-native/diagnostic';
// import { HomePage } from '../pages/home/home';
// import { HomePageModule } from '../pages/home/home.module';
import { LoginPageModule } from '../pages/login/login.module';
import { AuthProvider } from '../providers/auth/auth';
import { SimProvider } from '../providers/sim/sim';
import { DataProvider } from '../providers/data/data';
import { ImageProvider } from '../providers/image/image';
import { Camera } from '@ionic-native/camera';
import { File } from '@ionic-native/file';
import { FileTransfer, FileUploadOptions, FileTransferObject } from '@ionic-native/file-transfer';
import { FilePath } from '@ionic-native/file-path';
import { IonicImageViewerModule } from 'ionic-img-viewer';

@NgModule({
  declarations: [
    MyApp
  ],
  imports: [
    BrowserModule,
    // HomePageModule,
    HttpModule,
    LoginPageModule,
    IonicImageViewerModule,
    IonicModule.forRoot(MyApp)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp
  ],
  providers: [
    StatusBar,
    Diagnostic,
    Geolocation,
    SplashScreen,
    Sim,
    Camera,
    File,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    AuthProvider,
    SimProvider,
    DataProvider,
    ImageProvider,
    Camera,FileTransfer,File,FilePath
  ]
})
export class AppModule {}
