import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, Events, LoadingController, Content } from 'ionic-angular';
import { DataProvider } from '../../providers/data/data';
import { GlobalsProvider } from '../../providers/globals/globals';
import { UpdateoneShipmentPage } from '../updateone-shipment/updateone-shipment';
import { Http, Headers, RequestOptions } from '@angular/http';
import { AuthProvider } from '../../providers/auth/auth';
@IonicPage()
@Component({
  selector: 'page-invoice',
  templateUrl: 'invoice.html',
})
export class InvoicePage {
@ViewChild(Content) content: Content;
allShipments: any = [];
selectedShipments:any = [];
filter: any = {};
searchTerm: any;
toggle: boolean = false;
status: any = 'all'
searchfilter: any = {};

    constructor(public navCtrl: NavController, 
        public events: Events, 
        public dataProvider: DataProvider, 
        public globals: GlobalsProvider, 
        public loadingCtrl: LoadingController,public http: Http,public auth: AuthProvider) {}

  ionViewWillEnter() {
    let oib = {code: localStorage.getItem('transporterCode'),plantcode:localStorage.getItem('plant')}
    this.filter = {code: localStorage.getItem('transporterCode'),plantcode:localStorage.getItem('plant')};
    const loader = this.loadingCtrl.create({
      content: "Please wait...",
      duration: 3000
    });
    loader.present();

    this.dataProvider.getAllInvoices(oib)
    .then(resp => {
    	console.log(resp)
    loader.dismiss();
    	this.allShipments = resp;
      this.selectedShipments = this.allShipments; 
    }, error => {
    loader.dismiss();
    })
  }

  openShipment(invoice){
    this.navCtrl.push(UpdateoneShipmentPage, {invoice: invoice, filter: {value: null}})
  }

  toggleFilter(){
    this.toggle = !this.toggle;
    this.content.resize();
  }

  getItems(e){
   
    this.filter.value = e.value;
    console.log("this.filter  ",e.value.length)
    if(e.value.length > 0){
     this.dataProvider.getSearchedInvoices(this.filter)
    .then((resp:any) => {
      console.log(resp)
      this.selectedShipments = resp
      // this.pagedItems = this.allShipments; 
    
    })
    }
    else{
      this.ionViewWillEnter();
    }
 
    // if(Object.keys(this.filter).length == 0 &&  this.filter.fromDate && this.filter.toDate)

   //  if(Object.keys(this.filter).length == 0){
   //    this.globals.presentToast('Select type fields or date in Search Box')
   //    this.selectedShipments = this.allShipments; 
   //  }

   //  else {

   //  this.dataProvider.searchShippedItem(this.filter,this.filter.fromDate,this.filter.toDate)
   //  .then(resp => {
   //    console.log(resp)
   //    this.selectedShipments = resp
   //    // this.pagedItems = this.allShipments; 
   //  // this.dataLoad = true;
   //  })
   // }
 }

 search(){
    this.searchfilter = {...this.searchfilter, ...this.filter}
    this.searchfilter.transID = localStorage.getItem("transporterID");
   console.log('term  ',this.searchfilter)
   this.dataProvider.searchedbyDate(this.searchfilter).then((data:any) => {
     console.log(data)
   })
  }

  download(){
      this.http.get(this.auth.apiURL+'/reports/chp_kft3000.xlsx')
            .subscribe(res => {
  
                console.log(res)
            }, error => {
  

            });
  }

  clearFilter(){
    this.ionViewWillEnter();
    this.filter.shipment_number = '';
    this.filter.plant = '';
    this.filter.fromDate = '';
    this.filter.toDate = '';
    this.filter.lr_number = '';
    this.filter.transporter_name = '';
    this.filter.customer_name = '';
    this.filter.shipment_status = '';
  }
}
