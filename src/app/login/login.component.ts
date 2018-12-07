import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  providers: [AuthService]
})
export class LoginComponent implements OnInit {

  userName;
  password;
  error;


  constructor(private _authService: AuthService,         private router: Router,
    ) { }

  ngOnInit() {
  }

  onLogin() {
    var loginBindindingModel = {
      UserName: this.userName,
      Password: this.password
    }
    this._authService.logIn(loginBindindingModel).subscribe(result => {
      localStorage.setItem('currentUser', JSON.stringify(result));
      this.router.navigate(['/']);
    },
    error => {
      this.error = true;
    })
  }

}
