import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController, ModalController, AlertController } from 'ionic-angular';
import { DataProvider } from '../../providers/data/data';
import { ShipmentProvider } from '../../providers/shipment/shipment';
import { AssignDriverPage } from '../assign-driver/assign-driver';
import { OneShipmentPage } from '../one-shipment/one-shipment';
import { UpdateoneShipmentPage } from '../updateone-shipment/updateone-shipment';
import { AccountPostingPage } from '../account-posting/account-posting';
import { MapModalPage } from '../map-modal/map-modal';
import * as _ from "lodash";

@IonicPage()
@Component({
    selector: 'page-trip-filter',
    templateUrl: 'trip-filter.html',
})
export class TripFilterPage {
    filter: any;
    invoices: any = [];
    keys: any = [];
    keysPO: any = [];
    purchaseOrders: any = [];
    realShipments: any = [];
    color = "#ececec";
    search: any;
    setValue: any = false;
    clickKey: any;
    transinvoiceObj: any = {};
    onePlant:any;
    invoicePlantObj:any ={};
    constructor(
        public navCtrl: NavController,
        public navParams: NavParams,
        public loadingCtrl: LoadingController,
        public alertCtrl: AlertController,
        public modalCtrl: ModalController,
        public shipmentProvider: ShipmentProvider,
        public dataProvider: DataProvider) {

        this.filter = navParams.data.filter;
        this.transinvoiceObj = {
            transporter_code: localStorage.getItem('transporterCode'),
            plant: localStorage.getItem('plant'),
            transporterid: localStorage.getItem('transporterID')
        }
    }

    ionViewWillEnter() {
        const loader = this.loadingCtrl.create({
            content: "Please wait...",
            duration: 3000
        });
        loader.present();

        this.dataProvider.getFilteredShipments(this.filter.value)
            .then((data: any = []) => {

                if (this.filter.value != 'invoiceReady') {
                    this.invoices = data;
                    this.realShipments = data;
                } else {
                    var groupedPO = _.mapValues(_.groupBy(data, 'purchase_order_number'),
                        clist => clist.map(invoice => _.omit(invoice, 'purchase_order_number')));

                    this.purchaseOrders = groupedPO;
                    this.keysPO = Object.keys(groupedPO);

                    this.dataProvider.getPlant().then((plnt:any) => {
                        this.onePlant = plnt
                        this.transinvoiceObj = {...this.transinvoiceObj , ...this.onePlant}
                        console.log("this.onePlant ",this.transinvoiceObj);
                    })
                }

                loader.dismiss();
            }, error => {
                loader.dismiss();
                console.log(error);
            })


    }

    openinvoice(invoice) {
        this.navCtrl.push(UpdateoneShipmentPage, { invoice: invoice, filter: this.filter })
    }

    assignDriver(invoice) {
        const modal = this.modalCtrl.create(AssignDriverPage, { invoice: invoice });

        modal.onDidDismiss((resp) => {
            if (resp.status)
                this.ionViewWillEnter();
        })

        modal.present();
    }

    getLocation(invoice) {
        let locArry = invoice.destination_location.split(',')
        let locModal = this.modalCtrl.create(MapModalPage, { driver: locArry });
        locModal.present();
    }

    getItems(ev) {
        let that = this;
        if (this.search.length > 0) {
            this.invoices = this.realShipments.filter(function(invoice) {
                if (!invoice.destination_name)
                    invoice.destination_name = '';
                return invoice.invoice_number.toLowerCase().indexOf(that.search.toLowerCase()) > -1 ||
                    invoice.vehicle_no.toLowerCase().indexOf(that.search.toLowerCase()) > -1 ||
                    invoice.destination_name.toLowerCase().indexOf(that.search.toLowerCase()) > -1
            })
        } else {
            this.invoices = this.realShipments;
        }
    }

    getLimit(key) {
        return this.purchaseOrders[key][0].left_submit;
    }

    getCost(key) {

        let cost = this.purchaseOrders[key].reduce((accumulator, invo) => {
            return (accumulator + (invo.invoice_quantity * invo.rate));
        }, 0)
        return cost.toFixed(2);
    }

    openPdf(invoice) {
        this.navCtrl.push(AccountPostingPage, { invoice: invoice });
    }

    openInvoicePdf(invoice) {
        console.log(invoice)
        this.navCtrl.push(AccountPostingPage, { transporter_invoice_number: invoice });
    }

    selectInvoice(invoice, key) {
        // invoice.checked = true;
    }

    checkSelected(key) {
        let shipments = this.purchaseOrders[key].filter(function(shipment) {
            return shipment.checked == true;
        })
        if (shipments.length == 0)
            return false
        else
            return true
    }

    submitPO(key) {
        let shipments = this.purchaseOrders[key].filter(function(shipment) {
            return shipment.checked == true;
        })
        let left_submit = this.purchaseOrders[key][0].left_submit;

        const loader = this.loadingCtrl.create({
            content: "Please wait...",
            duration: 3000
        });

        let alert1 = this.alertCtrl.create({
            title: 'Notice!',
            subTitle: 'You can submit invoices ' + (left_submit - 1) + ' more time with current PO number.',

            inputs: [{
                name: 'invoice_number',
                placeholder: 'invoice number'
            }],
            buttons: [{
                    text: 'Cancel',
                    role: 'cancel',
                    handler: data => {
                        console.log('Cancel clicked');
                    }
                },
                {
                    text: 'Submit',
                    handler: data => {
                        if (data.invoice_number) {
                            console.log("data----", data);
                            loader.present();
                            this.transinvoiceObj.tNum = data.invoice_number;
                            this.dataProvider.accountPosting(shipments, key, --left_submit, this.transinvoiceObj)
                                .then((data: any) => {
                                    // this.ionViewWillEnter();
                                    loader.dismiss();
                                    this.navCtrl.push(AccountPostingPage, { invoices: shipments, transporter_invoice_number: this.transinvoiceObj.tNum });
                                }, error => {
                                    loader.dismiss();
                                    console.log(error);
                                })
                        } else {
                            return false;
                        }
                    }
                }
            ]
        });
        alert1.present();
    }

    openTable(key) {
        this.clickKey = key;
        let stats = this.keysPO.includes(key)
        if (stats) {
            this.setValue = true;
        }
    }

    checkStatus(invoice, key) {
        const loader = this.loadingCtrl.create({
            content: "Please wait...",
            duration: 3000
        });
        loader.present();
        this.dataProvider.checkStatus(invoice, key)
            .then((data: any) => {
                // this.ionViewWillEnter();
                invoice.invoice_submit_status = data;
                loader.dismiss();
            }, error => {
                console.log(error);
                loader.dismiss();
            })
    }
}