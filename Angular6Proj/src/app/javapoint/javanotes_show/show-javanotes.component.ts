import { Component, OnInit } from '@angular/core';
import {FormGroup,FormControl,FormBuilder,ReactiveFormsModule,Validators} from '@angular/forms'
import { ActivatedRoute,Router } from '@angular/router';
import {JavaNotesServiceService} from '../../javapoint_service/java-notes-service.service';
import {TopicsExtendedContent} from '../topics-extended-content';

@Component({
  selector: 'app-show-javanotes',
  templateUrl: './show-javanotes.component.html',
  styleUrls: ['./show-javanotes.component.css']
})
export class ShowJavanotesComponent implements OnInit {

  topicsContent:TopicsExtendedContent[];

  constructor(private fb:FormBuilder ,  private route:ActivatedRoute ,private javaNotesServiceService:JavaNotesServiceService,private router:Router) { }

  ngOnInit() {
	 this.javaNotesServiceService.getAllTopicsExtendedContent().subscribe(data =>{  
	      this.topicsContent = data;  
	 	  console.log(data)    ; 		 
	    });
	  }


editTopicsExtend():void{

}

}
