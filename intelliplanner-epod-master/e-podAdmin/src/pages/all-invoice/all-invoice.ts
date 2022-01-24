import { Component,ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams,Content } from 'ionic-angular';
import { UsersProvider } from '../../providers/users/users';
import { GlobalsProvider } from '../../providers/globals/globals';
import { OneDataPage } from '../one-data/one-data';
import { PagerService } from '../../_services/index'

/**
 * Generated class for the AllInvoicePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-all-invoice',
  templateUrl: 'all-invoice.html',
})
export class AllInvoicePage {

  constructor(public navCtrl: NavController, public navParams: NavParams,public usersProvider: UsersProvider,
  	public globalsProvider: GlobalsProvider,public pagerService :PagerService) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad AllInvoicePage');
  }

}
