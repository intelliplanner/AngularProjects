import { Injectable } from '@angular/core';
import { AuthProvider } from '../auth/auth';
import * as Rx from "rxjs";
import { map } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class DataProvider {
    apiURL: any;
    month_names = ["Jan", "Feb", "Mar",
        "Apr", "May", "Jun",
        "Jul", "Aug", "Sep",
        "Oct", "Nov", "Dec"
    ];

    constructor(
        public http: HttpClient,
        public auth: AuthProvider
    ) {
        this.apiURL = this.auth.apiURL;
    }

    addDriver(driverObj) {
        let driverObjt = Object.assign(driverObj);
        driverObjt.transporter_code = localStorage.getItem('transporterCode');
        return new Promise((resolve) => {
            console.log(driverObj);
            this.http.post(this.apiURL + 'addDriver', { driverObj: driverObjt })
                .subscribe(res => resolve(res));
        });
    }

    addNewShipmentDriver(newdriverObj) {
        return new Promise((resolve) => {
            this.http.post(this.apiURL + 'addNewShipmentDriver', { newdriverObj: newdriverObj })
                .subscribe(res => resolve(res));
        });
    }

    getdriverConsent(shipdriverObj) {
        return new Promise((resolve) => {
            this.http.post(this.apiURL + 'getdriverConsent', { shipdriverObj: shipdriverObj })
                .subscribe(res => resolve(res));
        });
    }

    // getnewdriverLocation(shipment){
    //       return new Promise((resolve) => {
    //         this.http.post(this.apiURL+'getnewdriverLocation', {uPshipment: shipment})
    //         .pipe(map(res => res.json()))
    //         .subscribe(res => resolve(res));
    //       });
    // }

    updateDriver(driverObj) {
        return new Promise((resolve) => {
            driverObj = driverObj.assign({ code: localStorage.getItem('transporterCode') })
            this.http.post(this.apiURL + 'updateDriver', { driverObj: driverObj })
                .subscribe(res => resolve(res));
        });
    }


    getAllDriver(drivOb) {
        return new Promise((resolve) => {
            this.http.post(this.apiURL + 'getAllDriver', drivOb)
                .subscribe(res => resolve(res));
        });
    }

    searchDriver(searchTerm) {
        return new Promise((resolve) => {
            this.http.post(this.apiURL + 'searchDriver', { searchTerm: searchTerm })
                .subscribe(res => resolve(res));
        });
    }

    getShipmentsCount(ob) {
        return new Promise((resolve) => {
            this.http.post(this.apiURL + 'getShipmentsCount', ob)
                .subscribe(res => resolve(res));
        });
    }


    updateInvoices(shipment_number, data) {
        return new Promise((resolve) => {
            this.http.post(this.apiURL + 'updateAllInvoice', { data: data, shipment_number: shipment_number })
                .subscribe(res => resolve(res));
        });
    }


    updateOneInvoice(invoice_number, data) {
        return new Promise((resolve) => {
            this.http.post(this.apiURL + 'updateInvoice', { data: data, invoice_number: invoice_number })
                .subscribe(res => resolve(res));
        });
    }

    getFilteredShipments(filter) {
        console.log(filter);
        return new Promise((resolve) => {
            this.http.post(this.apiURL + 'getFilteredShipments', { filter: filter, code: localStorage.getItem('transporterCode'), plantcode: localStorage.getItem('plant') })
                .subscribe(res => resolve(res));
        });
    }

    getPlant() {
        return new Promise((resolve) => {
            this.http.post(this.apiURL + 'getPlant', { plantcode: localStorage.getItem('plant') })
                .subscribe(res => resolve(res));
        });
    }

    assignDriver(driver, shipmentID) {
        return new Promise((resolve) => {
            this.http.post(this.apiURL + 'assignDriver', { driver: driver, shipmentID: shipmentID })
                .subscribe(res => resolve(res));
        });
    }

    getAllInvoices(ob) {
        console.log(ob)
        return new Promise((resolve) => {
            this.http.post(this.apiURL + 'getAllInvoices', ob)
                .subscribe(res => resolve(res));
        });
    }

    getCompletePoInvoices(ob) {
        console.log(ob)
        return new Promise((resolve) => {
            this.http.post(this.apiURL + 'getCompletePoInvoices', ob)
                .subscribe(res => resolve(res));
        });
    }

    // getSearchedInvoices(searchTerm, dateFilterFromDate,dateFilterToDate){   
    //   console.log("ss",searchTerm)
    //        return new Promise((resolve) => {
    //          this.http.post(this.apiURL+'getSearchedInvoices', {searchTerm: searchTerm, dateFilter: { fromDate: dateFilterFromDate,
    //            toDate: dateFilterToDate }})
    //
    //          .subscribe(res => resolve(res));
    //        });
    //  }

    getSearchedInvoices(searchTerm) {
        console.log("ss", searchTerm)
        return new Promise((resolve) => {
            this.http.post(this.apiURL + 'getSearchedInvoices', { searchTerm: searchTerm })
                .subscribe(res => resolve(res));
        });
    }

    getmissingLR(ob) {
        return new Promise((resolve) => {
            this.http.post(this.apiURL + 'getmissingLR', ob)
                .subscribe(res => resolve(res));
        });
    }

    updateLR(ship) {
        return new Promise((resolve) => {
            this.http.post(this.apiURL + 'updateLR', { shipment: ship })
                .subscribe(res => resolve(res));
        });
    }

    getConsent(ship) {
        return new Promise((resolve) => {
            this.http.post(this.apiURL + 'getConsent', { shipment: ship })
                .subscribe(res => resolve(res));
        });
    }

    getoneshipment(ship) {
        return new Promise((resolve) => {
            this.http.post(this.apiURL + 'getoneshipment', { data: ship })
                .subscribe(res => resolve(res));
        });
    }



    sendMessagetoCustomer(ship) {
        return new Promise((resolve) => {
            this.http.post(this.apiURL + 'sendMessagetoCustomer', { data: ship })
                .subscribe(res => resolve(res));
        });
    }

    updateShipmentTransporter(ship) {
        return new Promise((resolve) => {
            this.http.post(this.apiURL + 'updateShipmentTransporter', { data: ship })
                .subscribe(res => resolve(res));
        });
    }

    fetchTransporter(idobj) {
        console.log(idobj)
        return new Promise((resolve) => {
            this.http.post(this.apiURL + 'fetchTransporter', { data: idobj })
                .subscribe(res => resolve(res));
        });
    }

    changePassword(idobj, pwdobj) {
        console.log(pwdobj)
        return new Promise((resolve) => {
            this.http.post(this.apiURL + 'changePassword', { data: idobj, pwdobj: pwdobj })
                .subscribe(res => resolve(res));
        });
    }

    accountPosting(acc_obj, keyPO, left_submit, transinvoiceObj) {
        return new Promise((resolve) => {
            this.http.post(this.apiURL + 'accountPosting', { params: acc_obj, poNum: keyPO, left_submit: left_submit, tinvoiceobj: transinvoiceObj })
                .subscribe(res => resolve(res));
        });
    }

    getTransporterInvoice(transporter_invoice_number) {
        return new Promise((resolve) => {
            this.http.post(this.apiURL + 'getTransporterInvoice', { transporter_invoice_number: transporter_invoice_number })
                .subscribe(res => resolve(res));
        });
    }

    getTransporter(transporter_code) {
        return new Promise((resolve) => {
            this.http.post(this.apiURL + 'getTransporter', { transporter_code: transporter_code })
                .subscribe(res => resolve(res));
        });
    }

    checkStatus(invoice, keyPO) {
        return new Promise((resolve) => {
            this.http.post(this.apiURL + 'updatestatus', { invoice: invoice, poNum: keyPO })
                .subscribe((resp: any) => resolve(resp.status));
        });
    }

    submitTransporterInvoices(tInvoice) {
        return new Promise((resolve) => {
            this.http.post(this.apiURL + 'submitTransporterInvoices', { data: tInvoice })
                .subscribe(resp => resolve(resp));
        });
    }

      searchedbyDate(filter){
    return new Promise((resolve) => {
      this.http.post(this.apiURL+'searchedbyDate',{filter:filter})
      .subscribe(resp => resolve(resp))
    })

  }

    // ----------------------------------------xml demo--------------------------------------------

    getTrack() {
        return new Promise((resolve) => {
            this.http.get(this.apiURL + 'getTrack')
                .subscribe(res => resolve(res));
        });
    }

    getAllTimeShipments() {
        return new Promise((resolve) => {
            this.http.post(this.apiURL + 'getAllTimeShipments', { plantcode: localStorage.getItem('plant'), code: localStorage.getItem('transporterCode') })
                .subscribe((res: any) => resolve(res));
        });
    }

    getAllTimeShipmentQuantity() {
        return new Promise((resolve) => {
            this.http.post(this.apiURL + 'getAllTimeShipmentQuantity', { plantcode: localStorage.getItem('plant'), code: localStorage.getItem('transporterCode') })
                .subscribe((res: any) => resolve(res));
        });
    }


    getTimelineData() {
        let that = this;

        let today = new Date()
        let q;

        let dArray = []
        for (let i = 29; i >= 0; i--) {
            let priorDate: Date = new Date();
            priorDate.setDate(today.getDate() - i)

            let d = priorDate.getDate();
            let m = priorDate.getMonth();
            let y = priorDate.getFullYear();

            let as = this.month_names[m] + " " + d
            if (i != 0) {

            }

        }

        // console.log(q)

        return new Promise((resolve) => {
            this.http.post(this.apiURL + 'getTimelineData', { query: q, plantcode: localStorage.getItem('plant'), code: localStorage.getItem('transporterCode') })
                .subscribe((res: any) => resolve(res));
        });
    }


    getSerialChartData(serialData) {
        let data = {
            "type": "serial",
            "theme": "light",
            "marginRight": 40,
            "marginLeft": 40,
            "autoMarginOffset": 20,
            "mouseWheelZoomEnabled": false,

            "valueAxes": [{
                "id": "v1",
                "axisAlpha": 0,
                "position": "left",
                "max": 1000,
                "ignoreAxisWidth": true
            }],
            "balloon": {
                "borderThickness": 1,
                "shadowAlpha": 0
            },
            "graphs": [{
                "id": "g1",
                "balloon": {
                    "drop": true,
                    "adjustBorderColor": false,
                    "color": "#ffffff"
                },
                "bullet": "round",
                "bulletBorderAlpha": 2,
                "type": "column",
                "fillAlphas": 0.8,
                "bulletColor": "#258cbb",
                "bulletSize": 5,
                "hideBulletsCount": 50,
                "title": "red line",
                "useLineColorForBulletBorder": true,
                "valueField": "count",
            }],

            "chartCursor": {
                "pan": true,
                "valueLineEnabled": true,
                "valueLineBalloonEnabled": true,
                "cursorAlpha": 2,
                "cursorColor": "#258cbb",
                "limitToGraph": "g1",
                "valueLineAlpha": 0.2,
                "valueZoomable": true
            },

            "categoryField": "Dates",
            "categoryAxis": {
                "parseDates": true,
                "dashLength": 2,
                "minorGridEnabled": false
            },
            /*  "export": {
                 "enabled": true
             }, */
            "dataProvider": serialData
        }

        return data;
    }


}