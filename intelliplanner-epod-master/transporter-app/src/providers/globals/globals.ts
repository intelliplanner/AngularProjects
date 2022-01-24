import { Http } from '@angular/http';
import { Injectable} from '@angular/core';
import { ToastController,Platform,ActionSheetController,Loading,LoadingController } from 'ionic-angular';
import { Camera, CameraOptions } from '@ionic-native/camera';



@Injectable()
export class GlobalsProvider {

  constructor(public http: Http,public toastCtrl:ToastController,public actionSheetCtrl: ActionSheetController,
        public platform: Platform,private camera: Camera) {
    console.log('Hello GlobalsProvider Provider');
  }

   presentToast(message) {
        let toast = this.toastCtrl.create({
            message: message,
            duration: 3000,
            position: 'bottom',
            cssClass: 'normalToast'
        });

        toast.onDidDismiss(() => {
            console.log('Dismissed toast');
        });

        toast.present();
    }

          uploadImage(){
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
            correctOrientation: true,
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
