import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, MenuController, ToastController, Events } from 'ionic-angular';
import { UsersProvider } from '../../providers/users/users';
import { GlobalsProvider } from '../../providers/globals/globals';

@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {
form: any = {};

  constructor(
  	public navCtrl: NavController, 
  	public menuCtrl: MenuController, 
  	public toastCtrl: ToastController, 
    public events: Events, 
    public globals:GlobalsProvider,
    public usersProvider: UsersProvider,
  	public navParams: NavParams) {
    this.menuCtrl.enable(false)
  }

  ionViewDidEnter() {
    this.menuCtrl.enable(false)
  }

  ionViewWillLeave() {
    this.menuCtrl.enable(true)
  }

  doLogin(){
    let adminObj = {username:this.form.username,password:this.form.password}
    this.usersProvider.adminLogin(adminObj)
    .then(resp => {
      console.log("respppp  ",resp );
      if(resp)
      {
          localStorage.setItem('adminLoggedIn', '1')
          this.events.publish('login')
      this.globals.presentToast('Login successful');
      }
      else{
        this.globals.presentToast('Login unsuccessful');
      }
      
    },error => {
        this.globals.presentToast('Invalid username/password!');
    })



  	// if(this.form.username == 'admin' && this.form.password == 'password'){

  	// 	localStorage.setItem('adminLoggedIn', '1')
   //  	this.events.publish('login')
  	// 	//this.navCtrl.setRoot(ItemsPage);
  	// }
  	// else
  	// {
   //  const toast = this.toastCtrl.create({
   //    message: 'Invalid username or password!',
   //    position: 'bottom',
   //    duration: 3000
   //  });
   //  toast.present();
  	// }
  }

}
