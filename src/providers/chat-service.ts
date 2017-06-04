import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import 'rxjs';
import { AppGlobals } from '../global';

@Injectable()
export class ChatService {

  constructor(public http: Http, private _appGlobals: AppGlobals) {
    console.log('Hello ChatService Provider');
  }

  processUserRequest(request) {
    let headers = new Headers({ 'Content-Type': 'application/json'});
    let options = new RequestOptions({ headers: headers });
    //console.log(request);
    return this.http.post(this._appGlobals.baseUrl, request, options).toPromise();
  }

}
