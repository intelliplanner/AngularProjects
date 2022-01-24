import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, Events, AlertController,LoadingController } from 'ionic-angular';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { UsersProvider } from '../../providers/users/users';
import { GlobalsProvider } from '../../providers/globals/globals';
import { UpdatePlantTransporterPage } from '../update-plant-transporter/update-plant-transporter';

@IonicPage()
@Component({
    selector: 'page-add-edit-transporter',
    templateUrl: 'add-edit-transporter.html',
})
export class AddEditTransporterPage {
    private form: FormGroup;
    action: any;
    // action2:any;
    action2 = 'notplantadd';
    id: any;
    tcode:any;
  type = 'password';
  showPass = false;
  value:any;
  tab = 'transporteradd';
  objt:any={};
  getPlant:any=[];
  transportPlant:any=[];
  getPlantarray:any=[];
    constructor(public navCtrl: NavController,
        public navParams: NavParams,
        public usersProvider: UsersProvider,
        public events: Events,
        private fb: FormBuilder, public globals: GlobalsProvider, public alertCtrl: AlertController, public loadingCtrl: LoadingController) {
        this.action = this.navParams.data.action;
         console.log("this.action  ", this.action);
        if (this.action == 'add') {
            this.form = this.fb.group({
                name: ['', Validators.required],
                // id: ['', Validators.required],
                email: [''],
                // password: ['', [Validators.required]],
                phone: [''],
                transporter_code: ['', Validators.required],
                postal_code: ['', Validators.required],
                street: ['', Validators.required],
                street_1: [''],
                street_2: [''],
                city: ['', Validators.required],
                state: ['', Validators.required]
            });
        }
        if (this.action == 'edit') {
            let transporter = this.navParams.data.transporter;
            this.id = transporter.id;
            this.tcode = transporter.transporter_code;
            this.form = this.fb.group({
                name: [transporter.name, Validators.required],
                // id: [transporter.id, Validators.required],
                email: [transporter.email],
                // password: [transporter.password, [Validators.required]],
                phone: [transporter.phone],
                transporter_code: [transporter.transporter_code, Validators.required],
                postal_code: [transporter.postal_code, Validators.required],
                street: [transporter.street, Validators.required],
                street_1: [transporter.street_1],
                street_2: [transporter.street_2],
                city: [transporter.city, Validators.required],
                state: [transporter.state, Validators.required]
            });
        } 
        
    }

    // ionViewDidLoad(){
    //     this.usersProvider.getPlants()
    //         .then(resp => {
    //             console.log("resplll  ", resp);
    //                  this.getPlant = resp.plant; 
    //         })
    // }

    // function getPlantsTransporter(tranpcode){
    //     let ob = {tcode:tranpcode}
    //    this.usersProvider.getPlantsTransporter(ob)
    //         .then(resp => {
    //             console.log("resplll  ", resp);
    //             this.transportPlant = resp;
                    
                
    //         })  
    // }

    
    addTransporter() {
        console.log("this.form.value ", this.form.value);
        this.usersProvider.addTransporter(this.form.value)
            .then(resp => {
                this.globals.presentToast('Transporter added successfully');
                console.log("respppp  ", resp);
                // this.events.publish("agent:added");
                this.navCtrl.pop();
            })
    }

    updateTransporter() {
        let newObj = Object.assign(this.form.value)
        newObj.id = this.id;
        this.usersProvider.updateTransporter(newObj)
            .then(resp => {
                this.globals.presentToast('Transporter updated successfully');
                console.log("updateTransporter ", resp);
                this.navCtrl.pop();
            })
    }

    deleteTransporter() {
        let that = this;
        const confirm = this.alertCtrl.create({
            title: 'Do you want to delete this transporter?',
            buttons: [{
                    text: 'Cancel',
                    handler: () => {
                        console.log('cancel clicked');
                    }
                },
                {
                    text: 'OK',
                    handler: () => {
                        that.usersProvider.deleteTransporter(that.id)
                            .then(resp => {
                                console.log(resp);
                                that.navCtrl.pop();
                            })
                    }
                }
            ]
        });
        confirm.present();

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

  addplantfunc(){
      this.action2 = 'plantadd'
      const loader = this.loadingCtrl.create({
            content: "Please wait...",
            duration: 3000
        });
        loader.present();
       let ob = {tcode:this.tcode}
       this.usersProvider.getPlantsTransporter(ob)
            .then(resp => {
                this.transportPlant = resp;
               
                this.usersProvider.getPlants()
            .then(resp => {
                     this.getPlant = resp;
                     this.getPlantarray = resp; 
               loader.dismiss();
            })     
                
            })  
  }
  addeditplantfunc(){
     this.action2 = 'notplantadd' 
  }

  addPlantTransporter(){
      // let newplantObj = {};
      let newplantObj = Object.assign(this.objt);
      newplantObj.plant_name = this.objt.plant.plant_name;
      newplantObj.plant_code = this.objt.plant.plant_code;
      newplantObj.transporter_code = this.form.value.transporter_code;
        this.usersProvider.addPlantTransporter(newplantObj)
            .then(resp => {
                this.globals.presentToast('TransporterPlant added successfully');
                this.addplantfunc();
            })
     }

     edittransPlant(tporter){
         this.navCtrl.push(UpdatePlantTransporterPage,{action:'edit',tporterData:tporter,plant:this.getPlantarray});
     }

    


}