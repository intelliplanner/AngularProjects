import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { AssignDriverPage } from './assign-driver';

@NgModule({
  declarations: [
    AssignDriverPage,
  ],
  imports: [
    IonicPageModule.forChild(AssignDriverPage),
  ],
})
export class AssignDriverPageModule {}
