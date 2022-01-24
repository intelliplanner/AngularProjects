import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { SearchVehiclePage } from './search-vehicle';

@NgModule({
  declarations: [
    SearchVehiclePage,
  ],
  imports: [
    IonicPageModule.forChild(SearchVehiclePage),
  ],
})
export class SearchVehiclePageModule {}
