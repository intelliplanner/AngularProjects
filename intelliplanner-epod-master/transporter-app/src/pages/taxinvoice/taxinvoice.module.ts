import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { TaxinvoicePage } from './taxinvoice';

@NgModule({
  declarations: [
    TaxinvoicePage,
  ],
  imports: [
    IonicPageModule.forChild(TaxinvoicePage),
  ],
})
export class TaxinvoicePageModule {}
