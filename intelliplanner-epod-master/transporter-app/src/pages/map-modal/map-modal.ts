import { Component, ViewChild, ElementRef } from '@angular/core';
import { IonicPage, NavController, NavParams,Events,ViewController } from 'ionic-angular';


@IonicPage()
@Component({
  selector: 'page-map-modal',
  templateUrl: 'map-modal.html',
})
export class MapModalPage {

  map: any;
  locDriver:any=[];
  lat: number;
  lng: number;
  constructor(public navCtrl: NavController, public navParams: NavParams) {
  this.locDriver = navParams.data.driver;
  }

   ionViewDidLoad(){
 	// this.loadMap(this.locDriver);
 	this.lat = parseFloat(this.locDriver[0]);
  this.lng = parseFloat(this.locDriver[1]);
  }

  // loadMap(latlngloc){

  //   // this.geolocation.getCurrentPosition().then((position) => {
  //   	console.log("driver ",latlngloc);
  //     let latLng = new google.maps.LatLng(latlngloc[0], latlngloc[1]);

  //     let mapOptions = {
  //       center: latLng,
  //       zoom: 15,
  //       mapTypeId: google.maps.MapTypeId.ROADMAP
  //     }

  //     this.map = new google.maps.Map(this.mapElement.nativeElement, mapOptions);

  //   // }, (err) => {
  //   //   console.log(err);
  //   // });

  // }

}

