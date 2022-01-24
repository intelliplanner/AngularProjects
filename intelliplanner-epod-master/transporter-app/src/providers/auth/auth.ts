import { Injectable } from '@angular/core';
import * as Rx from "rxjs";
import { map } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class AuthProvider {
// public apiURL: any = 'http://localhost:8100/';
// public apiURL: any = 'http://172.19.0.176:5000/';http://103.122.168.125:5000/
public apiURL: any = 'http://103.122.168.125:5000/';
// public apiURL: any = 'http://182.72.88.5:5000/';  // chand server
// public apiURL: any = 'http://157.230.91.154:5000/';

  constructor(
    public httpClient: HttpClient
  	) {

  }

  login(user){
    console.log("user",user)
        return new Promise((resolve, reject) => {
          this.httpClient.post(this.apiURL+'transporterLogin', {userObj: user})
          .subscribe(res => resolve(res), error => reject(error));
        });
  }

}
