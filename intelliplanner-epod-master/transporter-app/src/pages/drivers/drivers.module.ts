import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { DriversPage } from './drivers';
import { AddEditDriverPageModule } from '../add-edit-driver/add-edit-driver.module';
import { MapModalPageModule } from '../map-modal/map-modal.module';

@NgModule({
  declarations: [
    DriversPage,
  ],
  imports: [
    IonicPageModule.forChild(DriversPage),
    AddEditDriverPageModule,MapModalPageModule
  ],
})
export class DriversPageModule {}
