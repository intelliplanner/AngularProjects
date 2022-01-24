import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { AddEditDriverPage } from './add-edit-driver';

@NgModule({
  declarations: [
    AddEditDriverPage,
  ],
  imports: [
    IonicPageModule.forChild(AddEditDriverPage),
  ],
})
export class AddEditDriverPageModule {}
