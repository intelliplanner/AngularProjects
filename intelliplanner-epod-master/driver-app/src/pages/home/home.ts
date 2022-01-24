import { Component } from '@angular/core';
import { SearchVehiclePage } from '../search-vehicle/search-vehicle';
import { SimProvider } from '../../providers/sim/sim';
import { ImageProvider } from '../../providers/image/image';
import { IonicPage, ToastController, NavController, NavParams, Loading, LoadingController, Events, ActionSheetController, Platform } from 'ionic-angular';
import { DataProvider } from '../../providers/data/data';
import { AuthProvider } from '../../providers/auth/auth';
import { File } from '@ionic-native/file';
import { FileTransfer, FileUploadOptions, FileTransferObject } from '@ionic-native/file-transfer';
import { FilePath } from '@ionic-native/file-path';
import { Camera, CameraOptions } from '@ionic-native/camera';
import { ImageViewerController } from 'ionic-img-viewer';
import { LoginPage } from '../../pages/login/login';

declare var cordova: any;
@Component({
    selector: 'page-home',
    templateUrl: 'home.html'
})
export class HomePage {
    form: any = {};
    buttonDisabled = true;
    lrImage: any;
    currentInvoice: any = {};
    toggle: boolean = false;
    invoiceNumber: any;
    shipmentNumber: any;
    lrNumber: any = '';
    customerMobileNo: any;
    vehicleNumber: any = '';
    allInvoices: any = []
    shipment: any = {};
    lrImg: string = this.auth.apiURL + 'lrimages/lrdemo.jpg';
    _imageViewerCtrl: ImageViewerController;
    lastImage: string = null;
    error: any;
    loading: Loading;
    apiURL: any;


    constructor(
        public navCtrl: NavController,
        public navParams: NavParams,
        public events: Events,
        public simProvider: SimProvider,
        public imageProvider: ImageProvider,
        public loadingCtrl: LoadingController,
        public actionSheetCtrl: ActionSheetController,
        public platform: Platform,
        private transfer: FileTransfer,
        private file: File,
        private filePath: FilePath,
        public auth: AuthProvider,
        private camera: Camera,
        public toastCtrl: ToastController,
        public imageViewerCtrl: ImageViewerController,
        public dataProvider: DataProvider) {

        this.events.subscribe("active:true", () => {
            this.ionViewWillEnter();
        })
    }

    ionViewWillEnter() {

        this.form.vehicleNo = localStorage.getItem('vehicle_no')
        this.form.transporterCode = localStorage.getItem('transporter_code')

        const loader = this.loadingCtrl.create({
            content: "Please wait...",
            duration: 3000
        });
        console.log(this.form.vehicleNo + " " + this.form.transporterCode);
        loader.present();
        this.dataProvider.searchDriverShipments(this.form)
            .then((resp: any) => {
                loader.dismiss();
                console.log("searchDriverShipments ", resp)
                this.allInvoices = resp.invoices;
                this.shipment = resp.shipment;
             
                if(this.shipment && this.shipment != undefined){
                this.dataProvider.updateAppStatus(this.shipment)
                    .then(resp => {
                        console.log(resp);
                        if (!this.shipment.plant_location || this.shipment.plant_location == null) {
                            this.dataProvider.updateShipmentPlant(this.shipment.shipment_number)
                                .then(resp => {
                                    //console.log(resp);
                                })
                        }
                    })
                }
                else {
                    return;
                }
            })

    }


    openInvoice(invoice) {
        this.navCtrl.push(SearchVehiclePage, { selectData: invoice });
    }

    logout() {
        localStorage.clear();
        this.navCtrl.setRoot(LoginPage);
    }


}