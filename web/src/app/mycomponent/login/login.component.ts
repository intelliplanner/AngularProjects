import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { UserAuthService } from '../../service/user-auth.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  message: string;
  loader: boolean = false;
  userToken: string = 'hdu58sd95qx9c8qqdsdd669955tgsfdfgg85552sslopskjs1smsjs854sxsoss';

  constructor(private _userAuth: UserAuthService, public _router: Router){ }

    loginForm = new FormGroup({
      username: new FormControl(''),
      password: new FormControl(''),
    });

    onSubmit(){

     if(this.loginForm.value.username == 'poolgame@gmail.com' && this.loginForm.value.password == '12345'){
        
      this._userAuth.handle(this.userToken);
      console.log(this._userAuth.getToken());
      this._router.navigate(['/dashboard']);
      
     }else{

      this.message = 'Username or Password invalid Try again..';

     }
    

        // this._userAuth.login(this.loginForm.value).subscribe(
        //   (doc) =>{
        //     console.log(doc);
        //     alert('success');
        //   },
        //   err => console.log(err)
        // )
    }

}
