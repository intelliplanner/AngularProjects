import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';

@Component({
  selector: 'app-add-table',
  templateUrl: './add-table.component.html',
  styleUrls: ['./add-table.component.css']
})

export class AddTableComponent implements OnInit {

  message: string;
  loader: boolean = false;

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
