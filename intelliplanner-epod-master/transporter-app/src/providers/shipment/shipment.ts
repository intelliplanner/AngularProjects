import { Http } from '@angular/http';
import { Injectable } from '@angular/core';
import { AuthProvider } from '../auth/auth';

@Injectable()
export class ShipmentProvider {
apiURL: any;

  constructor(public http: Http,
  	public auth: AuthProvider) {
	this.apiURL = this.auth.apiURL; 
  }

}
