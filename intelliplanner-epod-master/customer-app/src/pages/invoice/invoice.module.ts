import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { InvoicePage } from './invoice';
import { AgmCoreModule } from '@agm/core';

@NgModule({
  declarations: [
    InvoicePage,
  ],
  imports: [
  		  IonicPageModule.forChild(InvoicePage),
        AgmCoreModule.forRoot({
          apiKey: 'AIzaSyDbGEF0MhXLko9X4kHr3q8r8MNNeGlG2kE'
        })
  ],
})
export class InvoicePageModule {}
