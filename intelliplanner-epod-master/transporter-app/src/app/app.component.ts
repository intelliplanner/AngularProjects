import { Component, ViewChild } from '@angular/core';
import { Nav, Platform, Events } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { LoginPage } from '../pages/login/login';
import { DriversPage } from '../pages/drivers/drivers';
import { InvoicePage } from '../pages/invoice/invoice';
import { SettingsPage } from '../pages/settings/settings';
import { HomePage } from '../pages/home/home';

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  @ViewChild(Nav) nav: Nav;
  loggedIn: boolean = false;
  rootPage: any;
  activePage: any;
  transporterName:any;
  pages: Array<{title: string, icon: string, component: any}>;

  constructor(
    public platform: Platform, 
    public statusBar: StatusBar, 
    public events: Events, 
    public splashScreen: SplashScreen) {
    this.initializeApp();

// localStorage.setItem('transporterCode', "123456");

    // used for an example of ngFor and navigation
    this.pages = [
      { title: 'Dashboard', icon: 'ios-speedometer', component: HomePage },
      { title: 'Drivers', icon: 'contacts', component: DriversPage },
      { title: 'Shipments', icon: 'md-car', component: InvoicePage },
      { title: 'Settings', icon: 'settings', component: SettingsPage }
    ];
    this.activePage = this.pages[0];

    this.events.subscribe('login', () => {
        this.initializeApp();
    })
  }

  initializeApp() {
    this.platform.ready().then(() => {

      this.transporterName = localStorage.getItem('transporterName');
      let transporterCode = localStorage.getItem('transporterCode');
      if(transporterCode != null)
      {
        this.rootPage = HomePage
        this.loggedIn = true;
      }
      else
      {
        this.rootPage = LoginPage
      }

      this.statusBar.backgroundColorByHexString('#ee1d24');
      this.splashScreen.hide();
    });
  }

  openPage(page) {
    this.activePage = page;
    this.nav.setRoot(page.component);
  }

  logout(){
    localStorage.removeItem('transporterCode');
    localStorage.clear();
    this.nav.setRoot(LoginPage);
  }

  checkActive(page){
    return page == this.activePage;
  }
}
