import { Component, OnInit, Input, Inject } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material';
import {MAT_DIALOG_DATA} from '@angular/material'
import { UserService } from '../user.service';
import { RoleService, Role } from '../../role/role.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-user-edit-dialog',
  templateUrl: './user-edit-dialog.component.html',
  styleUrls: ['./user-edit-dialog.component.scss'],
  providers: [UserService, RoleService]
})
export class UserEditDialogComponent implements OnInit {


  userName;
  title;
  roles: Role[];
  selectedRoles = [];

  constructor(@Inject(MAT_DIALOG_DATA) public data: any,public dialogRef: MatDialogRef<UserEditDialogComponent>, 
              private _userService: UserService, private _roleService: RoleService, private router: Router) { }

  ngOnInit() {
    this._roleService.getListRoles().subscribe(result => {
      this.roles = result;
    })
    
    this._userService.getUser(this.data.id).subscribe( result => {
      this.userName = result.userName;
      this.title = result.title;
      this.selectedRoles = result.roleIds;
    });
  }

  save() {
    var user = {
      Id: this.data.id,
      UserName: this.userName,
      title: this.title,
      RoleIds: this.selectedRoles
    }
    console.log(user);
    this._userService.editUser(user).subscribe((result) => {
      this.dialogRef.close("Edit");
    });
  }

  cancel() {
    this.dialogRef.close();
  }

  



}
