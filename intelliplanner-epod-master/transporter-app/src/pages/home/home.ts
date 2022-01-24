import { Component } from '@angular/core';
import { NavController, Events, LoadingController } from 'ionic-angular';
import { DataProvider } from '../../providers/data/data';
import { TripFilterPage } from '../trip-filter/trip-filter';
import { LoginPage } from '../../pages/login/login';
import { filters } from '../../app/filters';
import { SearchLrPage } from '../search-lr/search-lr';
import { AmChartsService, AmChart } from "@amcharts/amcharts3-angular"


@Component({
    selector: 'page-home',
    templateUrl: 'home.html'
})
export class HomePage {
    private chart: AmChart;
    dealers: any = [];
    payments: any = [];
    pending: any = [];
    paid: any = [];
    tab: any = 'dealers';
    pStatus: any = 'pending'
    statuses: any = filters;
    shipmentsCount: any = 0;
    shipmentsQuantity: any = 0;
    dashData: any = {};
    timelineData: any = [];

    constructor(public navCtrl: NavController,
        public events: Events,
        private AmCharts: AmChartsService,
        public dataProvider: DataProvider,
        public loadingCtrl: LoadingController) {}

    ionViewWillEnter() {
        let oib = { code: localStorage.getItem('transporterCode'), plantcode: localStorage.getItem('plant') }
        const loader = this.loadingCtrl.create({
            content: "Please wait...",
            duration: 3000
        });
        loader.present();

        this.dataProvider.getShipmentsCount(oib)
            .then(resp => {
                this.dashData = resp[0]
                console.log("yuy", this.dashData);
                console.log("statuses  ", this.statuses);
                loader.dismiss();
            }, error => {
                console.log(error);
                loader.dismiss();
            })




        this.dataProvider.getTimelineData()
            .then((data: any = []) => {
                console.log("getTimelineData ", data)
                this.timelineData = data;

                let serialData = this.dataProvider.getSerialChartData(data)
                // console.log("serialData ", serialData)
                this.AmCharts.makeChart("chartdiv", serialData);

            })

        this.dataProvider.getAllTimeShipments()
            .then((data: any) => {
                console.log("getAllTimeShipments ", data[0].count)
                this.shipmentsCount = data[0].count || 0
            })

        this.dataProvider.getAllTimeShipmentQuantity()
            .then((data: any) => {
                console.log("getAllTimeShipmentQuantity ", data[0].quantity)
                this.shipmentsQuantity = data[0].quantity || 0
            })
    }

    openTripFilter(filter) {
        this.navCtrl.push(TripFilterPage, { filter: filter })
    }


    getTrack() {

        this.dataProvider.getTrack()
            .then(resp => {
                console.log("respXML  ", resp);

            }, error => {
                console.log(error);

            })

    }

}