class TaskSchedular{
    
    _timeout: number;
 
    constructor(_timeout: number) {
        this._timeout = _timeout;
    }
    
    public static GetXmlHttpObject() {
        var xmlHttp = null;
        try {
            xmlHttp = new XMLHttpRequest();
        } catch (e) {
            //Internet Explorer
            try {
                xmlHttp = new ActiveXObject("Msxml2.XMLHTTP");
            } catch (e) {
                xmlHttp = new ActiveXObject("Microsoft.XMLHTTP");
            }
        }
        return xmlHttp;
    }

    public scheduleRequest(): any { 
        var timer;
        clearTimeout(timer);
        let interval = setInterval(function () { TaskSchedular.getProcessingData() }, this._timeout);
    }

    public static getProcessingData(){
        var xmlHttp;
        var jsonObj;
        
        xmlHttp = this.GetXmlHttpObject();
        
        if (xmlHttp == null) {
            alert("Your browser does not support AJAX!");
            return;
        }
        xmlHttp.onreadystatechange = function () {
            if (xmlHttp.readyState == 4) {
                var jsonDataObj = JSON.parse(xmlHttp.responseText);
                // Temple.showelList = jsonDataObj.ShovelList;
                PPGCLApplication.jsonObj = jsonDataObj;
                TaskSchedular.populateList();
            }
        };
        console.log("PPGCLApplication.url_lane_data_list: "+PPGCLApplication.url_data_list);
        xmlHttp.open("POST", PPGCLApplication.url_data_list, true);
        // var params = "action=something";
        xmlHttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
        xmlHttp.send();
    }


    public static populateList() {
        TaskSchedular.removeList();
        for (let x in PPGCLApplication.jsonObj) {
            var trData = "<tr><td>"+ PPGCLApplication.jsonObj[x].tprId+"</td><td>"+PPGCLApplication.jsonObj[x].vehicleName+"</td></tr>";
            $('#tableData').find("tbody").append(trData);
        }
    }

    public static removeList() {
         $('#tableData').find("tbody").find("tr").remove();
    }
}