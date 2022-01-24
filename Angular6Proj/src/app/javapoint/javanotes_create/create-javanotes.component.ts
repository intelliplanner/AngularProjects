import { Component, OnInit } from '@angular/core';
import {FormGroup,FormControl,FormBuilder,ReactiveFormsModule,Validators} from '@angular/forms'
import { ActivatedRoute,Router } from '@angular/router';
import {JavaNotesServiceService} from '../../javapoint_service/java-notes-service.service';
import {TopicsExtended} from '../Topics-Extended';
import {TopicsExtendedContent} from '../Topics-Extended-Content';


@Component({
  selector: 'app-create-javanotes',
  templateUrl: './create-javanotes.component.html',
  styleUrls: ['./create-javanotes.component.css']
})
export class CreateJavanotesComponent implements OnInit {

 createTopicExtendedContentForm:FormGroup;
 topicsExtended:TopicsExtended[];

  constructor(private fb:FormBuilder ,  private route:ActivatedRoute ,private javaNotesServiceService:JavaNotesServiceService,private router:Router) { }

  ngOnInit() {
	this.createTopicExtendedContentForm= this.fb.group({
  			topicExtendId:['',[Validators.required]],
  			topicPrev:['',[Validators.required]],
  			topicNext:['',[Validators.required]],
  			topicHeader:['',[Validators.required,Validators.minLength(2),Validators.maxLength(50)]],
  			topicContent:['',[Validators.required]]
  	});


	this.javaNotesServiceService.getAllTopicsExtended().subscribe(data =>{  
	      this.topicsExtended = data;  
	 		  console.log(data)    ; 		 
	});

  }


validatorMessages={
	  'topicExtendId':{'required':"Must be required"},
	  'topicPrev':{'required':"Must be required"},
	  'topicNext':{'required':"Must be required"},
	  'topicHeader':{'required':"Must be required"},
	  'topicContent':{
				'required':"Must be required",
				'minLength':"min lenth 2",
				'maxLength':"max length 50"	
			}
		};
formErrors:{
			topicExtendId:'Please Select Topic Name'
			topicPrev:'Please Select Topic Name'
			topicNext:'Please Select Topic Name'
			topicHeader:'Please Select Topic Name'
			topicContent:'Please Fill Sub Topic Name'
	};

saveTopicExtendedContent(){
	console.log(this.createTopicExtendedContentForm.value);
	this.javaNotesServiceService.saveTopicsExtendedContent(this.createTopicExtendedContentForm.value).subscribe(
		() => this.router.navigate(['list']),
		(err:any)=>console.log(err)
	);
	this.createTopicExtendedContentForm.reset();
}	



}
