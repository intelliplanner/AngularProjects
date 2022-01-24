import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams,Events,ViewController } from 'ionic-angular';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { DataProvider } from '../../providers/data/data';
import { GlobalsProvider } from '../../providers/globals/globals';

@IonicPage()
@Component({
  selector: 'page-add-edit-driver',
  templateUrl: 'add-edit-driver.html',
})
export class AddEditDriverPage {
  private form: FormGroup;
    action: any;
    id: any;
    orderDriver:any;

    oldDriver:any= {};
  constructor(public navCtrl: NavController, 
  	public navParams: NavParams, 
  	public events: Events, 
  	public dataProvider: DataProvider, 
  	private fb: FormBuilder,public viewCtrl: ViewController,public globals: GlobalsProvider) {
  	// this.action = this.navParams.data.action;
    this.orderDriver = navParams.data.driver;
          console.log('UserId   ', navParams.get('driver'));

          console.log('UserId this.orderDriver  ', this.orderDriver.driver_phoneno.length);

          this.oldDriver.second_driver_name = this.orderDriver.driver_name;
          this.oldDriver.second_driver_phoneno = this.orderDriver.driver_phoneno;
          this.oldDriver.second_driver_vehicle_no = this.orderDriver.vehicle_no;
          this.oldDriver.second_driver_tro_no = this.orderDriver.tro_no;
          this.oldDriver.second_driver_using_smartphone_or_sim = this.orderDriver.driver_using_smartphone_or_sim_plant;
  	      this.oldDriver.shipment_number = this.orderDriver.shipment_number; 
          this.oldDriver.plant_location = this.orderDriver.plant_location; 
    // if(this.action == 'add')
  	// {
                this.form = this.fb.group({
                    driver_name: ['', Validators.required],
                    driver_phoneno: ['', Validators.required],
                    vehicle_no: ['', Validators.required],
                    tro_no: ['', Validators.required],
                    driver_using_smartphone_or_sim_plant: ['EPOD', [Validators.required]]
                });
  	// }
  	// if(this.action == 'edit')
  	// {
  	// let driver = this.navParams.data.driver;
  	// this.id = driver.id;
   //              this.form = this.fb.group({
   //                  name: [driver.name, Validators.required],
   //                  phone: [driver.phone, Validators.required],
   //                  tracking_type: [driver.tracking_type, [Validators.required]]
   //              });
  	// }
  }

  change() {
    const newDriverObj = Object.assign({}, this.form.value, this.oldDriver);
    if(this.form.value.tro_no == this.orderDriver.tro_no && this.form.value.vehicle_no == this.orderDriver.vehicle_no){

      this.dataProvider.addNewShipmentDriver(newDriverObj)
    .then((resp:any) => {
      console.log("driverresp--",resp)
         this.globals.presentToast("Driver Changed..!!")
         this.events.publish('change:driver');
         this.navCtrl.pop();

    }, error => {
      console.log(error)
    })
  }
  else{
    this.globals.presentToast("TRO Number and Vehicle Number not Matching..!!")

  }

  }

  // update() {
  //   this.dataProvider.updateDriver(this.form.value)
  //   .then(resp => {
  //     this.navCtrl.pop();
  //   }, error => {
  //     console.log(error)
  //   })
  // }

   dismiss() {
   // let data = { 'foo': 'bar' };
   this.viewCtrl.dismiss();
 }


}
