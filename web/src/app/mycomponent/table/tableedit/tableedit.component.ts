import { Component, OnInit } from '@angular/core';
import { UrlCallService } from 'src/app/service/url-call.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-tableedit',
  templateUrl: './tableedit.component.html',
  styleUrls: ['./tableedit.component.css']
})


export class TableeditComponent implements OnInit {

  TableFormData: FormGroup;
  submitted = false;

  constructor(private _fb:FormBuilder) {}

  ngOnInit() {

    this.TableFormData = this._fb.group({
        name: ['', Validators.required],
        amount: ['', Validators.required],
        priority: ['', Validators.required],
        image: ['', Validators.required],
        type: "1"
    });

  }

   get f(){return this.TableFormData.controls;}
   
   onSubmit(){

       this.submitted = true;
       if (this.TableFormData.invalid) {
           return;
       }
       alert('SUCCESS!! :-)\n\n' + JSON.stringify(this.TableFormData.value))
   }



}
