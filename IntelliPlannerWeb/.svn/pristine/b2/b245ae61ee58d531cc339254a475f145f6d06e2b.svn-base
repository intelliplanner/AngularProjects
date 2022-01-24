import { Component, OnDestroy, OnInit } from '@angular/core';
import { SharedService } from '../shared/shared.service';

@Component({
  selector: 'app-contactus',
  templateUrl: './contactus.component.html',
  styleUrls: ['./contactus.component.scss']
})
export class ContactusComponent implements OnInit,OnDestroy {
  detail: any;
  lang: any;
  bilingual: any;
  AddressName1: any;
  AddressName2: any;
  Address1: any;
  Address2: any;
  email: any;
  telephone: any;
  Address0: any;
  telephone1: any;
  email1: any;
  contactUs: any;

  constructor(public sharedService:SharedService) {
    this.detail = this.sharedService.getLangId.subscribe(res => {
      if (res != 0) {
        this.lang = res.langId,
          this.bilingual = res.bilingual,
          this.getLabel()
      }
    })
   }

  ngOnInit() {
  }
  getLabel(){
    if(this.lang === '15' || this.lang === '27'){
      this.AddressName1 = this.sharedService.bilingual_institute_courses_list[this.lang]['AddressName1']
      this.AddressName2 = this.sharedService.bilingual_institute_courses_list[this.lang]['AddressName2']
      this.Address0 = this.sharedService.bilingual_institute_courses_list[this.lang]['AddressLine0']
      this.Address1 = this.sharedService.bilingual_institute_courses_list[this.lang]['AddressLine1']
      this.Address2 = this.sharedService.bilingual_institute_courses_list[this.lang]['AddressLine2']
      this.email = this.sharedService.bilingual_institute_courses_list[this.lang]['email']
      this.telephone = this.sharedService.bilingual_institute_courses_list[this.lang]['telephone']
      this.email1 = this.sharedService.bilingual_institute_courses_list[this.lang]['email1']
      this.telephone1 = this.sharedService.bilingual_institute_courses_list[this.lang]['telephone1'],
      this.contactUs = this.sharedService.bilingual_institute_courses_list[this.lang]['ContactUs']
    }else{
      this.AddressName1 = this.sharedService.bilingual_institute_courses_list[15]['AddressName1']
      this.AddressName2 = this.sharedService.bilingual_institute_courses_list[15]['AddressName2']
      this.Address0 = this.sharedService.bilingual_institute_courses_list[15]['AddressLine0']
      this.Address1 = this.sharedService.bilingual_institute_courses_list[15]['AddressLine1']
      this.Address2 = this.sharedService.bilingual_institute_courses_list[15]['AddressLine2']
      this.email = this.sharedService.bilingual_institute_courses_list[15]['email']
      this.telephone = this.sharedService.bilingual_institute_courses_list[15]['telephone']
      this.email1 = this.sharedService.bilingual_institute_courses_list[15]['email1']
      this.telephone1 = this.sharedService.bilingual_institute_courses_list[15]['telephone1'],
      this.contactUs = this.sharedService.bilingual_institute_courses_list[15]['ContactUs']
    }
   

  }
  ngOnDestroy() {
    if (this.detail) {
      this.detail.unsubscribe();
    }
  }
}
