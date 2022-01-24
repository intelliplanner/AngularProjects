import { Component, OnDestroy, OnInit } from '@angular/core';
import { MasterService } from 'src/app/master.service';
import { SharedService } from 'src/app/shared/shared.service';

@Component({
  selector: 'app-school',
  templateUrl: './school.component.html',
  styleUrls: ['./school.component.css'],
  // encapsulation: ViewEncapsulation.None
})
export class SchoolComponent implements OnInit, OnDestroy {
  detailsList: any = [];
  tabList: any = [];
  detailRecivedSubscription: any;
  languageId: any;
  bilingual: any;
  noRecords: boolean;
  limit: number = 1000;
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
    let payload = {
      languageId: this.languageId,
      bilingual: this.bilingual,
      categoryId: 43,
      codeStandard:this.sharedService.udiseStandardId,
    }
    this.sharedService.getInstituteSubCategory(payload).then((res: any) => {
      if (res.length != 0) {
        this.tabList = res;
        if (!this.subCategoryId) {
          this.subCategoryId = this.tabList['0'].id
        }
        this.getSubCategoryDetails()
      }
    })
  }

  getSubCategoryDetails(){
      let payload = {
      languageId: this.languageId,
      bilingual: this.bilingual,
      subCategoryId: this.subCategoryId,
      codeStandard:this.sharedService.udiseStandardId,
      limit: 1000
    }
    this.sharedService.getSubCategoryDetailsById(payload).then((res:any)=>{
      if(res.length != 0){
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
 
  ngOnDestroy() {
    if (this.detailRecivedSubscription) {
      this.detailRecivedSubscription.unsubscribe();
    }
  
  }
  tabSelected(event){
    
  }
}
