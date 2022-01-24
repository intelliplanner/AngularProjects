import { Injectable } from '@angular/core';
import { ActionSheetController, Platform } from 'ionic-angular';
import { Camera, CameraOptions } from '@ionic-native/camera';
import { Http } from '@angular/http';

@Injectable()
export class ImageProvider {

    constructor(
        public actionSheetCtrl: ActionSheetController,
        public platform: Platform,
        private camera: Camera,
        public http: Http) {

    }

    public uploadImage() {
        return new Promise(resolve => {
            let actionSheet = this.actionSheetCtrl.create({
                title: 'Select Image Source',
                buttons: [{
                        text: 'Load from Library',
                        handler: () => {
                            this.takePicture(this.camera.PictureSourceType.PHOTOLIBRARY)
                             .then(res => resolve(res))
                        }
                    },
                    {
                      text: 'Use Camera',
                      handler: () => {
                        this.takePicture(this.camera.PictureSourceType.CAMERA)
                        .then(res => resolve(res))
                      }
                    },
                    {
                        text: 'Cancel',
                        role: 'cancel'
                    }
                ]
            });
            actionSheet.present();
        })
    }

    public takePicture(sourceType) {
        var options = {
            quality: 80,
            destinationType: this.camera.DestinationType.DATA_URL,
            sourceType: sourceType,
            targetHeight: 500,
            targetWidth: 500
        };
        console.log("sourceType ", sourceType)

        console.log("options ", options)

        return new Promise(resolve => {
        // Get the data of an image
        this.camera.getPicture(options).then((imagePath) => {
            let image = 'data:image/jpeg;base64,' + imagePath;
        console.log("image ", image)
            resolve(image)
        }, (err) => {});
        })
    }

}