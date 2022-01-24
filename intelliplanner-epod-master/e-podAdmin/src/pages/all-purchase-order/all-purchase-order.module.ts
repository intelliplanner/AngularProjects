import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { AllPurchaseOrderPage } from './all-purchase-order';

@NgModule({
  declarations: [
    AllPurchaseOrderPage,
  ],
  imports: [
    IonicPageModule.forChild(AllPurchaseOrderPage),
  ],
})
export class AllPurchaseOrderPageModule {}
