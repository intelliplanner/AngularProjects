webpackJsonp([0],{

/***/ 130:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return GlobalsProvider; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_http__ = __webpack_require__(247);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_rxjs_add_operator_map__ = __webpack_require__(131);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_rxjs_add_operator_map___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_rxjs_add_operator_map__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_rxjs_operators__ = __webpack_require__(38);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};





var GlobalsProvider = /** @class */ (function () {
    // apiURL: any = 'http://192.168.1.8:4000/';
    function GlobalsProvider(http) {
        this.http = http;
        // public apiURL: any = 'http://localhost:4000/';
        this.apiURL = 'http://157.230.91.154:5000/';
        console.log('Hello DataProvider Provider');
    }
    GlobalsProvider.prototype.getInvoices = function (phoneNumber) {
        var _this = this;
        return new Promise(function (resolve) {
            _this.http.post(_this.apiURL + 'getCustomerInvoices', { phoneNumber: phoneNumber })
                .pipe(Object(__WEBPACK_IMPORTED_MODULE_3_rxjs_operators__["map"])(function (res) { return res.json(); }))
                .subscribe(function (res) { return resolve(res); });
        });
    };
    GlobalsProvider.prototype.updateShipment = function (invoiceNumber, data) {
        var _this = this;
        return new Promise(function (resolve, reject) {
            _this.http.post(_this.apiURL + 'updateInvoice', { data: data, invoice_number: invoiceNumber })
                .pipe(Object(__WEBPACK_IMPORTED_MODULE_3_rxjs_operators__["map"])(function (res) { return res.json(); }))
                .subscribe(function (res) { return resolve(res); });
        });
    };
    GlobalsProvider = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["A" /* Injectable */])(),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1__angular_http__["a" /* Http */]])
    ], GlobalsProvider);
    return GlobalsProvider;
}());

//# sourceMappingURL=globals.js.map

/***/ }),

/***/ 202:
/***/ (function(module, exports) {

function webpackEmptyAsyncContext(req) {
	// Here Promise.resolve().then() is used instead of new Promise() to prevent
	// uncatched exception popping up in devtools
	return Promise.resolve().then(function() {
		throw new Error("Cannot find module '" + req + "'.");
	});
}
webpackEmptyAsyncContext.keys = function() { return []; };
webpackEmptyAsyncContext.resolve = webpackEmptyAsyncContext;
module.exports = webpackEmptyAsyncContext;
webpackEmptyAsyncContext.id = 202;

/***/ }),

/***/ 244:
/***/ (function(module, exports, __webpack_require__) {

var map = {
	"../pages/home/home.module": [
		245
	],
	"../pages/invoice/invoice.module": [
		249
	]
};
function webpackAsyncContext(req) {
	var ids = map[req];
	if(!ids)
		return Promise.reject(new Error("Cannot find module '" + req + "'."));
	return Promise.all(ids.slice(1).map(__webpack_require__.e)).then(function() {
		return __webpack_require__(ids[0]);
	});
};
webpackAsyncContext.keys = function webpackAsyncContextKeys() {
	return Object.keys(map);
};
webpackAsyncContext.id = 244;
module.exports = webpackAsyncContext;

/***/ }),

/***/ 245:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "HomePageModule", function() { return HomePageModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(49);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__home__ = __webpack_require__(246);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};



var HomePageModule = /** @class */ (function () {
    function HomePageModule() {
    }
    HomePageModule = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["I" /* NgModule */])({
            declarations: [
                __WEBPACK_IMPORTED_MODULE_2__home__["a" /* HomePage */],
            ],
            imports: [
                __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["f" /* IonicPageModule */].forChild(__WEBPACK_IMPORTED_MODULE_2__home__["a" /* HomePage */]),
            ],
        })
    ], HomePageModule);
    return HomePageModule;
}());

//# sourceMappingURL=home.module.js.map

/***/ }),

/***/ 246:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return HomePage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(49);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__providers_globals_globals__ = __webpack_require__(130);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__pages_invoice_invoice__ = __webpack_require__(248);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};




var HomePage = /** @class */ (function () {
    function HomePage(events, navCtrl, viewCtrl, navParams, globals, loadingCtrl) {
        this.events = events;
        this.navCtrl = navCtrl;
        this.viewCtrl = viewCtrl;
        this.navParams = navParams;
        this.globals = globals;
        this.loadingCtrl = loadingCtrl;
        this.invoices = [];
        this.responded = false;
    }
    HomePage.prototype.ionViewWillEnter = function () {
        var _this = this;
        var loader = this.loadingCtrl.create({
            content: "Please wait...",
            duration: 3000
        });
        loader.present();
        this.globals.getInvoices(this.navParams.get('phonenumber'))
            .then(function (resp) {
            loader.dismiss();
            _this.invoices = resp;
        }, function (error) {
            loader.dismiss();
            console.log(error);
        });
    };
    HomePage.prototype.openInvoice = function (invoice) {
        this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_3__pages_invoice_invoice__["a" /* InvoicePage */], { invoice: invoice });
    };
    HomePage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: 'page-home',template:/*ion-inline-start:"E:\Projects\IONIC 3\intelliplanner-epod\customer-app\src\pages\home\home.html"*/'\n\n<ion-header mode="ios" no-border>\n\n  <ion-navbar mode="ios">\n\n    <ion-title mode="ios">Delivery Confirmation</ion-title>\n\n  </ion-navbar>\n\n</ion-header>\n\n\n\n<ion-content style="background:#efefef">\n\n      <ion-card *ngFor="let invoice of invoices" (click)="openInvoice(invoice)">\n\n        <ion-card-content>\n\n          <ion-item>\n\n            <ion-note item-start style="color:#000 !important;font-weight: 300">\n\n              Invoice Number\n\n            </ion-note>\n\n            <ion-note item-end>\n\n              #{{invoice.invoice_number}}\n\n            </ion-note>\n\n          </ion-item>\n\n          <ion-item>\n\n            <ion-note item-start style="color:#000 !important;font-weight: 300">\n\n              Invoice Quantity\n\n            </ion-note>\n\n            <ion-note item-end>\n\n              <span>{{invoice.invoice_quantity}}<br></span>\n\n            </ion-note>\n\n          </ion-item>\n\n          <ion-item>\n\n            <ion-note item-start style="color:#000 !important;font-weight: 300">\n\n              Ship to Party\n\n            </ion-note>\n\n            <ion-note item-end>\n\n              <span>{{invoice.shiptoparty_name}}<br></span>\n\n            </ion-note>\n\n          </ion-item>\n\n          <ion-item>\n\n            <ion-note item-start style="color:#000 !important;font-weight: 300">\n\n              Destination Name\n\n            </ion-note>\n\n            <ion-note item-end>\n\n              <span>{{invoice.destination_name}}<br></span>\n\n            </ion-note>\n\n          </ion-item>\n\n          <ion-item>\n\n            <ion-note item-start style="color:#000 !important;font-weight: 300">\n\n              Invoice Date\n\n            </ion-note>\n\n            <ion-note item-end>\n\n              {{invoice.invoice_date}}\n\n            </ion-note>\n\n          </ion-item>\n\n        </ion-card-content>\n\n      </ion-card>\n\n  <div *ngIf="invoices.length == 0" padding style="font-weight: bold;margin-top: 20%; text-align: center;font-size: 14px;">No Active Invoices</div>\n\n</ion-content>\n\n'/*ion-inline-end:"E:\Projects\IONIC 3\intelliplanner-epod\customer-app\src\pages\home\home.html"*/,
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["b" /* Events */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["h" /* NavController */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["k" /* ViewController */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["i" /* NavParams */],
            __WEBPACK_IMPORTED_MODULE_2__providers_globals_globals__["a" /* GlobalsProvider */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["g" /* LoadingController */]])
    ], HomePage);
    return HomePage;
}());

//# sourceMappingURL=home.js.map

/***/ }),

/***/ 248:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return InvoicePage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(49);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__providers_globals_globals__ = __webpack_require__(130);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_rxjs_add_operator_map__ = __webpack_require__(131);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_rxjs_add_operator_map___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3_rxjs_add_operator_map__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_rxjs_add_operator_catch__ = __webpack_require__(465);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_rxjs_add_operator_catch___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_4_rxjs_add_operator_catch__);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};





// declare var google;
var InvoicePage = /** @class */ (function () {
    function InvoicePage(events, navCtrl, viewCtrl, alertCtrl, navParams, globals, loadingCtrl) {
        this.events = events;
        this.navCtrl = navCtrl;
        this.viewCtrl = viewCtrl;
        this.alertCtrl = alertCtrl;
        this.navParams = navParams;
        this.globals = globals;
        this.loadingCtrl = loadingCtrl;
        this.invoice = {};
        this.responded = false;
    }
    InvoicePage.prototype.ionViewWillEnter = function () {
        this.invoice = this.navParams.data.invoice;
        if (this.invoice.destination_location) {
            var cords = this.invoice.destination_location.split(',');
            this.lat = parseFloat(cords[0]);
            this.lng = parseFloat(cords[1]);
            console.log(this.lat);
            console.log(this.lng);
        }
        // let latLng = new google.maps.LatLng(17.403176, 78.4694226);
        // let mapOptions = {
        //   center: latLng,
        //   zoom: 15,
        //   mapTypeId: google.maps.MapTypeId.ROADMAP
        // }
        // this.map = new google.maps.Map(this.mapElement.nativeElement, mapOptions);
    };
    InvoicePage.prototype.response = function (res) {
        var _this = this;
        this.responded = true;
        if (res == 1) {
            var data = {
                customer_accepted: res
            };
            this.globals.updateShipment(this.invoice.invoice_number, data)
                .then(function (resp) {
                _this.navCtrl.pop();
                console.log(resp);
            }, function (error) {
                console.log(error);
            });
        }
        else {
            var prompt_1 = this.alertCtrl.create({
                title: 'Decline Delivery?',
                message: "Please enter a reason for declining this shipment.",
                inputs: [
                    {
                        name: 'reason',
                        placeholder: 'Decline reason'
                    },
                ],
                buttons: [
                    {
                        text: 'Cancel',
                        handler: function (data) {
                            console.log('Cancel clicked');
                        }
                    },
                    {
                        text: 'Submit',
                        handler: function (data) {
                            console.log('Saved clicked', data.reason);
                            var d = {
                                customer_accepted: res,
                                customer_declined_reason: data.reason
                            };
                            _this.globals.updateShipment(_this.invoice.invoice_number, d)
                                .then(function (resp) {
                                _this.navCtrl.pop();
                                console.log(resp);
                            }, function (error) {
                                console.log(error);
                            });
                        }
                    }
                ]
            });
            prompt_1.present();
        }
    };
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["_8" /* ViewChild */])('map'),
        __metadata("design:type", __WEBPACK_IMPORTED_MODULE_0__angular_core__["t" /* ElementRef */])
    ], InvoicePage.prototype, "mapElement", void 0);
    InvoicePage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: 'page-invoice',template:/*ion-inline-start:"E:\Projects\IONIC 3\intelliplanner-epod\customer-app\src\pages\invoice\invoice.html"*/'<ion-header mode="ios" no-border>\n\n  <ion-navbar mode="ios">\n\n    <ion-title mode="ios">Delivery Confirmation</ion-title>\n\n  </ion-navbar>\n\n</ion-header>\n\n<ion-content style="background:#efefef" >\n\n  <div text-center style="padding:10px;border-bottom: 1px solid #ccc;">\n\n    <h2>Invoice Number</h2>\n\n    <div style="font-size: 20px;font-weight: 200;">#{{invoice.invoice_number}}</div>\n\n  </div>\n\n\n\n  <ion-row *ngIf="!responded" style="padding:10px;border-bottom: 1px solid #ccc;">\n\n    <ion-col col col-6 text-center>\n\n      <div style="color:#535353; font-weight: 300">Invoice Date</div>\n\n      <div style="font-size: 16px;color:#222; font-weight: bold">{{invoice.invoice_date}}</div>\n\n    </ion-col>\n\n    <ion-col col col-6 text-center>\n\n      <div style="color:#535353; font-weight: 300">Invoice Quantity</div>\n\n      <div style="font-size: 16px;color:#222; font-weight: bold">{{invoice.invoice_quantity}}</div>\n\n    </ion-col>\n\n  </ion-row>\n\n  <ion-card>\n\n  \n\n    <ion-card-header>\n\n      Unloading Destination\n\n    </ion-card-header>\n\n  \n\n    <ion-card-content>\n\n<agm-map [latitude]="lat" [longitude]="lng">\n\n  <agm-marker [latitude]="lat" [longitude]="lng"></agm-marker>\n\n</agm-map>\n\n    </ion-card-content>\n\n  \n\n  </ion-card>\n\n  <ion-card>\n\n  \n\n    <ion-card-header>\n\n      LR Image\n\n    </ion-card-header>\n\n  \n\n    <ion-card-content>\n\n      <img [src]="invoice.signed_lr_image">\n\n    </ion-card-content>\n\n  \n\n  </ion-card>\n\n\n\n\n\n  <div *ngIf=" invoice.customer_accepted == \'1\'" text-center padding>\n\n    <img width="100" src="assets/imgs/response.png">\n\n    <div style="font-size: 20px;" padding>Thank you for your response!</div>\n\n  </div>\n\n</ion-content>\n\n<ion-footer>\n\n  <ion-row *ngIf="(invoice.customer_accepted == \'0\' || invoice.customer_accepted == null)">\n\n    <ion-col col col-6>\n\n      <button ion-button outline color="secondary" block (click)="response(1)">Accept</button>\n\n    </ion-col>\n\n    <ion-col col col-6>\n\n      <button ion-button outline color="danger" block (click)="response(0)">Decline</button>\n\n    </ion-col>\n\n  </ion-row>\n\n\n\n   <ion-row *ngIf="invoice.customer_accepted == \'1\'">\n\n    <ion-col col col-12>\n\n    <div style="font-size: 20px;" text-center padding>Invoice Complete..!!</div>\n\n    </ion-col>\n\n  </ion-row>\n\n</ion-footer>\n\n'/*ion-inline-end:"E:\Projects\IONIC 3\intelliplanner-epod\customer-app\src\pages\invoice\invoice.html"*/,
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["b" /* Events */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["h" /* NavController */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["k" /* ViewController */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["a" /* AlertController */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["i" /* NavParams */],
            __WEBPACK_IMPORTED_MODULE_2__providers_globals_globals__["a" /* GlobalsProvider */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["g" /* LoadingController */]])
    ], InvoicePage);
    return InvoicePage;
}());

//# sourceMappingURL=invoice.js.map

/***/ }),

/***/ 249:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "InvoicePageModule", function() { return InvoicePageModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(49);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__invoice__ = __webpack_require__(248);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__agm_core__ = __webpack_require__(250);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};




var InvoicePageModule = /** @class */ (function () {
    function InvoicePageModule() {
    }
    InvoicePageModule = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["I" /* NgModule */])({
            declarations: [
                __WEBPACK_IMPORTED_MODULE_2__invoice__["a" /* InvoicePage */],
            ],
            imports: [
                __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["f" /* IonicPageModule */].forChild(__WEBPACK_IMPORTED_MODULE_2__invoice__["a" /* InvoicePage */]),
                __WEBPACK_IMPORTED_MODULE_3__agm_core__["a" /* AgmCoreModule */].forRoot({
                    apiKey: 'AIzaSyDbGEF0MhXLko9X4kHr3q8r8MNNeGlG2kE'
                })
            ],
        })
    ], InvoicePageModule);
    return InvoicePageModule;
}());

//# sourceMappingURL=invoice.module.js.map

/***/ }),

/***/ 305:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_platform_browser_dynamic__ = __webpack_require__(306);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__app_module__ = __webpack_require__(439);


Object(__WEBPACK_IMPORTED_MODULE_0__angular_platform_browser_dynamic__["a" /* platformBrowserDynamic */])().bootstrapModule(__WEBPACK_IMPORTED_MODULE_1__app_module__["a" /* AppModule */]);
//# sourceMappingURL=main.js.map

/***/ }),

/***/ 439:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AppModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_platform_browser__ = __webpack_require__(43);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_ionic_angular__ = __webpack_require__(49);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__angular_http__ = __webpack_require__(247);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__app_component__ = __webpack_require__(489);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__ionic_native_status_bar__ = __webpack_require__(301);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__ionic_native_splash_screen__ = __webpack_require__(304);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__providers_globals_globals__ = __webpack_require__(130);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__pages_home_home_module__ = __webpack_require__(245);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__pages_invoice_invoice_module__ = __webpack_require__(249);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10__agm_core__ = __webpack_require__(250);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};











var pages = [
    __WEBPACK_IMPORTED_MODULE_4__app_component__["a" /* MyApp */]
];
var AppModule = /** @class */ (function () {
    function AppModule() {
    }
    AppModule = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_1__angular_core__["I" /* NgModule */])({
            declarations: pages,
            imports: [
                __WEBPACK_IMPORTED_MODULE_0__angular_platform_browser__["a" /* BrowserModule */],
                __WEBPACK_IMPORTED_MODULE_3__angular_http__["b" /* HttpModule */],
                __WEBPACK_IMPORTED_MODULE_8__pages_home_home_module__["HomePageModule"],
                __WEBPACK_IMPORTED_MODULE_9__pages_invoice_invoice_module__["InvoicePageModule"],
                __WEBPACK_IMPORTED_MODULE_2_ionic_angular__["e" /* IonicModule */].forRoot(__WEBPACK_IMPORTED_MODULE_4__app_component__["a" /* MyApp */], {}, {
                    links: [
                        { loadChildren: '../pages/home/home.module#HomePageModule', name: 'invoice', segment: 'invoice/:phonenumber', priority: 'low', defaultHistory: [] },
                        { loadChildren: '../pages/invoice/invoice.module#InvoicePageModule', name: 'InvoicePage', segment: 'invoice', priority: 'low', defaultHistory: [] }
                    ]
                }),
                __WEBPACK_IMPORTED_MODULE_10__agm_core__["a" /* AgmCoreModule */].forRoot({
                    apiKey: 'AIzaSyDbGEF0MhXLko9X4kHr3q8r8MNNeGlG2kE'
                })
            ],
            bootstrap: [__WEBPACK_IMPORTED_MODULE_2_ionic_angular__["c" /* IonicApp */]],
            entryComponents: pages,
            providers: [
                __WEBPACK_IMPORTED_MODULE_5__ionic_native_status_bar__["a" /* StatusBar */],
                __WEBPACK_IMPORTED_MODULE_6__ionic_native_splash_screen__["a" /* SplashScreen */],
                __WEBPACK_IMPORTED_MODULE_2_ionic_angular__["d" /* IonicErrorHandler */],
                { provide: __WEBPACK_IMPORTED_MODULE_1__angular_core__["u" /* ErrorHandler */], useClass: __WEBPACK_IMPORTED_MODULE_2_ionic_angular__["d" /* IonicErrorHandler */] },
                __WEBPACK_IMPORTED_MODULE_7__providers_globals_globals__["a" /* GlobalsProvider */],
            ]
        })
    ], AppModule);
    return AppModule;
}());

//# sourceMappingURL=app.module.js.map

/***/ }),

/***/ 489:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return MyApp; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(49);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__ionic_native_status_bar__ = __webpack_require__(301);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__ionic_native_splash_screen__ = __webpack_require__(304);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__pages_home_home__ = __webpack_require__(246);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};





var MyApp = /** @class */ (function () {
    function MyApp(platform, statusBar, splashScreen) {
        this.platform = platform;
        this.statusBar = statusBar;
        this.splashScreen = splashScreen;
        this.rootPage = __WEBPACK_IMPORTED_MODULE_4__pages_home_home__["a" /* HomePage */];
    }
    MyApp.prototype.initializeApp = function () {
        var _this = this;
        this.platform.ready().then(function () {
            _this.statusBar.styleDefault();
            _this.splashScreen.hide();
        });
    };
    MyApp = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({template:/*ion-inline-start:"E:\Projects\IONIC 3\intelliplanner-epod\customer-app\src\app\app.html"*/'<ion-nav [root]="rootPage" #content swipeBackEnabled="false"></ion-nav>'/*ion-inline-end:"E:\Projects\IONIC 3\intelliplanner-epod\customer-app\src\app\app.html"*/
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["j" /* Platform */],
            __WEBPACK_IMPORTED_MODULE_2__ionic_native_status_bar__["a" /* StatusBar */],
            __WEBPACK_IMPORTED_MODULE_3__ionic_native_splash_screen__["a" /* SplashScreen */]])
    ], MyApp);
    return MyApp;
}());

//# sourceMappingURL=app.component.js.map

/***/ })

},[305]);
//# sourceMappingURL=main.js.map