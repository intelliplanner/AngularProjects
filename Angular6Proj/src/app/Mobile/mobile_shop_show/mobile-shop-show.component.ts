import { Component, OnInit } from '@angular/core';
import {FormGroup,FormControl,FormBuilder,ReactiveFormsModule,Validators} from '@angular/forms'
import { ActivatedRoute,Router } from '@angular/router';
import {MobileService} from '../../Mobile/MobileService/mobile.service';
import {MobileShop} from '.././MobileShop';
@Component({
  selector: 'app-mobile-shop-show',
  templateUrl: './mobile-shop-show.component.html',
  styleUrls: ['./mobile-shop-show.component.css']
})
export class MobileShopShowComponent implements OnInit {

 
  mobileShop:MobileShop[];

  constructor(private fb:FormBuilder ,  private route:ActivatedRoute ,private mobileService:MobileService,private router:Router) { }

  ngOnInit() {
	 this.mobileService.getAllMobileShops().subscribe(data =>{  
	      this.mobileShop = data;  
	 	  console.log(data)    ; 		 
	    });
	  }


editTopicsExtend():void{

}

}
