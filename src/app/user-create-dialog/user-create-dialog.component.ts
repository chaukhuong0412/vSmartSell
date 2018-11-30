import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material';
import { UserService } from '../user.service';
import { RoleService, Role } from '../role.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-user-create-dialog',
  templateUrl: './user-create-dialog.component.html',
  styleUrls: ['./user-create-dialog.component.css'],
  providers: [UserService, RoleService]
})
export class UserCreateDialogComponent implements OnInit {



  userName;
  password;
  confirmPassword;
  fullName;
  roles: Role[];
  selectedRoles = [];
  notMatched = false;

  constructor(public dialogRef: MatDialogRef<UserCreateDialogComponent>,private _userService: UserService, private _roleService: RoleService, private router: Router) { }

  ngOnInit() {
    this._roleService.getListRoles().subscribe(result => {
      this.roles = result;
    })
  }

  onNoClick(): void {
    this.dialogRef.close();
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
      this._userService.createUser(user).subscribe(s => {
        this.dialogRef.close("Create");
      });
    }
  }

  cancel() {
    this.dialogRef.close();
  }

  



}
