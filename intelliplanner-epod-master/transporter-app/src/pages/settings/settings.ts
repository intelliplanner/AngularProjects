import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { DataProvider } from '../../providers/data/data';
import { GlobalsProvider } from '../../providers/globals/globals';
/**
 * Generated class for the SettingsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-settings',
  templateUrl: 'settings.html',
})
export class SettingsPage {
transporterCode:any;
transporterID:any;
idobj:any={};
transporter:any={}

  constructor(public navCtrl: NavController, public navParams: NavParams, public dataProvider: DataProvider, public globals: GlobalsProvider) {
  	this.transporterCode = localStorage.getItem('transporterCode');
  	this.transporterID = localStorage.getItem('transporterID');

  	this.idobj = { transporterCode : localStorage.getItem('transporterCode'),
  	transporterID : localStorage.getItem('transporterID')

  	} 

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad SettingsPage');

    this.dataProvider.fetchTransporter(this.idobj)
    .then((resp:any) => {
      console.log("fetch  ",resp)
      if(resp && resp.status){
        this.transporter = resp.user;
      }
      // if(resp && resp.status == true){
      //  this.globals.presentToast(resp.message) 
       
      // this.navCtrl.pop()

      // }
      
    })


  
  }

  update(){
    let pwd = { password: this.transporter.newpassword }

       this.dataProvider.changePassword(this.idobj,pwd)
    .then((resp:any) => {
      console.log("fetch  ",resp)
     if(resp && resp.status == true){
        this.globals.presentToast(resp.message) 
      }
      if(resp && resp.status == false){
       this.globals.presentToast(resp.message) 
       
     

      }
      
    })

  }




}
