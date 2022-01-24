import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { AccountPostingPage } from './account-posting';

@NgModule({
  declarations: [
    AccountPostingPage,
  ],
  imports: [
    IonicPageModule.forChild(AccountPostingPage),
  ],
})
export class AccountPostingPageModule {}
