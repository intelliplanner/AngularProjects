import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, Events, AlertController,LoadingController } from 'ionic-angular';
import { UsersProvider } from '../../providers/users/users';
import { GlobalsProvider } from '../../providers/globals/globals';


@IonicPage()
@Component({
  selector: 'page-update-plant-transporter',
  templateUrl: 'update-plant-transporter.html',
})
export class UpdatePlantTransporterPage {
	action:any;
	objt1:any={};
	allplant:any=[];
	type = 'password';
  showPass = false;
  constructor(public navCtrl: NavController,
        public navParams: NavParams,
        public usersProvider: UsersProvider,
        public events: Events, public globals: GlobalsProvider, public alertCtrl: AlertController,public loadingCtrl: LoadingController) {
  	this.action = this.navParams.data.action;
  	console.log("respppp  ", this.navParams.data);
 		
 		 const loader = this.loadingCtrl.create({
            content: "Please wait...",
            duration: 3000
        });
        loader.present();
  		  if (this.action == 'edit') {
            let transporter = this.navParams.data.tporterData;
            this.allplant = this.navParams.data.plant;
            // this.id = transporter.id;
            this.objt1 = transporter;
           
        }
        loader.dismiss();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad UpdatePlantTransporterPage');
  }


   updatePlantTransporter(){
   	 let newplantObj = Object.assign(this.objt1)

   	  newplantObj.plant_name = this.objt1.plant.plant_name;
      newplantObj.plant_code = this.objt1.plant.plant_code;
      newplantObj.transporter_code = this.objt1.transporter_code;
        console.log("this.value ", newplantObj);
        // newObj.id = this.id;
        this.usersProvider.updatePlantTransporter(newplantObj)
            .then(resp => {
                this.globals.presentToast('PlantTransporter updated successfully');
                console.log("updatePlantTransporter ", resp);
                this.navCtrl.pop();
            })
   }

   showPassword() {
    this.showPass = !this.showPass;

    if (this.showPass) {
      this.type = 'text';
    } else {
      this.type = 'password';
    }
  }

  typePlant(value){
      console.log(value);
  }


}
