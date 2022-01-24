import { Component,ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams,Content } from 'ionic-angular';
import { UsersProvider } from '../../providers/users/users';
import { GlobalsProvider } from '../../providers/globals/globals';
import { OneDataPage } from '../one-data/one-data';
import { PagerService } from '../../_services/index'
@IonicPage()
@Component({
  selector: 'page-all-data',
  templateUrl: 'all-data.html',
})
export class AllDataPage {
	@ViewChild(Content) content: Content;
	tab: any = 'allShipments';
	allShipments:any=[];
	allInvoices:any=[];
	allPos:any=[];
	sortBy='id';
    sortOrder="asc";
    toggle: boolean = false;
    filter: any = {};
    sfilter: any = {};
    pfilter: any = {};
    ifilter: any = {};
    pager: any = {};
    count=0;
    scount = 0;
    icount = 0;
    pcount = 0;
    limitValue:any={};
    // pageStatus='new';
    private allItems: any = [];

  constructor(public navCtrl: NavController, public navParams: NavParams,public usersProvider: UsersProvider,
  	public globalsProvider: GlobalsProvider,public pagerService :PagerService) {
  	// this.ionViewDidLoad();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad AllDataPage');
    this.setPage123(1)
  }
  getshipment(){
  	this.globalsProvider.loadingstart();
  	this.setPage123(1)
  	this.globalsProvider.loadingdismiss();
  }
   getinvoice(){
  	this.globalsProvider.loadingstart();
  	this.setPage123(1)
  	this.globalsProvider.loadingdismiss();
  }
   getpos(){
  	this.globalsProvider.loadingstart();
  	this.setPage123(1)
  	this.globalsProvider.loadingdismiss();
  }


  setPage123(page: number) {
    console.log("page ", page + " " +this.tab)
    this.limitValue.limitpage = page;
    this.limitValue.tab = this.tab;
    // let that=this;
    console.log('limitValue',this.limitValue);
    this.usersProvider.getAllepodData(this.limitValue).then((resp:any) => {
      if(resp.rows){
        this.allItems = resp['rows'];
        this.count = resp['count'];

         if(this.tab == 'allShipments'){
        	this.allShipments = this.allItems
        	this.scount = this.count;
         }

        else if(this.tab == 'allInvoices'){
         this.allInvoices = this.allItems
         this.icount = this.count;
        }

        else if(this.tab == 'allPos'){
          this.allPos = this.allItems 
          this.pcount = this.count; 
        }
      }
     console.log('resps232 ',resp);
     console.log('this.allItems  ',this.allItems);

    this.pager = this.pagerService.getPager(resp.count, page,10);
    console.log('pager 22 ',this.pager);
    })

    }





  open(data,value){
  	this.navCtrl.push(OneDataPage, {selectData:data , action: value})
  }

   toggleFilter(){
    this.toggle = !this.toggle;
    this.content.resize();
  }


    search(){
    	// console.log("term",ev.target.value)
    	console.log("this.sfilter ",this.sfilter)
    	// this.globalsProvider.loadingstart();
    	 if(this.tab == 'allShipments'){
			this.filter = this.sfilter;
           }
        if(this.tab == 'allInvoices'){
            this.filter = this.ifilter;
        }
      if(this.tab == 'allPos'){
     		this.filter = this.pfilter;
      }

    this.usersProvider.searchedClickedItem(this.filter,this.filter.fromDate,this.filter.toDate,this.tab)
    .then((resp:any) => {
      console.log("allresp ",resp.resps)
      if(resp.resps.length > 0){
  	    if(resp.tab == 'allShipments'){
      	this.allShipments = resp.resps;
      	this.globalsProvider.loadingdismiss(); 
      }
      if(resp.tab == 'allInvoices'){
      	this.allInvoices = resp.resps;
      }
      if(resp.tab == 'allPos'){
      	this.allPos = resp.resps;
      }
      this.globalsProvider.loadingdismiss();    	
      }
      else{
      	this.globalsProvider.loadingdismiss();
      	this.globalsProvider.presentToast('No Data Found..!!');
      }
  
    })
 }

  clearFilter(){
    this.ionViewDidLoad();
    this.sfilter.shipment_number = '';
    this.sfilter.plant = '';
    this.sfilter.fromDate = '';
    this.sfilter.toDate = '';
    this.sfilter.lr_number = '';
    this.ifilter.invoice_number = '';
    this.ifilter.plant = '';
    this.ifilter.fromDate = '';
    this.ifilter.toDate = '';
    this.pfilter.purchase_order_number = '';
    this.pfilter.plant = '';
    this.pfilter.fromDate = '';
    this.pfilter.toDate = '';
  }

}
