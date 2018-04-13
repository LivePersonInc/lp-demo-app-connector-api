import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map'
import {SendApiService} from "./send-api.service";

@Injectable()
export class AuthenticationService {

  private token: string;

  constructor(private http: HttpClient, private sendApiService: SendApiService) { }

  //Barer Token
  public login(brandId: string, username: string, password: string) {
    this.sendApiService.startLoading();
    return this.http.post<any>(`https://ctvr-ano041.dev.lprnd.net/api/account/${brandId}/login`, { username: username, password: password })
      .map(user => {
        // login successful if there's a jwt token in the response
        console.log(user);
        if (user && user.token) {
          // store user details and jwt token in local storage to keep user logged in between page refreshes
          localStorage.setItem('currentUser', JSON.stringify(user));
        }
        this.sendApiService.stopLoading();
        return user;
      });
  }

  logout() {
    // remove user from local storage to log user out
    localStorage.removeItem('currentUser');
  }


}
