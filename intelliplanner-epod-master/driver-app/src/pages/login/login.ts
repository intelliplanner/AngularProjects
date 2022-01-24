import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController, Loading, ToastController } from 'ionic-angular';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { AuthProvider } from '../../providers/auth/auth';
import { SimProvider } from '../../providers/sim/sim';
import { HomePage } from '../../pages/home/home';
import { DataProvider } from '../../providers/data/data';

@IonicPage()
@Component({
    selector: 'page-login',
    templateUrl: 'login.html',
})
export class LoginPage {
    form: any = {};
    phone: any = '';
    otp: any;

    constructor(
        public navCtrl: NavController,
        private formBuilder: FormBuilder,
        public loadingCtrl: LoadingController,
        public toastCtrl: ToastController,
        private simProvider: SimProvider,
        public navParams: NavParams, public dataProvider: DataProvider) {}

    // continue () {
    //     let that = this;
    //     const loader = this.loadingCtrl.create({
    //         content: "Please wait...",
    //         duration: 60000

    //     });
        // loader.present();
        //that.navCtrl.setRoot(HomePage);//8448152275

        // this.simProvider.checkNumber(this.phone)
        //     .then((data:any) => {
        //         if (data.count == 1) {
                    // this.simProvider.sendOtp(this.phone)
                    //     .then((resp:any) => {
                    //         this.otp = resp.otp;
                    //         this.simProvider.readSMS(this.otp)
                    //             .then((res) => {
                    //             loader.dismiss();
                    //             if(res){
                    //               localStorage.setItem('driverPhone', this.phone);
                    //               this.navCtrl.setRoot(HomePage)
                    //             }
                    //         }, error=> {
                    //             loader.dismiss();
                    //         })
                    //     })
                // } else {

                // }
            // }, error => {
            //     console.log(error);
            // })

        //   loader.present();
    // }



        continue () {
        let that = this;
        const loader = this.loadingCtrl.create({
            content: "Please wait...",
            duration: 60000

        });
        loader.present();
   
            this.dataProvider.searchDriverShipments(this.form)
                .then((resp: any) => { 
                    if(resp && resp.status ==1){
                        loader.dismiss();
                    localStorage.setItem('vehicle_no',this.form.vehicleNo)
                    localStorage.setItem("transporter_code",this.form.transporterCode)
                    this.navCtrl.setRoot(HomePage);
                  }
                  else if(resp && resp.status ==0) {
                      loader.dismiss();
                      this.presentToast(resp.message)
                  }
                  else
                  {
                      loader.dismiss();
                      this.presentToast('Invalid username/password!')
                  }

                })

        // this.simProvider.checkNumber(this.phone)
        //     .then((data:any) => {
        //         if (data.count == 1) {
        //             this.simProvider.sendOtp(this.phone)
        //                 .then((resp:any) => {
        //                     this.otp = resp.otp;
        //                     this.simProvider.readSMS(this.otp)
        //                         .then((res) => {
        //                         loader.dismiss();
        //                         if(res){
        //                           localStorage.setItem('driverPhone', this.phone);
        //                           this.navCtrl.setRoot(HomePage)
        //                         }
        //                     }, error=> {
        //                         loader.dismiss();
        //                     })
        //                 })
        //         } else {

        //         }
        //     }, error => {
        //         console.log(error);
        //     })

        //   loader.present();
    }

       public presentToast(text) {
        let toast = this.toastCtrl.create({
            message: text,
            duration: 3000,
            position: 'top'
        });
        toast.present();
    }


}