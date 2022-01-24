import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { AllDataPage } from './all-data';
import { DataTableModule } from "angular2-datatable";
import { OneDataPageModule } from '../one-data/one-data.module';

@NgModule({
  declarations: [
    AllDataPage,
  ],
  imports: [
    IonicPageModule.forChild(AllDataPage),DataTableModule,OneDataPageModule
  ],
})
export class AllDataPageModule {}
