import { Component, ViewChild } from '@angular/core';
import { Nav, Platform, MenuController, Events ,AlertController} from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { UsersProvider } from '../providers/users/users';


import { TransporterPage } from '../pages/transporter/transporter';
import { AllDataPage } from '../pages/all-data/all-data';
import { AllInvoicePage } from '../pages/all-invoice/all-invoice';
import { AllPurchaseOrderPage } from '../pages/all-purchase-order/all-purchase-order';
import { LoginPage } from '../pages/login/login';
import { ProfilePage} from '../pages/profile/profile';

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  @ViewChild(Nav) nav: Nav;

  rootPage: any;
  activePage: any;
  loggedIn: boolean = false;
  pages: Array<{title: string,icon: string, component: any}>;

  constructor(
    public platform: Platform, 
    public events: Events, 
    public statusBar: StatusBar, 
    public menuCtrl: MenuController, 
    public alertCtrl: AlertController,
    public usersProvider: UsersProvider,
    public splashScreen: SplashScreen) {
    this.initializeApp();


    // used for an example of ngFor and navigation
    this.pages = [
     
      { title: 'Transporters', icon: 'contacts', component: TransporterPage },
      { title: 'Epod Data', icon: 'book', component: AllDataPage }
      /*,
      { title: 'Invoices', icon: 'book', component: AllInvoicePage },
      { title: 'Purchase Orders', icon: 'book', component: AllPurchaseOrderPage }*/
    ];
    this.activePage = this.pages[0];

    this.events.subscribe('login', () => {
      this.loggedIn = true;
      this.initializeApp();
    })

  }

  initializeApp() {
    this.platform.ready().then(() => {

      let adminLoggedIn = localStorage.getItem('adminLoggedIn');
      // this.menuCtrl.enable(false)
      if(adminLoggedIn == '1')
      {
       this.loggedIn = true;
       this.rootPage = TransporterPage
      }
      else
      {
       this.rootPage = LoginPage
      }
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });
  }

  openPage(page) {
    // Reset the content nav to have just this page
    // we wouldn't want the back button to show in this scenario
    this.activePage = page;
    this.nav.setRoot(page.component);
  }

  checkActive(page){
    return page == this.activePage;
  }
  changePassword(){
      console.log('Change Password Button Clicked');
    //Creating the promt alert with inputs
    let alert = this.alertCtrl.create({
      title: 'Change Password',
      inputs: [
        // {
        //   name: 'oldPassword',
        //   placeholder: 'Your old password..',
        //   type: 'password'
        // },
        {
          name: 'newPassword',
          placeholder: 'Your new password..',
          type: 'password'
        },
        {
          name: 'newPasswordConfirm',
          placeholder: 'Confirm your new password..',
          type: 'password'
        }
      ],
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          handler: data => {
            console.log('Cancel clicked');
          }
        },
         {
          text: 'Update Password',
          handler: data => {
               console.log("data",data)
               let userObj ={password:data.newPassword} 
               if(data.newPassword != data.newPasswordConfirm){
                     let alert = this.alertCtrl.create({
                      title: 'Change Password Failed',
                      message: 'password and confirm password does not match',
                      buttons: ['Try Again']
                    });
                    alert.present();
               }
               else{
                 if(data.newPassword == data.newPasswordConfirm){
                   console.log("userObj",userObj)
               this.usersProvider.changePassword(userObj).then(res=>{
                 console.log("res",res)
               })

                 }
               }
            }
          }
      ]
    });
    alert.present();
  }

  logout(){
    console.log("df")
    localStorage.clear()
    this.nav.setRoot(LoginPage)
  }
}
