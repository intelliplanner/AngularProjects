import { OnDestroy } from '@angular/core';
import { Component, OnInit } from '@angular/core';
import { SharedService } from 'src/app/shared/shared.service';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent implements OnInit,OnDestroy {
  detailRecivedSubscription: any;
  lastUpdated: any;
  version: any;
  notice: any;
  btmtitle1: any;
  btmtitle2: any;
  btmtitle3: any;
  btmtitle4: any;
  btmtitle5: any;
  constructor(public sharedService:SharedService) {

   }
// footer
  ngOnInit() {
    this.detailRecivedSubscription = this.sharedService.getLoginContent.subscribe(res => {
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
    })
  }
  ngOnDestroy() {
    if (this.detailRecivedSubscription) {
      this.detailRecivedSubscription.unsubscribe();
    }
}
}
