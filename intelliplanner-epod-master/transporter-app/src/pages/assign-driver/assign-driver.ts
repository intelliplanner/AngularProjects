import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController, Content } from 'ionic-angular';
import { DataProvider } from '../../providers/data/data';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@IonicPage()
@Component({
    selector: 'page-assign-driver',
    templateUrl: 'assign-driver.html',
})
export class AssignDriverPage {
    @ViewChild(Content) content: Content;
    private form: FormGroup;
    private formSelect: FormGroup;
    search: any = '';
    drivers: any = []
    shipment: any = {}
    driver: any = {};
    select: boolean = false;
    toggleAddDriver: boolean = false;

    constructor(
        public navCtrl: NavController,
        public viewCtrl: ViewController,
        public dataProvider: DataProvider,
        private fb: FormBuilder,
        public navParams: NavParams) {

        this.shipment = navParams.data.shipment;

        this.form = this.fb.group({
            name: ['', Validators.required],
            phone: ['', Validators.required],
            tracking_type: [1, [Validators.required]]
        });
    }

    close() {
        this.viewCtrl.dismiss({status: false});
    }

    selectDriver(driver) {
        this.driver = driver;
        this.select = true;

        this.formSelect = this.fb.group({
            name: [driver.name, Validators.required],
            phone: [driver.phone, Validators.required],
            tracking_type: [driver.tracking_type, [Validators.required]]
        });
    }

 
    toggleAddNewDriver() {
        this.toggleAddDriver = !this.toggleAddDriver;
        this.content.resize();
    }

    toggleSelect() {
        this.select = !this.select;
    }

    assignDriver() {
        console.log(this.shipment)
        this.dataProvider.assignDriver(this.driver, this.shipment.id)
            .then(() => {
                this.viewCtrl.dismiss({ status: true });
            }, error => {
                console.log(error)
            })
    }

    add() {
    	this.driver = this.form.value;
        this.dataProvider.addDriver(this.form.value)
            .then(() => {
                this.dataProvider.assignDriver(this.driver, this.shipment.id)
                    .then(() => {
                        this.viewCtrl.dismiss({ status: true });
                    }, error => {
                        console.log(error)
                    })

            }, error => {
                console.log(error)
            })
    }
}