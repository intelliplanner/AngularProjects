import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

/**
 * Generated class for the OneDataPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-one-data',
  templateUrl: 'one-data.html',
})
export class OneDataPage {
	action:any;
	shipment:any={};
	invoice:any={};
	purchaseorder:any={};
  constructor(public navCtrl: NavController, public navParams: NavParams) {
  	console.log("this.navParams.data.action  ",this.navParams.data)
  	this.action = this.navParams.data.action;
  	if(this.action == "Shipment"){
  		this.shipment = this.navParams.data.selectData;
  		console.log("this.shipment",this.shipment)
  	}

  	if(this.action == "Invoice"){
  		this.invoice = this.navParams.data.selectData;
  		console.log("this.invoice",this.invoice)
  	}

  	if(this.action == "PurchaseOrder"){
  		this.purchaseorder = this.navParams.data.selectData;
  		console.log("this.purchaseorder",this.purchaseorder)
  	}
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad OneDataPage');
  }

}
