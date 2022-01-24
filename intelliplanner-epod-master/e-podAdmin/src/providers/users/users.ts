import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { GlobalsProvider } from '../globals/globals';
import * as Rx from "rxjs";
import { map } from 'rxjs/operators';

@Injectable()
export class UsersProvider {
    apiURL: any;

    constructor(public http: Http, public globals: GlobalsProvider) {
        this.apiURL = this.globals.apiURL;
    }

    addTransporter(item) {
        return new Promise((resolve) => {
            this.http.post(this.apiURL + 'addTransporter', { transpObj: item })
                .subscribe(res => resolve(res));
        });
    }
     addPlantTransporter(item) {
        return new Promise((resolve) => {
            this.http.post(this.apiURL + 'addPlantTransporter', { transpObj: item })
                .subscribe(res => resolve(res));
        });
    }

    searchTransporter(item,status) {
        return new Promise((resolve) => {
            this.http.post(this.apiURL + 'searchTransporter', { searchTerm: item,statusValue:status })
                .pipe(map(res => res.json())).subscribe(res => resolve(res));
        });
    }

    updateTransporter(item) {
        console.log("value=====", item);
        return new Promise((resolve) => {
            this.http.post(this.apiURL + 'updateTransporter', { transpObj: item })
                .pipe(map(res => res.json())).subscribe(res => resolve(res));
        });
    }

     updatePlantTransporter(item) {
        console.log("value=====", item);
        return new Promise((resolve) => {
            this.http.post(this.apiURL + 'updatePlantTransporter', { transpObj: item })
                .pipe(map(res => res.json())).subscribe(res => resolve(res));
        });
    }
    
    getAllTransporters() {
        return new Promise((resolve) => {
            this.http.post(this.apiURL + 'getAllTransporters', {})
                .pipe(map(res => res.json()))
                .subscribe(res => resolve(res));
        });
    }
    getAlltransportusers() {
        return new Promise((resolve) => {
            this.http.post(this.apiURL + 'getAlltransportusers', {})
                .pipe(map(res => res.json()))
                .subscribe(res => resolve(res));
        });
    }

    deleteTransporter(id) {
        return new Promise((resolve) => {
            this.http.post(this.apiURL + 'deleteTransporter', { id: id })
                .pipe(map(res => res.json()))
                .subscribe(res => resolve(res));
        });
    }

    getSettings() {
        return new Promise((resolve) => {
            this.http.post(this.apiURL + 'getSettings', {})
                .pipe(map(res => res.json()))
                .subscribe(res => resolve(res));
        });
    }

    updateSettings(smtp) {
        return new Promise((resolve) => {
            this.http.post(this.apiURL + 'updateSettings', { settingsObj: smtp })
                .pipe(map(res => res.json()))
                .subscribe(res => resolve(res));
        });
    }
    adminLogin(adminObj) {
        return new Promise((resolve,reject) => {
            this.http.post(this.apiURL + 'adminLogin', { adminObj: adminObj })
                .pipe(map(res => res.json()))
                  .subscribe(res => resolve(res), error => reject(error));
        });
    }

    changePassword(adminObj) {
        return new Promise((resolve) => {
            this.http.post(this.apiURL + 'changePassword', { adminObj: adminObj })
                .subscribe(res => resolve(res));
        });
    }

     getAllepodData(limitvalue) {
        return new Promise((resolve) => {
            this.http.post(this.apiURL + 'getAllepodData', limitvalue)
                .pipe(map(res => res.json()))
                .subscribe(res => resolve(res));
        });
    }


   searchedClickedItem(searchTerm, dateFilterFromDate,dateFilterToDate,tab){   
       console.log(tab,"ss",searchTerm)
        return new Promise((resolve) => {
          this.http.post(this.apiURL+'searchedClickedItem', {searchTerm: searchTerm, dateFilter: { fromDate: dateFilterFromDate,
            toDate: dateFilterToDate },tab:tab})
          .pipe(map(res => res.json()))
          .subscribe(res => resolve(res));
        });
  }

   searchTerm(item) {
        return new Promise((resolve) => {
            this.http.post(this.apiURL + 'searchTerm', { searchValue: item })
                .pipe(map(res => res.json())).subscribe(res => resolve(res));
        });
    }

    getPlants(){
         return new Promise((resolve) => {
          this.http.post(this.apiURL+'getPlants',{}).pipe(map(res => res.json()))
          .subscribe(res => resolve(res));
        });
    }

     getPlantsTransporter(tcode){
        console.log("resptt  ", tcode);
         return new Promise((resolve) => {
          this.http.post(this.apiURL+'getPlantsTransporter', tcode).pipe(map(res => res.json()))
          .subscribe(res => resolve(res));
        });
    }

    // transporterUpload(data){     /*only for upload transporter*/
    //      return new Promise((resolve) => {
    //       this.http.post(this.apiURL+'transporterUpload', {transporter: data})
    //       .subscribe(res => resolve(res));
    //     });
    // }

}