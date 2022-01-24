import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController, Loading, LoadingController, Events } from 'ionic-angular';
import { GlobalsProvider } from '../../providers/globals/globals';
import { InvoicePage } from '../../pages/invoice/invoice';

@IonicPage({
  name: 'invoice',
  segment: 'invoice/:phonenumber'
})

@Component({
  selector: 'page-home',
  templateUrl: 'home.html',
})
export class HomePage {
    invoices: any = [];
    loading: Loading;
    responded: boolean = false;

  constructor(
  	public events: Events, 
  	public navCtrl: NavController, 
  	public viewCtrl: ViewController, 
  	public navParams: NavParams, 
  	public globals: GlobalsProvider, 
  	public loadingCtrl: LoadingController) {
  }

  ionViewWillEnter(){
        const loader = this.loadingCtrl.create({
            content: "Please wait...",
            duration: 3000
        });
        loader.present()
    this.globals.getInvoices(this.navParams.get('phonenumber'))
    .then(resp => {
        loader.dismiss()
    this.invoices = resp;
    }, error => {
        loader.dismiss()
    console.log(error);
    })
  }

  openInvoice(invoice){
    this.navCtrl.push(InvoicePage, {invoice: invoice})
  }

}

