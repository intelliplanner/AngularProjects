import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { UpdateoneShipmentPage } from './updateone-shipment';
import { AgmCoreModule } from '@agm/core';

@NgModule({
  declarations: [
    UpdateoneShipmentPage,
  ],
  imports: [
    IonicPageModule.forChild(UpdateoneShipmentPage),
     AgmCoreModule.forRoot({
          apiKey: 'AIzaSyCdSbG4mu5WWWychsWa52Un0YCMGf-yqtI'
        })
  ],
})
export class UpdateoneShipmentPageModule {}
