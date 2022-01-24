import { Component, ViewChild, ElementRef  } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController, Loading, AlertController, LoadingController, Events } from 'ionic-angular';

import { GlobalsProvider } from '../../providers/globals/globals';
import * as Rx from "rxjs";
import 'rxjs/add/operator/map';
import { map } from 'rxjs/operators';
import 'rxjs/add/operator/catch'

// declare var google;

@IonicPage()
@Component({
  selector: 'page-invoice',
  templateUrl: 'invoice.html',
})
export class InvoicePage {
    invoice: any = {};
    loading: Loading;
    responded: boolean = false;
    @ViewChild('map') mapElement: ElementRef;
    map: any;
  lat: number;
  lng: number;

  constructor(
    public events: Events, 
    public navCtrl: NavController, 
    public viewCtrl: ViewController, 
    public alertCtrl: AlertController,
    public navParams: NavParams, 
    public globals: GlobalsProvider, 
    public loadingCtrl: LoadingController) {
  }

  ionViewWillEnter(){
     this.invoice = this.navParams.data.invoice

     if(this.invoice.destination_location)
     {
     let cords = this.invoice.destination_location.split(',');
     this.lat = parseFloat(cords[0]);
     this.lng = parseFloat(cords[1]);
     console.log(this.lat)
     console.log(this.lng)
     }


      // let latLng = new google.maps.LatLng(17.403176, 78.4694226);

      // let mapOptions = {
      //   center: latLng,
      //   zoom: 15,
      //   mapTypeId: google.maps.MapTypeId.ROADMAP
      // }

      // this.map = new google.maps.Map(this.mapElement.nativeElement, mapOptions);


  }

  response(res){
    this.responded = true;

    if(res == 1)
    {
            let data = {
              customer_accepted: res
            }

    this.globals.updateShipment(this.invoice.invoice_number,data)
    .then(resp => {
      this.navCtrl.pop();
    console.log(resp);
    }, error => {
    console.log(error);
    })
    }
    else
    {
            
    const prompt = this.alertCtrl.create({
      title: 'Decline Delivery?',
      message: "Please enter a reason for declining this shipment.",
      inputs: [
        {
          name: 'reason',
          placeholder: 'Decline reason'
        },
      ],
      buttons: [
        {
          text: 'Cancel',
          handler: data => {
            console.log('Cancel clicked');
          }
        },
        {
          text: 'Submit',
          handler: data => {
            console.log('Saved clicked', data.reason);

            let d = {
              customer_accepted: res,
              customer_declined_reason: data.reason
            }

    this.globals.updateShipment(this.invoice.invoice_number,d)
    .then(resp => {
      this.navCtrl.pop();
    console.log(resp);
    }, error => {
    console.log(error);
    })
          }
        }
      ]
    });
    prompt.present();



    }
  }


}
