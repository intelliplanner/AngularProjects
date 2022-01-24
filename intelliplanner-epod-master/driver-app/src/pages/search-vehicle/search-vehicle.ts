import { Component } from '@angular/core';
import { IonicPage, ToastController, NavController, NavParams, AlertController, Loading, LoadingController, Events, ActionSheetController, Platform } from 'ionic-angular';
import { DataProvider } from '../../providers/data/data';
import { AuthProvider } from '../../providers/auth/auth';
import { HomePage } from '../home/home';
import { File } from '@ionic-native/file';
import { FileTransfer, FileUploadOptions, FileTransferObject } from '@ionic-native/file-transfer';
import { FilePath } from '@ionic-native/file-path';
import { Camera, CameraOptions } from '@ionic-native/camera';
import { ImageViewerController } from 'ionic-img-viewer';
import { Diagnostic } from '@ionic-native/diagnostic';
declare var cordova: any;

@IonicPage()
@Component({
    selector: 'page-search-vehicle',
    templateUrl: 'search-vehicle.html',
})
export class SearchVehiclePage {
    vehicleNumber: any = '';
    allSearchedVehicles: any = []
    shipment: any = {};
    invoice: any = {};
    _imageViewerCtrl: ImageViewerController;
    abc: any;
    lastImage: string = null;
    error: any;
    loading: Loading;
    apiURL: any;
    buttonDisabled = true;
    lrImage: any;
    currentInvoice: any = {};
    toggle: boolean = false;
    invoiceNumber: any;
    shipmentNumber: any;
    lrNumber: any = '';
    customerMobileNo: any;
    lrImg: string = this.auth.apiURL + 'lrimages/lrdemo.jpg';
    constructor(
        public navCtrl: NavController,
        public navParams: NavParams, public events: Events,
        public dataProvider: DataProvider,
        public loadingCtrl: LoadingController,
        public actionSheetCtrl: ActionSheetController,
        public diagnostic: Diagnostic,
        public platform: Platform,
        private transfer: FileTransfer,
        private file: File,
        private filePath: FilePath,
        public alertCtrl: AlertController,
        public auth: AuthProvider,
        private camera: Camera,
        public toastCtrl: ToastController,
        public imageViewerCtrl: ImageViewerController
    ) {

        this.invoice = this.navParams.data.selectData;
        console.log('ionViewDidLoad SearchVehiclePage', this.invoice);
        this._imageViewerCtrl = this.imageViewerCtrl;

        this.apiURL = this.auth.apiURL;
    }

    // changeNumber() {
    //   console.log('ionViewDidLoad SearchVehiclePage', this.vehicleNumber);
    //   if(this.vehicleNumber.length > 3)
    //   {
    //   this.dataProvider.searchvehicle(this.vehicleNumber)
    //   .then(resp => {
    //     console.log(resp)
    //     this.allSearchedVehicles = resp
    //   }) 
    //   }
    // }

    // selectVehicle(number){
    //    console.log("click typed  ")
    //    localStorage.setItem('vehicleNumber', number.name);
    //    this.navCtrl.pop();
    // // let profileModal = this.modalCtrl.create(HomePage, { VehicleNo: number.name });
    // // profileModal.present();


    // }

    // save() {
    //     const loader = this.loadingCtrl.create({
    //         content: "Please wait...",
    //         duration: 3000
    //     });
    //     loader.present();

    //     let data = {
    //         shipment_number: this.shipment.shipment_number,
    //         lr_number: this.shipment.lr_number
    //     }

    //     this.dataProvider.updateShipmentLR(data)
    //         .then(resp => {
    //             loader.dismiss();
    //             this.navCtrl.pop()
    //         }, error => {
    //             loader.dismiss();
    //         })
    // }




        public presentActionSheet(invoice) {
        this.currentInvoice = invoice
        let actionSheet = this.actionSheetCtrl.create({
            title: 'Select Image Source',
            buttons: [{
                    text: 'Load from Library',
                    handler: () => {
                        this.takePicture(this.camera.PictureSourceType.PHOTOLIBRARY)
                    }
                },
                {
                    text: 'Use Camera',
                    handler: () => {
                        this.takePicture(this.camera.PictureSourceType.CAMERA)
                    }
                },
                {
                    text: 'Cancel',
                    role: 'cancel'
                }
            ]
        });
        actionSheet.present();

    }

    public takePicture(sourceType) {
        var options = {
            quality: 50,
            sourceType: sourceType,
            correctOrientation: true,
            targetHeight: 500,
            targetWidth: 500
        };
        this.camera.getPicture(options).then((imagePath) => {
            // Special handling for Android library

            if (this.platform.is('android') && sourceType === this.camera.PictureSourceType.PHOTOLIBRARY) {
                this.filePath.resolveNativePath(imagePath)
                    .then(filePath => {
                        let correctPath = filePath.substr(0, filePath.lastIndexOf('/') + 1);
                        let currentName = imagePath.substring(imagePath.lastIndexOf('/') + 1, imagePath.lastIndexOf('?'));
                        this.copyFileToLocalDir(correctPath, currentName, this.createFileName());

                    });
            } else {
                var currentName = imagePath.substr(imagePath.lastIndexOf('/') + 1);
                var correctPath = imagePath.substr(0, imagePath.lastIndexOf('/') + 1);
                this.copyFileToLocalDir(correctPath, currentName, this.createFileName());

            }
        }, (err) => {
            this.presentToast('Error while selecting image.');
        });

    }

    private createFileName() {
        var d = new Date(),
            n = d.getTime(),
            newFileName = n + ".jpg";
        return newFileName;
    }

    private copyFileToLocalDir(namePath, currentName, newFileName) {
        this.file.copyFile(namePath, currentName, cordova.file.dataDirectory, newFileName).then(success => {
            this.lastImage = newFileName;
            this.uploadImage();
        }, error => {
            this.presentToast('Error while storing file.');
        });
    }

    private presentToast(text) {
        let toast = this.toastCtrl.create({
            message: text,
            duration: 3000,
            position: 'top'
        });
        toast.present();
    }

    public pathForImage(img) {
        if (img === null) {
            return '';
        } else {
            return cordova.file.dataDirectory + img;
        }
    }

    public uploadImage() {
        let customerNumber;

        if (this.currentInvoice.soldtoparty_mobileno)
            customerNumber = this.currentInvoice.soldtoparty_mobileno
        else
            customerNumber = this.currentInvoice.shiptoparty_mobileno


        var url = this.auth.apiURL + "lrImage/" + this.currentInvoice.invoice_number + '/' + customerNumber + '/' + this.currentInvoice.customer_emailid;
        console.log("url ---------- ", url);
        var targetPath = this.pathForImage(this.lastImage);

        var filename = this.lastImage;

        var options = {
            fileKey: "image",
            fileName: "filename",
            chunkedMode: false,
            mimeType: "multipart/form-data",
            params: { 'image': "filename" }
        };

        const fileTransfer: FileTransferObject = this.transfer.create();

        let loading = this.loadingCtrl.create({
            content: 'Uploading...',
        });
        loading.present();
        fileTransfer.upload(targetPath, url, options).then(data => {
            console.log("data", data);
            loading.dismiss()
            this.lrImg = targetPath;
            this.currentInvoice.signed_lr_image = this.currentInvoice.signed_lr_image + '?' + new Date().getTime();
            this.events.publish("active:true"); 
            this.navCtrl.pop();
            // if (!this.currentInvoice.destination_location) {
            //     this.dataProvider.updateShipmentDestination(this.currentInvoice, 1)
            //         .then(resp => {
            //             this.events.publish("active:true");
            //         })
            // }
            // else{
            //       this.events.publish("active:true");  
            // }

            this.presentToast('Image succesful uploaded.');
        }, err => {
            loading.dismissAll()
            this.error = JSON.stringify(err);
            //console.log(this.error);
            this.presentToast('Error while uploading file.');
        });
    }

     notAvailable(invoice) {
     let that = this;
    const confirm = this.alertCtrl.create({
      title: 'Customer not available?',
      message: 'Submit if customer is not available!',
      buttons: [
        {
          text: 'Cancel',
          handler: () => {
            console.log('Disagree clicked');
          }
        },
        {
          text: 'Submit',
          handler: () => {
        that.dataProvider.customerAvaliableStatus(invoice, 0)
            .then((resp:any) => {
                if(resp[0] == 1){
                that.events.publish("active:true"); 
                that.navCtrl.pop();
                that.presentToast('Customer not avaliable status submit .. !!');
                }
                else {
                that.presentToast('Customer not avaliable status not submit .. !! Try Again .. !!');
                }

            })
          }
        }
      ]
    });
    confirm.present();



    }

    navigation(invoice){
        let that = this;

        this.diagnostic.isGpsLocationAvailable().then(function(success){
            console.log("isLocationEnabled success ",success)
            if(success)
            {
            that.dataProvider.updateLocationDestination(invoice, 1)
                 .then(resp => {
                     if(resp){
                         invoice.destination_location = resp;
                         that.presentToast('Location Captured.');
                         // that.navCtrl.pop();
                     }
                     else{
                        that.presentToast('Location Not found.'); 
                     }
               })
            }
            else
            {
                        that.presentToast('Please turn on GPS.'); 
            }
        }).catch(function(error){
            console.log("isLocationEnabled error ",error)
                        that.presentToast('Please turn on GPS.'); 
        });


    }

    submit(){
        if(!this.invoice.signed_lr_image)
        {
            this.presentToast('Signed LR Image Missing!')
            return;
        }
        else
        if(!this.invoice.destination_location)
        {
            this.presentToast('Destination Location Missing!')
            return;
        }

        if(this.invoice.signed_lr_image && this.invoice.destination_location)
            this.navCtrl.pop();
    }

}