import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { TripFilterPage } from './trip-filter';
import { AssignDriverPageModule } from '../assign-driver/assign-driver.module';
import { OneShipmentPageModule } from '../one-shipment/one-shipment.module';
import { UpdateoneShipmentPageModule } from '../updateone-shipment/updateone-shipment.module';
import { AccountPostingPageModule } from '../account-posting/account-posting.module';
import { TaxinvoicePageModule } from '../taxinvoice/taxinvoice.module';

@NgModule({
  declarations: [
    TripFilterPage,
  ],
  imports: [
    IonicPageModule.forChild(TripFilterPage),
    AssignDriverPageModule,
    OneShipmentPageModule,
    UpdateoneShipmentPageModule,AccountPostingPageModule,TaxinvoicePageModule
  ],
})
export class TripFilterPageModule {}
