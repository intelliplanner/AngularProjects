import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams,Events, LoadingController } from 'ionic-angular';
import { UsersProvider } from '../../providers/users/users';
import { AddEditTransporterPage } from '../add-edit-transporter/add-edit-transporter';
import { UpdatePlantTransporterPage } from '../update-plant-transporter/update-plant-transporter';
import * as XLSX from 'xlsx';
@IonicPage()
@Component({
  selector: 'page-transporter',
  templateUrl: 'transporter.html',
})
export class TransporterPage {
transporters: any = []
selectedTransporters: any = []
users: any = []
transporterUsers: any = []
searchTerm:any='';
data:any = [];
tab: any = 'transporters';
value:boolean = true;
  sortBy='transporter_name';
    sortOrder="asc";
  constructor(
  	public navCtrl: NavController, 
    public events: Events, 
    public loadingCtrl: LoadingController,
  	public usersProvider: UsersProvider, 
  	public navParams: NavParams) {

    // this.events.subscribe('dealer:updated', () => {
    //   this.ionViewDidLoad();
    // })

  }

  ionViewWillEnter() {
    console.log("E-pod admin is activeser")
    const loader = this.loadingCtrl.create({
      content: "Please wait...",
      duration: 3000
    });
    loader.present();
    this.usersProvider.getAllTransporters().then((resp:any) => {
    	this.transporters = resp;
      this.selectedTransporters = resp;
      console.log("transportersw",this.transporters)
    loader.dismiss();
    })
  }

  add(){
    this.navCtrl.push(AddEditTransporterPage, {action: 'add'})
  }

  edit(transporter){
    this.navCtrl.push(AddEditTransporterPage, {action: 'edit', transporter: transporter})
  }

  searchTransporter(ev,status){
    console.log("term",ev.target.value + " " + status)
    if (ev.target.value){
        this.usersProvider.searchTransporter(ev.target.value,status).then((resp:any) => {
        console.log("resp",resp)
          // if(resp[length] > 0){
            console.log("DF")
            this.selectedTransporters = resp
          // }
    })
    }
    else if(!ev.target.value){
      this.ionViewWillEnter()  
    }

  }

  // editusr(user){
  //   this.navCtrl.push(UpdatePlantTransporterPage, {action: 'edit', transporter: user})
  // }


  toggle1(){
    this.value = true;
  }
  toggle2(){
    this.value = false;
   console.log("E-pod admin is activeser")
    const loader = this.loadingCtrl.create({
      content: "Please wait...",
      duration: 3000
    });
    loader.present();
    this.usersProvider.getAlltransportusers().then((resp:any) => {
      this.users = resp;
      this.transporterUsers = resp;
      console.log("transporters",this.transporters)
    loader.dismiss();
    })
  }

  // transporter(id){
  //   this.usersProvider.deleteTransportar(id)
  //   .then(resp => this.ionViewWillEnter())
  // }


  //       upload(event: any) {            /*only for upload transporter*/
  //     const target: DataTransfer = <DataTransfer>(event.target);
  //     console.log('target',target.files)
  //   // if (target.files.length !== 1) throw new Error('Cannot use multiple files');
    
  //   const reader: FileReader = new FileReader();
  //   reader.onload = (e: any) => {
  //     /* read workbook */
  //     const bstr: string = e.target.result;
  //     const wb: XLSX.WorkBook = XLSX.read(bstr, {type: 'binary'});

  //     /* grab first sheet */
  //     const wsname: string = wb.SheetNames[0];
  //     const ws: XLSX.WorkSheet = wb.Sheets[wsname];

  //     /* save data */
  //      this.data = (XLSX.utils.sheet_to_json(ws, {header: 0}));

  //     console.log('files',this.data);
  //     this.data.map(dat => {
  //         dat.transporter_code = dat.transporter_code.substring(3,dat.transporter_code.length)
  //         return dat;
  //     })
  //     console.log('file',this.data);

  //     if(this.data.length > 0){
  //       this.usersProvider.transporterUpload(this.data)
  //     .then(res => {
  //     })
  //     }
  //     window.location.reload()
  //   };
  //   reader.readAsBinaryString(target.files[0]);

  // }


}
