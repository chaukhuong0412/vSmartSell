import { Component, OnInit } from '@angular/core';
import {Router} from "@angular/router"
import { ActivatedRoute } from '@angular/router';
import { UserService } from '../user.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { RoleService, Role } from '../role.service';


@Component({
  selector: 'app-edit-user',
  templateUrl: './user-edit.component.html',
  styleUrls: ['./user-edit.component.css'],
  providers: [UserService, RoleService]
})
export class UserEditComponent implements OnInit {

  registerForm: FormGroup;
  submitted = false;
  private id : number;
  private sub: any;
  roles: Role[];
  userName;
  password;
  selectedRoles;
  fullName;


  constructor(private route : ActivatedRoute, private _userService : UserService,  private _roleService : RoleService,  private router: Router) {}

  ngOnInit() {
    this.sub = this.route.params.subscribe(
        params  => {
            this.id = +params["id"]; // cast to number
        }
    );

    this._roleService.getListRoles().subscribe(result => {
      this.roles = result;
    })
    
    this._userService.getUser(this.id).subscribe( result => {
      this.userName = result.userName;
      this.fullName = result.fullName;
      this.selectedRoles = result.roleIds;
    });

    
  }

  save() {
    var user = {
      Id: this.id,
      UserName: this.userName,
      fullName: this.fullName,
      RoleIds: this.selectedRoles
    }
    console.log(user);
    this._userService.editUser(user).subscribe((result) => {
      this.router.navigate(['']);
      console.log(result);
    });
  }

}
