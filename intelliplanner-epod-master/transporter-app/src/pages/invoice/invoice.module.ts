import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { InvoicePage } from './invoice';
import { UpdateoneShipmentPageModule } from '../updateone-shipment/updateone-shipment.module';

@NgModule({
  declarations: [
    InvoicePage,
  ],
  imports: [
    IonicPageModule.forChild(InvoicePage),
    UpdateoneShipmentPageModule
  ],
})
export class InvoicePageModule {}
