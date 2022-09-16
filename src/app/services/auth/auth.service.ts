import { Injectable } from '@angular/core';
import { GlobalVarsService } from '../global-vars/global-vars.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

let appUrl = GlobalVarsService.file_url;
let key = "$2y$10$KPYNFfDXrD96EB2uQaHXEebRAEmsbD2ZphhyDjtRvmsGJ1lBPQzz2";

@Injectable({
  providedIn: 'root'
})

export class AuthService {
  constructor(public httpClient: HttpClient) {
    console.log('Hello AuthService Provider');
  }

  postData(credentials, type){
    let headers = new HttpHeaders();
    headers = headers.append("Content-Type", "application/json");
    headers = headers.append("Accept", "application/json");
    headers = headers.append("key", key);

    return new Promise((resolve, reject)=>{
      this.httpClient.post(appUrl + type, credentials, {headers: headers}).subscribe(res => {
          resolve(res);
        }, err => {
          reject(err);
        }
      );
    });
  }

  getData(type){
    let headers = new HttpHeaders();
    headers = headers.append("Content-Type", "application/json");
    // headers = headers.append("Content-Type", "application/x-www-form-urlencoded; charset=UTF-8");
    headers = headers.append("Accept", "application/json");
    headers = headers.append("key", key);

    return new Promise((resolve, reject)=>{
      this.httpClient.get(appUrl + type, {headers: headers}).subscribe(res =>{
        resolve(res);
      }, err =>{
        reject(err);
      });
    });
  }

  ngOnInit(){}
}
