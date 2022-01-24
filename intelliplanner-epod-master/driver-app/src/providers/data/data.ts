import { Http } from '@angular/http';
import { Injectable } from '@angular/core';
import { AuthProvider } from '../auth/auth';
import { Geolocation } from '@ionic-native/geolocation';
import * as Rx from "rxjs";
import { map } from 'rxjs/operators';

@Injectable()
export class DataProvider {
    apiURL: any;
    constructor(
        public http: Http,
        public authProvider: AuthProvider,
        private geolocation: Geolocation) {
        console.log('Hello DataProvider Provider');
        this.apiURL = this.authProvider.apiURL;
    }


    searchvehicle(vehicleNumber) {
        return new Promise((resolve) => {
            this.http.post(this.apiURL + 'searchvehicle', { searchTerm: vehicleNumber })
                .pipe(map(res => res.json()))
                .subscribe(res => resolve(res));
        });
    }

    searchDriverShipments(driverDetails) {
        return new Promise((resolve) => {
            this.http.post(this.apiURL + 'searchDriverShipments', driverDetails)
                .pipe(map(res => res.json()))
                .subscribe(res => resolve(res));
        });
    }

    updateInvoices(shipment_number, data) {
        return new Promise((resolve) => {
            this.http.post(this.apiURL + 'updateAllInvoice', { data: data, shipment_number: shipment_number })
                .pipe(map(res => res.json()))
                .subscribe(res => resolve(res));
        });
    }


    updateAppStatus(shipment) {
        return new Promise((resolve) => {

            if (shipment.second_driver_using_smartphone_or_sim == 'EPOD') {
                this.http.post(this.apiURL + 'updateAppStatus', { data: {second_driver_appstatus: true}, shipment_number: shipment.shipment_number })
                    .pipe(map(res => res.json()))
                    .subscribe(res => resolve(res));
            } else {
                this.http.post(this.apiURL + 'updateAppStatus', { data: {first_driver_appstatus: true}, shipment_number: shipment.shipment_number })
                    .pipe(map(res => res.json()))
                    .subscribe(res => resolve(res));
            }
        });
    }

    updateShipmentPlant(shipmentNumber) {
        return new Promise((resolve, reject) => {

            this.geolocation.getCurrentPosition().then((resp) => {
                let cords = resp.coords.latitude + "," + resp.coords.longitude;
                console.log("updateShipmentPlant ", cords)
                let data = {
                    shipment_number: shipmentNumber,
                    plant_location: cords
                }
                this.http.post(this.apiURL + 'updateShipment', { data: data })
                    .pipe(map(res => res.json()))
                    .subscribe(res => resolve(cords));
            }).catch((error) => {
                reject(error);
            });
        });
    }

    // updateShipmentDestination(invoice, status) {  niu

    //     return new Promise((resolve, reject) => {
    //         this.geolocation.getCurrentPosition().then((resp) => {
             
    //             let cords = resp.coords.latitude + "," + resp.coords.longitude;
    //             let data = {
    //                 destination_location: cords
    //             }
    //             this.http.post(this.apiURL + 'updateInvoice', { data: data, invoice_number: invoice.invoice_number })
    //                 .pipe(map(res => res.json()))
    //                 .subscribe(res => {
    //                             resolve(cords);
    //                 })

    //         }).catch((error) => {
    //             reject(error);
    //         });
    //     });
    // }


   updateLocationDestination(invoice, status) {

        return new Promise((resolve, reject) => {
            this.geolocation.getCurrentPosition({enableHighAccuracy: true}).then((resp) => {
                let formatDate  = this.format_Date(new Date())
                let cords = resp.coords.latitude + "," + resp.coords.longitude;
                let data = {
                    destination_location: cords,
                    dest_driver_reach_time: formatDate,
                    dest_driver_loc_time: formatDate
                }
                this.http.post(this.apiURL + 'updatelocationDestination', { data: data, fullinvoice: invoice })
                    .pipe(map(res => res.json()))
                    .subscribe(res => {
                                resolve(cords);
                    })

            }).catch((error) => {
                reject(error);
            });
        });
    }


    customerAvaliableStatus(invoice, status){  
          return new Promise((resolve) => {
            this.http.post(this.apiURL+'customerAvaliableStatus', {selectNumber: invoice.invoice_number})
            .pipe(map(res => res.json()))
            .subscribe(res => resolve(res));
          });
    }

    // updateShipmentLR(shipmentObject) {
    //     return new Promise((resolve, reject) => {

    //         this.http.post(this.apiURL + 'updateShipmentLR', shipmentObject)
    //             .pipe(map(res => res.json()))
    //             .subscribe(res => resolve(res));

    //     });
    // }

      format_Date = function(date){
      var d = new Date(date),
      month = '' + (d.getMonth() + 1),
      day =  '' + d.getDate(),
      year =  d.getFullYear();

      if(month.length < 2) month = '0' + month;
      if(day.length < 2)  day = '0' + day;
      var fullDate = [year, month, day].join('-')+" "+d.getHours()+":"+d.getMinutes()+":"+d.getSeconds() 
      return fullDate;
  }

}