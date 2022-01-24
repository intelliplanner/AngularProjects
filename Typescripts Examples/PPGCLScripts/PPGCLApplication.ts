class PPGCLApplication{
    private static isServer: boolean = false; 
    private static _interval: number = 10000;
    public static jsonObj: any  = null;

    public static url_data_list: string = "http://localhost:8080/LocTracker/PpgclData.jsp?action=ppgcl_tpr_data";
    // public static url_lane_data_list: string = "http://203.197.197.16:8080/LocTracker/TempleDashboardData.jsp";
    public static start(): void {
        if (this.isServer) { // data get from server
            console.log("Data Get From Server");
            var objTimers = new TaskSchedular(this._interval);
            objTimers.scheduleRequest();
        } else { // data get from json file
            console.log("Data Get From Json File");
            var objTimers = new TaskSchedular(this._interval);
            objTimers.scheduleRequest();
            
            // TaskSchedular.getDataFromJsonFile();
        }
    }
}