import { Http } from '@angular/http';
import { Injectable } from '@angular/core';
import { Sim } from '@ionic-native/sim';
import { AuthProvider } from '../auth/auth';
import * as Rx from "rxjs";
import { map } from 'rxjs/operators';

// declare var SMSReceive: any;

@Injectable()
export class SimProvider {
    simInfo: any;
    apiURL: any;
    phone: any;

    constructor(
        public http: Http,
        public authProvider: AuthProvider,
        private sim: Sim) {
        this.apiURL = this.authProvider.apiURL;
    }

    getSimInfo() {

        this.sim.hasReadPermission().then(
            (info) => console.log('Has permission: ', info)
        );
        this.sim.requestReadPermission().then(() => {
            // console.log('Permission granted')deviceId simSerialNumber
            this.sim.getSimInfo().then((info) => {
                console.log('sim info: ', info)
                this.simInfo = info;
            }, (err) => {
                console.log('Unable to get sim info: ', err)
            });
        }, () => {
            console.log('Permission denied')
        });
    }

    checkNumber(phone) {
        return new Promise((resolve) => {
            this.http.post(this.apiURL + 'checkDriverRecord', { phone: phone })
                .pipe(map(res => res.json()))
                .subscribe(res => resolve(res));
        });
    }

    sendOtp(phone) {
        this.phone = phone;
        return new Promise((resolve) => {
            this.http.post(this.apiURL + 'sendDriverOTP', { phone: phone })
                .pipe(map(res => res.json()))
                .subscribe(res => resolve(res));
        });
    }

    readSMS(otpTxt) {
      let that = this;
        //     return new Promise((resolve) => {
        //                 SMSReceive.startWatch(function() {
        //                             console.log('smsreceive: watching started');

        //                             document.addEventListener('onSMSArrive', function(e:any) {
        //                                         console.log('onSMSArrive()');
        //                                         var IncomingSMS = e.data;
        //             let otp = IncomingSMS.body.substring(0, 4);
        //             let sender = IncomingSMS.address.substring(0, 2);
        //             console.log('sms.body:' + otp);
        //             console.log('sms.address:' + sender);

        //             if(otp == otpTxt){
        //               that.updateDriver();
        //               resolve(true)
        //             }

        //             if (sender == "VK") {
        //                 SMSReceive.stopWatch(function() {
        //                     console.log('smsreceive: watching stopped');
        //                 }, function() {
        //                     console.warn('smsreceive: failed to stop watching');
        //                 });
        //             }
        //         });
        //     }, function() {
        //               resolve(false)
        //         console.warn('smsreceive: failed to start watching');
        //     });
        // });
    }

    updateDriver(){
      let driverObj = {
        phone: this.phone,
        device_id: this.simInfo.deviceId,
        sim_serial_number: this.simInfo.simSerialNumber,
        app_installed: true
      }
            console.log('driverObj ',driverObj);
            this.http.post(this.apiURL + 'updateDriverRecord', { driverObj: driverObj })
                .pipe(map(res => res.json()))
                .subscribe(res => console.log(res));
    }
}