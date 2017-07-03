import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { GithubUsersProvider } from '../../providers/github-users/github-users';
import {UserDetailsPage } from '../../pages/user-details/user-details';
import { User } from '../../models/user';

@Component({
  selector: 'page-users',
  templateUrl: 'users.html',
   providers: [GithubUsersProvider]
})
export class UsersPage {
  users: User[]
  originalUsers: User[];
  constructor(public navCtrl: NavController, private githubUsers: GithubUsersProvider) {
    githubUsers.load().subscribe(users => {
     this.users = users;
     this.originalUsers = users;
    })
  }
  goToDetails(login: string) {
    this.navCtrl.push(UserDetailsPage, {login});
  }

  search(searchEvent) {
    let term = searchEvent.target.value
    // We will only perform the search if we have 3 or more characters
    if (term.trim() === '' || term.trim().length < 3) {
      // Load cached users
      this.users = this.originalUsers;
    } else {
      // Get the searched users from github
      this.githubUsers.searchUsers(term).subscribe(users => {
        this.users = users
      });
    }
  }

  ionViewDidLoad() {
    console.log('Hello Users Page');
  }
}