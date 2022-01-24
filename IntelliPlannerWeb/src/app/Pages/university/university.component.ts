import { Component, OnDestroy, OnInit} from '@angular/core';
import { MasterService } from 'src/app/master.service';
import { SharedService } from 'src/app/shared/shared.service';

@Component({
  selector: 'app-university',
  templateUrl: './university.component.html',
  styleUrls: ['./university.component.css']
})
export class UniversityComponent implements OnInit, OnDestroy {
  detailsList: any = [];
  tabList: any = [];
  detailRecivedSubscription: any;
  languageId: any;
  bilingual: any;
  noRecords: boolean;
  limit: number = 20;
  p: number = 1;
  subCategoryId: any;
  viewInstitutionDetails: any;
  constructor(public masterService: MasterService, public sharedService: SharedService) {
    this.detailRecivedSubscription = this.sharedService.getLangId.subscribe(lang => {
      if (lang != 0) {
        this.languageId = lang.langId;
        this.bilingual = lang.bilingual;
        if(this.languageId === '15' || this.languageId === '27'){
          this.viewInstitutionDetails = this.sharedService.bilingual_institute_courses_list[this.languageId]['View Institution Details']
        }else{
          this.viewInstitutionDetails = this.sharedService.bilingual_institute_courses_list[15]['View Institution Details']
        }
        this.getSubCategory();
      }
    });

   

  }

  ngOnInit() {
  }

  getSubCategory() {
    debugger;
    let payload = {
      languageId: this.languageId,
      bilingual: this.bilingual,
      categoryId: 27,
      codeStandard:this.sharedService.aisheStandardId
    }
    this.sharedService.getInstituteSubCategory(payload).then((res: any) => {
      if (res.length != 0) {
        this.tabList = res;
        console.log(this.tabList);
        if (!this.subCategoryId) {
          this.subCategoryId = this.tabList['0'].id
        }
        this.getSubCategoryDetails()
      }
    })
  }

  getSubCategoryDetails() {
    debugger;
    let payload = {
      languageId: this.languageId,
      bilingual: this.bilingual,
      subCategoryId: this.subCategoryId,
      codeStandard:this.sharedService.aisheStandardId,
      limit: 1000
    }
    this.sharedService.getSubCategoryDetailsById(payload).then((res: any) => {
      if (res.length != 0) {
        this.detailsList = res;
       

      }
    })
  }

  onTabClick(item, i) {
    for (let index = 0; index < this.tabList.length; index++) {
      this.tabList[index].visible = '';
      this.tabList[i].visible = 'active';
    }
    this.subCategoryId = item.id
    this.getSubCategoryDetails();
  }

  // onPageChange(event) {
  //   this.p = event
  //   this.limit = this.limit + event * 10;
  //   this.getSubCategoryDetails()
  // }

  ngOnDestroy() {
    if (this.detailRecivedSubscription) {
      this.detailRecivedSubscription.unsubscribe();
    }
  }

}
