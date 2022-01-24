import { Component, OnInit } from '@angular/core';
import {FormGroup,FormControl,FormBuilder,ReactiveFormsModule,Validators} from '@angular/forms'
import { ActivatedRoute,Router } from '@angular/router';
import {JavaNotesServiceService} from '../../javapoint_service/java-notes-service.service';
import {Topics} from '../Topics';
import {TopicsExtended} from '../topics-extended';

@Component({
  selector: 'app-create-javatopic-extended',
  templateUrl: './create-javatopic-extended.component.html',
  styleUrls: ['./create-javatopic-extended.component.css']
})
export class CreateJavatopicExtendedComponent implements OnInit {

  // Topics: any = ['Florida', 'South Dakota', 'Tennessee', 'Michigan']

 createTopicExtendedForm:FormGroup;

	topics:Topics[];

  constructor(private fb:FormBuilder ,  private route:ActivatedRoute ,private javaNotesServiceService:JavaNotesServiceService,private router:Router) { }

  ngOnInit() {
  		this.createTopicExtendedForm= this.fb.group({
  			topicId:['',[Validators.required]],
  			subTopicName:['',[Validators.required,Validators.minLength(2),Validators.maxLength(50)]]
  	});


 this.javaNotesServiceService.getAllTopics().subscribe(data =>{  
      this.topics = data;  
 		  console.log(data)    ; 		 
    });
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

saveTopicExtended(){
	console.log(this.createTopicExtendedForm.value);
	this.javaNotesServiceService.saveTopicsExtended(this.createTopicExtendedForm.value).subscribe(
		() => this.router.navigate(['list']),
		(err:any)=>console.log(err)
	);
	this.createTopicExtendedForm.reset();
}	



}
