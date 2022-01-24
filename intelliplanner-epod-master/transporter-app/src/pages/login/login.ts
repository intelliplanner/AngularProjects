import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, MenuController, LoadingController, Events, Loading, ToastController } from 'ionic-angular';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { AuthProvider } from '../../providers/auth/auth';
import { HomePage } from '../../pages/home/home';

@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {
  form: any = {};

  constructor(
  	public navCtrl: NavController, 
    private formBuilder: FormBuilder,
    public loadingCtrl: LoadingController,
    public toastCtrl: ToastController,
    private authProvider: AuthProvider,
    public menuCtrl: MenuController, 
    public events: Events, 
  	public navParams: NavParams) {
  }

  ionViewDidEnter() {
    this.menuCtrl.enable(false)
  }

  ionViewWillLeave() {
    this.menuCtrl.enable(true)
  }

  doLogin(){
    const loader = this.loadingCtrl.create({
      content: "Please wait...",
      duration: 3000
    });
    loader.present();

    this.authProvider.login(this.form)
    .then((resp: any) => {
      console.log(resp)
      if(resp.status == 1)
      {
        this.menuCtrl.enable(true)
        this.events.publish('login')
        localStorage.setItem('transporterCode',resp.transporterCode)
        localStorage.setItem('transporterName',resp.transporterName)
        localStorage.setItem('transporterID',resp.transporterID)
        localStorage.setItem('authToken',resp.token)
        localStorage.setItem('plant',resp.plant)
        loader.dismiss();
        this.navCtrl.setRoot(HomePage);
      }
      else
      {
        loader.dismiss();
        this.presentToast('Invalid username or password!')
      }
    })
  }  

  presentToast(message) {
    const toast = this.toastCtrl.create({
      message: message,
      duration: 3000,
      position: 'bottom'
    });
    toast.present();
  }

  forgot(){
    console.log("123456");
  }

}
