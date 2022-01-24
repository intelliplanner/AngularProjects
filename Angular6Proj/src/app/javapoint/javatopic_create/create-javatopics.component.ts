import { Component, OnInit } from '@angular/core';
import {FormGroup,FormControl,FormBuilder,ReactiveFormsModule,Validators} from '@angular/forms'
import { ActivatedRoute,Router } from '@angular/router';
import {JavaNotesServiceService} from '../../javapoint_service/java-notes-service.service';
import {Topics} from '../Topics';
@Component({
  selector: 'app-create-javatopics',
  templateUrl: './create-javatopics.component.html',
  styleUrls: ['./create-javatopics.component.css']
})
export class CreateJavatopicsComponent implements OnInit {
	createTopicForm:FormGroup;
	topics:Topics;
  constructor(private fb:FormBuilder ,  private route:ActivatedRoute ,private javaNotesServiceService:JavaNotesServiceService,private router:Router) { }

  ngOnInit() {
  		this.createTopicForm= this.fb.group({
  			topicName:['',[Validators.required,Validators.minLength(2),Validators.maxLength(50)]]
  	});
  }


validatorMessages={
	 'topicName':{
				'required':"Must be required",
				'minLength':"min lenth 2",
				'maxLength':"max length 50"	
			}
		};
formErrors:{
			topicName:'Please Fill Topic Name'
	};

saveTopic(){
// if(this.createTopicForm.value.id){
// 	this.javaNotesServiceService.updateIpssiEmployee(this.createTopicForm.value).subscribe(
// 		() => this.router.navigate(['list']),
// 		(err:any)=>console.log(err)
// 	);
// 	}else {
	// this.mapFormValuesToEmployeeModel();
	console.log(this.createTopicForm.value);
	this.javaNotesServiceService.saveTopics(this.createTopicForm.value).subscribe(
		() => this.router.navigate(['list']),
		(err:any)=>console.log(err)
	);
	// }
	this.createTopicForm.reset();
}	



}
