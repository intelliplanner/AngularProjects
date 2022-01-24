import { Component } from '@angular/core';
import { IonicPage, ToastController, NavController, NavParams, Loading, LoadingController, Events, ActionSheetController, Platform } from 'ionic-angular';
import { DataProvider } from '../../providers/data/data';
import { GlobalsProvider } from '../../providers/globals/globals';
import { AuthProvider } from '../../providers/auth/auth';
import { File } from '@ionic-native/file';
import { FileTransfer, FileUploadOptions, FileTransferObject } from '@ionic-native/file-transfer';
import { FilePath } from '@ionic-native/file-path';
import { Camera, CameraOptions } from '@ionic-native/camera';
import { ImageViewerController } from 'ionic-img-viewer';
import { Http, Headers, RequestOptions } from '@angular/http';
import * as Rx from "rxjs";
import { map } from 'rxjs/operators';

declare var cordova: any;

@IonicPage()
@Component({
    selector: 'page-updateone-shipment',
    templateUrl: 'updateone-shipment.html',
})
export class UpdateoneShipmentPage {

    invoice: any = {};
    filter: any;
    lrImage: any;
    abc: any;
    lastImage: string = null;
    error: any;
    loading: Loading;
    lrImg: string;
    tab: any = 'locMissing';
    base64data: any;
    apiURL: any;
    _imageViewerCtrl: ImageViewerController;
    lat:number;
    lng:number;
    constructor(
        public navCtrl: NavController,
        public navParams: NavParams,
        public events: Events,
        public dataProvider: DataProvider,
        public globals: GlobalsProvider,
        public loadingCtrl: LoadingController,
        public actionSheetCtrl: ActionSheetController,
        public platform: Platform,
        private transfer: FileTransfer,
        private file: File,
        private filePath: FilePath,
        public http: Http,
        public auth: AuthProvider,
        private camera: Camera,
        public toastCtrl: ToastController,
        public imageViewerCtrl: ImageViewerController) {
        this.invoice = navParams.data.invoice

        console.log(this.invoice)
        if(this.invoice.destination_location)
        {
        let locArry = this.invoice.destination_location.split(',');

            this.lat = parseFloat(locArry[0]);
            this.lng =  parseFloat(locArry[1]);
        }
        
        this.filter = navParams.data.filter
        this._imageViewerCtrl = this.imageViewerCtrl;
        this.apiURL = this.auth.apiURL;

        if(this.invoice.destination_location == null)
            this.tab = 'locMissing'

        if(!this.invoice.signed_lr_image)
            this.tab = 'lrMissing'

        if(this.invoice.destination_location && this.invoice.signed_lr_image && !this.invoice.customer_accepted)
            this.tab = 'waitingCustomer'

        this.lrImg = this.apiURL+'lrimages/lrdemo.jpg';
        // let result = this.shipment.signed_lr_image.data;
        //      var blob = new Blob(Uint8Array(result), {
        //         type: 'image/png'
        //       });

        //       let that = this;
        //       var reader = new FileReader();
        //       reader.readAsDataURL(blob);
        //       reader.onloadend = () => {
        //    console.log(reader.result);
        //  // let decodedData = window.scope.atob(reader.result);
        //   that.shipment.signed_lr_image = reader.result
        //     // that.shipment.signed_lr_image = decodedData
        //     // console.log(reader.result);
        //       }

    }


    onFileSelected(event, data) {
        let file = event.target.files[0]
        let customerNumber;

        if (this.invoice.soldtoparty_mobileno)
            customerNumber = this.invoice.soldtoparty_mobileno
        else
            customerNumber = this.invoice.shiptoparty_mobileno

        var url = this.auth.apiURL + "lrImage/" + this.invoice.invoice_number + '/' + customerNumber + '/' + this.invoice.customer_emailid;
        console.log(url);

        var options = {
            fileKey: "image",
            fileName: "filename",
            chunkedMode: false,
            mimeType: "multipart/form-data",
            params: { 'image': "filename" }
        };

        const fileTransfer: FileTransferObject = this.transfer.create();

        this.loading = this.loadingCtrl.create({
            content: 'Uploading...',
        });
        this.loading.present();


        let formData: FormData = new FormData();
        formData.append('image', file, '12345');


        let headers = new Headers()
        let opts = new RequestOptions({ headers: headers });


        this.http.post(url, formData, opts)
            .subscribe(res => {
                this.loading.dismissAll()
                this.presentToast('Image succesful uploaded.');
                this.invoice.signed_lr_image = this.apiURL + "lrimages/" + this.invoice.invoice_number + '.jpg';
                this.invoice.signed_lr_image = this.invoice.signed_lr_image + '?' + new Date().getTime();
                console.log(res)
            }, error => {
                this.loading.dismissAll()
                this.presentToast('Error while uploading file.');

            });
    }



    public presentActionSheet(myImage) {
        let actionSheet = this.actionSheetCtrl.create({
            title: 'Select Image Source',
            buttons: [{
                    text: 'View Image',
                    handler: () => {
                        const imageViewer = this._imageViewerCtrl.create(myImage);
                        imageViewer.present();
                    }
                },
                {
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
            quality: 80,
            sourceType: sourceType,
            correctOrientation: true,
            targetHeight: 500,
            targetWidth: 500
        };
        console.log("sourceType ", sourceType)

        console.log("options ", options)
        // Get the data of an image
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

    // Copy the image to a local folder
    private copyFileToLocalDir(namePath, currentName, newFileName) {
        this.file.copyFile(namePath, currentName, cordova.file.dataDirectory, newFileName).then(success => {
            this.lastImage = newFileName;
            console.log("copyFileToLocalDir ", newFileName);
            this.uploadImage();
        }, error => {
            this.presentToast('Error while storing file.');
        });
    }

    private presentToast(text) {
        let toast = this.toastCtrl.create({
            message: text,
            duration: 3000,
            position: 'bottom'
        });
        toast.present();
    }

    // Always get the accurate path to your apps folder
    public pathForImage(img) {
        if (img === null) {
            return '';
        } else {
            return cordova.file.dataDirectory + img;
        }
    }

    public uploadImage() {
        let customerNumber;

        if (this.invoice.soldtoparty_mobileno)
            customerNumber = this.invoice.soldtoparty_mobileno
        else
            customerNumber = this.invoice.shiptoparty_mobileno

        var url = this.auth.apiURL + "lrImage/" + this.invoice.invoice_number + '/' + customerNumber + '/' + this.invoice.customer_emailid;
        console.log("url ---------- ", url);
        var targetPath = this.pathForImage(this.lastImage);


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
                this.invoice.signed_lr_image = this.apiURL + "lrimages/" + this.invoice.invoice_number + '.jpg';
            this.invoice.signed_lr_image = this.invoice.signed_lr_image + '?' + new Date().getTime();
            this.presentToast('Image succesful uploaded.');
        }, err => {
            loading.dismissAll()
            this.error = JSON.stringify(err);
            //console.log(this.error);
            this.presentToast('Error while uploading file.');
        });
    }


    actionSheet(image) {
        let actionSheet = this.actionSheetCtrl.create({
            title: 'Select Image Source',
            buttons: [{
                    text: 'View Image',
                    handler: () => {
                        const imageViewer = this._imageViewerCtrl.create(image);
                        imageViewer.present();
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







    // saveLR(){
    //   console.log('ionViewDidLoad OneShipmentPage',this.shipment);

    //   this.shipment.signed_lr_image = this.lrImage;

    //   this.dataProvider.updateLR(this.shipment)
    //   .then(resp => {
    //     console.log(resp)
    //     this.globals.presentToast('Shipment Updated')
    //     this.navCtrl.pop()
    //   })

    // }

    getConsent() {
        console.log("location", this.invoice)
        this.dataProvider.getConsent(this.invoice)
            .then((resp: any) => {
                console.log("location", resp)
                if (resp && resp.status == false) {
                    this.globals.presentToast(resp.message)
                }
                if (resp && resp.status == true) {
                    this.globals.presentToast(resp.message)

                    this.navCtrl.pop()

                }

            })


    }

    sendMessage() {
        this.dataProvider.sendMessagetoCustomer(this.invoice)
            .then((resp: any) => {
                console.log("resp  ", resp)
                if (resp && resp.status == 'success') {
                    this.globals.presentToast('Message sent successfully!')
                } else {
                    this.globals.presentToast('Cannot send message at this time!')
                }


            })
    }

    // updateShipment() {
    //     this.invoice.signed_lr_image = this.apiURL + "lrimages/" + this.invoice.lr_number + '.jpg';
    //     this.dataProvider.updateShipmentTransporter(this.invoice)
    //         .then((resp: any) => {
    //             console.log("resp  ", resp)
    //             if (resp && resp.status == 'success') {
    //                 this.globals.presentToast('Shipment Updated successfully..!!')
    //                 this.getoneShip()
    //             } else {
    //                 this.globals.presentToast("Not Updated..")
    //             }


    //         })
    // }

    getoneShip = function() {
        this.dataProvider.getoneshipment(this.invoice)
            .then((resp: any) => {
                this.shipment = resp;
            })
    }

    updateinvoices() {
        this.dataProvider.updateInvoices(this.invoice.shipment_number, { lr_number: this.invoice.lr_number })
            .then(resp => {
                this.presentToast('LR Number updated!');
            })
    }




}