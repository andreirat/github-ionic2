import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { User } from '../../models/user';
import { Observable } from 'rxjs/Rx';

import 'rxjs/add/operator/map';

/*
  Generated class for the GithubUsersProvider provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular DI.
*/
@Injectable()
export class GithubUsersProvider {
  githubApiUrl = 'https://api.github.com';
  public data;
  constructor(public http: Http) {
    console.log('Hello GithubUsersProvider Provider');
  }
  load(): Observable<User[]> {
    return this.http.get(`${this.githubApiUrl}/users`)
      .map(res => <User[]>res.json());
  }

   // Get github user by providing login(username)
  loadDetails(login: string): Observable<User> {
    return this.http.get(`${this.githubApiUrl}/users/${login}`)
      .map(res => <User>(res.json()))
  }

   // Search for github users  
  searchUsers(searchParam: string): Observable<User[]> {
    return this.http.get(`${this.githubApiUrl}/search/users?q=${searchParam}`) 
      .map(res => <User[]>(res.json().items))
  }

}
