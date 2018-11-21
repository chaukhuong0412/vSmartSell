import { Component, OnInit } from '@angular/core';
import { UserService, User} from '../user.service';
import {Router} from "@angular/router"
import { RoleService, Role } from '../role.service';


@Component({
  selector: 'app-create-user',
  templateUrl: './user-create.component.html',
  styleUrls: ['./user-create.component.css'],
  providers: [UserService, RoleService]
})
export class UserCreateComponent implements OnInit {

  userName;
  password;
  confirmPassword;
  fullName;
  roles: Role[];
  selectedRoles = [];
  notMatched = false;

  constructor(private _userService: UserService, private _roleService: RoleService, private router: Router) { }

  ngOnInit() {
    this._roleService.getListRoles().subscribe(result => {
      this.roles = result;
    })
  }

  createUser() {
    if (this.password != this.confirmPassword)
      this.notMatched = true;
    else {
      var user = {
        userName:this.userName,
        password:this.password,
        fullName:this.fullName,
        roleIds: this.selectedRoles
      }
      console.log(user);
      this._userService.createUser(user).subscribe(s => {
        this.router.navigate(['']);
      });
      
    }

  }

}
