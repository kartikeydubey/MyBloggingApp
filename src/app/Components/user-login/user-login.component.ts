import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-user-login',
  templateUrl: './user-login.component.html',
  styleUrls: ['./user-login.component.scss'],
})
export class UserLoginComponent implements OnInit {
  username!: string;
  password!: string;
  userObj = { username: 'blogger@grapecity.com', password: '1qaz!QAZ' };
  loginForm: NgForm;

  constructor(private router: Router) {}

  ngOnInit(): void {}

  //On clicking Login buttons
  onSubmit(): void {
    if (
      this.username == this.userObj.username &&
      this.password == this.userObj.password
    ) {
      localStorage.setItem('userName', this.username);
      this.router.navigate(['/dashboard']);
    } else {
      alert('User not found!');
    }
  }
}
