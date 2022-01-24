import { Component, OnDestroy, OnInit } from '@angular/core';
import { MasterService } from 'src/app/master.service';
import { SharedService } from 'src/app/shared/shared.service';

@Component({
  selector: 'app-iti',
  templateUrl: './iti.component.html',
  styleUrls: ['./iti.component.css']
})
export class ItiComponent implements OnInit, OnDestroy {
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
  // tabListData: any = [];
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
    }
    this.sharedService.getGovtSubCategory(payload).then((res: any) => {
      if (res.length != 0) {
        let tabListData = [];

        tabListData = res;
        this.tabList = [];
        let govtCategory = tabListData[tabListData.length - 2];
        this.tabList.push(govtCategory);
        let privateCat = tabListData[tabListData.length - 1];
        this.tabList.push(privateCat);

          for (let index = 1; index < this.tabList.length; index++) {
          this.tabList['0']['visible'] = 'active'
          this.tabList[index]['visible'] = ''
        }
      // console.log(this.tabList, "Govt sec tablist");
        if (!this.subCategoryId) {
          this.subCategoryId = this.tabList['0'].id;
          // console.log(this.subCategoryId);
        }
        this.getSubCategoryDetails();
      }
    })
  }

  getSubCategoryDetails(){
    // console.log(this.subCategoryId ,"Execute");
      let payload = {
      categoryId:58,
      languageId: this.languageId,
      bilingual: this.bilingual,
      goveranceSectorId: this.subCategoryId,
      codeStandard:this.sharedService.ncvtStandardId,
      limit: 1000
    }
    this.sharedService.getSubCategoryDetailsGovernmentById(payload).then((res:any)=>{
      if(res.length != 0){
        this.detailsList = res;
        // console.log(this.detailsList,"GOVT Details List");

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
 
}
