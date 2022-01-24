import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { HomePage } from './home';
import { SearchVehiclePageModule } from '../search-vehicle/search-vehicle.module';

@NgModule({
  declarations: [
    HomePage,
  ],
  imports: [
    IonicPageModule.forChild(HomePage),
    SearchVehiclePageModule
  ],
})
export class HomePageModule {}
