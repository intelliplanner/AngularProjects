import { Component } from '@angular/core';
import { IonicPage, NavController,NavParams, Events, LoadingController } from 'ionic-angular';
import { DataProvider } from '../../providers/data/data';
import { GlobalsProvider } from '../../providers/globals/globals';

declare const Buffer

@IonicPage()
@Component({
  selector: 'page-account-posting',
  templateUrl: 'account-posting.html',
})
export class AccountPostingPage {
	view:any=true;
  invoiceHTML: any;
  trans: any = {};
  total: any = 0;
  tax: any = 0;
  taxTotal: any = 0;
  invoice: any = {};
  invoiceGenerated: boolean = false;

  constructor(public navCtrl: NavController, public navParams: NavParams, public events: Events, 
        public dataProvider: DataProvider, 
        public globals: GlobalsProvider, 
        public loadingCtrl: LoadingController) {

  console.log("this.navParams.data.transporter_invoice_number ",this.navParams.data.transporter_invoice_number);

if(this.navParams.data.transporter_invoice_number)
{
  this.invoiceGenerated = true;
this.dataProvider.getTransporterInvoice(this.navParams.data.transporter_invoice_number)
.then((resp:any) => {
  let invoice = resp.data;
  console.log("invoice===",invoice);
var buffer = new Buffer( invoice.invoice_html.data, 'binary' );
var bufferString = buffer.toString('utf-8');
this.invoiceHTML = bufferString
// console.log(this.invoiceHTML);
})
}
else
{
this.invoice = this.navParams.data.invoice
console.log(this.invoice);
this.total = (parseFloat(this.invoice.quantity) * parseFloat(this.invoice.rate)).toFixed(2);
this.tax = ((12/100)*parseFloat(this.total)).toFixed(2)
this.taxTotal = parseFloat(this.total) + parseFloat(this.tax);
this.dataProvider.getTransporter(localStorage.getItem('transporterCode'))
.then((resp:any) => {
  this.trans = resp;
})
}


  }

  download(){
    // console.log("run");
    // window.print();
    let style = " table { width: 100%; table-layout: fixed; border: 1px solid #dddddd;border-collapse: collapse; }"+
        " .textcenter { text-align:center; font-weight:bold; }"+
"ion-card { box-shadow: none !important; background: #efefef !important; border-bottom: 1px solid #ccc; }"+
".swiper-container { background: #fff; }"+
"td { border: 1px solid #dddddd; text-align: left; padding: 10px 8px; font-size: 13px !important; height: 38px; z-index: 9999; } "+

"th {   text-align: center;  padding: 12px 2px;  background-color: #ebebeb !important;  font-size: 12px;  border: 1px solid #ddd;  color: #5d5d5d;  font-weight: 200; }" + 
"  .breakLine { page-break-before: always; }"


      var mywindow = window.open('', 'new div', 'height=400,width=600');
      mywindow.document.write('<html><head><title></title>');
      mywindow.document.write('<style> '+style+'</style>');
      mywindow.document.write('</head><body >');
      mywindow.document.write(document.getElementById("print").innerHTML.toString());

      // console.log(document.getElementById("print").innerHTML.toString())

      mywindow.document.write('</body></html>');
      mywindow.document.close();
      mywindow.focus();
      setTimeout(function(){mywindow.print();
      mywindow.close();},1000);

      return true;


  }

}
