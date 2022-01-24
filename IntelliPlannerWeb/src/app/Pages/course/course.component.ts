
import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { LoginService } from 'src/app/login/login.service';
import { SharedService } from 'src/app/shared/shared.service';


@Component({
  selector: 'app-course',
  templateUrl: './course.component.html',
  styleUrls: ['./course.component.scss']
})
export class CourseComponent implements OnInit,OnDestroy {
  instituteForm: FormGroup;
  allState: any = [];
  allDistrict: any = [];
  stateId: any;
  Txtboxfilter = "";
  searchTab = 'false';
  search_result: any = 'Search Result'
  filter_the_result: any ;
  stateName: any;
  search_window  :any;
  showThis = false;
  categoryList: any = [];
  subCategoryList: any = [];
  search_message = false;
  addressData = [];
  searchAddressData = [];
  isShown: boolean = false;
  activeTab = 'IIT';
  insName: any;
  languageId: any;
  bilingual: any;
  hideme = [];
  p: number = 1;
  q: number = 1;
  month: any;
  state: any;
  select: any;
  district: any;
  ddl_state: string;
  ddl_district: string;
  ddl_category: string;
  ddl_sub_category: string;
  lbl_state: string;
  lbl_district: string;
  lbl_category: string;
  lbl_sub_category: string;
  ddl_select: string;
  btn_submit: any;
  keyword: any;
  fullSearchList: any = [];  //data list for http request
  all_matchedList: any = []; //filtered list by textbox
  AllSearchList: any = [];  //list for displaying on the gui
  viewInstitutionDetails: any;
  detailRecivedSubscription: any;
  detailRecivedSubscription1: any;
  lastUpdated: any;
  version: any;
  notice: any;
  btmtitle1: any;
  btmtitle2: any;
  btmtitle3: any;
  btmtitle4: any;
  btmtitle5: any;

  constructor(public loginService: LoginService, private fb: FormBuilder, public sharedService: SharedService) {

  }


  ProminentInstituteList: any =
    [
      { "SNo": 1, "visiable": "active", "groupId": "15", "Name": "IIT", "Name_h": "आईआईटी", "Name_h1": "आई.आई.टी.", "fullName": "Indian Institute of Technology", "fullName_h": "भारतीय प्रौद्योगिकी संस्थान" },
      { "SNo": 2, "visiable": "", "groupId": "27", "Name": "IIIT", "Name_h": "आईआईआईटी", "Name_h1": "आई.आई.आई.टी.", "fullName": "Indian Institutes of Information Technology", "fullName_h": "भारतीय सूचना प्रौद्योगिकी संस्थान" },
      { "SNo": 3, "visiable": "", "groupId": "58", "Name": "IIM", "Name_h": "आईआईएम", "Name_h1": "आई.आई.एम", "fullName": "Indian Institute of Management", "fullName_h": "भारतीय प्रबंधन संस्थान" },
      { "SNo": 4, "visiable": "", "groupId": "36", "Name": "NIT", "Name_h": "एनआईटी", "Name_h1": "एन.आई.टी.", "fullName": "National Institute of Technology", "fullName_h": "राष्ट्रीय प्रौद्योगिकी संस्थान" },
      { "SNo": 5, "visiable": "", "groupId": "197", "Name": "CSAB", "Name_h": "सीएसऐबी", "Name_h1": "सी.एस.ऐ.बी.", "fullName": "Central Seat Allocation Board", "fullName_h": "केंद्रीय सीट आवंटन बोर्ड" },
      { "SNo": 6, "visiable": "", "groupId": "184", "Name": "JoSAA", "Name_h": "जोसा", "Name_h1": "जो.एस.ऐ.ऐ.", "fullName": "Joint Seat Allocation Authority", "fullName_h": "केंद्रीय सीट आवंटन बोर्ड" },
      { "SNo": 7, "visiable": "", "groupId": "204", "Name": "NCHMCT", "Name_h": "एनसीएचएमसीटी", "Name_h1": "एन.सी.एच.एम.& सी.टी.", "fullName": "National Council for Hotel Management & Catering Technology", "fullName_h": "होटल प्रबंधन और खानपान प्रौद्योगिकी के लिए राष्ट्रीय परिषद" },
      { "SNo": 8, "visiable": "", "groupId": "30528", "Name": "MEDICAL", "Name_h": "मेडिकल", "Name_h1": "मेडिकल", "fullName": "Institute of Medical Sciences", "fullName_h": "चिकित्सा विज्ञान संस्थान" }
    ];
  ngOnInit() {
    this.buildForm();
    this.detailRecivedSubscription = this.sharedService.getLangId.subscribe(res => {
      if (res != 0) {
        this.languageId = res.langId
        this.bilingual = res.bilingual
        this.getAllState();
        this.getAllCategory();

        this.updateLabel();
        this.loadInstitute(this.ProminentInstituteList[0]);


        if (this.instituteForm.get("state").value != "" || this.instituteForm.get("district").value != "" || this.instituteForm.get("category").value != "" || this.instituteForm.get("subcat").value != "" || this.instituteForm.get("key").value != "") {
          this.languageId = res.langId
          this.bilingual = res.bilingual
          this.getAllInsDataByFilter();
          this.SearchResult();
        }

      }
    })
    this.detailRecivedSubscription1 = this.sharedService.getLoginContent.subscribe(res => {
      if (res != 0) {

        this.lastUpdated = res.lastUpdated,
          this.version = res.version,
          this.notice = res.notice,
          this.btmtitle1 = res.btmtitle1,
          this.btmtitle2 = res.btmtitle2,
          this.btmtitle3 = res.btmtitle3,
          this.btmtitle4 = res.btmtitle4,
          this.btmtitle5 = res.btmtitle5

      }
    });

  }

  buildForm() {
    this.instituteForm = this.fb.group({
      state: [''],
      district: [''],
      category: [''],
      subcat: [''],
      key: ['', Validators.required]
    })
  }
  onClick(item) {
    Object.keys(this.hideme).forEach(h => {
      this.hideme[h] = false;
    });
    this.hideme[item.id] = true;
  }


  getAllState() {
    let payload = {
      languageId: this.languageId,
      bilingual: this.bilingual
    }
 
    this.loginService.getAllState(payload).subscribe(res => {
      // console.log("data",res.nicEIdeas.data.Delhi.id)
      // let data = res['nicEIdeas'].data;
      let data=res.nicEIdeas.data;
      this.allState = [];
      for (const key in data) {
      //  console.log(data[key])
        let value = data[key];
        // value.id = key;
        this.allState.push(value);
      }
      // console.log(this.allState);

      if (this.instituteForm.get("state").value) {
        this.changeState()
      }


    },
      err => {
      });
  }

  onSearchTabClick(item) {
    this.ProminentInstituteList.forEach(x => x.visiable = "");
  }


  getMyStyles() {
    let myStyles = { 'display': this.showThis ? 'block' : 'none' };
    return myStyles;
  }

  changeState() {
    
    let stateId = this.instituteForm.value.state;
    console.log(stateId);
    if (stateId == "") {
      this.instituteForm.get("district").setValue('');
      return;
    }
    else {
      let payload = {
        languageId: this.languageId,
        bilingual: this.bilingual,
        stateId: stateId
      }
      console.log(payload);
      this.loginService.getAllDistrictStateWise(payload).subscribe(res => {
      //  console.log(res);
        // let data = res['nicEIdeas'].data;
       let data=res.nicEIdeas.data;
        this.allDistrict = [];
        for (const key in data) {
          // console.log(data[key]);
          // let value = data[key];
          // value.id = key;
          this.allDistrict.push(data[key]);
        }
      },
        err => {
        });

      if (this.instituteForm.get("state").value) {
        this.getAllInsDataByFilter();
      }
    }



  }
  onDistrictChange() {
    if (this.instituteForm.get("district").value) {
      this.getAllInsDataByFilter();
    }
  }


  getAllCategory() {

    let payload = {
      languageId: this.languageId,
      bilingual: this.bilingual,
    }
    this.loginService.getAllCategoryList(payload).subscribe(res => {
      // console.log(res);
      let data = res['nicEIdeas']["1001"].data;
      this.categoryList = [];
      for (const key in data) {
        let value = data[key];
        value.id = key;
        this.categoryList.push(value);
      }

      if (this.instituteForm.controls['category'].value) {
        this.getAllSubcategory()
      }
    },
      err => {
      });


  }


  getAllSubcategory() {
    this.instituteForm.get("subcat").setValue('');
    let catId = this.instituteForm.value.category;

    let payload = {
      languageId: this.languageId,
      bilingual: this.bilingual,
      categoryId: catId
    }

    this.loginService.getAllSubCategoryList(payload).subscribe(res => {
      console.log(res);
      let data = res['nicEIdeas']["1001"].data;
      this.subCategoryList = [];
      for (const key in data) {
        let value = data[key];
        value.id = key;
        this.subCategoryList.push(value);
      }
    },
      err => {
      });

    if (this.instituteForm.controls['category'].value) {
      this.getAllInsDataByFilter()
    }

  }


  onChangeSubCategory() {
    if (this.instituteForm.controls['subcat'].value) {
      this.getAllInsDataByFilter()
    }
  }



  getAllInsData(item) {
    this.showThis = false;
    this.searchTab = 'false';
    this.activeTab = item.Name;
    item.visiable = "";
    this.ProminentInstituteList.forEach(x => { x.visiable = ''; x.json = null; });
    this.loadInstitute(item);

  }


  loadInstitute(item: any) {
    
    let payload = {
      languageId: this.languageId,
      bilingual: this.bilingual,
      id: item.groupId,
      codeStandard:this.sharedService.aisheStandardId,
      limit: 1000
    }
    this.loginService.getInstituteList(payload).subscribe(res => {
      console.log(res);

      let data = res['nicEIdeas'].data;
      console.log(data);
      this.addressData = [];

      for (const key in data) {
        let value = data[key];
        value.id = key;
        this.addressData.push(value);
        let val = this.addressData;
        val.forEach(element => {
          this.insName = element.name;
          //  console.log(this.insName);
        });

      }
      console.log(this.addressData, "addressdata");

     


    })
  }

  
  getAllInsDataByFilter() {

    this.Txtboxfilter = "";
    ///enable the visibility of search result tab in javascript/////

    this.showThis = true;
    this.searchTab = 'search'
    var getTab = document.getElementById('Tab' + this.activeTab);
    var getDiv = document.getElementById(this.activeTab);
    getTab.classList.remove("active");
    getDiv.classList.remove("active");


    let stateId = this.instituteForm.value.state;
    let districtId = this.instituteForm.value.district;
    let category = this.instituteForm.value.category
    let subcat = this.instituteForm.value.subcat
    let payload = {
      languageId: this.languageId,
      bilingual: this.bilingual,
      stateId: stateId,
      districtId: districtId,
      category: category,
      codeStandard:this.sharedService.aisheStandardId,
      subId: subcat,
      limit: 1000,

    }
    this.loginService.getInstituteListByFilter(payload).subscribe(res => {
      console.log(res);

      let data = res['nicEIdeas'].data;
      console.log(data);
      this.searchAddressData = [];

      for (const key in data) {
        let value = data[key];
        value.id = key;
        this.searchAddressData.push(value);
        this.AllSearchList = this.searchAddressData
      }
      console.log(this.searchAddressData, "searchaddressdata");


    })
  }

  GridController(Keyfilter) {
    console.log(Keyfilter);
    this.all_matchedList = this.searchAddressData.filter(function (el) {
      return el.name.toLowerCase().indexOf(Keyfilter.toLowerCase()) >= 0;
    });
      this.AllSearchList= this.all_matchedList;
  }
  SearchResult() {

    
    let stateId = this.instituteForm.value.state;
    let districtId = this.instituteForm.value.district;
    let category = this.instituteForm.value.category
    let subcat = this.instituteForm.value.subcat
    let key = this.instituteForm.value.key

    if (key) {

      this.Txtboxfilter = "";
      ///enable the visibility of search result tab in javascript/////
      this.showThis = true;
      this.searchTab = 'search'
      var getTab = document.getElementById('Tab' + this.activeTab);
      var getDiv = document.getElementById(this.activeTab);
      getTab.classList.remove("active");
      getDiv.classList.remove("active");


      let payload = {
        languageId: this.languageId,
        bilingual: this.bilingual,
        stateId: stateId,
        districtId: districtId,
        category: category,
        subId: subcat,
        keyWord: key,
        codeStandard:this.sharedService.aisheStandardId,
        limit: 50
      }
      this.loginService.getSearchByName(payload).subscribe(res => {
        console.log(res);
        let data = res['nicEIdeas'].data;
        console.log(data);

        this.searchAddressData = [];

        for (const key in data) {
          let value = data[key];
          value.id = key;
          this.searchAddressData.push(value);
          this.AllSearchList = this.searchAddressData;

        }
        console.log(this.searchAddressData, "addressdata");



      })
    } else {
      if (key == "") {
        this.getAllInsDataByFilter()
      }

    }














  }


  toggleShow() {

    this.isShown = !this.isShown;

  }


  updateLabel() {
    if(this.languageId === '15' || this.languageId === '27'){
      this.keyword = this.sharedService.bilingual_institute_courses_list[this.languageId]['keyword'];
      this.filter_the_result = this.sharedService.bilingual_institute_courses_list[this.languageId]['filter_the_result'];
      this.search_window =this.sharedService.bilingual_institute_courses_list[this.languageId]['search_title'];
      this.lbl_category = this.sharedService.bilingual_institute_courses_list[this.languageId]['category'];
      this.lbl_sub_category = this.sharedService.bilingual_institute_courses_list[this.languageId]['sub_category'];
      this.lbl_state = this.sharedService.bilingual_institute_courses_list[this.languageId]['state'];
      this.lbl_district = this.sharedService.bilingual_institute_courses_list[this.languageId]['district'];
      this.btn_submit = this.sharedService.bilingual_institute_courses_list[this.languageId]['submit'];
      this.ddl_select = this.sharedService.bilingual_institute_courses_list[this.languageId]['select'];
      this.search_result = this.sharedService.bilingual_institute_courses_list[this.languageId]['search_result'];
      this.state = this.sharedService.bilingual_institute_courses_list[this.languageId]['state'];
      this.select = this.sharedService.bilingual_institute_courses_list[this.languageId]['select'];
      this.district = this.sharedService.bilingual_institute_courses_list[this.languageId]['district'];
      this.viewInstitutionDetails = this.sharedService.bilingual_institute_courses_list[this.languageId]['View Institution Details'];
      this.ddl_state = (this.languageId == 27) ? this.lbl_state + ' ' + this.ddl_select : this.ddl_select + ' ' + this.lbl_state
      this.ddl_district = (this.languageId == 27) ? this.lbl_district + ' ' + this.ddl_select : this.ddl_select + ' ' + this.lbl_district
      this.ddl_category = (this.languageId == 27) ? this.lbl_category + ' ' + this.ddl_select : this.ddl_select + ' ' + this.lbl_category
      this.ddl_sub_category = (this.languageId == 27) ? this.lbl_sub_category + ' ' + this.ddl_select : this.ddl_select + ' ' + this.lbl_sub_category
    }else{
      this.keyword = this.sharedService.bilingual_institute_courses_list['15']['keyword'];
      this.filter_the_result = this.sharedService.bilingual_institute_courses_list['15']['filter_the_result'];
      this.search_window =this.sharedService.bilingual_institute_courses_list['15']['search_title'];
      this.lbl_category = this.sharedService.bilingual_institute_courses_list['15']['category'];
      this.lbl_sub_category = this.sharedService.bilingual_institute_courses_list['15']['sub_category'];
      this.lbl_state = this.sharedService.bilingual_institute_courses_list['15']['state'];
      this.lbl_district = this.sharedService.bilingual_institute_courses_list['15']['district'];
      this.btn_submit = this.sharedService.bilingual_institute_courses_list['15']['submit'];
      this.ddl_select = this.sharedService.bilingual_institute_courses_list['15']['select'];
      this.search_result = this.sharedService.bilingual_institute_courses_list['15']['search_result'];
      this.state = this.sharedService.bilingual_institute_courses_list['15']['state'];
      this.select = this.sharedService.bilingual_institute_courses_list['15']['select'];
      this.district = this.sharedService.bilingual_institute_courses_list['15']['district'];
      this.viewInstitutionDetails = this.sharedService.bilingual_institute_courses_list['15']['View Institution Details'];
      this.ddl_state = (this.languageId == 27) ? this.lbl_state + ' ' + this.ddl_select : this.ddl_select + ' ' + this.lbl_state
      this.ddl_district = (this.languageId == 27) ? this.lbl_district + ' ' + this.ddl_select : this.ddl_select + ' ' + this.lbl_district
      this.ddl_category = (this.languageId == 27) ? this.lbl_category + ' ' + this.ddl_select : this.ddl_select + ' ' + this.lbl_category
      this.ddl_sub_category = (this.languageId == 27) ? this.lbl_sub_category + ' ' + this.ddl_select : this.ddl_select + ' ' + this.lbl_sub_category
    }
   



  }
  ngOnDestroy() {
    if (this.detailRecivedSubscription) {
      this.detailRecivedSubscription.unsubscribe();
    }
    if(this.detailRecivedSubscription1){
      this.detailRecivedSubscription1.unsubscribe()
    }
}
}
