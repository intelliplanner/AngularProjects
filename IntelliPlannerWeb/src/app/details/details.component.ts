import { Component, OnDestroy, OnInit, ViewEncapsulation } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { MasterService } from '../master.service';
import { SharedService } from '../shared/shared.service';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class DetailsComponent implements OnInit, OnDestroy {
  detailRecivedSubscription: any;
  languageId: any;
  bilingual: any;
  instituteId: number;
  detailsList: any = [];
  state: any;
  district: any;
  pincode: any;
  standardId: any;
  constructor(public sharedService: SharedService, public route: ActivatedRoute, public masterService: MasterService) {
    
    this.route.queryParams.subscribe(
      params => {
        this.instituteId = params['id'];
        this.standardId = params['standardId'];
      }
    )
    this.detailRecivedSubscription = this.sharedService.getLangId.subscribe(lang => {
      if (lang != 0) {
        this.languageId = lang.langId;
        this.bilingual = lang.bilingual;
        this.getListById();
      }
    });
    
  }

  ngOnInit() {
  }
  getListById() {
    let payload = {
      instituteId: this.instituteId,
      languageId: this.languageId,
      bilingual: this.bilingual,
      codeStandard:this.standardId,
    }
    this.masterService.getInstituteById(payload).subscribe(res => {
      this.detailsList = []
      let data = res['nicEIdeas'].data;
      for (const key in data) {
        let value = data[key];
        value.id = key;
        this.detailsList.push(value);
      }
     
        if(this.detailsList['0'].category === 'School'){
          this.detailsList['0']['uniqueName'] = 'UDISE Code'
        }else if(this.detailsList['0'].category === 'Industrial Training Institute(NCVT/SCVT)'){
          this.detailsList['0']['uniqueName'] = 'NCVT/SCVT Code'
        }else{
          this.detailsList['0']['uniqueName'] = 'AISHE Code'
        }
        
      
    })
  }

  navigateBack(){
    window.history.back();
  }
  ngOnDestroy() {
    if (this.detailRecivedSubscription) {
      this.detailRecivedSubscription.unsubscribe();
    }
    
  }
}
