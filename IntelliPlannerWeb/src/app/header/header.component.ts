import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SharedService } from '../shared/shared.service';
import { MatCheckboxChange } from '@angular/material';
import { LoginService } from '../login/login.service';



@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})

export class HeaderComponent implements OnInit {
  languages = [];
  siteListHindi:any=[];
  showProfileBtn: boolean;
  showLoginButton: boolean = false;
  langId: any;
  defaultLanguage: any;
  languageName: any;
  bilingualVal: string;
  langData: { langId: any; langName: any; bilingual: string; };
  
  govname: any;
  minisdep: any;
  govnameHindi: any;
  minisdepHindi: any;
  officeName: any;
  more: any;
  homeLabel: any;
  siteList: any;
  parentOffice: any;
  tittle: any;
  subTittle: any;
  version: any;
  lastUpdate: any;
  notice: any;
  btmtitle1: any;
  btmtitle2: any;
  btmtitle3: any;
  btmtitle4: any;
  btmtitle5: any;
  parentOfficeHindi: any;
  officeNameHindi: any;
  subTittleHindi: any;
  home: any;
  aboutus: any;
  university: any;
  school: any;
  college: any;
  iti: any;
  search: any;
  standalone: any;
  contactus: any;
  whatsnew: any;
  skip: any;
  viewInstitutionDetails: any;
  showLogout: boolean=false;
  
  constructor(public router: Router, public sharedService: SharedService,public loginService:LoginService) {

    
  }

  ngOnInit() {
     // this.getlanguage();
  }


  
  

  getlanguage() {
    let bilingual = 'E'
    this.loginService.getLanguageList(bilingual).subscribe(res => {
      let languageSpilitArray = Object.entries(res.nicEIdeas['1001'].data);
      let languageArray = [];
      for (var [key, val] of languageSpilitArray) {
        languageArray.push({
          "langId": key,
          "langData": val
        })
      }
      for (let i = 0; i < languageArray.length; i++) {
        this.languages.push({
          'id': languageArray[i].langId,
          'languageName': languageArray[i].langData['value']
        })
      }
      this.languages.forEach(element => {
        if (element.languageName === 'English | English') {
          this.defaultLanguage = element.id;
          this.langId = element.id;
          this.langData = {
            langId: this.langId,
            langName: element.languageName,
            bilingual: this.bilingualVal = 'S'
          }
        }
      });
      this.sharedService.setLangId(this.langData);
      this.updateLabel();
    },
      err => {
        this.sharedService.global_notification = [];
        this.sharedService.global_notification.push(
          { severity: 'error', detail: 'Request can not be processed at the moment. Please try again' }
        );
      });
  }
  loginPageContent() {
    throw new Error('Method not implemented.');
  }

  

  

  submitLangId(event) {
    this.langId = event.value;

    this.langData = {
      langId: this.langId,
      langName: this.languageName,
      bilingual: this.bilingualVal
    }
    this.sharedService.setLangId(this.langData);
    this.updateLabel();
  }
  bilingual(event) {
    if (event.checked == true) {
      this.bilingualVal = 'B'
      this.langData = {
        langId: this.langId,
        langName: this.languageName,
        bilingual: this.bilingualVal
      }
      this.sharedService.setLangId(this.langData);
    } else {
      this.bilingualVal = 'S'
      this.langData = {
        langId: this.langId,
        langName: this.languageName,
        bilingual: this.bilingualVal
      }
      this.sharedService.setLangId(this.langData);
    }
  }

  updateLabel(){
    if(this.langId === '15' || this.langId === '27'){
      this.home =   this.sharedService.bilingual_institute_courses_list[this.langId]['Home'],
      this.aboutus =   this.sharedService.bilingual_institute_courses_list[this.langId]['AboutUs'],
      this.university =   this.sharedService.bilingual_institute_courses_list[this.langId]['University'],
      this.school =   this.sharedService.bilingual_institute_courses_list[this.langId]['School'],
      this.college =   this.sharedService.bilingual_institute_courses_list[this.langId]['College'],
      this.iti =   this.sharedService.bilingual_institute_courses_list[this.langId]['ITI'],
      this.search =   this.sharedService.bilingual_institute_courses_list[this.langId]['Search'],
      this.standalone =   this.sharedService.bilingual_institute_courses_list[this.langId]['Standalone-Institution'],
      this.contactus =   this.sharedService.bilingual_institute_courses_list[this.langId]['ContactUs'],
      this.whatsnew =   this.sharedService.bilingual_institute_courses_list[this.langId]['Whats New'],
      this.tittle =   this.sharedService.bilingual_institute_courses_list[this.langId]['Tittle'],
      this.subTittle =   this.sharedService.bilingual_institute_courses_list[this.langId]['subTittle'],
      this.skip =   this.sharedService.bilingual_institute_courses_list[this.langId]['Skip to main content'],
      this.btmtitle1 = this.sharedService.bilingual_institute_courses_list[this.langId]['btmtitle1'],
      this.btmtitle2 = this.sharedService.bilingual_institute_courses_list[this.langId]['btmtitle2'],
      this.btmtitle3 = this.sharedService.bilingual_institute_courses_list[this.langId]['btmtitle3'],
      this.btmtitle4 = this.sharedService.bilingual_institute_courses_list[this.langId]['btmtitle4'],
      this.btmtitle5 = this.sharedService.bilingual_institute_courses_list[this.langId]['btmtitle5'],
      this.notice = this.sharedService.bilingual_institute_courses_list[this.langId]['Footer'],
      this.version = this.sharedService.bilingual_institute_courses_list[this.langId]['Version'],
      this.lastUpdate = this.sharedService.bilingual_institute_courses_list[this.langId]['LastUpdate'],
      this.viewInstitutionDetails = this.sharedService.bilingual_institute_courses_list[this.langId]['View Institution Details']
         var data = {
         lastUpdated: this.lastUpdate,
         version: this.version,
         notice: this.notice,
         btmtitle1: this.btmtitle1,
         btmtitle2: this.btmtitle2,
         btmtitle3: this.btmtitle3,
         btmtitle4: this.btmtitle4,
         btmtitle5: this.btmtitle5,
         viewInstitutionDetails:this.viewInstitutionDetails
       }
    }else{
      this.home =   this.sharedService.bilingual_institute_courses_list['15']['Home'],
      this.aboutus =   this.sharedService.bilingual_institute_courses_list['15']['AboutUs'],
      this.university =   this.sharedService.bilingual_institute_courses_list['15']['University'],
      this.school =   this.sharedService.bilingual_institute_courses_list['15']['School'],
      this.college =   this.sharedService.bilingual_institute_courses_list['15']['College'],
      this.iti =   this.sharedService.bilingual_institute_courses_list['15']['ITI'],
      this.search =   this.sharedService.bilingual_institute_courses_list['15']['Search'],
      this.standalone =   this.sharedService.bilingual_institute_courses_list['15']['Standalone-Institution'],
      this.contactus =   this.sharedService.bilingual_institute_courses_list['15']['ContactUs'],
      this.whatsnew =   this.sharedService.bilingual_institute_courses_list['15']['Whats New'],
      this.tittle =   this.sharedService.bilingual_institute_courses_list['15']['Tittle'],
      this.subTittle =   this.sharedService.bilingual_institute_courses_list['15']['subTittle'],
      this.skip =   this.sharedService.bilingual_institute_courses_list['15']['Skip to main content'],
      this.btmtitle1 = this.sharedService.bilingual_institute_courses_list['15']['btmtitle1'],
      this.btmtitle2 = this.sharedService.bilingual_institute_courses_list['15']['btmtitle2'],
      this.btmtitle3 = this.sharedService.bilingual_institute_courses_list['15']['btmtitle3'],
      this.btmtitle4 = this.sharedService.bilingual_institute_courses_list['15']['btmtitle4'],
      this.btmtitle5 = this.sharedService.bilingual_institute_courses_list['15']['btmtitle5'],
      this.notice = this.sharedService.bilingual_institute_courses_list['15']['Footer'],
      this.version = this.sharedService.bilingual_institute_courses_list['15']['Version'],
      this.lastUpdate = this.sharedService.bilingual_institute_courses_list['15']['LastUpdate'],
      this.viewInstitutionDetails = this.sharedService.bilingual_institute_courses_list['15']['View Institution Details']
         var data = {
         lastUpdated: this.lastUpdate,
         version: this.version,
         notice: this.notice,
         btmtitle1: this.btmtitle1,
         btmtitle2: this.btmtitle2,
         btmtitle3: this.btmtitle3,
         btmtitle4: this.btmtitle4,
         btmtitle5: this.btmtitle5,
         viewInstitutionDetails:this.viewInstitutionDetails
    }
  }
  this.sharedService.setLoginContent(data);
}


  
  signUp() {
    this.sharedService.setLoginButton(true);
    this.router.navigateByUrl('/signup');
  }

  login() {
    this.sharedService.setLoginButton(false);
    this.router.navigateByUrl('/login');
  }

  


//   changeLoginContentBYLangId() {
//     let payload = {
//       siteId: 15,
//       
//     }
//     this.loginService.getLoginPageContent(payload).subscribe(res => {
//       if (this.langId != 15) {
//         if(res[0].topbar){
//           this.govnameHindi = res['0'].topbar.govname;
//           this.parentOfficeHindi = res['0'].topbar.parentOffice;
//         }
       
//       }

//      this.siteList=[];
//      this.siteList = res;
//      this.siteList.forEach(getSite => {
//        if (getSite.topbar != null) {
//          let vernacularSplitArray = Object.entries(getSite.topbar);
//          let vernacularNamesArray = [];
//          for (var [key, val] of vernacularSplitArray) {
//            vernacularNamesArray.push({
//              "langId": key,
//              "langData": val
//            })
//          }
//          for (let i = 0; i < vernacularNamesArray.length; i++) {
//            if (this.langId != 15) {
//              this.govnameHindi = vernacularNamesArray[i].langData['govname'];
//              this.parentOfficeHindi = vernacularNamesArray[i].langData['parentOffice'];
//              break;
//            }
//          }
//        }

//        if (getSite.titlebar != null) {
//          let vernaculartitlebarArray = Object.entries(getSite.titlebar);
//          let vernacularNamestitlebarArray = [];
//          for (var [key, val] of vernaculartitlebarArray) {
//            vernacularNamestitlebarArray.push({
//              "langId": key,
//              "langData": val
//            })
//          }
//          for (let i = 0; i < vernacularNamestitlebarArray.length; i++) {
//            if (this.langId == vernacularNamestitlebarArray[i].langId) {
//              this.tittle = vernacularNamestitlebarArray[i].langData['titleName'];
//              this.officeName = vernacularNamestitlebarArray[i].langData['officeName'];
//              this.subTittle = vernacularNamestitlebarArray[i].langData['subTitleName'];
//              break;
//            }
//          }
//        }


//        if (getSite.footer != null) {
//          let vernacularfooterArray = Object.entries(getSite.footer);
//          let vernacularNamesfooterArray = [];
//          for (var [key, val] of vernacularfooterArray) {
//            vernacularNamesfooterArray.push({
//              "langId": key,
//              "langData": val
//            })
//          }
//          for (let i = 0; i < vernacularNamesfooterArray.length; i++) {
//            if (this.langId == vernacularNamesfooterArray[i].langId) {
//              this.version = vernacularNamesfooterArray[i].langData['version'];
//              this.lastUpdate = vernacularNamesfooterArray[i].langData['lastUpdated'];
//              this.notice = vernacularNamesfooterArray[i].langData['notice'];
//              break;
//            }
//          }
//        }
//        if (getSite.bottombar != null) {
//          let vernacularbottombarArray = Object.entries(getSite.bottombar);
//          let vernacularNamesbottombarArray = [];
//          for (var [key, val] of vernacularbottombarArray) {
//            vernacularNamesbottombarArray.push({
//              "langId": key,
//              "langData": val
//            })
//          }
//          for (let i = 0; i < vernacularNamesbottombarArray.length; i++) {
//            if (this.langId == vernacularNamesbottombarArray[i].langId) {
//              this.btmtitle1 = vernacularNamesbottombarArray[i].langData['btmtitle1'],
//                this.btmtitle2 = vernacularNamesbottombarArray[i].langData['btmtitle2'],
//                this.btmtitle3 = vernacularNamesbottombarArray[i].langData['btmtitle3'],
//                this.btmtitle4 = vernacularNamesbottombarArray[i].langData['btmtitle4'],
//                this.btmtitle5 = vernacularNamesbottombarArray[i].langData['btmtitle5']
//            }

//      break;
//    }
     
    
//  }
//    })
//    let data = {
//      lastUpdated: this.lastUpdate,
//      version: this.version,
//      notice: this.notice,
//      btmtitle1: this.btmtitle1,
//      btmtitle2: this.btmtitle2,
//      btmtitle3: this.btmtitle3,
//      btmtitle4: this.btmtitle4,
//      btmtitle5: this.btmtitle5
//    }
//      this.sharedService.setLoginContent(data);
//    })
//  }

//   loginPageContent() {
//     let payload = {
//       siteId: 15,
//       languageId: 15
//     }
//     this.loginService.getLoginPageContent(payload).subscribe(res => {
//       this.siteList = res;
//       this.siteList.forEach(getSite => {
//         if (getSite.topbar != null) {
//           let vernacularSplitArray = Object.entries(getSite.topbar);
//           let vernacularNamesArray = [];
//           for (var [key, val] of vernacularSplitArray) {
//             vernacularNamesArray.push({
//               "langId": key,
//               "langData": val
//             })
//           }
//           for (let i = 0; i < vernacularNamesArray.length; i++) {
//               this.govname = vernacularNamesArray[i].langData['govname'];
//               this.parentOffice = vernacularNamesArray[i].langData['parentOffice'];
             
            
//           }
//         }

//         if (getSite.titlebar != null) {
//           let vernaculartitlebarArray = Object.entries(getSite.titlebar);
//           let vernacularNamestitlebarArray = [];
//           for (var [key, val] of vernaculartitlebarArray) {
//             vernacularNamestitlebarArray.push({
//               "langId": key,
//               "langData": val
//             })
//           }
//           for (let i = 0; i < vernacularNamestitlebarArray.length; i++) {
          
//               this.tittle = vernacularNamestitlebarArray[i].langData['titleName'];
//               this.officeName = vernacularNamestitlebarArray[i].langData['officeName'];
//               this.subTittle = vernacularNamestitlebarArray[i].langData['subTitleName'];
           
//           }
//         }


//         if (getSite.footer != null) {
//           let vernacularfooterArray = Object.entries(getSite.footer);
//           let vernacularNamesfooterArray = [];
//           for (var [key, val] of vernacularfooterArray) {
//             vernacularNamesfooterArray.push({
//               "langId": key,
//               "langData": val
//             })
//           }
//           for (let i = 0; i < vernacularNamesfooterArray.length; i++) {
           
//               this.version = vernacularNamesfooterArray[i].langData['version'];
//               this.lastUpdate = vernacularNamesfooterArray[i].langData['lastUpdated'];
//               this.notice = vernacularNamesfooterArray[i].langData['notice'];
           
//           }
//         }
//         if (getSite.bottombar != null) {
//           let vernacularbottombarArray = Object.entries(getSite.bottombar);
//           let vernacularNamesbottombarArray = [];
//           for (var [key, val] of vernacularbottombarArray) {
//             vernacularNamesbottombarArray.push({
//               "langId": key,
//               "langData": val
//             })
//           }
//           for (let i = 0; i < vernacularNamesbottombarArray.length; i++) {
//               this.btmtitle1 = vernacularNamesbottombarArray[i].langData['btmtitle1'],
//                 this.btmtitle2 = vernacularNamesbottombarArray[i].langData['btmtitle2'],
//                 this.btmtitle3 = vernacularNamesbottombarArray[i].langData['btmtitle3'],
//                 this.btmtitle4 = vernacularNamesbottombarArray[i].langData['btmtitle4'],
//                 this.btmtitle5 = vernacularNamesbottombarArray[i].langData['btmtitle5']   
//     }   
//   }
//     })
//     let data = {
//       lastUpdated: this.lastUpdate,
//       version: this.version,
//       notice: this.notice,
//       btmtitle1: this.btmtitle1,
//       btmtitle2: this.btmtitle2,
//       btmtitle3: this.btmtitle3,
//       btmtitle4: this.btmtitle4,
//       btmtitle5: this.btmtitle5
//     }
// this.sharedService.setLoginContent(data);
// this.loginPageHindiContent();
//     })
//   }
//   loginPageHindiContent() {
//     let payload = {
//       siteId: 15,
//       languageId: 27
//     }
//     this.loginService.getLoginPageContent(payload).subscribe(res => {
//       this.siteListHindi = res;
//       this.siteListHindi.forEach(getSite => {
//         if (getSite.topbar != null) {
//           let vernacularSplitArray = Object.entries(getSite.topbar);
//           let vernacularNamesArray = [];
//           for (var [key, val] of vernacularSplitArray) {
//             vernacularNamesArray.push({
//               "langId": key,
//               "langData": val
//             })
//           }
//           for (let i = 0; i < vernacularNamesArray.length; i++) {
           
//               this.govnameHindi = vernacularNamesArray[i].langData['govname'];
//               this.parentOfficeHindi = vernacularNamesArray[i].langData['parentOffice'];
              
           
//           }
//         }
//         if (getSite.titlebar != null) {
//           let vernacularSplitArray1 = Object.entries(getSite.titlebar);
//           let vernacularNamesArray1 = [];
//           for (var [key, val] of vernacularSplitArray1) {
//             vernacularNamesArray1.push({
//               "langId": key,
//               "langData": val
//             })
//           }
//           for (let i = 0; i < vernacularNamesArray1.length; i++) {
           
//               this.officeNameHindi = vernacularNamesArray1[i].langData['officeName'];
              
           
//           }
//         }
//   })
// })
// }
  


  
}
