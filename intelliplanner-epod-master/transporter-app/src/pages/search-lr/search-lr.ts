import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams,LoadingController } from 'ionic-angular';
import { DataProvider } from '../../providers/data/data';
import { OneShipmentPage } from '../one-shipment/one-shipment';

@IonicPage()
@Component({
  selector: 'page-search-lr',
  templateUrl: 'search-lr.html',
})
export class SearchLrPage {
  searchTermShipment:any = '';
  searchTermLR:any = '';
  filter:any={};
  missingLR: any=[];
  constructor(public navCtrl: NavController, public navParams: NavParams,
    public dataProvider: DataProvider,public loadingCtrl: LoadingController) {
  	this.filter = navParams.data.filter;
      console.log(this.filter);
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad SearchLrPage');
      let oib = {code: localStorage.getItem('transporterCode'),plantcode:localStorage.getItem('plant')}
     const loader = this.loadingCtrl.create({
            content: "Please wait...",
            duration: 3000
        });
        loader.present();

        this.dataProvider.getmissingLR(oib)
        .then(resp => {
            this.missingLR = resp;
            console.log("yuy",this.missingLR);
            loader.dismiss();
        }, error => {
            console.log(error);
            loader.dismiss();
        })
  }

  clearFilter(){
    this.ionViewDidLoad();
    this.searchTermShipment = '';
    this.searchTermLR = '';
  }

 public updateLR(shipment){
    this.navCtrl.push(OneShipmentPage, {shipment: shipment, filter: {value: this.filter.value}})
  }

}
