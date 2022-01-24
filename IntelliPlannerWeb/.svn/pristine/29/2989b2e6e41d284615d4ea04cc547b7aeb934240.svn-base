import { Component, OnDestroy, OnInit} from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { MasterService } from 'src/app/master.service';
import { SharedService } from 'src/app/shared/shared.service';

@Component({
  selector: 'app-subcategory',
  templateUrl: './subcategory.component.html',
  styleUrls: ['./subcategory.component.css']
})
export class SubcategoryComponent implements OnInit {
  detailsList: any = [];
  tabList: any = [];
  detailRecivedSubscription: any;
  languageId: any;
  bilingual: any;
  noRecords: boolean;
  limit: number = 20;
  p: number = 1;
  subCategoryId: any;
  categoryId:any
  viewInstitutionDetails: any;
  constructor(public masterService: MasterService, public sharedService: SharedService,public route:ActivatedRoute) {
    this.route.params.forEach((params: Params) => {
      this.categoryId = +params['id'];
    });
    this.detailRecivedSubscription = this.sharedService.getLangId.subscribe(lang => {
      if (lang != 0) {
        this.languageId = lang.langId;
        this.bilingual = lang.bilingual;
        this.viewInstitutionDetails = this.sharedService.bilingual_institute_courses_list[this.languageId]['View Institution Details']
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
      categoryId: this.categoryId,
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

  getSubCategoryDetails() {
    let payload = {
      languageId: this.languageId,
      bilingual: this.bilingual,
      subCategoryId: this.subCategoryId,
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
