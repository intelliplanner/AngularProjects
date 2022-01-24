import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { MapModalPage } from './map-modal';
import { AgmCoreModule } from '@agm/core';

@NgModule({
  declarations: [
    MapModalPage,
  ],
  imports: [
    IonicPageModule.forChild(MapModalPage),
    AgmCoreModule.forRoot({
          apiKey: 'AIzaSyCdSbG4mu5WWWychsWa52Un0YCMGf-yqtI'
        })
  ],
})
export class MapModalPageModule {}
