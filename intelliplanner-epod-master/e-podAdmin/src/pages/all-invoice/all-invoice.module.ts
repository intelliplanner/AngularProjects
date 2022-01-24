import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { AllInvoicePage } from './all-invoice';
import { DataTableModule } from "angular2-datatable";
import { OneDataPageModule } from '../one-data/one-data.module';

@NgModule({
  declarations: [
    AllInvoicePage,
  ],
  imports: [
    IonicPageModule.forChild(AllInvoicePage),DataTableModule,OneDataPageModule
  ],
})
export class AllInvoicePageModule {}
