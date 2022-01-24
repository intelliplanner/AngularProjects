import { Component, OnInit } from '@angular/core';
import {FormGroup,FormControl,FormBuilder,ReactiveFormsModule,Validators} from '@angular/forms'
import { ActivatedRoute,Router } from '@angular/router';
import {JavaNotesServiceService} from '../../javapoint_service/java-notes-service.service';
import {Topics} from '../topics';

@Component({
  selector: 'app-show-javatopics',
  templateUrl: './show-javatopics.component.html',
  styleUrls: ['./show-javatopics.component.css']
})
export class ShowJavatopicsComponent implements OnInit {
 topics:Topics[];

  constructor(private fb:FormBuilder ,  private route:ActivatedRoute ,private javaNotesServiceService:JavaNotesServiceService,private router:Router) { }

  ngOnInit() {
  	
	 this.javaNotesServiceService.getAllTopics().subscribe(data =>{  
	      this.topics = data;  
	 	  console.log(data)    ; 		 
	    });
	  }


editTopicsExtend():void{

}


}
