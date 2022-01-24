import { Component, OnInit } from '@angular/core';
import {FormGroup,FormControl,FormBuilder,ReactiveFormsModule,Validators} from '@angular/forms'
import { ActivatedRoute,Router } from '@angular/router';
import {JavaNotesServiceService} from '../../javapoint_service/java-notes-service.service';
import {TopicsExtended} from '../topics-extended';

@Component({
  selector: 'app-show-javatopics-extended',
  templateUrl: './show-javatopics-extended.component.html',
  styleUrls: ['./show-javatopics-extended.component.css']
})
export class ShowJavatopicsExtendedComponent implements OnInit {
 
  topicsExtended:TopicsExtended[];

  constructor(private fb:FormBuilder ,  private route:ActivatedRoute ,private javaNotesServiceService:JavaNotesServiceService,private router:Router) { }

  ngOnInit() {
  	
	 this.javaNotesServiceService.getAllTopicsExtended().subscribe(data =>{  
	      this.topicsExtended = data;  
	 	  console.log(data)    ; 		 
	    });
	  }


editTopicsExtend():void{

}

}