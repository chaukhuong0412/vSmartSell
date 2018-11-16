import { Component, OnInit } from '@angular/core';
import { UserService, User} from '../user.service';
import {Router} from "@angular/router"


@Component({
  selector: 'app-create-user',
  templateUrl: './create-user.component.html',
  styleUrls: ['./create-user.component.css'],
  providers: [UserService]
})
export class CreateUserComponent implements OnInit {

  userName;
  password;
  confirmPassword;

  constructor(private _userService: UserService, private router: Router) { }

  ngOnInit() {
  }

  createUser() {
    var user = {
      userName:this.userName,
      password:this.confirmPassword
    }
    console.log(user);
    this._userService.createUser(user).subscribe((result) => {

      var User = {
        userName: result.userName,
        id:result.userId
      };
      this.router.navigate(['']);
    });
    
  }

}
