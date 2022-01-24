import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { TransporterPage } from './transporter';
import { AddEditTransporterPageModule } from '../add-edit-transporter/add-edit-transporter.module';
import { UpdatePlantTransporterPageModule } from '../update-plant-transporter/update-plant-transporter.module';
import { DataTableModule } from "angular2-datatable";

@NgModule({
  declarations: [
    TransporterPage,
  ],
  imports: [
    IonicPageModule.forChild(TransporterPage),
    AddEditTransporterPageModule,UpdatePlantTransporterPageModule,DataTableModule
  ],
})
export class TransporterPageModule {}
