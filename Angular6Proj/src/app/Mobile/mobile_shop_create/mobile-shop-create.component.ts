import { Component, OnInit } from '@angular/core';
import {FormGroup,FormControl,FormBuilder,ReactiveFormsModule,Validators} from '@angular/forms'
import { ActivatedRoute,Router } from '@angular/router';
import {JavaNotesServiceService} from '../../javapoint_service/java-notes-service.service';
import {MobileService} from '../../Mobile/MobileService/mobile.service';
import {MobileShop} from '.././MobileShop';

@Component({
  selector: 'app-mobile-shop-create',
  templateUrl: './mobile-shop-create.component.html',
  styleUrls: ['./mobile-shop-create.component.css']
})
export class MobileShopCreateComponent implements OnInit {

 createmobileShopForm:FormGroup;

	// mobileShop:MobileShop[];

  constructor(private fb:FormBuilder ,  private route:ActivatedRoute ,private mobileService:MobileService,private router:Router) { }

  ngOnInit() {
  		this.createmobileShopForm= this.fb.group({

  			mobileShopName:['',[Validators.required,Validators.minLength(2),Validators.maxLength(50)]]
  	});


 // this.mobileService.getAllMobileShops().subscribe(data =>{  
 //      this.mobileShop = data;  
 // 		  console.log(data)    ; 		 
 //    });
  }


validatorMessages={
	  'topicId':{'required':"Must be required"},
	  'subTopicName':{
				'required':"Must be required",
				'minLength':"min lenth 2",
				'maxLength':"max length 50"	
			}
		};
formErrors:{
			topicId:'Please Select Topic Name'
			subTopicName:'Please Fill Sub Topic Name'
	};

// saveMobileShops(){
// 	console.log(this.createmobileShopForm.value);
// 	this.mobileService.saveMobileShops(this.createmobileShopForm.value).subscribe(
// 		() => this.router.navigate(['list']),
// 		(err:any)=>console.log(err)
// 	);
// 	this.createmobileShopForm.reset();
// }	



}
