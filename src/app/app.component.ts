import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = 'MyBloggingApp';
  userName: string = '';

  constructor(private router: Router) {}

  //On clicking Logout button
  logOut(): void {
    this.router.navigate(['']);
    localStorage.clear();
  }

  //To check whether user logged in or not
  getUserName(): boolean {
    this.userName = localStorage.getItem('userName');
    if (!this.userName) {
      return false;
    } else {
      return true;
    }
  }
}
