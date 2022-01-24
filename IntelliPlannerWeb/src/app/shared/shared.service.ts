import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Message } from 'primeng/components/common/api';
import { MasterService } from '../master.service';
@Injectable()
export class SharedService {
  global_notification: Message[] = [];
  tabList: any = [];
  tabListData:any= [];
  detailsList: any = [];
  public pageSizeOptions: number[] = [25, 50, 100];
  global_loader: boolean;
  aisheStandardId: any = 10019;
  udiseStandardId:any=10026;
  ncvtStandardId:any=10035

  langId = new BehaviorSubject<any>(0);
  getLangId = this.langId.asObservable();


  loginButton = new BehaviorSubject<any>(0);
  getLoginButton = this.loginButton.asObservable();

  loginContent = new BehaviorSubject<any>(0)
  getLoginContent = this.loginContent.asObservable();




  constructor(public masterService: MasterService) {
  }
  setLoginContent(data) {
    if (data) {
      this.loginContent.next(data)
    }
  }


  setLangId(data: any) {
    if (data) {
      this.langId.next(data);
    }
  }

  setLoginButton(data: any) {
    this.loginButton.next(data)
  }

  instituteList: any =
    [
      {
        'name': 'IIT',
        'id': 15
      },
      {
        'name': 'IIIT',
        'id': 27
      },


      {
        'name': 'IIM',
        'id': 58
      },
      {
        'name': 'NIT',
        'id': 36
      },
      {
        'name': 'CSAB',
        'id': 197
      },
      {
        'name': 'JoSAA',
        'id': 184
      },
      {
        'name': 'NCHMCT',
        'id': 204
      },
      // {
      //   'name':'MEDICAL',
      //   'id': 204
      // },

    ]

  public bilingual_institute_courses_list = {
    '15':
    {
      "search_title": "Search Institute",
      "search_result": "Search result",
      "search_tips": "Please enter the name of the institute or select state, district or category dropdown from the left panel.",
      "no_search_result": "Didn't find any institute for this search.",
      "filter_the_result": "Filter the result",
      "institute_Name": "Institute Name",
      "category": "Category",
      "sub_category": "Sub-Category",
      "governance": "Governance",
      "status": "Status",
      "year_of_Establishment": "Year of Establishment",
      "address": "Address",
      "state": "State",
      "district": "District",
      'PinCode': 'PinCode',
      "submit": "Submit",
      "select": "Select",
      "keyword": "Keyword",
      "Previous": "Previous",
      "Next": "Next",
      "view_programme": "View Programmes Details",
      "list_programme": "List of Programmes offered",
      "no_data": "No Data Available",
      'btmtitle1': 'Terms and Conditions',
      'btmtitle2': 'Hyperlink Policy',
      'btmtitle3': 'Privacy Policy',
      'btmtitle4': 'Copyright Policy',
      'btmtitle5': 'Disclaimer',
      'Footer': 'This site is designed, developed and hosted by Higher Education Division, National Informatics Centre, Ministry of Electronics & Information Technology, Government of India.',
      'Version': 'Version 1.0',
      'LastUpdate': 'Last Updated on 26 July 2021',
      'Home': 'Home',
      'AboutUs': 'About Us',
      'ContactUs': 'Contact Us',
      'Tittle': 'Educational Institute Directory as a Service',
      'University': 'University',
      'College': 'College',
      'Standalone-Institution': 'Standalone-Institution',
      'School': 'School',
      'ITI': 'ITI',
      'Whats New': `What's New`,
      'Search': 'Search',
      'Skip to main content': 'Skip to main content',
      'View Institution Details': 'View Institution Details',
      'AddressName1': 'National Informatics Center',
      'AddressName2': 'Ministry Of Education',
      'AddressLine1': 'A-Block, CGO Complex, Lodhi Road',
      'AddressLine2': 'Statistics Division,West Block-2,Sector 1,RK Puram',
      'AddressLine0': 'New Delhi - 110 003 India',
      'email': 'hod-hediv@nic.in',
      'telephone': '011-24305888',
      'email1': 'support-aishe@nic.in',
      'telephone1': '011-26162917'

    },
    '27': {
      "search_title": "संस्थान खोजें",
      "search_result": "खोज का परिणाम",
      "search_tips": "कृपया प्रदर्शित विंडो से राज्य , जिला ,प्रकार संस्थान का नाम दर्ज कीजिए।",
      "no_search_result": "इस खोज के लिए कोई संस्थान नहीं मिला।",
      "filter_the_result": "सही परिणाम को चुनें",
      "institute_Name": "संस्थान का नाम",
      "category": "श्रेणी",
      "sub_category": "उप श्रेणी",
      "governance": "शासन",
      "status": "स्थिति",
      "year_of_Establishment": "स्थापना वर्ष",
      "address": "पता",
      "state": "राज्य",
      "district": "जिला",
      "submit": "जमा करें",
      "select": "चुनिए",
      "keyword": "सूचक शब्द",
      "Previous": "पहले",
      "Next": "अगला",
      "view_programme": "कार्यक्रमों का विवरण देखें",
      "list_programme": "संचलित कार्यक्रमों की सूची",
      "no_data": "डेटा उपलब्ध नहीं हैं।",
      'Home': 'होम',
      'AboutUs': 'हमारे बारे में',
      'ContactUs': 'संपर्क करें',
      'btmtitle1': 'नियम और शर्तें',
      'btmtitle2': 'हाइपरलिंक नीति',
      'btmtitle3': 'गोपनीयता नीति',
      'btmtitle4': 'कॉपीराइट नीति',
      'btmtitle5': 'अस्वीकरण',
      'Footer': 'यह साइट उच्च शिक्षा प्रभाग, राष्ट्रीय सूचना विज्ञान केंद्र, इलेक्ट्रॉनिक्स और सूचना प्रौद्योगिकी मंत्रालय, भारत सरकार द्वारा डिजाइन, विकसित और होस्ट की गई है।',
      'Version': 'संस्करण 1.0',
      'LastUpdate': 'अंतिम बार 26 जुलाई 2021 को अपडेट किया गया',
      'subTittle': 'शिक्षा संस्थान निर्देशिका - एक सेवा',
      'University': 'विश्वविद्यालय',
      'College': 'कॉलेज',
      'Standalone-Institution': 'स्टैंडअलोन-संस्था',
      'School': 'स्कूल',
      'ITI': 'आईटीआई',
      'Whats New': 'नया क्या है',
      'Search': 'खोज',
      'Skip to main content': 'मुख्य विषयवस्तु में जाएं',
      'View Institution Details': 'संस्थान विवरण देखें',
      'AddressName1': 'राष्ट्रीय सूचना विज्ञान केंद्र',
      'AddressName2': 'शिक्षा मंत्रालय',
      'AddressLine1': 'ए-ब्लॉक, सीजीओ कॉम्प्लेक्स, लोधी रोड',
      'AddressLine2': 'सांख्यिकी प्रभाग, पश्चिम ब्लॉक-2, सेक्टर 1, आरके पुरम',
      'AddressLine0': 'नई दिल्ली - 110 003 भारत',
      'email': 'hod-hediv@nic.in',
      'telephone': '011-24305888',
      'email1': 'support-aishe@nic.in',
      'telephone1': '011-26162917',
      'PinCode': 'पिन कोड',

    }
  }



  getGovtSubCategory(payload) {
    return new Promise<void>((resolve, reject) => {
      this.masterService.getGovtSubCategory(payload).subscribe(res => {
        this.tabList = [];
        this.tabListData = [];

        let data = res['nicEIdeas'].data;
        for (const key in data) {
          let value = data[key];
          value.id = key;
          this.tabList.push(value);
        }

        resolve(this.tabList)
      }, err => {
        reject(err)
      })
    })
  }


  getSubCategoryDetailsGovernmentById(payload){
    return new Promise<void>((resolve, reject) => {
      this.masterService.getSubCategoryDetailsGovernmentById(payload).subscribe(res => {
        this.tabList = []
        let data = res['nicEIdeas'].data;
        for (const key in data) {
          let value = data[key];
          value.id = key;
          this.tabList.push(value);
        }

        resolve(this.tabList)
      }, err => {
        reject(err)
      })
    })
  }
  getInstituteSubCategory(payload) {
    return new Promise<void>((resolve, reject) => {
      this.masterService.getInstituteSubCategory(payload).subscribe(res => {
        this.tabList = []
        let data = res['nicEIdeas']['1001'].data;
        for (const key in data) {
          let value = data[key];
          value.id = key;
          this.tabList.push(value);
        }
        for (let index = 1; index < this.tabList.length; index++) {
          this.tabList['0']['visible'] = 'active'
          this.tabList[index]['visible'] = ''
        }

        resolve(this.tabList)
      }, err => {
        reject(err)
      })
    })
  }


  getSubCategoryDetailsById(payload) {
    return new Promise<void>((resolve, reject) => {
      this.masterService.getSubCategoryDetailsById(payload).subscribe(res => {
        this.detailsList = []
        let data = res['nicEIdeas'].data;
        for (const key in data) {
          let value = data[key];
          value.id = key;
          this.detailsList.push(value);
        }
        resolve(this.detailsList)
      }, err => {
        reject(err)
      })

    })
  }
}
