import { Injectable } from "@angular/core";
import { Http, Headers } from "@angular/http";
import { GlobalVarsProvider } from "../../providers/global-vars/global-vars";

let appUrl = GlobalVarsProvider.file_url;
let key = "$2y$10$KPYNFfDXrD96EB2uQaHXEebRAEmsbD2ZphhyDjtRvmsGJ1lBPQzz2";

@Injectable()
export class AuthserviceProvider {

  constructor(public http: Http) {
    console.log('Hello AuthserviceProvider Provider');
  }
  postData(credentials, type) {
    return new Promise((resolve, reject) => {
      let headers = new Headers();
      headers.append("key", key);
      headers.append("accept", "application/json");
      headers.append("Content-Type", "application/json");
      this.http
        .post(appUrl + type, credentials, { headers: headers })
        .subscribe(
          res => {
            resolve(res);
          },
          err => {
            reject(err);
          }
        );
    });
  }
  getData(type)
  {
    return new Promise((resolve, reject)=>{
      let headers = new Headers();
      headers.append('key',key);
      headers.append('accept','application/json');
      headers.append('Content-Type','application/json');
      this.http.get(appUrl+type,{headers: headers}).subscribe(res =>{
        resolve(res);
      }, (err)=>{
        reject(err);
      });
    });
  }
}
