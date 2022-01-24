import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { SearchLrPage } from './search-lr';

@NgModule({
  declarations: [
    SearchLrPage,
  ],
  imports: [
    IonicPageModule.forChild(SearchLrPage),
  ],
})
export class SearchLrPageModule {}
