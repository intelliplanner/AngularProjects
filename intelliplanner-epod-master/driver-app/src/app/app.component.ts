import { Component } from '@angular/core';
import { Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { HomePage } from '../pages/home/home';
import { LoginPage } from '../pages/login/login';
import { SimProvider } from '../providers/sim/sim';
declare var cordova: any;

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  rootPage:any;

  constructor(platform: Platform, statusBar: StatusBar, splashScreen: SplashScreen, private simProvider: SimProvider) {
    platform.ready().then(() => {

      // let driverPhone = localStorage.getItem('driverPhone');
        let vehicleNo = localStorage.getItem('vehicle_no');
        let transporterCode = localStorage.getItem('transporter_code');
     
      if(platform.is('cordova')){
         if(vehicleNo != null && transporterCode != null)
        this.rootPage = HomePage
      else
        this.rootPage = LoginPage

       console.log('sssssss',platform.is('cordova'));

      }
      else if(!platform.is('cordova')){
         if(vehicleNo != null && transporterCode != null)
        this.rootPage = HomePage
      else
        this.rootPage = LoginPage

       console.log('ttttttt',platform.is('cordova'));

      }
      // simProvider.getSimInfo();
      statusBar.backgroundColorByHexString('#ee1d24');
      statusBar.styleDefault();
      splashScreen.hide();
    });
  }
}

