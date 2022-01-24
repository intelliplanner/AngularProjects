import { Injectable } from '@angular/core';
import { ToastController,Loading,LoadingController } from 'ionic-angular';

@Injectable()
export class GlobalsProvider {

// apiURL: any = 'http://localhost:5000/';
  // apiURL: any = 'http://157.230.91.154:5000/'
public apiURL: any = 'http://182.72.88.5:5000/';
  loader:Loading;
  constructor(public toastCtrl:ToastController,public loadingCtrl:LoadingController) {
    console.log('Hello GlobalsProvider Provider');
  }

  get getApiURL(){
  	return this.apiURL;
  }

   presentToast(message) {
        let toast = this.toastCtrl.create({
            message: message,
            duration: 2000,
            position: 'bottom',
            cssClass: 'normalToast'
        });

        toast.onDidDismiss(() => {
            console.log('Dismissed toast');
        });

        toast.present();
    }

     loadingstart(){
      this.loader = this.loadingCtrl.create({
       spinner: 'crescent',
      content: `
        <div class="loading-custom-spinner-container">
          <div class="loading-custom-spinner-box"></div>
        </div>
        <div>Please wait ...</div>`
    });
     this.loader.present();

    }
  loadingdismiss(){
      return this.loader.dismiss();
  }

}
