import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, Loading,LoadingController,ModalController,Events } from 'ionic-angular';
import { AddEditDriverPage } from '../add-edit-driver/add-edit-driver';
import { DataProvider } from '../../providers/data/data';
import { GlobalsProvider } from '../../providers/globals/globals';
import { MapModalPage } from '../map-modal/map-modal';

@IonicPage()
@Component({
  selector: 'page-drivers',
  templateUrl: 'drivers.html',
})
export class DriversPage {
drivers: any = [];
filter: any = {};
searchTerm: any;
toggle: boolean = false;
  constructor(
  	public navCtrl: NavController, 
  	public dataProvider: DataProvider, 
    public loadingCtrl: LoadingController,
  	public navParams: NavParams,public modalCtrl: ModalController,public globals: GlobalsProvider,public events:Events) {

    this.events.subscribe('change:driver',() => {
      this.ionViewWillEnter()
    })
  }

  ionViewWillEnter(){
    console.log("driver55 ",localStorage.getItem('plant'))
    const loader =  this.loadingCtrl.create({
      content: "Please wait...",
      duration: 3000
    });
    
     loader.present()
     let drivOb = {code: localStorage.getItem('transporterCode'),plant: localStorage.getItem('plant')}
      this.filter = {code: localStorage.getItem('transporterCode'),plantcode:localStorage.getItem('plant')};
     this.dataProvider.getAllDriver(drivOb)
    .then((resp:any) => {
      console.log("driver ",resp)
      this.drivers = resp;
     loader.dismiss()      
    }, error => {
       console.log(error)
     loader.dismiss()
    })
    
  }

  // add() {
  //   this.navCtrl.push(AddEditDriverPage, { action : 'add'})
  // }

  // edit(driver){
  //   this.navCtrl.push(AddEditDriverPage, { action : 'edit', driver: driver})
  // }

   addNewDriver(driver) {
   let profileModal = this.modalCtrl.create(AddEditDriverPage, { driver: driver });
   profileModal.present();
 }


 getnewdriverLocation(driver){

    const loader = this.loadingCtrl.create({
      content: "Please wait...",
      duration: 3000
    });
    loader.present();

    this.dataProvider.addNewShipmentDriver(driver)
    .then((resp:any) => {
      console.log("driver ",resp)
      loader.dismiss();
      this.globals.presentToast(resp.message)
      this.ionViewWillEnter()
    }, error => {
    loader.dismiss();
      console.log(error)
    })
 }

 getdriverConsent(driver){
      const loader = this.loadingCtrl.create({
      content: "Please wait...",
      duration: 3000
    });
    loader.present();

    this.dataProvider.getdriverConsent(driver)
    .then((resp:any) => {
      console.log("driver ",resp)
      loader.dismiss();
      this.globals.presentToast(resp.message)
      this.ionViewWillEnter()
    }, error => {
    loader.dismiss();
      console.log(error)
    })
 }


 getLocation(drive){
   if(drive.plant_location != null){
     let locArry = drive.plant_location.split(',')
     let locModal = this.modalCtrl.create(MapModalPage, { driver: locArry });
     locModal.present();  
   }
   else{
     this.globals.presentToast("No Location Present..!!")
   }
 }


   getItems(e){
   
    this.filter.value = e.value;
    console.log("this.filter  ",e.value.length)
    if(e.value.length > 0){
     this.dataProvider.searchDriver(this.filter)
    .then((resp:any) => {
      console.log(resp)
      this.drivers = resp
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

 click(){
     this.toggle = !this.toggle;
     console.log(this.toggle)
     if(this.toggle == false){
   this.drivers = this.drivers.filter(d => {
     return d.plant_location == null
   })
  }
    if(this.toggle == true){
   this.drivers = this.drivers.filter(d => {
     return d.plant_location != null
   })
  }
}

}
