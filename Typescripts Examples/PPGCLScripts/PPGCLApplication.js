"use strict";
exports.__esModule = true;
var TaskSchedular_1 = require("./TaskSchedular");
var PPGCLApplication = /** @class */ (function () {
    function PPGCLApplication() {
    }
    // public static url_lane_data_list: string = "http://203.197.197.16:8080/LocTracker/TempleDashboardData.jsp";
    PPGCLApplication.start = function () {
        if (this.isServer) { // data get from server
            console.log("Data Get From Server");
            var objTimers = new TaskSchedular_1.TaskSchedular(this._interval);
            objTimers.scheduleRequest();
        }
        else { // data get from json file
            console.log("Data Get From Json File");
            var objTimers = new TaskSchedular_1.TaskSchedular(this._interval);
            objTimers.scheduleRequest();
            // TaskSchedular.getDataFromJsonFile();
        }
    };
    PPGCLApplication.isServer = false;
    PPGCLApplication._interval = 10000;
    PPGCLApplication.jsonObj = null;
    PPGCLApplication.url_data_list = "http://localhost:8080/LocTracker/PpgclData.jsp?action=ppgcl_tpr_data";
    return PPGCLApplication;
}());
