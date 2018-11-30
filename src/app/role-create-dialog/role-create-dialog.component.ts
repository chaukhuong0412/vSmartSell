import { Component, OnInit } from '@angular/core';
import { PermissionService, Permission } from '../permission.service';
import { RoleService } from '../role.service';
import { MatDialogRef } from '@angular/material';
import { Router } from '@angular/router';

@Component({
  selector: 'app-role-create-dialog',
  templateUrl: './role-create-dialog.component.html',
  styleUrls: ['./role-create-dialog.component.scss'],
  providers: [PermissionService, RoleService]

})
export class RoleCreateDialogComponent implements OnInit {

  name;
  permissions: Permission[];
  selectedPermissions;

  constructor(public dialogRef: MatDialogRef<RoleCreateDialogComponent>,
                 private _permissionService: PermissionService, private _roleService: RoleService, private router: Router) { }

  ngOnInit() {
    this._permissionService.getListPermissions().subscribe(result => {
      this.permissions = result;
    });
  }

  createRole() {
    var role = {
      name:this.name,
      permissionIds: this.selectedPermissions
    }
    this._roleService.createRole(role).subscribe((result) => {
      this.dialogRef.close("Create");
    });
  }

  cancel() {
    this.dialogRef.close();
  }
  

}
