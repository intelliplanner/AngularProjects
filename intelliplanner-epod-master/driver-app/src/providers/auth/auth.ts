import { Http } from '@angular/http';
import { Injectable } from '@angular/core';

@Injectable()
export class AuthProvider {
// public apiURL: any = 'http://localhost:5000/';
public apiURL: any = 'http://157.230.91.154:5000/';

  constructor() {
    console.log('Hello AuthProvider Provider');
  }

  //  login(user){
  //       return new Promise((resolve) => {
  //         this.http.post(this.apiURL+'dealerLogin', {userObj: user})
  //         .pipe(map(res => res.json()))
  //         .subscribe(res => resolve(res));
  //       });
  // }

  	 login(user){
        return new Promise((resolve) => {
        if(user.phone == '9876543210'){
        	resolve({'status':true,'phone':user.phone})
        }
        else {
        	resolve({'status':false,'message':'Phone.NO not correct'})
        }
        });
  }
}
