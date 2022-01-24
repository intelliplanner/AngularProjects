import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import { Events } from 'ionic-angular';
import * as Rx from "rxjs";
import 'rxjs/add/operator/map';
import { map } from 'rxjs/operators';

declare var window: any;

@Injectable()
export class GlobalsProvider {
// public apiURL: any = 'http://localhost:4000/';
apiURL: any = 'http://157.230.91.154:5000/';
// apiURL: any = 'http://192.168.1.8:4000/';


  constructor(public http: Http) {
    console.log('Hello DataProvider Provider');
  }


   getInvoices(phoneNumber){   
        return new Promise((resolve) => {
          this.http.post(this.apiURL+'getCustomerInvoices', {phoneNumber: phoneNumber})
          .pipe(map(res => res.json()))
          .subscribe(res => resolve(res));
        });
  }

  updateShipment(invoiceNumber, data){
        return new Promise((resolve, reject) => {

            this.http.post(this.apiURL+'updateInvoice', { data: data, invoice_number: invoiceNumber })
            .pipe(map(res => res.json()
              ))
            .subscribe(res => resolve(res));

        });
  }
}