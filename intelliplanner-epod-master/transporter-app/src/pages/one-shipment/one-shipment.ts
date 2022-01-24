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
    selector: 'page-one-shipment',
    templateUrl: 'one-shipment.html',
})
export class OneShipmentPage {
    shipment: any = {};
    filter: any;
    lrImage: any;
    abc: any;
    lastImage: string = null;
    error: any;
    loading: Loading;
    lrImg: string = 'http://157.230.91.154:4000/lrimages/lrdemo.jpg';
    base64data: any;
    apiURL: any
    _imageViewerCtrl: ImageViewerController;
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
        public http: Http,
        private filePath: FilePath,
        public auth: AuthProvider,
        private camera: Camera,
        public toastCtrl: ToastController,
        public imageViewerCtrl: ImageViewerController) {
        this.shipment = navParams.data.shipment
        this.filter = navParams.data.filter
        this.apiURL = this.auth.apiURL;
        this._imageViewerCtrl = this.imageViewerCtrl;
        console.log('ionViewDidLoad OneShipmentPage', this.shipment);
    }

    ionViewDidLoad() {
        // console.log('ionViewDidLoad OneShipmentPage');
    }

    //  uploadLR(){
    //     this.globals.uploadImage()
    //           .then((resp:any) => {
    //               console.log(resp);
    //               this.lrImage = resp;
    //               this.shipment.signed_lr_image = this.lrImage;
    //           })
    // }



    onFileSelected(event, data) {
        let file = event.target.files[0]
        var tmppath = URL.createObjectURL(file);
        var url = this.apiURL + "lrImage/" + this.shipment.lr_number + "/" + this.shipment.shipment_number;
        console.log(url);
        // File for Upload
        console.log("tmppath ", tmppath);
        //  var targetPath = this.pathForImage(this.lastImage);

        // console.log("targetPath ",targetPath);

        // File name only
        var filename = this.lastImage;
        console.log("filename ", filename);

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
                this.shipment.signed_lr_image = this.shipment.signed_lr_image + '?' + new Date().getTime();
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
            position: 'top'
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
        console.log("action", this.shipment.lr_number);
        // Destination URL
        var url = this.apiURL + "lrImage/" + this.shipment.lr_number + "/" + this.shipment.shipment_number;
        //console.log(url);
        // File for Upload
        var targetPath = this.pathForImage(this.lastImage);

        console.log("targetPath ", targetPath);

        // File name only
        var filename = this.lastImage;
        console.log("filename ", filename);

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

        if (targetPath != '') {
            fileTransfer.upload(targetPath, url, options).then(data => {
                console.log("data", data);
                this.abc = JSON.parse(data.response);
                console.log("abc", this.abc);
                this.lrImg = targetPath;

                this.loading.dismissAll()
                this.presentToast('Image succesful uploaded.');
            }, err => {
                this.loading.dismissAll()
                this.error = JSON.stringify(err);
                //console.log(this.error);
                this.presentToast('Error while uploading file.');
            });
        } else {
            this.loading.dismissAll()
            this.presentToast('Error while uploading file.');
        }
        // Use the FileTransfer to upload the image


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
    //   .then((resp:any) => {
    //     console.log(resp)
    //     this.globals.presentToast('Shipment Updated')
    //     this.navCtrl.pop()
    //   })

    // }

    getConsent() {

        this.dataProvider.getConsent(this.shipment)
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

    // sendMessage() {
    //     this.dataProvider.sendMessagetoCustomer(this.shipment)
    //         .then((resp: any) => {
    //             console.log("resp  ", resp)
    //             if (resp && resp.status == 'success') {
    //                 this.globals.presentToast(resp.message)
    //             } else {
    //                 this.globals.presentToast(resp)
    //             }

    //         })
    // }

    // function getOne(){

    // }




}